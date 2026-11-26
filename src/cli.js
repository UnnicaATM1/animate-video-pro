#!/usr/bin/env node
import * as p from '@clack/prompts';
import pc from 'picocolors';
import fs from 'node:fs';
import { playIntro, grad, rgb, RESET, colorOK, REEL_FRAMES } from './logo.js';
import { HARNESSES, detectInstalled, byId } from './harnesses.js';
import { FORMATS, FPS, RENDERERS, MODULE_PACKS, fmt } from './options.js';
import {
  plan, installTo, buildConfig, recordInstalls, uninstallAll, readState,
  tilde, VERSION, SKILL_NAME,
} from './install.js';
import { printDoctor } from './doctor.js';
import { canOpenWindow, openInstallerWindow } from './window.js';

// ───────────────────────── argumentos ─────────────────────────
const argv = process.argv.slice(2);
const cmd = argv[0] && !argv[0].startsWith('-') ? argv[0] : 'install';
const flag = (name) => {
  const hit = argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.includes('=') ? hit.split('=').slice(1).join('=') : true;
};
const list = (v) => (typeof v === 'string' ? v.split(',').map((s) => s.trim()).filter(Boolean) : undefined);

const HELP = `
${pc.bold('@joao_lopes/animate')} v${VERSION}  ${pc.dim('· Animate Video Pro')}

  ${pc.cyan('npx @joao_lopes/animate install')}                    instalação interativa
  ${pc.cyan('npx @joao_lopes/animate doctor')}                     confere FFmpeg, Python, Node, GPU
  ${pc.cyan('npx @joao_lopes/animate list')}                       mostra onde está instalado
  ${pc.cyan('npx @joao_lopes/animate uninstall')}                  remove as instalações registradas

  Modo direto (sem perguntas, bom para CI):
    --yes                       aceita os padrões
    --harness=claude-code,codex ${pc.dim(HARNESSES.map((h) => h.id).join(' | '))}
    --scope=global|project
    --formats=9:16,16:9         ${pc.dim(FORMATS.map((f) => f.id).join(' | '))}
    --primary=9:16              formato padrão
    --fps=30  --renderer=remotion|hyperframes|auto  --modules=essencial|visual|completo
    --overwrite=backup|replace|skip   --dry-run   --no-anim   --no-window
`;

// --hold: usado quando o instalador abre numa janela própria. Antes de sair,
// espera Enter para a pessoa conseguir ler o resultado.
if (flag('hold') && process.stdin.isTTY) {
  const realExit = process.exit.bind(process);
  process.exit = (code = 0) => {
    process.stdout.write(`\n${pc.dim('Pressione Enter para fechar esta janela…')}`);
    try { process.stdin.setRawMode?.(false); } catch {}
    const buf = Buffer.alloc(1);
    for (;;) {
      try { if (fs.readSync(0, buf, 0, 1) === 0 || buf[0] === 10 || buf[0] === 13) break; }
      catch (e) { if (e.code !== 'EAGAIN') break; Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50); }
    }
    realExit(code);
  };
}

const brand = (s, t = 0.5) => (colorOK() ? rgb(grad(t)) + s + RESET : s);
const bail = (v) => { if (p.isCancel(v)) { p.cancel('Instalação cancelada. Nada foi alterado.'); process.exit(0); } return v; };

// ───────────────────────── comandos ─────────────────────────
if (flag('help') || cmd === 'help') { console.log(HELP); process.exit(0); }
if (flag('version')) { console.log(VERSION); process.exit(0); }
if (cmd === 'doctor') { process.exit(printDoctor() ? 0 : 1); }
if (cmd === 'list') {
  const st = readState();
  if (!st.installs?.length) console.log('Nenhuma instalação registrada.');
  for (const i of st.installs || []) console.log(`${i.harness.padEnd(12)} ${tilde(i.dest)}`);
  process.exit(0);
}
if (cmd === 'uninstall') {
  const st = readState();
  if (!st.installs?.length) { console.log('Nada para remover.'); process.exit(0); }
  if (!flag('yes')) {
    p.intro(brand(' Remover Animate Video Pro '));
    p.note(st.installs.map((i) => `${i.harness.padEnd(12)} ${tilde(i.dest)}`).join('\n'), 'Pastas que serão apagadas');
    const ok = bail(await p.confirm({ message: 'Apagar essas pastas? Não dá para desfazer.', initialValue: false, active: 'Sim', inactive: 'Não' }));
    if (!ok) { p.outro('Nada foi removido.'); process.exit(0); }
  }
  const removed = uninstallAll({ dryRun: !!flag('dry-run') });
  console.log(`Removidas ${removed.length} pasta(s).`);
  process.exit(0);
}
if (cmd !== 'install') { console.log(HELP); process.exit(1); }

// ───────────────────────── instalação ─────────────────────────
const noTTY = !process.stdin.isTTY || !process.stdout.isTTY;
if (noTTY && !flag('yes') && !flag('dry-run')) {
  // Rodando dentro de um agente (Codex, Claude Code, Antigravity…): não há terminal
  // aqui, então abre uma janela nova com a animação e o painel de escolhas.
  const opened = !flag('no-window') && canOpenWindow()
    ? await openInstallerWindow(argv.filter((a) => a !== 'install'))
    : null;
  if (opened) {
    console.log(`
Animate Video Pro · instalador v${VERSION}

Abri o instalador numa janela nova (${opened}).
Faça as escolhas lá: agentes, formatos de vídeo e padrões.
Nada é instalado até você confirmar nessa janela.`);
    process.exit(0);
  }
  console.log(`
Animate Video Pro · instalador v${VERSION}

O painel de instalação precisa de um terminal de verdade, e não consegui abrir
uma janela daqui (provavelmente você rodou o comando dentro do chat de um agente).

  1) Abra o PowerShell, Windows Terminal, Terminal do macOS ou similar
  2) Rode:  npx -y github:UnnicaATM1/animate-video-pro install

Quer instalar daqui mesmo, sem o painel? Use o modo direto:

  npx -y github:UnnicaATM1/animate-video-pro install --yes --harness=claude-code,codex --formats=9:16,16:9

Opções: npx -y github:UnnicaATM1/animate-video-pro help
Nada foi instalado.`);
  process.exit(0);
}
const nonInteractive = !!flag('yes') || noTTY;
await playIntro({ animate: !flag('no-anim') && !nonInteractive });

const detected = detectInstalled();
let ans;

if (nonInteractive) {
  const formats = list(flag('formats')) || ['9:16'];
  ans = {
    harnesses: list(flag('harness')) || (detected.length ? detected : ['claude-code']),
    scope: flag('scope') || 'global',
    formats,
    primary: flag('primary') || formats[0],
    fps: Number(flag('fps') || 30),
    renderer: flag('renderer') || 'remotion',
    pack: flag('modules') || 'essencial',
  };
  const bad = [
    ...ans.harnesses.filter((h) => !byId(h)).map((h) => `harness "${h}"`),
    ...ans.formats.filter((f) => !fmt(f)).map((f) => `formato "${f}"`),
    ...(ans.formats.includes(ans.primary) ? [] : [`primary "${ans.primary}" fora de --formats`]),
  ];
  if (bad.length) { console.error(pc.red('Valor inválido: ' + bad.join(', '))); process.exit(1); }
} else {
  p.intro(brand(` Animate Video Pro · instalador v${VERSION} `, 0.2));
  if (detected.length) p.log.info(`Encontrei no seu computador: ${detected.map((d) => pc.bold(byId(d).label.split(' (')[0])).join(', ')}`);

  ans = await p.group(
    {
      harnesses: () => p.multiselect({
        message: `Em quais agentes instalar? ${pc.dim('(espaço marca · enter confirma)')}`,
        options: HARNESSES.map((h) => ({
          value: h.id,
          label: h.label,
          hint: detected.includes(h.id) ? pc.green('detectado') : undefined,
        })),
        initialValues: detected.length ? detected : ['claude-code'],
        required: true,
      }),
      scope: () => p.select({
        message: 'Onde instalar?',
        options: [
          { value: 'global', label: 'Global', hint: 'vale para todos os seus projetos' },
          { value: 'project', label: 'Só neste projeto', hint: tilde(process.cwd()) },
        ],
      }),
      formats: () => p.multiselect({
        message: `Quais formatos de vídeo você usa? ${pc.dim('(pode marcar vários)')}`,
        options: FORMATS.map((f) => ({ value: f.id, label: f.label, hint: `${f.w}×${f.h} · ${f.hint}` })),
        initialValues: ['9:16'],
        required: true,
      }),
      primary: ({ results }) => results.formats.length === 1
        ? Promise.resolve(results.formats[0])
        : p.select({
          message: 'Qual é o formato padrão quando você não disser nada?',
          options: results.formats.map((id) => ({ value: id, label: fmt(id).label, hint: fmt(id).hint })),
        }),
      fps: () => p.select({ message: 'Taxa de quadros padrão', options: FPS }),
      renderer: () => p.select({ message: 'Motor de renderização', options: RENDERERS }),
      pack: () => p.select({
        message: 'Pacote de módulos opcionais',
        options: MODULE_PACKS,
        initialValue: 'visual',
      }),
    },
    { onCancel: () => bail(p.CANCEL_SYMBOL) }
  );
}

const config = buildConfig(ans);
const steps = plan(ans);

if (!nonInteractive) {
  const summary = [
    `${pc.dim('Agentes')}    ${ans.harnesses.map((h) => byId(h).label.split(' (')[0]).join(', ')}`,
    `${pc.dim('Escopo')}     ${ans.scope === 'global' ? 'global' : 'projeto atual'}`,
    `${pc.dim('Formatos')}   ${ans.formats.map((f) => (f === ans.primary ? pc.bold(f + ' ★') : f)).join('  ')}`,
    `${pc.dim('Vídeo')}      ${ans.fps} fps · H.264/AAC · ${ans.renderer}`,
    `${pc.dim('Módulos')}    ${ans.pack}`,
    '',
    ...steps.filter((s) => !s.shared).map((s) => `${s.exists ? pc.yellow('↻') : pc.green('+')} ${tilde(s.dest)}`),
  ].join('\n');
  p.note(summary, 'Resumo');
  const ok = bail(await p.confirm({ message: 'Instalar agora?', active: 'Sim', inactive: 'Não' }));
  if (!ok) { p.cancel('Nada foi alterado.'); process.exit(0); }
}

let overwrite = flag('overwrite') || 'backup';
if (!nonInteractive && steps.some((s) => s.exists && !s.shared)) {
  overwrite = bail(await p.select({
    message: 'Já existe uma instalação em alguma dessas pastas. O que fazer?',
    options: [
      { value: 'backup', label: 'Atualizar e guardar cópia da antiga', hint: 'recomendado' },
      { value: 'replace', label: 'Substituir sem cópia' },
      { value: 'skip', label: 'Pular essas pastas' },
    ],
  }));
}

const dryRun = !!flag('dry-run');
const spin = nonInteractive
  ? { start: () => {}, stop: (m) => console.log(m) }
  : p.spinner({ frames: REEL_FRAMES });
const done = [];
for (const s of steps) {
  if (s.shared) continue;
  spin.start(`${s.harness.label.split(' (')[0]} → ${tilde(s.dest)}`);
  await new Promise((r) => setTimeout(r, nonInteractive ? 0 : 180));
  try {
    const r = installTo(s.dest, config, { overwrite, dryRun });
    if (r.skipped) spin.stop(`${pc.yellow('pulado')}  ${tilde(s.dest)}`);
    else {
      done.push({ dest: s.dest, harness: s.harness.id });
      spin.stop(`${pc.green('instalado')}  ${tilde(s.dest)}${r.backup ? pc.dim('  (cópia: ' + tilde(r.backup) + ')') : ''}`);
    }
  } catch (e) {
    spin.stop(`${pc.red('falhou')}  ${tilde(s.dest)}: ${e.message}`, 1);
  }
}
if (!dryRun) recordInstalls(done, config);

const how = [...new Set(ans.harnesses)].map((id) => {
  const h = byId(id);
  return `${h.label.split(' (')[0].padEnd(18)} ${pc.cyan(h.invoke)}`;
}).join('\n');
if (nonInteractive) {
  console.log(`\n${done.length} pasta(s) ${dryRun ? 'seriam instaladas (dry-run)' : 'instaladas'}.`);
} else {
  p.note(`${how}\n\n${pc.dim('Mande um áudio e peça o vídeo. Os formatos escolhidos ficam em animate.config.json.')}`, 'Como chamar');
  p.outro(`${brand('Pronto!', 0.9)} Confira o ambiente com ${pc.cyan('npx @joao_lopes/animate doctor')}`);
}
process.exit(0);

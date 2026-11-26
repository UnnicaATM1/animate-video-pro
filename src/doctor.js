import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import pc from 'picocolors';
import { readState, tilde } from './install.js';

function run(cmd, args) {
  try {
    const r = spawnSync(cmd, args, { encoding: 'utf8', shell: process.platform === 'win32' });
    if (r.status !== 0 && !r.stdout) return null;
    return (r.stdout || r.stderr || '').split('\n')[0].trim();
  } catch { return null; }
}

const ver = (s) => (s && s.match(/(\d+)\.(\d+)(?:\.(\d+))?/)) || null;

export function checks() {
  const node = process.versions.node;
  const nMaj = Number(node.split('.')[0]);
  const py = run('python3', ['--version']) || run('python', ['--version']);
  const pv = ver(py);
  const pyOk = pv && (Number(pv[1]) > 3 || (Number(pv[1]) === 3 && Number(pv[2]) >= 10));
  const ff = run('ffmpeg', ['-version']);
  const fp = run('ffprobe', ['-version']);
  const gpu = run('nvidia-smi', ['--query-gpu=name', '--format=csv,noheader']);
  const mps = process.platform === 'darwin' && process.arch === 'arm64';
  return [
    { name: 'Node.js', ok: nMaj >= 20, warn: nMaj >= 20 && nMaj < 22, info: `v${node}${nMaj < 22 ? ' (Hyperframes pede 22+)' : ''}`, need: true },
    { name: 'npm', ok: !!run('npm', ['-v']), info: run('npm', ['-v']) || 'não encontrado', need: true },
    { name: 'Python 3.10+', ok: !!pyOk, info: py || 'não encontrado', need: true },
    { name: 'FFmpeg', ok: !!ff, info: ff ? ff.replace('ffmpeg version ', '').split(' ')[0] : 'não encontrado', need: true },
    { name: 'FFprobe', ok: !!fp, info: fp ? 'ok' : 'não encontrado', need: true },
    { name: 'Git', ok: !!run('git', ['--version']), info: run('git', ['--version']) || 'não encontrado', need: false },
    { name: 'GPU', ok: !!gpu || mps, info: gpu || (mps ? 'Apple Silicon (MPS)' : 'só CPU, módulos pesados ficam lentos'), need: false },
  ];
}

export function printDoctor() {
  const rows = checks();
  console.log('\n' + pc.bold('  Diagnóstico do ambiente') + '\n');
  for (const r of rows) {
    const mark = r.ok ? (r.warn ? pc.yellow('▲') : pc.green('✔')) : r.need ? pc.red('✖') : pc.yellow('▲');
    console.log(`  ${mark} ${r.name.padEnd(14)} ${pc.dim(r.info)}`);
  }
  const st = readState();
  console.log('\n' + pc.bold('  Instalações registradas') + '\n');
  if (!st.installs?.length) console.log(pc.dim('  nenhuma'));
  for (const i of st.installs || []) {
    const ok = fs.existsSync(i.dest);
    console.log(`  ${ok ? pc.green('●') : pc.red('○')} ${pc.cyan(i.harness.padEnd(12))} ${tilde(i.dest)}`);
  }
  const missing = rows.filter((r) => r.need && !r.ok);
  console.log(
    '\n' + (missing.length
      ? pc.yellow(`  Faltando: ${missing.map((m) => m.name).join(', ')}. O agente tenta instalar no runtime isolado na primeira produção.`)
      : pc.green('  Tudo pronto para produzir vídeos.')) + '\n'
  );
  return missing.length === 0;
}

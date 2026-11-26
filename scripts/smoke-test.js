// Instala em um HOME temporário em modo direto e confere as pastas por harness.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const home = fs.mkdtempSync(path.join(os.tmpdir(), 'avp-home-'));
const proj = fs.mkdtempSync(path.join(os.tmpdir(), 'avp-proj-'));
const env = { ...process.env, HOME: home, USERPROFILE: home, NO_COLOR: '1' };
const cli = path.resolve('bin/cli.js');
const run = (args, cwd = process.cwd()) => spawnSync(process.execPath, [cli, ...args], { env, cwd, encoding: 'utf8' });

let fail = 0;
const check = (cond, msg) => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${msg}`); if (!cond) fail++; };

let r = run(['--yes', '--harness=claude-code,codex,antigravity,gemini-cli,cursor,opencode,copilot,universal', '--formats=9:16,16:9,1:1', '--primary=16:9', '--fps=60', '--modules=visual']);
check(r.status === 0, 'instalação global termina sem erro');
const g = (...p) => path.join(home, ...p, 'animate-video-pro', 'SKILL.md');
for (const [n, p] of Object.entries({
  'Claude Code': g('.claude', 'skills'), Codex: g('.codex', 'skills'),
  'Antigravity app': g('.gemini', 'config', 'skills'), 'Antigravity CLI': g('.gemini', 'antigravity-cli', 'skills'),
  'Gemini CLI': g('.gemini', 'skills'), Cursor: g('.cursor', 'skills'),
  OpenCode: g('.config', 'opencode', 'skills'), Copilot: g('.copilot', 'skills'), Universal: g('.agents', 'skills'),
})) check(fs.existsSync(p), `${n}: ${p.replace(home, '~')}`);
const cfg = JSON.parse(fs.readFileSync(path.join(home, '.claude/skills/animate-video-pro/animate.config.json'), 'utf8'));
check(cfg.video.primary === '16:9' && cfg.video.formats.length === 3 && cfg.video.fps === 60, 'animate.config.json com formatos, padrão e fps');
check(cfg.modules.enabled.includes('ben2'), 'pacote visual habilita BEN2');

r = run(['--yes', '--harness=codex,antigravity', '--scope=project'], proj);
check(fs.existsSync(path.join(proj, '.agents/skills/animate-video-pro/SKILL.md')), 'projeto: .agents/skills (Codex + Antigravity compartilham)');

r = run(['--yes', '--harness=claude-code']);
check(fs.readdirSync(path.join(home, '.claude/skills')).some((d) => d.includes('.bak-')), 'reinstalação guarda cópia da anterior');

r = run(['--yes', '--formats=7:3']);
check(r.status === 1, 'formato inválido é recusado');

r = run(['uninstall', '--yes']);
check(!fs.existsSync(g('.claude', 'skills')), 'uninstall remove as pastas registradas');

fs.rmSync(home, { recursive: true, force: true });
fs.rmSync(proj, { recursive: true, force: true });
console.log(fail ? `\n${fail} falha(s)` : '\nTudo certo.');
process.exit(fail ? 1 : 0);

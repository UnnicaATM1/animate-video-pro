// Onde cada harness lê skills (padrão aberto SKILL.md).
// global: pasta do usuário | project: relativo à pasta onde o instalador roda.
// detect: pastas cuja existência indica que o harness está instalado.
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

const H = os.homedir();
const j = (...p) => path.join(...p);

export const HARNESSES = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    global: [j(H, '.claude', 'skills')],
    project: ['.claude/skills'],
    detect: [j(H, '.claude')],
    invoke: '/animate-video-pro',
  },
  {
    id: 'codex',
    label: 'OpenAI Codex (CLI, IDE e app)',
    global: [j(H, '.codex', 'skills')],
    project: ['.agents/skills'],
    detect: [j(H, '.codex')],
    invoke: '$animate-video-pro',
  },
  {
    id: 'antigravity',
    label: 'Google Antigravity',
    // App atual: ~/.gemini/config/skills · CLI: ~/.gemini/antigravity-cli/skills
    // Legado: ~/.gemini/antigravity/skills (gravado só se a pasta já existir)
    global: [j(H, '.gemini', 'config', 'skills'), j(H, '.gemini', 'antigravity-cli', 'skills')],
    legacyGlobal: [j(H, '.gemini', 'antigravity', 'skills')],
    project: ['.agents/skills'],
    detect: [j(H, '.gemini', 'antigravity'), j(H, '.gemini', 'config'), j(H, '.gemini', 'antigravity-cli')],
    invoke: '/animate-video-pro',
  },
  {
    id: 'gemini-cli',
    label: 'Gemini CLI',
    global: [j(H, '.gemini', 'skills')],
    project: ['.gemini/skills'],
    detect: [j(H, '.gemini')],
    invoke: 'animate-video-pro',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    global: [j(H, '.cursor', 'skills')],
    project: ['.cursor/skills'],
    detect: [j(H, '.cursor')],
    invoke: '/animate-video-pro',
  },
  {
    id: 'opencode',
    label: 'OpenCode',
    global: [j(H, '.config', 'opencode', 'skills')],
    project: ['.opencode/skills'],
    detect: [j(H, '.config', 'opencode')],
    invoke: 'animate-video-pro',
  },
  {
    id: 'copilot',
    label: 'GitHub Copilot',
    global: [j(H, '.copilot', 'skills')],
    project: ['.github/skills'],
    detect: [j(H, '.copilot')],
    invoke: '/animate-video-pro',
  },
  {
    id: 'universal',
    label: 'Pasta universal ~/.agents/skills (Amp, Cline, Droid, Pi…)',
    global: [j(H, '.agents', 'skills')],
    project: ['.agents/skills'],
    detect: [j(H, '.agents')],
    invoke: 'animate-video-pro',
  },
];

export const byId = (id) => HARNESSES.find((h) => h.id === id);

export function detectInstalled() {
  return HARNESSES.filter((h) => h.id !== 'universal' && h.detect.some((d) => fs.existsSync(d))).map((h) => h.id);
}

export function targetsFor(harness, scope, cwd = process.cwd()) {
  if (scope === 'project') return harness.project.map((p) => path.resolve(cwd, p));
  const extra = (harness.legacyGlobal || []).filter((p) => fs.existsSync(path.dirname(p)));
  return [...harness.global, ...extra];
}

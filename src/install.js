import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { byId, targetsFor } from './harnesses.js';
import { fmt, PACK_MODULES } from './options.js';

export const SKILL_NAME = 'animate-video-pro';
export const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SKILL_SRC = path.join(PKG_ROOT, 'skill', SKILL_NAME);
export const STATE_DIR = path.join(os.homedir(), '.animate-video-pro');
export const STATE_FILE = path.join(STATE_DIR, 'config.json');
export const VERSION = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, 'package.json'), 'utf8')).version;

export function buildConfig(ans) {
  const formats = ans.formats.map((id) => {
    const f = fmt(id);
    return { ratio: f.id, width: f.w, height: f.h };
  });
  return {
    version: VERSION,
    video: {
      formats,
      primary: ans.primary,
      fps: ans.fps,
      codec: 'h264',
      audio: 'aac',
    },
    renderer: ans.renderer,
    modules: { pack: ans.pack, enabled: PACK_MODULES[ans.pack] },
    installedAt: new Date().toISOString(),
  };
}

export function readState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch { return { installs: [] }; }
}

function writeState(state) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/** Lista o plano de instalação (harness → pastas finais). */
export function plan(ans, cwd = process.cwd()) {
  const out = [];
  const seen = new Set();
  for (const id of ans.harnesses) {
    const h = byId(id);
    for (const root of targetsFor(h, ans.scope, cwd)) {
      const dest = path.join(root, SKILL_NAME);
      const shared = seen.has(dest);
      seen.add(dest);
      out.push({ harness: h, dest, shared, exists: fs.existsSync(dest) });
    }
  }
  return out;
}

/** Copia a skill para um destino e grava a configuração escolhida. */
export function installTo(dest, config, { overwrite = 'backup', dryRun = false } = {}) {
  let backup = null;
  if (fs.existsSync(dest)) {
    if (overwrite === 'skip') return { dest, skipped: true };
    if (overwrite === 'backup' && !dryRun) {
      backup = `${dest}.bak-${Date.now()}`;
      fs.renameSync(dest, backup);
    } else if (overwrite === 'replace' && !dryRun) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
  }
  if (!dryRun) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(SKILL_SRC, dest, { recursive: true });
    fs.writeFileSync(path.join(dest, 'animate.config.json'), JSON.stringify(config, null, 2) + '\n');
  }
  return { dest, backup };
}

export function recordInstalls(entries, config) {
  const state = readState();
  const map = new Map((state.installs || []).map((i) => [i.dest, i]));
  for (const e of entries) map.set(e.dest, { dest: e.dest, harness: e.harness, at: new Date().toISOString() });
  writeState({ ...state, lastConfig: config, installs: [...map.values()] });
}

/** Remove apenas pastas registradas pelo instalador que contêm esta skill. */
export function uninstallAll({ dryRun = false } = {}) {
  const state = readState();
  const removed = [];
  for (const i of state.installs || []) {
    const md = path.join(i.dest, 'SKILL.md');
    const ok = path.basename(i.dest) === SKILL_NAME && fs.existsSync(md) &&
      fs.readFileSync(md, 'utf8').includes(`name: ${SKILL_NAME}`);
    if (!ok) continue;
    if (!dryRun) fs.rmSync(i.dest, { recursive: true, force: true });
    removed.push(i.dest);
  }
  if (!dryRun) writeState({ ...state, installs: [] });
  return removed;
}

export const tilde = (p) => p.replace(os.homedir(), '~');

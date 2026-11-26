// Abre o instalador numa janela de terminal nova, com a animação e o painel de
// escolhas. Usado quando o comando foi chamado de dentro do chat de um agente
// (Codex, Claude Code, Antigravity…), onde não existe terminal interativo.
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';

const has = (cmd) => {
  const r = process.platform === 'win32'
    ? spawnSync('where', [cmd], { stdio: 'ignore', windowsHide: true })
    : spawnSync('sh', ['-c', `command -v ${cmd}`], { stdio: 'ignore' });
  return r.status === 0;
};

const shq = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`;

// Pode abrir janela? Não em CI, SSH ou Linux sem tela.
export function canOpenWindow() {
  const e = process.env;
  if (e.CI || e.ANIMATE_NO_WINDOW || e.SSH_CONNECTION || e.SSH_TTY) return false;
  if (process.platform === 'linux' && !e.DISPLAY && !e.WAYLAND_DISPLAY) return false;
  return ['win32', 'darwin', 'linux'].includes(process.platform);
}

function launch(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (ok) => { if (!settled) { settled = true; resolve(ok); } };
    try {
      const child = spawn(cmd, args, { detached: true, stdio: 'ignore', windowsHide: false, ...opts });
      child.once('error', () => done(false));
      child.once('exit', (code) => done(code === 0 || code === null));
      setTimeout(() => { child.unref(); done(true); }, 1500);
    } catch { done(false); }
  });
}

/** Tenta abrir a janela. Devolve o nome do terminal usado, ou null. */
export async function openInstallerWindow(extraArgs = []) {
  const node = process.execPath;
  const script = fs.realpathSync(process.argv[1]);
  const cwd = process.cwd();
  const title = 'Animate Video Pro';
  const args = [script, 'install', ...extraArgs, '--hold'];

  if (process.platform === 'win32') {
    // Windows Terminal primeiro; senão uma janela de console comum.
    // --hold faz o próprio instalador esperar Enter antes de fechar.
    const q = (a) => `"${a}"`;
    if (has('wt')) {
      if (await launch('wt.exe', ['-w', 'new', '--title', title, '-d', cwd, node, ...args])) return 'Windows Terminal';
    }
    const line = ['start', q(title), '/D', q(cwd), q(node), ...args.map(q)].join(' ');
    if (await launch('cmd.exe', ['/d', '/s', '/c', `"${line}"`], { windowsVerbatimArguments: true })) return 'Prompt de Comando';
    return null;
  }

  const line = `cd ${shq(cwd)} && ${[node, ...args].map(shq).join(' ')}`;

  if (process.platform === 'darwin') {
    const as = JSON.stringify(line); // string AppleScript com aspas escapadas
    const ok = await launch('osascript', [
      '-e', `tell application "Terminal" to do script ${as}`,
      '-e', 'tell application "Terminal" to activate',
    ]);
    return ok ? 'Terminal' : null;
  }

  const held = line; // --hold segura a janela aberta no final
  const candidates = [
    ['x-terminal-emulator', ['-e', 'sh', '-c', held]],
    ['gnome-terminal', ['--title', title, '--', 'sh', '-c', held]],
    ['konsole', ['-e', 'sh', '-c', held]],
    ['xfce4-terminal', ['--title', title, '-x', 'sh', '-c', held]],
    ['kitty', ['sh', '-c', held]],
    ['alacritty', ['-e', 'sh', '-c', held]],
    ['xterm', ['-T', title, '-e', 'sh', '-c', held]],
  ];
  for (const [cmd, a] of candidates) {
    if (has(cmd) && (await launch(cmd, a))) return cmd;
  }
  return null;
}

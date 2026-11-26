// Abertura animada do instalador, só com ANSI e sem dependências.
// 1) faixa de filme correndo  2) logo revelado por um "playhead"  3) brilho
// 4) barra de reprodução enchendo como um player de vídeo.
const LOGO = [
  ' █████╗ ███╗   ██╗██╗███╗   ███╗ █████╗ ████████╗███████╗',
  '██╔══██╗████╗  ██║██║████╗ ████║██╔══██╗╚══██╔══╝██╔════╝',
  '███████║██╔██╗ ██║██║██╔████╔██║███████║   ██║   █████╗  ',
  '██╔══██║██║╚██╗██║██║██║╚██╔╝██║██╔══██║   ██║   ██╔══╝  ',
  '██║  ██║██║ ╚████║██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗',
  '╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝',
];
const W = LOGO[0].length;
const TAG = 'V I D E O   P R O';
const CREDIT = 'By @joao_lopes';
const SUB = 'narração  →  vídeo animado  ·  multi-harness';

// Degradê da marca: violeta → magenta → coral → âmbar
const STOPS = [
  [124, 58, 237],
  [219, 39, 119],
  [249, 115, 22],
  [250, 204, 21],
];

const ESC = '\x1b[';
const rgb = ([r, g, b]) => `${ESC}38;2;${r};${g};${b}m`;
const RESET = `${ESC}0m`;
const DIM = `${ESC}2m`;
const BOLD = `${ESC}1m`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function lerp(a, b, t) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}
function grad(t) {
  const x = Math.min(0.9999, Math.max(0, t)) * (STOPS.length - 1);
  const i = Math.floor(x);
  return lerp(STOPS[i], STOPS[i + 1], x - i);
}
function mix(c, w) {
  return lerp(c, [255, 255, 255], w);
}

export const colorOK = () =>
  process.stdout.isTTY && !process.env.NO_COLOR && process.env.TERM !== 'dumb';

function paintLine(line, revealCol, shineCol) {
  let out = '';
  for (let x = 0; x < line.length; x++) {
    const ch = line[x];
    if (x > revealCol) { out += ' '; continue; }
    if (ch === ' ') { out += ' '; continue; }
    let c = grad(x / W);
    if (ch !== '█') c = lerp(c, [40, 40, 60], 0.45); // sombra mais escura
    const dPlay = revealCol - x;
    if (dPlay >= 0 && dPlay < 3) c = mix(c, 0.85 - dPlay * 0.25); // cabeça do playhead
    if (shineCol != null) {
      const d = Math.abs(x - shineCol);
      if (d < 6) c = mix(c, (1 - d / 6) * 0.7);
    }
    out += rgb(c) + ch;
  }
  return out + RESET;
}

function filmStrip(offset) {
  const holes = '▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ ';
  const s = (holes + holes).slice(offset % 2, offset % 2 + W);
  return DIM + rgb([120, 110, 160]) + s + RESET;
}

function playerBar(p) {
  const len = W - 16;
  const pos = Math.round(p * len);
  let bar = '';
  for (let i = 0; i < len; i++) {
    if (i < pos) bar += rgb(grad(i / len)) + '━';
    else if (i === pos) bar += rgb([255, 255, 255]) + '●';
    else bar += DIM + rgb([90, 90, 110]) + '─' + RESET;
  }
  const secs = (n) => `00:${String(n).padStart(2, '0')}`;
  const icon = p >= 1 ? '■' : '▶';
  return `${rgb([255, 255, 255])}${icon}${RESET} ${bar}${RESET} ${DIM}${secs(Math.round(p * 7))}/${secs(7)}${RESET}`;
}

function frame({ reveal, shine, strip, progress, tagChars }) {
  const lines = [];
  lines.push(filmStrip(strip));
  for (const l of LOGO) lines.push(paintLine(l, reveal, shine));
  lines.push(filmStrip(strip + 1));
  const pad = Math.floor((W - TAG.length) / 2);
  const tag = TAG.slice(0, tagChars);
  // crédito no canto direito, mesma linha do "VIDEO PRO", alinhado à borda do logo
  const credit = CREDIT.slice(0, Math.max(0, Math.round((tagChars / TAG.length) * CREDIT.length)));
  const gap = W - pad - TAG.length - CREDIT.length;
  lines.push(' '.repeat(pad) + BOLD + rgb(grad(0.6)) + tag + RESET +
    ' '.repeat(TAG.length - tag.length + gap + CREDIT.length - credit.length) +
    DIM + rgb([200, 190, 230]) + credit + RESET);
  const sp = Math.floor((W - SUB.length) / 2);
  lines.push(' '.repeat(sp) + DIM + (tagChars >= TAG.length ? SUB : ' '.repeat(SUB.length)) + RESET);
  lines.push(playerBar(progress));
  return lines;
}

function draw(lines, first) {
  if (!first) process.stdout.write(`${ESC}${lines.length}A`);
  process.stdout.write(lines.map((l) => `${ESC}2K` + l).join('\n') + '\n');
}

export async function playIntro({ animate = true } = {}) {
  if (!colorOK()) {
    const pad = Math.floor((W - TAG.length) / 2);
    console.log('\n' + LOGO.join('\n') + '\n' + ' '.repeat(pad) + TAG + CREDIT.padStart(W - pad - TAG.length) + '\n   ' + SUB + '\n');
    return;
  }
  const hide = () => process.stdout.write(`${ESC}?25l`);
  const show = () => process.stdout.write(`${ESC}?25h`);
  const restore = () => { show(); process.exit(130); };
  process.once('SIGINT', restore);
  hide();
  process.stdout.write('\n');
  try {
    if (!animate) {
      draw(frame({ reveal: W, shine: null, strip: 0, progress: 1, tagChars: TAG.length }), true);
      return;
    }
    let first = true;
    // 1+2) faixa correndo + revelação pelo playhead
    const steps = 34;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const ease = 1 - Math.pow(1 - t, 3);
      draw(frame({ reveal: Math.round(ease * (W + 2)), shine: null, strip: i, progress: t * 0.35, tagChars: 0 }), first);
      first = false;
      await sleep(22);
    }
    // 3) brilho atravessando o logo + tagline digitada
    for (let s = -6, k = 0; s <= W + 6; s += 3, k++) {
      draw(frame({ reveal: W, shine: s, strip: steps + k, progress: 0.35 + (s + 6) / (W + 12) * 0.4, tagChars: Math.min(TAG.length, k) }), false);
      await sleep(24);
    }
    // 4) barra de reprodução completa
    for (let p = 0.75; p <= 1.0001; p += 0.05) {
      draw(frame({ reveal: W, shine: null, strip: 0, progress: Math.min(1, p), tagChars: TAG.length }), false);
      await sleep(30);
    }
  } finally {
    show();
    process.removeListener('SIGINT', restore);
  }
}

// Spinner temático (rolo de filme) para etapas longas
export const REEL_FRAMES = ['◐', '◓', '◑', '◒'];
export { grad, rgb, RESET };

export const FORMATS = [
  { id: '9:16', w: 1080, h: 1920, label: '9:16  Vertical', hint: 'Reels · Shorts · TikTok · Status' },
  { id: '1:1', w: 1080, h: 1080, label: '1:1   Quadrado', hint: 'Feed Instagram/Facebook · LinkedIn' },
  { id: '4:5', w: 1080, h: 1350, label: '4:5   Retrato', hint: 'Feed Instagram (ocupa mais tela)' },
  { id: '3:4', w: 1080, h: 1440, label: '3:4   Retrato', hint: 'Feed novo do Instagram' },
  { id: '16:9', w: 1920, h: 1080, label: '16:9  Horizontal', hint: 'YouTube · site · apresentação' },
  { id: '4:3', w: 1440, h: 1080, label: '4:3   Clássico', hint: 'Telas e TVs antigas' },
];

export const FPS = [
  { value: 30, label: '30 fps', hint: 'padrão, mais leve' },
  { value: 60, label: '60 fps', hint: 'movimento mais suave' },
  { value: 24, label: '24 fps', hint: 'visual de cinema' },
];

export const RENDERERS = [
  { value: 'remotion', label: 'Remotion', hint: 'padrão do scaffold · conferir licença comercial' },
  { value: 'hyperframes', label: 'Hyperframes', hint: 'HTML/GSAP · Apache 2.0 · Node 22+' },
  { value: 'auto', label: 'Deixar o agente decidir', hint: 'escolhe por projeto' },
];

export const MODULE_PACKS = [
  { value: 'essencial', label: 'Essencial', hint: 'WhisperX + FFmpeg + renderizador' },
  { value: 'visual', label: 'Visual', hint: '+ YuNet, MediaPipe, BEN2, Depth Anything' },
  { value: 'completo', label: 'Completo', hint: '+ SAM 2, Demucs, PySceneDetect, CLAP (GPU recomendada)' },
];

export const PACK_MODULES = {
  essencial: [],
  visual: ['yunet', 'mediapipe', 'ben2', 'depth-anything'],
  completo: ['yunet', 'mediapipe', 'ben2', 'depth-anything', 'sam2', 'demucs', 'pyscenedetect', 'clap'],
};

export const fmt = (id) => FORMATS.find((f) => f.id === id);

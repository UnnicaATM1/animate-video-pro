// Copia scripts/, references/ e assets/ da sua skill narrate-to-animation local
// para dentro do framework, deixando o repositório independente.
// Uso: npm run import-core -- /caminho/para/narrate-to-animation
import fs from 'node:fs';
import path from 'node:path';
import { SKILL_SRC } from '../src/install.js';

const src = process.argv[2];
if (!src || !fs.existsSync(path.join(src, 'SKILL.md'))) {
  console.error('Informe a pasta da skill narrate-to-animation (a que contém SKILL.md).');
  process.exit(1);
}
const PRIVATE = /buteco|texas[-_ ]?food/i; // marcas de clientes não vão para o repositório público
let copied = 0, skipped = [];
for (const dir of ['scripts', 'references', 'assets']) {
  const from = path.join(src, dir);
  if (!fs.existsSync(from)) continue;
  const to = path.join(SKILL_SRC, dir);
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, {
    recursive: true,
    filter: (p) => {
      if (PRIVATE.test(path.relative(src, p))) { skipped.push(path.relative(src, p)); return false; }
      if (fs.statSync(p).isFile()) copied++;
      return true;
    },
  });
}
console.log(`Copiados ${copied} arquivos para ${SKILL_SRC}.`);
if (skipped.length) console.log(`Ficaram de fora (marca de cliente): ${skipped.join(', ')}`);
console.log('Revise references/series-profile.md antes de publicar: ele pode citar clientes.');

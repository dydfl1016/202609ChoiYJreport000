import {writeFile} from 'node:fs/promises';
import {renderReport} from '../engine/renderer.mjs';
import {loadEditorialReport} from '../engine/editorial.mjs';
const input=process.argv[2]||'reports/choi-yejun-2026-09.json';
const output=process.argv[3]||'index.html';
await writeFile(output,await renderReport(await loadEditorialReport(input)));
console.log(`Rendered ${output} from reviewed data ${input}`);

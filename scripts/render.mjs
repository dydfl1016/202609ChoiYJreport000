import {readFile,writeFile} from 'node:fs/promises';
import {renderReport} from '../engine/renderer.mjs';
const input=process.argv[2]||'reports/choi-yejun-2026-09.json';
const output=process.argv[3]||'index.html';
await writeFile(output,await renderReport(JSON.parse(await readFile(input,'utf8'))));
console.log(`Rendered ${output} from reviewed data ${input}`);

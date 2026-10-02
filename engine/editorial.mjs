import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateReport} from './renderer.mjs';
const digest=text=>createHash('sha256').update(text).digest('hex');
// Editorial decisions are written/reviewed by a person. This layer never summarizes or generates prose.
export function prepareDisplayReport(master,display,sourceReportText,sourceNarrativeText) {
 const editorial=display.editorial;
 if(display.displayCopyVersion!==1 || !editorial || !['prepared-for-review','reviewed'].includes(editorial.status))throw new Error('Invalid editorial contract/status');
 if(editorial.strategy!=='manual-editorial-selection')throw new Error('Unsupported editorial strategy');
 if(digest(sourceReportText)!==editorial.sourceReportSha256 || digest(sourceNarrativeText)!==editorial.sourceNarrativeSha256)throw new Error('Editorial source hash mismatch; review display copy against changed source');
 if(JSON.stringify(master)!==JSON.stringify(JSON.parse(sourceReportText)))throw new Error('Master/source mismatch');
 validateReport(master);
 for(const key of ['reportId','studentId','month'])if(display[key]!==master[key])throw new Error(`Editorial identity mismatch: ${key}`);
 if(editorial.sourceReportRevision!==master.reportRevision)throw new Error('Editorial source revision mismatch');
 if(display.reportRevision<=master.reportRevision)throw new Error('Display revision must advance from source');
 for(const key of ['student','evidence','classRecord','archiveReference'])if(key in display)throw new Error(`Display must inherit authoritative ${key}`);
 const sourceModules=new Set(master.modules.map(m=>m.id));
 for(const module of display.modules??[]){
  if(!module.editorialRole || !Array.isArray(module.masterModuleRefs)||!module.masterModuleRefs.length)throw new Error('Missing module editorial provenance');
  for(const ref of module.masterModuleRefs)if(!sourceModules.has(ref))throw new Error(`Unknown master module: ${ref}`);
  if(module.type==='editorial-learning'&&!['major','secondary'].includes(module.content?.emphasis))throw new Error('Invalid editorial emphasis');
 }
 for(const omitted of editorial.omittedSections??[])if(!sourceModules.has(omitted.masterModuleId)||!omitted.reason)throw new Error('Invalid editorial omission');
 // Copy only presentation content plus authoritative identities/facts. Master prose is never rendered implicitly.
 const result={reportId:master.reportId,studentId:master.studentId,month:master.month,
  contentSchemaVersion:display.contentSchemaVersion,reportRevision:display.reportRevision,
  inputStatus:'editorial-display-copy',student:structuredClone(master.student),
  classRecord:structuredClone(master.classRecord),archiveReference:structuredClone(master.archiveReference),
  evidence:structuredClone(master.evidence),heroStory:display.heroStory,
  teacherInterpretation:display.teacherInterpretation,nextStep:display.nextStep,
  modules:display.modules,grammarExamples:display.grammarExamples??[]};
 return validateReport(result);
}
export async function loadEditorialReport(input) {
 const display=JSON.parse(await readFile(input,'utf8'));
 if(display.displayCopyVersion===undefined)return display; // Legacy Golden Sample path remains unchanged.
 const root=fileURLToPath(new URL('../',import.meta.url));
 function sourcePath(path){
  if(typeof path!=='string'||!path)throw new Error('Missing editorial source path');
  const resolved=resolve(root,path);
  if(!resolved.startsWith(root.endsWith(sep)?root:root+sep)||resolved===resolve(input))throw new Error('Invalid editorial source path');
  return resolved;
 }
 const [masterText,narrativeText]=await Promise.all([
  readFile(sourcePath(display.editorial?.sourceReport),'utf8'),
  readFile(sourcePath(display.editorial?.sourceNarrative),'utf8')
 ]);
 return prepareDisplayReport(JSON.parse(masterText),display,masterText,narrativeText);
}

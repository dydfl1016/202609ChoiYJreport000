import {readFile} from 'node:fs/promises';
import {questions,options} from './feedback.mjs';
const moduleDirectory = new URL('./modules/',import.meta.url);
// Extension point: register a template and its data requirements, without changing composition.
export const moduleRegistry = Object.freeze(Object.fromEntries([
 'hero','overview','learning-continuum','reading-vocabulary','sentence-building',
 'learning-narrative','grammar-experience','teacher-interpretation','next-step','class-record','learning-archive','brand-ending'
].map(type => [type,{template:new URL(`${type}.html`,moduleDirectory)}])));
const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const get = (object,path) => path.split('.').reduce((v,k)=>v?.[k],object);
export function archiveUrl(data) {
 const url=data.archiveReference?.url || data.student?.defaultArchiveUrl;
 if (!url) return null;
 const parsed=new URL(url);
 if(parsed.protocol!=='https:' || parsed.hostname!=='drive.google.com' || !parsed.pathname.startsWith('/drive/folders/')) throw new Error('Invalid Archive URL');
 return url;
}
export function validateReport(data) {
 for(const key of ['reportId','studentId','month','contentSchemaVersion','reportRevision','student','heroStory','teacherInterpretation','nextStep','classRecord','archiveReference','evidence','modules'])
  if(data[key]===undefined) throw new Error(`Missing required data: ${key}`);
 for(const key of ['reportId','studentId']) if(typeof data[key]!=='string'||!data[key])throw new Error(`Invalid ${key}`);
 if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(data.month))throw new Error('Invalid month');
 if(data.contentSchemaVersion!==1 || !Number.isInteger(data.reportRevision)||data.reportRevision<1)throw new Error('Invalid version');
 if(!data.student.displayName || !data.student.grade)throw new Error('Missing student metadata');
 if(!Array.isArray(data.modules)||!Array.isArray(data.evidence))throw new Error('Invalid collections');
 const ids=new Set();
 for(const module of data.modules){
  if(!/^[a-z][a-z0-9-]*$/.test(module.id)||ids.has(module.id))throw new Error('Invalid/duplicate module ID');
  ids.add(module.id);
  if(!moduleRegistry[module.type]&&module.type!=='parent-feedback')throw new Error(`Unknown module: ${module.type}`);
  if(!module.content&&!module.contentRef)throw new Error('Missing module content');
  if(module.contentRef&&!data[module.contentRef])throw new Error('Missing content reference');
 }
 if(data.classRecord!==null)for(const key of ['scheduled','actual','additional']) { const value=data.classRecord[key];if(!Number.isInteger(value)||value<0)throw new Error(`Invalid class record: ${key}`); }
 const evidenceIds=new Set();
 for(const e of data.evidence){
  if(!e.evidenceId||evidenceIds.has(e.evidenceId))throw new Error('Invalid evidence ID');
  evidenceIds.add(e.evidenceId);
  if(!['FACT','OBSERVATION','INTERPRETATION'].includes(e.kind)||!e.sourceType||typeof e.observation!=='string')throw new Error('Invalid evidence');
  if(e.date!==null&&!/^\d{4}-\d{2}-\d{2}$/.test(e.date))throw new Error('Invalid evidence date');
  if(e.relatedMaterial===undefined)throw new Error('Missing relatedMaterial');
 }
 for(const module of data.modules)for(const ref of module.evidenceRefs??[])if(!evidenceIds.has(ref))throw new Error(`Unknown evidence reference: ${ref}`);
 archiveUrl(data);
 if(data.modules.some(m=>m.type==='grammar-experience')){
  if(!Array.isArray(data.grammarExamples)||data.grammarExamples.length<2)throw new Error('Missing grammar examples');
  for(const example of data.grammarExamples)for(const key of ['noun','tag','result'])if(typeof example[key]!=='string')throw new Error(`Missing grammar ${key}`);
 }
 return data;
}
function feedback(identity){
 return `<section class="report-section" aria-labelledby="feedback-heading"><div class="feedback-form-container"><span class="section-eyebrow">Parent Feedback</span><h2 id="feedback-heading" class="section-title">이번 학습보고서,<br>어떻게 읽으셨나요?</h2><p class="section-desc">보호자님의 짧은 의견은 더 읽기 쉽고 도움이 되는 학습보고서를 만드는 데 활용됩니다.</p><form data-feedback>${['reportId','studentId','month'].map(k=>`<input type="hidden" name="${k}" value="${escape(identity[k])}">`).join('')}${questions.map(({key,text},i)=>`<fieldset class="fb-group"><legend class="fb-label">${i+1}. ${text}</legend><div class="feedback-options">${options.map(([score,label])=>`<label class="choice-chip"><input type="radio" name="${key}" value="${score}" required><span class="chip-visual">${label}</span></label>`).join('')}</div></fieldset>`).join('')}<div class="fb-group"><label class="fb-label" for="feedback-comment">학습보고서에 대한 의견이 있으시면 남겨주세요.</label><textarea id="feedback-comment" name="comment" class="fb-textarea" placeholder="더 보고 싶은 내용이나 불편했던 점 등 자유롭게 적어주세요. (선택)"></textarea></div><p class="feedback-note">피드백 기능을 준비하고 있습니다. 입력하신 내용은 현재 서버로 전송되지 않습니다.</p><button type="submit" class="feedback-submit-btn" disabled><span>피드백 보내기</span><span aria-hidden="true">→</span></button><div class="fb-status-banner" role="status" aria-live="polite"></div><noscript><p class="feedback-note">피드백 양식은 JavaScript가 필요합니다. 보고서 본문은 그대로 읽으실 수 있습니다.</p></noscript></form></div></section>`;
}
function scopedIds(markup,prefix){
 const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 return markup.replace(/\b(id|aria-labelledby|aria-controls|for)="([^"]+)"/g,(_,attr,value)=>`${attr}="${value.split(' ').map(id=>ids.includes(id)?`${prefix}-${id}`:id).join(' ')}"`);
}
export async function renderReport(data){
 validateReport(data);
 const parts=[];
 for(const module of data.modules){
  let markup;
  if(module.type==='parent-feedback')markup=feedback(data);
  else{
   const template=await readFile(moduleRegistry[module.type].template,'utf8');
   const context={...data,module,content:module.contentRef?data[module.contentRef]:module.content,archiveUrl:archiveUrl(data)};
   if(module.type==='learning-archive'&&!context.archiveUrl){parts.push(`<section class="report-section"><p>학습 기록물을 준비하고 있습니다.</p></section>`);continue;}
   function interpolate(fragment,scope) {
    return fragment.replace(/\{\{(rich:)?([\w.]+)\}\}/g,(_,rich,path)=>{
     let value=get(scope,path);
     if(value===undefined||value===null)throw new Error(`Missing ${module.id}.${path}`);
     if(rich){
      if(!Array.isArray(value))throw new Error('Invalid rich text');
      return value.map(run=>{
       if(!['text','strong'].includes(run.type)||typeof run.text!=='string')throw new Error('Invalid rich text run');
       return run.type==='strong'?`<strong>${escape(run.text)}</strong>`:escape(run.text);
      }).join('');
     }
     value=String(value).replace(/\{\{classRecord\.(scheduled|actual|additional)\}\}/g,(_,field)=>data.classRecord[field]);
     return escape(value);
    });
   }
   function compose(fragment,scope){
    const opening=/\{\{#each ([\w.]+)\}\}/.exec(fragment);
    if(!opening)return interpolate(fragment,scope);
    const tokens=/\{\{#each [\w.]+\}\}|\{\{\/each\}\}/g;
    tokens.lastIndex=opening.index+opening[0].length;
    let depth=1,closing;
    for(let token;(token=tokens.exec(fragment));){depth+=token[0].startsWith('{{#')?1:-1;if(depth===0){closing=token;break;}}
    if(!closing)throw new Error('Unclosed template collection');
    const items=get(scope,opening[1]);if(!Array.isArray(items))throw new Error(`Missing collection ${opening[1]}`);
    const body=fragment.slice(opening.index+opening[0].length,closing.index);
    return interpolate(fragment.slice(0,opening.index),scope)+items.map(item=>compose(body,{...scope,item})).join('\n')+compose(fragment.slice(closing.index+closing[0].length),scope);
   }
   markup=compose(template,context);
  }
  parts.push(scopedIds(markup,module.id));
 }
 const css=await readFile(new URL('./report.css',import.meta.url),'utf8');
 const identity={reportId:data.reportId,studentId:data.studentId,month:data.month,grammarExamples:data.grammarExamples??[]};
 const feedbackSource=(await readFile(new URL('./feedback.mjs',import.meta.url),'utf8')).replace(/export /g,'');
 const interactionSource=(await readFile(new URL('./interactions.mjs',import.meta.url),'utf8')).replace(/^import[^\n]+\n/,'');
 const enhancementScript=(feedbackSource+'\n'+interactionSource).replace(/<\/script/gi,'<\\/script');
 const safeJSON=JSON.stringify(identity).replace(/</g,'\\u003c');
 return `<!DOCTYPE html>\n<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>LE ENGLISH ${escape(data.month)} Learning Report | ${escape(data.student.displayName)}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;family=Pretendard:wght@400;500;600;700&amp;display=swap" rel="stylesheet"><style>${css}</style></head><body><main class="report-shell">${parts.join('\n')}</main><script id="report-runtime-data" type="application/json">${safeJSON}</script><script type="module">${enhancementScript}</script></body></html>\n`;
}

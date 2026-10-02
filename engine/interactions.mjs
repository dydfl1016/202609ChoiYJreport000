import {createFeedbackPayload,submitFeedback} from './feedback.mjs';
const identity=JSON.parse(document.getElementById('report-runtime-data').textContent);
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
// Static body is the primary rendering. Interactions only enhance it.
for(const stage of document.querySelectorAll('.grammar-stage')){
 const buttons=[...stage.querySelectorAll('[data-grammar-example]')];
 for(const button of buttons)button.addEventListener('click',()=>{
  const example=identity.grammarExamples[Number(button.dataset.grammarExample)-1];
  if(!example)return;
  for(const b of buttons){const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));}
  stage.querySelector('.noun-box').textContent=example.noun;
  stage.querySelector('.tag-box').textContent=example.tag;
  stage.querySelector('.result-display-box').textContent=example.result;
 });
}
for(const form of document.querySelectorAll('[data-feedback]')){
 const button=form.querySelector('[type=submit]');button.disabled=false;
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const notice=form.querySelector('[role=status]');
  try{
   const values=Object.fromEntries(new FormData(form));
   const payload=createFeedbackPayload(identity,values);
   button.disabled=true;
   const result=await submitFeedback(payload);
   // This adapter returns unavailable, never a false success.
   notice.textContent=result.message;
  }catch(error){notice.textContent='피드백을 전송하지 못했습니다. 입력 내용은 유지됩니다.';}
  finally{button.disabled=false;notice.classList.add('visible');notice.scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'nearest'});}
 });
}

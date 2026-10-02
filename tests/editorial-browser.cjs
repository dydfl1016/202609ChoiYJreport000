// Optional QA dependency only; no production bundler or backend.
const {chromium}=require('playwright');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://**/*',r=>r.abort());
  await page.goto('file://'+path.resolve('student-a-2099-01.html'));
  for(const width of [360,390,412]){
   await page.setViewportSize({width,height:900});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);
   for(const selector of ['.archive-btn','.chip-visual']){
    const sizes=await page.locator(selector).evaluateAll(ns=>ns.map(n=>({w:n.getBoundingClientRect().width,h:n.getBoundingClientRect().height})));
    assert(sizes.every(s=>s.w>=44&&s.h>=(selector==='summary'||selector==='.chip-visual'?48:44)));
   }
   const zoom=await page.addStyleTag({content:'html{font-size:200%}body{font-size:32px}'});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`text zoom ${width}`);await zoom.evaluate(el=>el.remove());
  }
  await page.locator('input[name=readabilityScore][value="5"]').focus();await page.keyboard.press('ArrowRight');assert(await page.locator('input[name=readabilityScore][value="4"]').isChecked());
  await page.locator('input[name=growthClarityScore][value="5"]').check();await page.locator('input[name=explanationClarityScore][value="3"]').check();await page.locator('[data-feedback] button').click();assert((await page.locator('[role=status]').textContent()).includes('전송되지 않습니다'));assert.deepEqual(errors,[]);
  const fallback=await browser.newContext({javaScriptEnabled:false});const nojs=await fallback.newPage();await nojs.route('https://**/*',r=>r.abort());await nojs.goto('file://'+path.resolve('student-a-2099-01.html'));
  assert(await nojs.locator('h1').isVisible());assert(await nojs.getByText('Milk',{exact:true}).isVisible());assert.equal(await nojs.locator('.editorial-panel').count(),2);assert(await nojs.locator('[data-feedback] button').isDisabled());
  console.log('PASS: editorial 360/390/412, targets, disclosure keyboard/no-JS, radio, runtime, text zoom, reduced-motion mode');
 }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});

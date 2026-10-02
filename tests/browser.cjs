// Optional browser QA: requires an installed Playwright and Chromium, not production dependencies.
const {chromium}=require('playwright');
const {readFileSync}=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://**/*',route=>route.abort());
 await page.goto('file://'+path.resolve('index.html'));
 for(const width of [360,390,412]){
  await page.setViewportSize({width,height:900});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
  for(const locator of ['.g-tab-btn','.archive-btn','.chip-visual']){
   const sizes=await page.locator(locator).evaluateAll(nodes=>nodes.map(n=>({w:n.getBoundingClientRect().width,h:n.getBoundingClientRect().height})));
   assert(sizes.every(s=>s.w>=44&&s.h>=(locator==='.chip-visual'?48:44)));
  }
  await page.addStyleTag({content:'html { font-size:200%; } body { font-size:32px; }'});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`200% text overflow at ${width}`);
  await page.locator('style').last().evaluate(el=>el.remove());
 }
 const second=page.locator('[data-grammar-example="2"]');await second.focus();await page.keyboard.press('Enter');
 assert.equal(await second.getAttribute('aria-pressed'),'true');assert.equal(await page.locator('.result-display-box').textContent(),'a TV that has a big screen');
 const radio=page.locator('input[name=readabilityScore][value="5"]');await radio.focus();await page.keyboard.press('ArrowRight');assert(await page.locator('input[name=readabilityScore][value="4"]').isChecked());
 await page.locator('input[name=growthClarityScore][value="5"]').check();await page.locator('input[name=explanationClarityScore][value="3"]').check();
 await page.locator('[data-feedback] button').click();assert(await page.locator('.fb-status-banner').isVisible());assert((await page.locator('.fb-status-banner').textContent()).includes('전송되지 않습니다'));
 assert.deepEqual(errors,[]);await page.close();
 const context=await browser.newContext({javaScriptEnabled:false});const fallback=await context.newPage();await fallback.goto('file://'+path.resolve('index.html'));assert(await fallback.locator('h1').isVisible());assert(await fallback.locator('.teacher-card').isVisible());assert(await fallback.locator('[data-feedback] button').isDisabled());
 await browser.close();console.log('PASS: responsive sizes, 200% text, keyboard, runtime, demo submission, reduced-motion mode and JS-disabled content');
})().catch(error=>{console.error(error.message);process.exitCode=1;});

from pathlib import Path
from lxml import html
import subprocess,re,json,hashlib
# Reproduce the old full-source rendering without replacing any generated report file.
old_source=subprocess.run(['node','--input-type=module','-e',"import {readFile} from 'node:fs/promises';import {renderReport} from './engine/renderer.mjs';process.stdout.write(await renderReport(JSON.parse(await readFile('reports/kim-soyun-2026-09.json','utf8'))));"],capture_output=True,text=True,check=True).stdout
old=html.fromstring(old_source);new=html.fromstring(Path('kim-soyun-2026-09.html').read_text())
def text(node):return re.sub(r'\s+',' ',''.join(node.itertext())).strip()
def chars(root,initial=False):
 main=html.fromstring(html.tostring(root.xpath('//main')[0]))
 if initial:
  for details in main.xpath('.//details'):
   for child in list(details):
    if child.tag!='summary':details.remove(child)
 return len(re.sub(r'\s','',text(main)))
metrics={'before':chars(old),'allDetails':chars(new),'initial':chars(new,True)}
assert metrics['initial'] < metrics['before']*.55
ids=new.xpath('//@id');assert len(ids)==len(set(ids))
for el in new.xpath('//*[@aria-labelledby or @aria-controls or @for]'):
 for attr in ['aria-labelledby','aria-controls','for']:
  for ref in el.get(attr,'').split():assert ref in ids,ref
assert len(new.xpath('//h1'))==1
assert len(new.xpath('//details/summary'))==3
assert not new.xpath('//script[@src]')
assert html.tostring(old.xpath('//form[@data-feedback]')[0])==html.tostring(new.xpath('//form[@data-feedback]')[0])
assert old.xpath('//a/@href')==new.xpath('//a/@href')
for selector in ['//footer','//section[@aria-labelledby="class-record-record-heading"]','//section[@aria-label="학습 기록"]']:
 assert text(old.xpath(selector)[0])==text(new.xpath(selector)[0])
body=text(new.xpath('//main')[0])
for required in ['What We Make with Milk','3D Shapes','Amazing Animal Senses','My Neighborhood','How We Use Air','What Time Is It There?','Hello, Fish!',"Van Gogh's Paintings",'Flags, Flags','Day and Night',"It's sunny.",'My favorite sport is tennis.','I ride my bike.','I do my homework.','I practice the piano.',"It's on the chair.","It's under the desk.","It's in the toy box.",'have/has + P.P.','eat – ate – eaten','see – saw – seen','go – went – gone','take – took – taken','write – wrote – written','banana + that is yellow','a TV that has a big screen','Is it under the chair?']:
 assert required in body,required
assert '최예준' not in body
assert not re.search(r'\d+\s*점|\d+%|Lexile|ranking|radar',body)
print('PASS: concise copy, examples, native disclosure, IDs/ARIA, unchanged common components')
print(json.dumps(metrics))

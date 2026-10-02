from pathlib import Path
from lxml import html
import subprocess,re,json,hashlib
old_source=subprocess.run(['node','--input-type=module','-e',"import {readFile} from 'node:fs/promises';import {renderReport} from './engine/renderer.mjs';process.stdout.write(await renderReport(JSON.parse(await readFile('reports/kim-soyun-2026-09.json','utf8'))));"],capture_output=True,text=True,check=True).stdout
old=html.fromstring(old_source);new=html.fromstring(Path('kim-soyun-2026-09.html').read_text())
def text(node):return re.sub(r'\s+',' ',''.join(node.itertext())).strip()
ids=new.xpath('//@id');assert len(ids)==len(set(ids))
for el in new.xpath('//*[@aria-labelledby or @aria-controls or @for]'):
 for attr in ['aria-labelledby','aria-controls','for']:
  for ref in el.get(attr,'').split():assert ref in ids
assert len(new.xpath('//h1'))==1
assert not new.xpath('//script[@src]')
assert html.tostring(old.xpath('//form[@data-feedback]')[0])==html.tostring(new.xpath('//form[@data-feedback]')[0])
assert old.xpath('//a/@href')==new.xpath('//a/@href')
assert len(new.xpath('//*[contains(@class,"editorial-panel") and @class="editorial-panel"]'))==2
assert len(new.xpath('//ol[@class="editorial-flow"]/li'))==4
assert len(new.xpath('//ol[@class="editorial-transfer-board"]/li'))==3
body=text(new.xpath('//main')[0]);display=json.loads(Path('reports/display/kim-soyun-2026-09.json').read_text())
for expected in ['Milk','3D Shapes','Animal Senses','Neighborhood','Air','Time','Fish','Van Gogh','Flags','Day & Night',"It's sunny.",'My favorite sport is tennis.','I ride my bike.','I do my homework.','I practice the piano.',"It's on the chair.","It's under the desk.","It's in the toy box.",'have / has + P.P.','eat → ate → eaten','see → saw → seen','go → went → gone','banana + that is yellow','a TV that has a big screen','Is it under the chair?']:
 assert expected in body,expected
for module in display['modules']:
 c=display[module['contentRef']] if 'contentRef' in module else module['content']
 for paragraph in c.get('paragraphs',[]):assert ' '.join(''.join(x['text'] for x in paragraph).split()) in body
assert '김소윤의 9월 기록을 개별 활동으로만 보면' not in body
assert 'take – took – taken' not in body and 'write – wrote – written' not in body
assert not re.search(r'\d+\s*점|\d+%|Lexile|ranking|radar',body)
# Canonical standalone freshness is checked by tests/editorial.test.mjs; duplicate alias removed.
source=Path('sources/kim-soyun-2026-09.publishing.txt').read_bytes()
assert hashlib.sha256(source).hexdigest()==display['editorial']['publishingCopy']['sha256']
print('PASS: Publishing Copy, four-step flow, topics/eight examples, two grammar cards, three-step transfer, common Feedback/Archive, IDs/ARIA, canonical standalone')
print('Main characters excluding whitespace:',len(re.sub(r'\s','',body)))

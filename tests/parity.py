from lxml import html
from pathlib import Path
import re,json
old=html.fromstring(Path('golden/main.html').read_text());new=html.fromstring(Path('index.html').read_text())
def norm(node):return re.sub(r'\s+',' ',''.join(node.itertext())).strip()
a=[e for e in old.xpath('//main')[0] if isinstance(e.tag,str)]
b=[e for e in new.xpath('//main')[0] if isinstance(e.tag,str)]
assert len(a)==len(b)==12
for i,(x,y) in enumerate(zip(a,b)):
 if i==10:continue
 assert norm(x)==norm(y),(i,norm(x),norm(y))
assert old.xpath('//a/@href')==new.xpath('//a/@href')
ids=new.xpath('//@id');assert len(ids)==len(set(ids))
for node in new.iter():
 for attr in ['aria-labelledby','aria-controls','for']:
  for target in (node.get(attr) or '').split():assert target in ids,(attr,target)
for field in ['readabilityScore','growthClarityScore','explanationClarityScore']:
 assert new.xpath(f'//input[@name="{field}"]/@value')==['5','4','3','2','1']
assert not new.xpath('//*[@onclick or @onsubmit]')
assert '{{' not in ''.join(new.xpath('//main')[0].itertext())
reveal=re.search(r'\.reveal-item\s*\{([^}]+)',new.xpath('//style')[0].text).group(1)
assert 'opacity: 1;' in reveal and 'opacity: 0;' not in reveal
assert not new.xpath('//script[@src]')
print('PASS: all 11 preserved sections exact normalized text/order; Archive exact; unique IDs; aria/label targets; radio values; inline single-file output; no hidden-on-failure body')

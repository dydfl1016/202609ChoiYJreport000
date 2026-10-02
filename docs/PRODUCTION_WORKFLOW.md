# LE ENGLISH Monthly Report Production Workflow v1

2026-10-02 · Phase 4 · 공식 제작/검수 절차. 이 문서는 발행이나 배포 승인이 아니다.

**SYSTEMIZE THE REPORT. DO NOT STANDARDIZE THE CHILD.**

**MASTER NARRATIVE IS NOT DISPLAY COPY. PRESERVE THE EVIDENCE. EDIT THE EXPERIENCE.**

## 1. 공식 Pipeline과 책임

Daily Learning Journals → Reviewed Monthly Narrative → Publishing Copy → Structured Report Data / JSON → Module Composition → LE ENGLISH Report Engine → Standalone HTML → Human QA → Publish → Parent Feedback.

| 단계 | 책임 | 산출물 / 다음 단계로 넘기는 기준 |
|---|---|---|
| Daily Learning Journals | 교사가 기록, 도구는 기록 보조 | 날짜/활동/교재/어휘/문장/학생 반응/관찰/과제/프로젝트/발화/실제 결과물. 월간 문체로 다듬을 필요 없음 |
| Reviewed Monthly Narrative | 교사가 사실과 해석 검토, AI는 분석 보조 | 내부 Master: 한 달 Core Story, Evidence, Teacher Interpretation, Next Step의 근거와 불확실성. 길어도 됨 |
| Publishing Copy | 편집 담당이 압축, 교사가 사실/의미/화면 원고 승인 | 중복을 제거한 모바일용 문구와 사례, 학생별 선택/순서/강조. JSON의 primary content source |
| Structured JSON | Codex/제작 담당이 구조화 | 승인 문구를 필드/배열로 옮김. 독자적 요약, 문장 확장, 교사 해석 재집필 금지 |
| Module Composition | 교사/편집 담당이 선택, 제작 담당이 데이터에 반영 | 학생에게 필요한 modules[]와 순서. 승인 원고에 없는 영역을 빈 카드/0점으로 채우지 않음 |
| Engine | 코드의 책임 | 데이터 검증, 공통 디자인, escaping, 순서대로 렌더링. 교육적 Narrative 생성 없음 |
| Standalone HTML | 제작 담당 | 입력/출력 경로와 revision을 명시한 독립 파일, 자동 검증 결과와 preview 전달 |
| Human QA | 교사/발행 담당 | 아래 체크리스트와 실제 모바일 화면 검토. 승인 대상 파일/revision/hash 기록 |
| Publish | 권한 있는 발행 담당 | Human QA 뒤 별도의 명시적 발행 승인에 따라 결정된 채널로 발행. 이번 Phase에서는 실행하지 않음 |
| Parent Feedback | 학부모 응답, 운영 담당이 보고서 품질 검토 | 공통 report-quality 질문. 현재 adapter는 미연결이며 전송/저장되지 않음 |

원고 승인과 HTML 발행 승인은 별개다. JSON 생성/테스트 통과는 Human QA나 발행 승인을 대신하지 않는다.

## 2. 콘텐츠 층의 공식 경계

- **Raw Evidence**: 실제 기록. FACT(실제 수행/자료), OBSERVATION(관찰한 행동/반응), INTERPRETATION(교사의 의미 해석)을 구분한다. 교재 예문과 실제 학생 발화를 구분하며, 확인되지 않은 발화를 직접 인용으로 만들지 않는다.
- **Reviewed Monthly Narrative**: 원기록에서 발견한 학생 고유 성장 서사의 내부 Master. 사실, 사례, 근거와 판단의 한계를 충분히 보존한다. 화면에 그대로 출력하지 않는다.
- **Publishing Copy**: Master에서 사람이 편집/검토한 최종 표시 원고. 의미를 보존하고 중복을 없애며, 새로운 사실이나 점수를 추가하지 않는다. 제목/짧은 설명/예문/flow/highlight로 정보 위계를 정한다.
- **JSON**: 승인 Copy의 structured representation. 콘텐츠 저자가 아니다. 원고가 더 필요하면 작성자에게 되돌리고, Master 문단을 임의로 보충하지 않는다.
- **Engine**: presentation과 composition. 없음/미측정/미관찰을 채우는 생성 기능이 아니다.

장문 Master와 짧은 Copy를 각각 보존한다. Display Copy를 고쳤다고 Master를 덮어쓰지 않고, Master가 길다고 Display를 늘리지 않는다. 다른 학생의 콘텐츠를 복사해 이름만 바꾸지 않는다.

## 3. Publishing Copy Contract v1

이 계약은 사람에게 전달하는 **승인 원고 패키지**다. JSON 문법을 교사가 직접 작성할 필요는 없다. 각 정보가 제목/표/목록 등으로 구분되면 제작 담당이 기존 Data Contract로 변환한다.

| 항목 | 필요 조건 | 구조 / 규칙 |
|---|---|---|
| report metadata | 항상 | reportId, studentId, month(YYYY-MM), contentSchemaVersion, reportRevision |
| student metadata | 항상 | displayName, grade. 이름과 내부 studentId의 역할을 구분 |
| 원고 승인/출처 | 항상 | 승인된 Copy 파일/버전, Master/Evidence 참조, 승인 담당/날짜. 메신저 승인도 파일/revision을 특정 |
| Monthly Core Story | 항상 의미 확인 | 이번 달을 관통하는 변화. 내부 anchor로 둘 수 있으며 별도 화면 section은 강제하지 않음 |
| Hero | 선택한 경우 | title, subtitle, short body, optional visual flow. 자동 제목 생성 금지 |
| ordered modules | 항상 | 선택된 module의 id, 역할, 제목, 짧은 body, evidence/examples, 표시 순서 |
| Evidence/examples | 해당 기록이 있을 때 | 날짜/자료/실제 사례, source reference, FACT/OBSERVATION/INTERPRETATION; 발화/교재 예문 구별 |
| visual flow | 선택 | 승인된 단계별 label/example. 내용 추가용이 아니라 시각화용 |
| highlight/takeaway | 선택 | 그 section의 한 메시지. 앞 section의 설명 복제 금지 |
| Teacher Interpretation | 관련 section을 선택한 경우 | 교사가 승인한 판단과 한계. 활동 목록을 재서술하지 않음 |
| Next Step | 관련 section을 선택한 경우 | 이번 달 근거와 연결한 실행 방향, 선택적으로 구체적 전이 예시 |
| Class Record | 확인된 경우 | scheduled/actual/additional. 모르면 null과 module 생략; 0회로 추정하지 않음 |
| Archive reference | 사용하려는 경우 | 월별 URL 우선, 없으면 학생 기본 URL. Google Drive 폴더 권한도 사람이 확인 |

학습 영역은 optional이다. Writing/Speaking/Phonics 등의 점수와 section 수를 강제하지 않는다. 선택하지 않은 section은 modules[]에 넣지 않는다. 예문이 없으면 승인된 관찰/자료로 설명하며 사례를 만들지 않는다.

### 현재 코드로의 매핑

- `sources/*.reviewed.md`: 내부 Master. `sources/*publishing*`: 승인 Copy와 지시 보존.
- `reports/<reportId>.json`: 권위 있는 사실/metadata/Evidence의 Master snapshot. 현재 implementation은 기존 report shape를 사용한다.
- `reports/display/<reportId>.json`: 화면용 Copy와 composition. Publishing Copy가 **문구의 기준**, Master snapshot은 **사실 필드의 기준**이다.
- `editorial`: sourceReport/sourceNarrative 경로, 각 SHA256, sourceReportRevision, status/strategy. 현재 strategy는 manual-editorial-selection. publishingCopy path/hash/authority는 provenance metadata이며 runtime에서 자동 승인 검증을 하지 않는다.
- Display에는 identity/schema/revision, heroStory/teacherInterpretation/nextStep, modules[]가 들어간다. 학생 metadata, classRecord, archiveReference, evidence는 Master에서 상속한다. Display에서 덮어쓰지 않는다.
- Module: id/type, editorialRole, masterModuleRefs, optional evidenceRefs, content 또는 contentRef. modules[]의 배열 순서가 화면 순서다.
- `editorial-learning`: eyebrow/title/emphasis, paragraphs[], exampleGroups[], panels[], takeaways[], callouts[], details[]. 없는 collection은 `[]`. `editorial-hero`: title/subtitle/term/paragraphs[]/flow[]. `editorial-next-step`: eyebrow/title/paragraphs[]/transferFlow[]/supportingCopy/goal/closing.
- Teacher/Class Record/Archive/Feedback/Brand는 기존 공통 component를 사용한다. 자세한 필드는 [DATA_CONTRACT.md](DATA_CONTRACT.md)를 따른다.

**현재 제약:** root의 heroStory/teacherInterpretation/nextStep은 validator상 존재해야 한다. 해당 module을 생략하는 경우 사용하지 않는 객체는 `{}`로 두되 modules[]에는 넣지 않는다. 이는 빈 화면 카드 생성이 아니라 legacy interface의 형식적 요구다. template을 실제 선택했다면 그 template의 필드/배열은 채워야 한다. 개별 optional field를 완전히 자유롭게 생략하는 CMS식 schema는 아직 아니다.

## 4. Content Density Guide

| 영역 | 기본 editorial target |
|---|---|
| Hero | Title + Subtitle + 핵심 2–3문장 이내, optional flow |
| Overview | 3–5문장 이내 또는 compact summary. 역할이 겹치면 생략 가능 |
| Major module | 짧은 2–4문장 + 분리된 Evidence/examples |
| Secondary | 1–3문장 또는 작은 callout |
| Teacher | 3–5문장, 앞 활동 설명 반복 금지, 명확한 takeaway |
| Next Step | 2–4문장 + 가능한 경우 concrete transfer example |
| Class Record | 검증된 compact metrics |
| Archive | 짧은 설명/CTA |
| Feedback | 공통 component 그대로 |

기계적 글자 수 제한이 아니다. 목표는 모바일에서 약 2–4분에 핵심을 파악하는 정보 밀도이며, 실제 읽기 시간은 사람의 검토로 판단한다. 작은 폰트로 밀도를 숨기지 않는다. 설명은 짧게, 실제 예문/날짜/키워드/흐름은 별도 UI로 보여준다. 중요 정보는 첫 화면/기본 상태에, 상세 자료는 필요시 native disclosure에 둔다. 핵심 본문은 JavaScript 실패 시에도 보여야 한다.

## 5. 표준 Report Creation Procedure

1. **Approved Publishing Copy 입력**: Master/Evidence와 최종 Copy를 분리해서 받는다. 승인된 파일/버전/범위를 확인하고 변경 금지 영역을 기록한다.
2. **학생 metadata 확인**: reportId/studentId/month/displayName/grade를 확인한다. 누락/불일치는 작성자에게 확인하며 추정하지 않는다.
3. **Archive 확인**: 정확한 URL과 월별/기본 우선순위를 확인한다. tracking parameter를 추가하지 않는다. 공유 권한은 Human QA에서 열어본다.
4. **JSON 구조화**: 기존 사실 snapshot이 있으면 보존하고, 없으면 제공된 Master의 사실/metadata만 구조화한다. 승인 Copy는 Display JSON으로 옮긴다. 필수 source hashes/revision/provenance를 명시한다. 화면 원고를 Master의 긴 문장으로 보충하지 않는다.
5. **module 선택**: 승인된 역할과 기록에 필요한 module만 고른다. Phonics/Reading/Speaking 또는 Writing/Project 등 교육 영역은 기존 generic card로 표현 가능하지만, 전용 interactive module이 이미 있다는 뜻은 아니다.
6. **order 설정**: modules[]에 승인 순서를 담는다. 학생별 개수/순서/강조는 달라질 수 있다. 원하는 UI가 없으면 최소 variant 필요성을 보고하고 별도 구현 범위를 합의한다.
7. **standalone 생성**: 반드시 입력과 출력 두 경로를 명시한다. 기본 명령의 무인자 실행은 Choi/index 재생성이므로 신규 제작에 사용하지 않는다. 기존 학생/최초 산출물을 덮어쓰지 않고 새 revision 이름을 쓴다.
8. **자동 검증**: 아래 기존 regression tests와 이번 input/output의 재현성/identity/Evidence/Archive/HTML 참조 검증을 구분해 실행한다. 실패/미실행 항목은 그대로 기록한다.
9. **Human QA preview 제공**: 정확한 filename/reportId/revision을 함께 제공한다. standalone 다운로드를 기본으로 한다. URL이 필요하면 승인된 preview 수단만 사용한다. production 배포로 preview를 대체하지 않는다.
10. **STOP**: 사람이 체크리스트를 검토하고 대상 HTML의 발행을 명시적으로 승인하기 전 publish/merge/deploy/학부모 전송을 하지 않는다. 승인 Copy를 고치는 일은 콘텐츠 단계로 돌린다.

작업 전 실제 Git 상태/branch/PR 상태를 확인한다. main/Golden/기존 학생과 PR을 보호하고 작업 branch에서만 진행한다. 현재 PR #1/#2는 Feedback 변경이 겹치므로 나중에 병합 정책을 사람이 정해야 한다. 이 문서로 어떤 merge도 승인되지 않는다.

### 실행 명령 (다음 제작 요청에서 사용; Phase 4에서는 실행하지 않음)

repository root에서 Node.js를 사용한다. `<...>`는 승인 패키지의 실제 값으로 교체한다.

```bash
REPORT_INPUT='reports/display/<reportId>.json'
REPORT_OUTPUT='<reportId>-r<reportRevision>.html'
node scripts/render.mjs "$REPORT_INPUT" "$REPORT_OUTPUT"
```

새 output과 보호된 index/Golden/기존 report 파일이 다른지 먼저 확인한다. 출력 폴더를 지정한다면 미리 존재해야 한다.

기존 샘플/Engine regression:

```bash
node tests/engine.test.mjs
python tests/parity.py
node tests/second-student.test.mjs
node tests/editorial.test.mjs
python tests/editorial-static.py
```

Python tests에는 lxml이 필요하다. 이 tests는 **Golden / synthetic Student A 회귀 검증**이며 새 학생의 Copy 정확성을 보증하지 않는다.

새 report input/output 재현성은 파일을 덮어쓰지 않고 다음처럼 검사할 수 있다:

```bash
node --input-type=module - "$REPORT_INPUT" "$REPORT_OUTPUT" <<'JS'
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadEditorialReport} from './engine/editorial.mjs';
import {renderReport} from './engine/renderer.mjs';
const report=await loadEditorialReport(process.argv[2]);
assert.equal(await renderReport(report),await readFile(process.argv[3],'utf8'));
console.log('PASS: current report contract and generated output reproducibility');
JS
```

재현성 외에 승인 Copy와 화면 문구의 일치, Evidence refs, Archive URL, 중복 ID와 내부 aria/label 참조, inline JavaScript 구문, local asset 의존성을 확인한다. Publishing Copy hash는 현행 runtime에서 자동 검증하지 않으므로 원본 bytes의 SHA256과 기록값을 제작 담당이 비교한다. CRLF 등 개행도 원본 해시에 포함한다.

전용 browser tests `tests/browser.cjs` / `tests/editorial-browser.cjs`는 현재 샘플용이며 Playwright와 Chromium이 필요하다. 이 tests를 그대로 실행해 새 학생의 모바일 검증이 통과했다고 표현하지 않는다. 새 report 파일을 실제 브라우저에서 열고 아래 QA를 수행한다.

## 6. Human QA Checklist — report/revision마다 복사해 사용

대상 reportId / studentId / month: ____
Copy version / reportRevision: ____
생성 HTML filename / SHA256 / commit: ____
원고 승인자·날짜: ____
화면 QA 담당·날짜·browser/device: ____
결과: 미확인 / 수정 필요 / QA 완료
발행 승인: 미승인 / 명시 승인 (담당·날짜·대상): ____

### 사실과 학생 고유성

- [ ] 학생 이름 정확
- [ ] 학년 정확
- [ ] 보고 월 정확
- [ ] Hero가 이번 달 학생의 실제 변화와 일치
- [ ] 다른 학생 Narrative/이름/사례가 섞이지 않음
- [ ] 실제 Evidence와 일치하며 교재 예문과 학생 발화를 구분
- [ ] 기록에 없는 사실이나 과장된 성장 주장 없음
- [ ] 임의의 점수 없음
- [ ] 임의의 퍼센트 없음
- [ ] 미측정 학습 능력 평가·Lexile·ranking 없음

### 편집과 정보 설계

- [ ] 승인 Publishing Copy와 화면 문구 일치 (의도된 줄바꿈/UI 분리 제외)
- [ ] 동일 의미의 반복 설명 없음
- [ ] 장문 에세이처럼 보이지 않음
- [ ] section마다 고유 역할이 명확
- [ ] Evidence/examples가 본문에 묻히지 않고 scan 가능
- [ ] Teacher Interpretation이 활동 목록 반복이 아님
- [ ] Next Step이 이번 달 학습 근거에서 자연스럽게 연결됨
- [ ] 약 2–4분에 학습·변화·실례·교사 판단·다음 방향을 파악할 수 있는 밀도

### 기록과 공통 컴포넌트

- [ ] Class Record 정확 (미확인값을 0으로 대체하지 않음)
- [ ] Learning Archive URL 정확, tracking parameter 없음
- [ ] Archive를 실제로 열 수 있고 공유 권한이 의도와 일치
- [ ] Parent Feedback 공통 3문항/5단계/선택 comment 정상
- [ ] 미연결 상태에서 저장 완료라고 표시하지 않음
- [ ] LE ENGLISH 브랜드 일관성 유지 (navy/blue/white, teal, 640px 읽기 폭, 카드/여백/위계)

### 실제 브라우저와 접근성

- [ ] 360px mobile 확인
- [ ] 390px mobile 확인
- [ ] 412px mobile 확인
- [ ] horizontal overflow 없음
- [ ] title wrapping 자연스러움
- [ ] 영어 examples와 chips가 잘리지 않고 자연스럽게 wrap
- [ ] 본문 16px 이상을 기본으로 하며 주요 label도 읽기 쉬움
- [ ] 주요 touch target 44×44px 이상, Feedback 48px 이상 확인
- [ ] 카드 padding/section spacing/긴 화면의 visual rhythm 적절
- [ ] keyboard Tab/arrow/Space, visible focus, radio/disclosure 조작 정상
- [ ] heading/label/aria/native state와 screen reader 읽기 순서 적절
- [ ] external link의 새 창 안내/rel 적절
- [ ] 200% text zoom에서 내용이 손실되지 않음
- [ ] prefers-reduced-motion에서 불필요한 motion 중단
- [ ] JavaScript를 끄고도 핵심 본문 표시

미실행 항목에는 체크하지 않는다. 수정 후 영향 범위의 자동 검증과 Human QA를 다시 한다. QA 기록은 승인 대상 파일과 예외 이유를 명시하며, 미해결 사실/표시 문제는 발행 전에 해소한다. 테스트의 기계적 통과가 발행 승인은 아니다.

## 7. Common과 Student-specific

| 공통 | 학생별 |
|---|---|
| design tokens/typography/spacing/responsive/accessibility | metadata/grade/month |
| Renderer/escaping/composition/validation | Hero/Core Story/Publishing Copy |
| generic card/chips/panels/flow/disclosure | 선택 modules/order/emphasis |
| Class Record UI | 확인된 수업 횟수 |
| Archive component/resolver | 학생/월별 Archive reference |
| Feedback 질문/scale/schema/adapter | reportId/studentId/month |
| Brand Ending component | 월/revision에 따른 report 식별 |
| 공통 검증 절차 | 개별 Evidence/examples/Teacher Interpretation/Next Step |

학생별 renderer/CSS 복제나 `if student === ...` 분기를 만들지 않는다. 레이아웃 재사용과 교육 콘텐츠 동일화를 혼동하지 않는다.

## 8. Versioning

- contentSchemaVersion: 현재 1. 호환성을 바꾸는 데이터 구조 변경 때만 검토하며, 월이 바뀐다고 늘리지 않는다.
- displayCopyVersion: 현행 Editorial contract 식별 1. reportRevision과 별개다.
- reportId: 한 학생/한 달의 안정적 식별자. 보통 studentId + month. revision 수정만으로 다른 학생 report가 되지 않는다.
- studentId: 표시 이름과 분리한 안정 ID.
- month: YYYY-MM.
- reportRevision: 동일 report의 수정 때 증가. 이전 파일/commit/승인 기록을 보존하고 최신 산출물을 명확히 표시한다.
- sourceReportRevision/hashes: 어떤 Master를 근거로 사용했는지 추적. 근거가 바뀌면 Display도 재검토하며, hash만 바꿔 승인 상태를 유지하지 않는다.

현행 Editorial Layer는 display.reportRevision > Master.reportRevision을 요구한다. 따라서 Master revision 1에 대한 첫 Display가 2일 수 있다. 이 기술 제약 때문에 첫 발행/수정 발행 여부는 QA/발행 기록에도 구분한다. 자동 채번·이력 DB·CMS는 추가하지 않는다.

## 9. 현재 Engine 감사와 한계

역사적 Phase 4 확인 범위: 당시 승인 원고 → Display JSON → modules[] → prepareDisplayReport → renderReport의 실제 경로가 있다. 신규 학생을 만들지 않고 기존 자동 테스트와 in-memory 재생성 비교로 검증했다. standalone HTML은 inline CSS/JS와 정적 본문을 가지며 local asset 의존성이 없다. 사실·의미·화면의 사람 검토는 여전히 필요하다.

Architecture weakness:

1. 새 Publishing Copy만 받는 one-file input은 아니다. metadata/Evidence, 내부 Master snapshot과 hash가 필요하다. 표준 절차에서 이 입력 패키지를 준비한다.
2. Master snapshot도 기존 report-shaped validator를 쓰며 masterModuleRefs가 source module ID에 연결된다. 중립적인 source block 모델은 향후 검토 사항이다.
3. template slot/required collection에 의존한다. 사용하지 않는 module은 생략할 수 있지만 모든 field가 자유롭게 optional인 구조는 아니다.
4. editorial.status는 승인 증명의 인증이 아니다. prepared 상태도 preview 렌더링이 가능하다. Human QA와 명시 발행 승인 게이트를 운영에서 분리한다.
5. Publishing Copy hash는 기록되지만 runtime 자동 대조는 없다. 제작 시 확인과 현재 샘플 테스트의 책임이다. 자동 의미 검증도 없다.
6. grammar-experience 전용 template은 관계대명사 상호작용/global grammarExamples에 의존한다. 다른 영역은 generic presentation으로 표현할 수 있으나 미구현 전용 interaction이 있다고 주장하지 않는다.
7. 모든 신규 report를 검증하는 범용 browser/HTML QA script는 없다. 기존 테스트 일부는 최예준/Student A에 특화되어 신규 report 자체 검증이 필요하다.
8. 현행 CLI 무인자 default는 Choi → index다. 이번에는 명시적 경로를 운영 규칙으로 정하고 CLI/core는 바꾸지 않는다.

Phase 4에서 이를 대규모 코드 수정으로 해결하지 않고 보고한다. 개선 필요성은 실제 여러 학생의 운영 경험으로 판단한다.

## 10. Phase 4 검증과 다음 결정

변경 대상은 README, DATA_CONTRACT, 이 Workflow 문서뿐이다. 기존 Engine/scripts/tests/source/data/Golden/standalone 38개 파일 SHA256을 전후 비교해 비변경을 확인했다. Engine/Golden/second-student/editorial/static tests와 두 학생의 in-memory 재생성 결과가 기존 HTML과 일치하는지 검증했다.

브라우저 부재로 기존에 미확인인 360/390/412px, keyboard, zoom, screen reader 등을 이번에 통과로 바꾸지 않았다. production-ready 자동 판정은 하지 않는다.

아직 자동화하지 않은 영역: journal ingestion, 월간 Narrative, Publishing Copy 생성, 교육적 판단, Human QA, 발행 승인/배포/학부모 전송, Feedback 수집/집계, 능력 scoring. Dashboard/CMS/auth/database/backend는 추가하지 않는다.

다음 제작/발행 전 사람이 결정할 사항:

1. Copy 승인자와 HTML QA/발행 승인자. 같은 사람이 맡아도 역할은 구분한다.
2. 다음 학생의 승인 Copy + metadata/Evidence 입력 패키지와 QA 일정. Phase 4에서는 만들지 않는다.
3. 실제 device/browser 확인 환경과 미해결 검증 항목의 해소 방법.
4. 첫 발행/수정 발행의 revision 표시, 파일명, 정정 통지 운영.
5. 학생 정보와 내부 Master의 repository 공개 범위, Archive 공유 대상, 최종 전달 채널.
6. PR #1/#2와 validation branch의 차이 정리/통합 정책. 지금은 모두 미병합 상태 유지.
7. 구체적인 발행 승인 시점. Feedback backend/저장소/집계는 아직 결정하지 않는다.

Workflow 확정은 Publish를 시작하는 지시가 아니다. Phase 4 완료 뒤 STOP하고 다음 구체적 제작/발행 지시를 기다린다.

## Phase 5C public fixture policy

Current Student A inputs are labelled synthetic fixtures, not actual student monthly narratives or production approvals. Real reviewed sources and Publishing Copy are production inputs and must not become reusable public test fixtures. Golden Sample currently remains a documented privacy exception pending a separate baseline migration decision. Previous branches/commits are unchanged; current-tree cleanup does not erase historical exposure.

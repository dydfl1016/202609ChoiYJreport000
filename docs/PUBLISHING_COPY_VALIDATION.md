# PHASE 3.2 — 김소윤 Publishing Copy 검증

## A. 산출물

- 최신 출력: `kim-soyun-2026-09.html`
- 새 파일명: `kim-soyun-2026-09-publishing-v3.html` — 이전 다운로드와 혼동을 피하는 동일 내용의 standalone HTML
- Display Data: `reports/display/kim-soyun-2026-09.json`, reportRevision 3
- 최종 발행 원고/지시 보존: `sources/kim-soyun-2026-09.publishing.txt` (사용자 첨부 원본 바이트 그대로)
- 생성: `node scripts/render.mjs reports/display/kim-soyun-2026-09.json kim-soyun-2026-09-publishing-v3.html`

사용자가 제공한 Final Publishing Copy가 화면의 기준이다. 기존 Master JSON과 Reviewed Narrative는 변경하지 않았다. 원고를 늘리거나 삭제된 장문을 복원하지 않았다. Publishing 입력의 출처와 SHA256은 editorial metadata에 기록하고 테스트에서 확인한다. 기존 runtime editorial layer의 Master 해시 검증은 그대로 유지한다.

## B. 실제 모듈 순서

Hero → Monthly Overview → Reading & Translation → Sentence Building → Speaking Transfer → Grammar Experience → Teacher Interpretation → October Next Step → Class Record → Learning Archive → Parent Feedback → Brand Ending.

Hero는 4단계 READ → UNDERSTAND → BUILD → SPEAK. Overview는 제공된 짧은 본문/Highlight로 복원했다. Grammar는 보조 크기로 배치하고 Phonics는 Reading 안의 callout으로 유지한다.

## C. 재사용

Renderer와 composition/escaping, Editorial Layer, 공통 brand tokens/CSS, Teacher Interpretation, Class Record, Archive resolver/component, Feedback 질문/scale/payload/미연결 adapter, Brand Ending, 공통 interactions를 그대로 사용했다. Archive/출석/footer의 copy는 첨부 Publishing Copy에 맞췄으며 공통 component 자체는 복제하지 않았다.

## D. Generic presentation 개선

기존 editorial-learning template에 `panels[]`와 `takeaways[]`를 추가했다. Grammar 두 카드는 동일한 panel 구조로 렌더링한다. 기존 exampleGroups로 Reading 주제/표현 칩과 문장 예문 보드를 만든다. Next Step은 데이터 기반 `transferFlow[]`, supportingCopy, goal, closing을 표시한다. Hero의 term은 데이터에서 주입하고 title/subtitle의 의도된 줄바꿈을 지원한다.

모두 editorial 범위의 공통 template/CSS이며 김소윤 전용 CSS나 학생 이름 분기는 없다. 다른 학생도 다른 panel/flow/example 데이터로 사용할 수 있다. 자동 요약이나 AI 편집 기능은 추가하지 않았다.

## E. 제거된 장문/중복

장문 Core Story, 교재 제목을 묶은 긴 문단, 모듈마다 반복한 성장 의미 설명, 기존 장문 Teacher Interpretation 및 October 교육 해설을 화면에 복원하지 않았다. 이번 입력의 짧은 원고를 그대로 사용했다. 이전 3.1에서 빠진 Overview는 사용자 지시에 따라 다시 넣었다. Master에만 있는 take/write 동사 변화, 원서 세부 설명 등은 최종 원고에 없으므로 화면에 추가하지 않았다. Master 원문과 Evidence는 그대로 보존한다.

## F. Mobile / validation

실행 및 통과:

- 기존 Engine tests, Golden parity, historical second-student test.
- Editorial tests: 원본 비변경, source hash/revision/identity, fact override 금지, evidence 참조, escaping, 순서 변경, generated output 일치.
- Publishing static checks: 제공된 본문 문장과 예문, 4단계 Hero, Reading 칩, 문장 예문 8개, Grammar 카드 2개, 전이 흐름 3단계, Archive URL, 동일 공통 Feedback form, 중복 ID/ARIA 참조, standalone 파일 일치.
- Publishing source SHA256 및 보호 대상 파일 SHA256 확인.
- JavaScript 구문 검사.

본문/공통 section을 포함한 공백 제외 main text는 2,418자이다. 이전 3.1보다 늘어난 이유는 사용자가 승인한 Overview와 전체 예문/전이 UI를 모두 표시하기 때문이다. 글자 수를 강제로 줄이려고 최종 원고를 재편집하지 않았다. 2–4분 읽기 시간은 측정하지 않았다.

360/390/412px에서는 공통 wrapping, 2열 Hero flow, 한 열 Grammar panel, 16px body/example, 충분한 card padding 및 공통 48px Feedback target 규칙을 사용한다. 핵심 본문은 정적 HTML이며 JavaScript 없이도 데이터가 존재한다. 공통 reduced-motion과 focus rules는 유지한다.

실제 Playwright browser test를 시도했으나 Chromium 실행 파일이 없어 시작하지 못했다. 실제 viewport overflow, title/chip wrapping, visual rhythm, touch target 실측, keyboard/focus, 200% text zoom, screen reader, JS-disabled 화면 및 reduced-motion 렌더링은 **미검증**이다. CSS/HTML 구조 점검을 실제 화면 검증 통과로 표현하지 않는다. lxml 점검은 전체 HTML conformance validation이 아니다.

실제 브라우저 확인: 새 `publishing-v3.html`을 다운로드하여 Chrome/Edge/Safari에서 열고, 개발자 도구에서 360/390/412px을 확인한다. 공개 preview 배포는 하지 않았다.

## G. Golden Sample 영향

최예준 JSON, `index.html`, Golden HTML, 공통 report.css/Feedback/interactions를 변경하지 않았다. 최신 코드로 최예준을 다시 렌더링해도 기존 index와 바이트 단위로 동일하다. PR #1/#2와 main은 보존한다.

## H. Architecture

기존 Master → Editorial Display → Composition → Renderer 경계를 유지했다. Core renderer와 Editorial Layer 로직은 수정하지 않았다. 바뀐 것은 Display Copy, 기존 generic presentation template/CSS의 표현 슬롯, 관련 검증/문서이다.

**MASTER NARRATIVE IS NOT DISPLAY COPY.**

Reviewed Narrative는 사실과 해석을 보존하는 내부 Master다. 사람이 검토한 Publishing Copy는 학부모에게 보여줄 입력이다. 이번 원고가 앞선 장문보다 짧다고 해서 Master를 삭제하지 않고, Master가 더 자세하다고 해서 발행 화면을 늘리지 않는다.

기존 검증 브랜치 `feat/report-editorial-layer`에서만 작업했다. main 수정, PR merge, production deploy, 다른 학생 migration은 하지 않았다. 산출물 전달 후 STOP.

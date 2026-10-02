# LE ENGLISH Monthly Report Engine v1

SYSTEMIZE THE REPORT. DO NOT STANDARDIZE THE CHILD.

현재는 최예준 Golden Sample과 김소윤 Publishing Copy 검증을 보존한 Engine v1입니다. 신규 보고서의 화면 문구는 **승인된 Publishing Copy**에서 가져오며, Reviewed Monthly Narrative는 사실 확인용 Master로 분리합니다. Journal ingestion, 자동 원고 생성, scoring, backend, authentication, dashboard는 구현하지 않았습니다.

## Quick Start — 새 학생 월간보고서 만들기

1. 교사가 승인한 **짧은 Publishing Copy**와 사실 확인용 Master/Evidence, 학생 이름·학년·보고 월·Archive URL을 준비합니다.
2. 승인 문구를 다시 집필하지 않고 사실 snapshot과 `reports/display/<reportId>.json`으로 구조화합니다. 학생에게 필요한 module만 선택하고 `modules[]` 순서를 정합니다.
3. 새 revision 파일명으로 생성합니다. 아래 `<...>`를 실제 값으로 교체하고 입력/출력 **두 경로를 모두 명시**합니다.

   ```bash
   node scripts/render.mjs reports/display/<reportId>.json <reportId>-r<reportRevision>.html
   ```

4. Engine 회귀 검증과 신규 report 자체 검증을 실행하고, standalone HTML을 내려받아 실제 360/390/412px·키보드·접근성을 사람이 확인합니다.
5. 원고 승인과 발행 승인은 별개입니다. Human QA 결과와 대상 revision을 전달한 뒤 **명시적 발행 승인 전 STOP**합니다.

전체 입력 계약·역할·명령·검수 체크리스트는 [Production Workflow v1](docs/PRODUCTION_WORKFLOW.md)을 따릅니다. Node는 생성에 필요하고 standalone HTML은 브라우저에서 바로 열 수 있습니다. Python 검증은 lxml, 선택적 browser tests는 Playwright/Chromium이 필요합니다. 기존 샘플 tests가 새 학생 검증을 대신하지 않습니다. 무인자 render 명령은 Choi/index용이므로 신규 제작에 사용하지 않습니다.

## Minimal structure

| Path | Purpose |
| --- | --- |
| `index.html` | Generated, standalone parent report; static body, inline CSS and enhancement JS |
| `reports/choi-yejun-2026-09.json` | Reviewed content and metadata, no raw HTML |
| `engine/renderer.mjs` | Validation, module registry, safe interpolation and ordered composition |
| `engine/modules/*.html` | Reusable layouts, no student-specific prose |
| `engine/report.css` | Original design tokens and styles plus documented accessibility improvements |
| `engine/interactions.mjs` | Scoped grammar buttons and Feedback enhancement |
| `engine/feedback.mjs` | Common questions, payload and replaceable unavailable submission adapter |
| `scripts/render.mjs` | Optional dependency-free Node regeneration command |
| `golden/main.html` | Frozen, unchanged original main report |
| `tests/` | Contract, parity and optional browser checks |
| `docs/` | Freeze record, data contract and verification limits |

No npm manifest, framework, bundler or deployment pipeline is required. Node is needed only when regenerating the report. The generated HTML can be copied on its own; it has no local asset dependencies. External fonts remain optional and have system fallbacks. Nothing was deployed.

## Regeneration

Run `node scripts/render.mjs`. An alternate reviewed JSON/output filename can be passed as its two arguments. Do not edit generated `index.html` by hand. The renderer does not generate or summarize prose.

## Verification

Run `node tests/engine.test.mjs` and `python tests/parity.py` (the latter uses lxml). Optional `node tests/browser.cjs` requires Playwright and its Chromium executable in the test environment, not in production.

Module array order controls display order. Omitting a module creates no placeholder. Arrays support different paragraph, word, pattern, example and continuum-step counts. Repeated module IDs must be unique. Add a future layout and its registry entry to support a new module; no composer rewrite is necessary.

PR #1 remains untouched and unmerged. This separate branch implements the approved feedback direction as an Engine component. Engine v1 functionally supersedes PR #1. PR #2 is the Phase 2 snapshot and lacks the four later validation/editorial/workflow commits. Both existing Draft PRs remain unchanged; the consolidation Draft PR is the current review candidate, with merge/deploy not approved.

### 김소윤 최종 Publishing Copy (Phase 3.2)

Download/open `kim-soyun-2026-09.html`, the single canonical validation standalone for Publishing Copy revision 3. The identical `kim-soyun-2026-09-publishing-v3.html` alias was removed during consolidation. This is a validation artifact, not an approved production publication. Generate from `reports/display/kim-soyun-2026-09.json`, not the long Master JSON. See `docs/PUBLISHING_COPY_VALIDATION.md` for scope and browser QA limitations. No production deployment.

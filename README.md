# LE ENGLISH Monthly Report Engine v1

SYSTEMIZE THE REPORT. DO NOT STANDARDIZE THE CHILD.

Phase 2 implements only the Choi Yejun September 2026 golden sample. Input is a human-reviewed monthly narrative, evidence and student metadata. No journal ingestion, narrative generation, scoring, backend, authentication or dashboard is implemented.

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

PR #1 remains untouched and unmerged. This separate branch implements the approved feedback direction as an Engine component. The overlapping Feedback changes must be reconciled during a later review; do not blindly merge both PRs.

### 김소윤 최종 Publishing Copy (Phase 3.2)

Download/open `kim-soyun-2026-09-publishing-v3.html` for the latest publishing revision. It is identical to the updated `kim-soyun-2026-09.html`; the distinct filename prevents confusion with old downloads. Generate from `reports/display/kim-soyun-2026-09.json`, not the long Master JSON. See `docs/PUBLISHING_COPY_VALIDATION.md` for scope and browser QA limitations. No production deployment.

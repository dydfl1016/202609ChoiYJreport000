# Phase 2 validation

> Historical validation record — Phase 2 at `16c0e9d`. This records checks at that phase, not final browser/mobile approval. See `PRODUCTION_WORKFLOW.md` for the current procedure. Browser/mobile/accessibility Human QA remains pending.

## Passed

- Golden parity: all 11 non-Feedback sections preserve normalized exact text and original order. Hero, vocabulary, sentence examples, grammar examples, interpretation, October plan, class counts, Archive URL and footer are preserved.
- Structure: 12 golden-sample regions; no generated missing modules; composition reorder, omission and repetition tests.
- Variable content: different paragraph, vocabulary, pattern/example and continuum-step counts render without fixed student content cardinalities.
- Data contract: required identity/version checks, invalid month, duplicate module IDs, unknown types, absent values and invalid evidence rejection.
- Archive: report override, student fallback, missing-link state and unsafe URL rejection. Original URL unchanged. Real Drive access permissions were not checked.
- Feedback: three shared five-point questions, exact payload keys, numeric range checks, empty-answer rejection and unavailable adapter. No successful-save claim or persistence.
- Security/structure: escaped injected text, unique DOM IDs, resolved aria-controls/aria-labelledby/label-for references, no inline event-handler attributes.
- HTML: lxml parsing reported no diagnostics. This is a parser/structure check, not a full standards conformance certificate.
- JavaScript: Node syntax checks and renderer/contract tests passed. Generated output matches source regeneration.
- Progressive enhancement: report text is statically present; reveal CSS starts visible. Submit is disabled until enhancement binds, preventing an unintended default form submission when JavaScript is unavailable.

## Intentional differences from main

Report-quality Feedback replaces the old student-evaluation questions. Grammar example switching uses native buttons with aria-pressed/aria-controls and polite result updates. Minimum text/touch sizes, visible focus, wrap-safe rows and reduced-motion handling are added. Fade-up and count-up are omitted in v1: all numeric evidence remains visible and final. Palette, 640px column, original cards and overall spacing are retained.

## Not executed / not claimed as passed

Actual 360 / 390 / 412px rendering, screenshot/visual parity, 200% text enlargement, keyboard and screen-reader operation, no-JS visual behavior, computed touch sizes, browser runtime and contrast measurement are pending. The Playwright package is present, but Chromium is absent; attempted Headless Shell downloads returned corrupt/empty ZIP archives and installation failed. tests/browser.cjs was attempted and failed before browser launch. No viewport result was obtained.

CSS specifies Feedback 48px targets and grammar buttons 44px targets, but computed geometry is unverified. Keyboard semantics are implemented, not browser-tested. Full HTML conformance and actual font rendering are also unverified.

No production deploy or merge. Before a later release, run browser QA, inspect actual typography and compare golden screenshots, then verify Drive access for the intended parent.

## Historical consolidation preparation — Phase 5B

Base: `feat/report-editorial-layer@f37d329`; review branch: `release/monthly-report-engine-v1`. Existing history is inherited without cherry-picking or rewriting. At Phase 5B the original second-student canonical HTML remained and its identical alias was removed. Phase 5C now replaces that canonical with a synthetic sample. No Engine Core, Data Contract, Golden Sample, student JSON, Master Source or canonical report content was changed.

Re-run on 2026-10-02: `node tests/engine.test.mjs`, `python tests/parity.py`, `node tests/second-student.test.mjs`, `node tests/editorial.test.mjs`, `python tests/editorial-static.py` all passed. The alias equality assertion was removed; canonical renderer-to-file equality remains tested by `editorial.test.mjs`.

Both `node tests/browser.cjs` and `node tests/editorial-browser.cjs` were retried and failed before launch because the Chromium Headless Shell executable is absent. **Browser validation unavailable**; no viewport pass is claimed. Human QA remains pending: 360/390/412px, wrapping/overflow, computed touch targets, 200% text zoom, keyboard/focus, screen reader, contrast, visual parity, grammar/runtime, no-JS/reduced-motion rendering, and actual parent Drive access.

Pages: repository metadata confirms Pages enabled. A successful GitHub-managed `pages build and deployment` run has event `dynamic`, path `dynamic/pages/pages-build-deployment`, and branch `main@f380a13`. The latest source tree contains no tracked `.github` workflow. The connector rejected the `/pages` settings GET as unsupported, so configured source branch/path (`/` or `/docs`), build type and future automatic deployment trigger are not confirmed. Do not interpret that connector limitation as a repository permission failure. No deployment setting was changed. Treat main integration as potentially publishing until the settings are verified.

Privacy policy remains undecided: real validation fixtures are preserved for approval. The consolidation Draft PR compares keeping actual fixtures with anonymized public fixtures; neither policy has been silently selected. Existing PR #1/#2 remain Open/Draft and untouched. Merge, deployment, auto-merge and Ready for Review are not approved.

## Privacy-safe fixture replacement — Phase 5C

Scope: current `release/monthly-report-engine-v1` tree / Draft PR #3 only. Actual second-student name/ID, private Drive folder, dated lesson observations, internal teacher interpretation, long Reviewed Narrative and original Publishing Copy/prompts were found across JSON/source/HTML/docs. These actual second-student files are removed from candidate HEAD and replaced by Student A synthetic fixtures at `reports/student-a-2099-01.json`, `reports/display/student-a-2099-01.json`, `sources/student-a-2099-01.reviewed.md`, `sources/student-a-2099-01.publishing.txt`, `student-a-2099-01.html`.

TEST FIXTURE / NOT A REAL STUDENT REPORT is visible in sources and HTML. Fictional month 2099-01 and grade TEST LEVEL avoid real metadata. Counts 4/5/1 are synthetic. Twelve evidence records have null dates and SYNTHETIC_TEST_FIXTURE sourceType, with FACT / OBSERVATION / INTERPRETATION coverage. All prose is synthetic, not merely name-replaced private narrative. Generic English examples remain instructional samples, not real student utterances. Archive URL is null; common missing-archive placeholder is rendered. No archive resolver or Engine Core changes.

Preserved coverage: distinct second-student composition, source/display separation, ordering/reordering/omission, four-step Hero flow, eight sentence examples, two grammar panels, three-step transfer board, compact phonics callout, source hashes/provenance/fact guards, injection escaping, common Feedback and Golden parity. Synthetic Master snapshot rendering hash was explicitly regenerated; canonical display equality remains tested. Existing Archive override/fallback/unsafe URL tests remain.

Automated tests re-run and passed on 2026-10-02: engine.test.mjs, parity.py, second-student.test.mjs, editorial.test.mjs, editorial-static.py. Browser/mobile/accessibility status remains unavailable/pending, not passed.

Golden privacy exception: golden/main.html, reports/choi-yejun-2026-09.json, index.html still expose the original displayName/grade/month, learning examples/interpretation, identifier and real Drive folder. Both HTMLs contain one Drive link. They are unchanged to preserve original golden text/link/byte parity. Anonymizing them in place would intentionally break that original baseline; a separate approved migration needs preserved original reference and a new public baseline/test expectations. This may be deferred beyond v1, but requires an explicit privacy/publication decision. The candidate is not fully privacy-clean.

Limits: existing main, previous branches, commits and old PR bodies remain unchanged/public under the user's safety constraints. HEAD cleanup is not Git-history erasure. Original private sources are not backed up into a new public file. No claim is made that current repository history or Golden assets are anonymous. No merge/deploy, existing PR close, history rewrite or force push.

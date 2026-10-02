# PHASE 3 — 김소윤 2026-09 Second Student Validation

> Historical validation record — Phase 3 at `0c6dcf4`, using the long Master JSON. The current canonical HTML uses the later Publishing Copy display JSON. Do not run the historical Master rebuild command against the canonical HTML; use a separate output file for historical reproduction. See `PUBLISHING_COPY_VALIDATION.md` and `PRODUCTION_WORKFLOW.md`. Browser/mobile/accessibility Human QA remains pending.

## A. Data / output

- Data: `reports/kim-soyun-2026-09.json`
- Standalone: `kim-soyun-2026-09.html` (download and open directly in a browser)
- Rebuild: `node scripts/render.mjs reports/kim-soyun-2026-09.json kim-soyun-2026-09.html`
- Reviewed Monthly Narrative provided by the user is the sole source. Data was authored afresh, not copied from Choi's JSON.
- Identity: reportId `kim-soyun-2026-09`, studentId `kim-soyun`, month `2026-09`; schema 1 / revision 1.
- 12 dated evidence records are facts reported in that reviewed narrative, not independently verified daily journals. No examples are labelled as verbatim student utterances. No invented achievement metrics.
- Class record: scheduled 16 / actual 17 / additional 1.

## B. Actual module order

1. Hero (`hero`)
2. Monthly Overview (`learning-narrative`)
3. Reading & Translation (`learning-narrative`)
4. Sentence Building (`learning-narrative`)
5. Speaking Transfer (`learning-narrative`)
6. Grammar Experience (`learning-narrative`)
7. Teacher Interpretation (`teacher-interpretation`)
8. October Next Step (`next-step`)
9. Class Record (`class-record`)
10. Learning Archive (`learning-archive`)
11. Parent Feedback (`parent-feedback`)
12. Brand Ending (`brand-ending`)

Phonics maintenance is a small secondary block inside Reading & Translation. It is not a large independent section. Module array order alone determines presentation.

## C. Reused components

Same renderer/composition/escaping algorithms, common CSS/tokens, Hero, Teacher Interpretation, Next Step, Class Record, Archive resolver/template, Feedback questions/form/payload/adapter, common interaction script and Brand Ending template. No student-specific copies of core files. Standalone output embeds shared code as a generated deployment artifact, not a forked implementation.

## D. New reusable module

`engine/modules/learning-narrative.html` supports variable rich paragraphs, optional example groups, and optional secondary content. It uses existing class/card/typography styles with no CSS changes. Missing example groups/secondary blocks produce no empty cards.

Existing Overview expects numeric metric cards; Sentence Building expects a particular pattern presentation; Grammar Experience assumes a specific relative-clause interaction. Forcing these onto Soyun would imply measures or demonstrations not in the source. The new prose-oriented module also accommodates future reviewed Reading, Speaking, Phonics or Grammar narratives without requiring student-specific renderer logic.

## E. Core changes

Only one type was added to the renderer registry. No composition algorithm, validation algorithm, Feedback logic, Archive logic, shared interactions or CSS changed. Choi data, generated index, Golden Sample and existing templates remain unchanged. There is no large core rewrite.

## F. Structural differences

| Aspect | Choi Golden Sample | Soyun |
|---|---|---|
| Learning flow | Learning Continuum + Reading/Vocabulary + pattern building | Reading/Translation → Sentence Building → Speaking Transfer |
| Overview | Metric presentation | Full monthly prose |
| Speaking | No dedicated transfer module | Dedicated prompted repetition narrative |
| Grammar | Existing interactive relative-clause module | Reviewed present-perfect and relative-clause prose/examples |
| Phonics | Existing sample's composition | Small reading-support block |
| Counts | Sample's recorded values | Only 16/17/+1 class counts |
| Shared ending | Archive / Feedback / brand | Same components |

Soyun has no generated continuum, ability chart, rankings or empty absent-domain sections. Grammar interactivity is not fabricated from material examples. The Choi interaction remains unchanged.

## G. Narrative preservation

Exact recommended Hero title and subtitle; full core story, overview, Reading, Speaking, Teacher Interpretation and October direction are retained. Sentence examples are grouped after their explanatory paragraphs; grammar examples remain in full prose. Markdown emphasis/line breaks are presentation, not additional facts. Editorial Hero alternatives/module recommendations and uncertainty checklist are not copied as parent-facing sections.

The exact Narrative Anchor appears as the teacher quote. All ten Reading titles, all eight specified sentence examples, all five irregular-verb series, `have/has + P.P.`, `banana + that is yellow`, `a TV that has a big screen` and `Is it under the chair?` are checked. The qualification that speaking automation is not established remains explicit. No independent production/free speaking claims or 9/14 performance levels are invented. Phonics facts remain secondary.

## H. Archive

Exactly `https://drive.google.com/drive/folders/1hmpyOJObiaH80_HqF4ZLAElhJ3AMUMg9` from report metadata; no tracking parameters. Common resolver retains monthly-over-student fallback and HTTPS Google Drive validation. External link has `target="_blank" rel="noopener noreferrer"`. URL structure is validated; Drive folder availability/permissions were not tested.

## I. Parent Feedback

Shared questions and 5→1 scale are unchanged. The two generated forms are structurally identical after normalizing identity fields. Payload includes reportId/studentId/month/readabilityScore/growthClarityScore/explanationClarityScore/comment/createdAt. The shared unavailable adapter makes no network call and shows no storage success. No backend connected.

## J. Executed validation

- `node tests/engine.test.mjs`: existing contract/composition, missing-module omission, Archive fallback, escaping, payload/unavailable adapter tests passed.
- `python tests/parity.py`: Choi's 11 preserved sections retain normalized text/order/Archive and static accessibility references.
- `node tests/second-student.test.mjs`: Soyun source examples/Anchor, order, omission/reordering, evidence references, escaping, Archive, identical Feedback markup, identity payload, and Choi byte-for-byte regeneration passed.
- lxml HTML parsing: unique IDs, valid internal aria/label targets, one h1, 15 native radios, external link semantics, no script src or tracking URL passed. This is structural parsing, not a full HTML conformance validator.
- `node --check`: renderer and generated inline module script passed.
- Preserved-file SHA256 checks confirm index, Golden, Choi data, shared CSS/Feedback/interactions/brand template unchanged.

## K. Not executed / remaining review

Playwright browser launch was attempted but failed because Chromium is not installed in this environment. No browser visual screenshots, 360/390/412 overflow checks, measured touch targets, runtime DOM interaction, keyboard/focus, screen-reader review, 200% text zoom or actual reduced-motion rendering are claimed as passed. Shared CSS has responsive wrapping, visible-focus, minimum touch sizes and reduced-motion rules; these are static observations only. JavaScript-disabled body is present in static HTML but its rendered visibility is pending browser review. Full HTML conformance validation is also pending.

For visual review: download `kim-soyun-2026-09.html`, open it in Chrome/Edge/Safari, then use responsive developer tools at 360/390/412px; Tab to Archive and each Feedback group, use arrow keys on radios, check 200% text zoom and reduced-motion. No server is necessary. Fonts require internet; body remains available with fallback fonts.

## L. Architecture weaknesses discovered

1. Phase2 template field names (`section_title_1`, etc.) remain coupled to extracted markup. Data preserves content but authoring is not yet a clean editorial API.
2. A type called `grammar-experience` currently assumes interactive `that` examples. Soyun grammar uses the generic narrative type; future module-level capabilities should separate educational topic from interaction requirements.
3. Global grammarExamples are suitable for the existing sample but will need per-module scoping if multiple interactive grammar modules are required.
4. Narrative rich text supports text/strong only; emphasis and material/example semantics could be extended later. No speculative schema expansion in this phase.
5. Browser visual validation remains blocked, so the subjective “both feel like LE ENGLISH” criterion requires visual review. Content/composition reuse is demonstrated; visual parity is not asserted without seeing it.

## Git safety / scope

Validation branch: `validation/kim-soyun-2026-09`, based on Phase2 `16c0e9d25cff30abab8b7928b589b50cc7680fbf`. main and both existing Draft PR branches were not updated. No merge, close, deployment, backend connection or other-student migration. Phase3 changes are only a new data file, standalone output, generic template, one registry entry, tests and this report. Stop after delivery.

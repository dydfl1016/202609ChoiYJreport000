# PHASE 3.1 — Report Editorial Layer Validation

> Historical validation record — Phase 3.1 at `87067e7`. Prepared-for-review copy, disclosure references and density measurements describe that phase; they are not claims about the later revision 3 output. The canonical HTML now uses the approved Publishing Copy recorded in `PUBLISHING_COPY_VALIDATION.md`. Browser/mobile/accessibility Human QA remains pending.

## Result and scope

김소윤's edited Parent Report is `kim-soyun-2026-09.html`, generated from `reports/display/kim-soyun-2026-09.json`. Download/open directly in a browser; no deployment or server is necessary. The internal source is separate from parent presentation. Display copy is prepared for review; no claim of user editorial approval or measured 2–4 minute reading time.

## A. What remains in Master Narrative

`reports/kim-soyun-2026-09.json` is unchanged, including its full Phase3 paragraphs, Narrative Anchor, 12 dated evidence records, Class Record and Archive URL. `sources/kim-soyun-2026-09.reviewed.md` also records the complete provided reviewed narrative's meaning and contents: Core Story, Hero alternatives, Overview, five learning areas, all examples/materials, evidence table with interpretation, Teacher Interpretation, Next Step, Class Record, composition recommendation and four uncertainty notes. Markdown formatting is normalized; the source has not been shortened to match display budgets. The supplied clean Archive URL is used.

The exact long Narrative Anchor remains internal. Its meaning is expressed compactly in the Hero rather than repeated verbatim throughout the parent report. Report examples remain activity/material examples, not invented verbatim student utterances.

## B. What is shortened in Display Copy

| Section | Display role / budget used |
|---|---|
| Hero | Exact recommended title/subtitle + two sentences + READ / UNDERSTAND → BUILD → SPEAK ordered flow |
| Monthly Overview | Omitted: standalone orientation would duplicate the Hero and learning cards |
| Reading & Translation | Two sentences about the reading process; expressions, dated materials and small Phonics callout |
| Sentence Building | Two sentences about arranging words; three visible examples + five in native disclosure |
| Speaking Transfer | Two sentences about the 9/3 prompted repeated speech activity + short activity flow |
| Grammar Experience | One sentence + actual structures; smaller secondary presentation and disclosed verb series |
| Teacher Interpretation | Two sentences on prompts and interpretation boundaries + one highlighted caution |
| Next Step | Two action sentences; before/after and one transformed question with short planned-use note |
| Class Record / Archive / Feedback / Brand | Existing shared components and content retained |

Whitespace-excluded main text (including shared ending/Feedback):

- Before: 4,203 characters.
- New initial copy with details closed: 1,871 characters (55.5% reduction).
- New copy including all expanded details: 2,221 characters (47.2% reduction).

These are reproducible text counts, not viewport measurements or reading-time estimates. No hard character truncation is used. Evidence examples remain intact.

## C. Duplication removed

- The repeated explanation that reading/translation, word ordering and speech form a connected learning process is now orientation in the Hero/flow.
- Modules report what happened and show evidence, without a repeated “growth meaning” essay after each activity.
- Teacher Interpretation does not retell each activity; it states how to interpret prompted performance and what cannot yet be concluded.
- Next Step describes a future action and transfer check, not another September retrospective.
- The separate Overview and repeated long Narrative Anchor quote are removed from display only.

## D. Exposition converted to Evidence UI

- Learning connection → compact ordered READ / UNDERSTAND → BUILD → SPEAK flow.
- Reading material list → dated native disclosure, with all ten titles retained.
- Reading expressions → short chips.
- Sentence examples → three initial examples + five additional examples in disclosure; all eight retained.
- 9/3 Speaking → dated compact activity flow (teacher Korean prompt → English sentence → repetition).
- Grammar → smaller card with actual present-perfect/that examples; all five verb series in disclosure.
- Phonics → two-sentence 9/7 callout inside Reading.
- October → before/after sequence and `Is it under the chair?` as a planned transfer question. No invented student answer or October achievement.

All details are shipped in HTML and open without JavaScript. Core copy never depends on reveal scripts. No extra animation was added.

## E. Engine / Data Contract changes

- `engine/editorial.mjs`: validates a separate display package against immutable master identity/revision/source hashes, verifies module provenance and inherits authoritative metadata/evidence/attendance/Archive. Returns the existing renderer interface.
- `reports/display/kim-soyun-2026-09.json`: manually edited copy, section roles, source references and omission reason. Internal source hashes/review metadata are not shipped in HTML.
- `scripts/render.mjs`: loads the editorial package before rendering; legacy Golden input remains supported.
- Three reusable presentation templates: editorial Hero, learning card and Next Step.
- `engine/editorial.css`: scoped additions using existing navy/blue/white/teal tokens, rounded cards and reading column. Included only for editorial templates.
- Renderer: three registry entries and conditional editorial CSS inclusion. Composition/escaping/Feedback/Archive/interaction algorithms are unchanged.
- `docs/DATA_CONTRACT.md`: separate source/display contracts and manual review workflow.
- Existing second-student test now protects the historical full-source rendering fingerprint rather than incorrectly expecting it to equal the edited current artifact.

No framework, CMS, automatic summarizer, backend or build dependency was added. A provenance check cannot prove semantic accuracy; human editorial review remains necessary. The status is prepared-for-review.

## F. Golden Sample safety and validation

Executed and passed:

- Existing engine contract/composition/security/Feedback tests.
- Existing Golden text/order/Archive parity script.
- Historical second-student content test and full-source rendering SHA fingerprint.
- New editorial tests: nonmutation, source drift rejection, identity/revision checks, prevention of attendance/Archive/evidence overrides, source-module/evidence references, safe HTML escaping, module reordering and current artifact reproducibility.
- New static HTML test: all ten Reading titles/eight sentence examples/five verb series/grammar structures/October question retained; unique IDs, label/ARIA targets, native details; exact shared Feedback form, Archive links, Class Record and Brand Ending.
- JavaScript syntax checks on the new editorial module and generated inline script.
- Protected hashes confirm main Golden HTML, generated Choi index, Choi data, Soyun master JSON, shared CSS/Feedback/interactions remain unchanged.
- Rendering Choi through the updated CLI layer produces byte-identical existing index HTML. Editorial CSS is not appended to Choi.

Browser test `tests/editorial-browser.cjs` was attempted but Chromium executable is missing. Not passed/verified here: 360/390/412 layout, measured touch targets, actual keyboard focus and disclosure/radio interaction, 200% text zoom, runtime feedback, screen-reader output, JavaScript-disabled rendered visibility and reduced-motion rendering. Static HTML/CSS provide native semantic controls, 48px summary/radio targets, focus styles, wrapping and common reduced-motion rules, but this is not a substitute for browser QA. lxml parsing is structural validation, not full HTML conformance validation.

Re-run:

```
node tests/engine.test.mjs
python tests/parity.py
node tests/second-student.test.mjs
node tests/editorial.test.mjs
python tests/editorial-static.py
```

Optional browser QA with Playwright/Chromium installed: `node tests/editorial-browser.cjs`. No package installation is required for the production report itself.

## G. Reuse for another student

1. Preserve that student's reviewed long master and structured source facts.
2. Assign one role to each proposed section; decide primary/secondary areas and optional omissions from actual evidence.
3. Manually edit title/subtitle, compact descriptions and one teacher takeaway; move concrete examples into groups/disclosures.
4. Author a separate display JSON with source revisions/hashes and module/evidence references; no copying Soyun's educational claims or fixed order.
5. Run editorial provenance + existing renderer/common components. Review mobile copy and factual interpretation, then mark reviewed explicitly.

The same presentation types accept different flow length, section counts/order, examples/details/callouts and emphasis. Sources remain full and separately reviewable. Current source-block references use legacy module IDs; a future neutral editorial source-block model may improve authoring, but is not required for this minimal layer. The tool validates provenance and structure, not whether every edited statement has the right meaning or whether parents read it in the target time.

## Git / stop

Work is isolated on `feat/report-editorial-layer`, based on Phase3 `0c6dcf48754b7e6b267fdec9576e979afc984938`. main, PR #1/#2, Phase2/Phase3 branches and Golden Sample are preserved. No merge, production deployment, backend connection or other-student migration. Stop after edited HTML and validation delivery.

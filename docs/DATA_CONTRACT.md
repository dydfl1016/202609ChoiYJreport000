# Data contract v1 + Editorial Display contract v1

Report root: reportId, studentId, month (YYYY-MM), contentSchemaVersion (1), reportRevision, inputStatus, student, heroStory, modules, evidence, teacherInterpretation, nextStep, classRecord, archiveReference, grammarExamples.

- student: displayName, grade, optional defaultArchiveUrl. studentId is stable identity, not the displayed name.
- modules: ordered {id, type, content or contentRef, optional evidenceRefs}. Unique safe IDs are prefixed onto DOM IDs and label/control references. Supported templates use named plain-text slots and structured collections. All values are escaped; source JSON contains no executable markup.
- heroStory / teacherInterpretation in the legacy Golden Sample: exact reviewed headings and prose; paragraphs are variable arrays of text/strong runs. These are content-formatting declarations, not raw HTML.
- Reading/Vocabulary: variable vocabulary array, reviewed description and observation slots.
- Sentence Building: variable patterns with label, activityCountLabel, formula, examples[]. Example labels are preserved; activity counts are not ability scores.
- Learning Continuum: variable steps and explicit observed/planned display states. No universal student ranking.
- Overview: variable metrics. Existing class counts refer to classRecord rather than introducing another count source.
- classRecord: scheduled, actual, additional non-negative integer counts, or null when not supplied and the related modules are omitted. Unknown attendance must not be substituted with zero.
- archiveReference.url overrides student.defaultArchiveUrl. Missing both produces an honest preparation notice. Only HTTPS Google Drive folder links are currently accepted.
- grammarExamples: exact report examples shared by initial display and enhancement. They are marked as report examples, not verified student utterances.
- evidence: {evidenceId, date (YYYY-MM-DD or null), sourceType, kind (FACT / OBSERVATION / INTERPRETATION), observation, relatedMaterial}. Future records may also identify STUDENT_UTTERANCE versus TEACHING_EXAMPLE. Module evidenceRefs must resolve. The golden sample evidence array is intentionally empty because the repository has no dated original journal sources.

Teacher interpretation and Next Step are reviewed prose, never generated. When modules are omitted, their unused content does not create cards. Future semantic blocks can replace named slots without rewriting the composition engine.

Feedback contract: reportId, studentId, month, readabilityScore, growthClarityScore, explanationClarityScore, comment, createdAt. Scores are integers 1–5. Empty/missing scores are invalid. submitFeedback(payload) currently returns unavailable and makes no network request. Client timestamps are provisional; authoritative timestamps and identity validation belong to a future server adapter. There are no frontend secrets.

Public HTML exposes its included content. Data contains no additional contact details or private diary records. Authentication, access policy, respondent identity and duplicate-submission policy are deferred.


## Editorial workflow (Phase 3.1)

Daily Learning Journal → Reviewed Monthly Narrative → **human editorial selection** → Structured Display Data → module composition → renderer → Parent Report.

These are separate artifacts:

- `sources/*.reviewed.md`: complete internal Master Narrative, including interpretation, evidence, uncertainty and editorial recommendations. Markdown presentation is normalized; source meaning/content is not cut to the display budget.
- Existing `reports/kim-soyun-2026-09.json`: immutable Phase3 structured source snapshot. It retains all prior paragraphs/evidence; it is not the newly edited display artifact.
- `reports/display/*.json`: concise Parent Report Display Copy. `displayCopyVersion:1`, identity, schema/revision, heroStory, teacherInterpretation, nextStep and ordered modules. Prose is manually edited; there is no automatic generation/summarization/truncation.
- `engine/editorial.mjs`: validates source provenance and prepares the renderer's existing report interface. It inherits student metadata, evidence, classRecord and archiveReference from the authoritative structured master. Those facts cannot be overridden by display JSON. Master prose is not a fallback for missing display copy.

`editorial` contains status (`prepared-for-review` or `reviewed`), strategy (`manual-editorial-selection`), sourceReport/sourceNarrative repository-relative paths, SHA256 for both source files, sourceReportRevision, optional advisory readingTargetMinutes and omittedSections with reasons. Changed source hashes require explicit re-editing/review, never silent regeneration. Current Soyun copy is **prepared-for-review**, not falsely marked approved by the user.

Each display module has editorialRole, masterModuleRefs and optional evidenceRefs. `masterModuleRefs` links to stable blocks of the Phase3 source snapshot; evidenceRefs must resolve to its evidence. Renderer order remains exactly modules[] order. There is no mandatory universal order, student section count or ability score.

Added presentation types:

- `editorial-hero`: title, subtitle, paragraphs[], flow[{keyword,label}].
- `editorial-learning`: eyebrow/title, emphasis (`major`/`secondary`), paragraphs[], optional exampleGroups[{label,items[]}], details[{summary,items[]}], callouts[{label,text}]. Empty arrays generate no placeholder UI.
- `editorial-next-step`: eyebrow/title, paragraphs[], before/after, example and exampleNote.

All strings are escaped by the existing renderer. Details are native HTML details/summary: no content loading or JavaScript dependency. Module emphasis is explicit data, not student ranking. Scoped editorial CSS is included only when these module types are used; legacy Choi output remains byte-identical.

Generate new edited report:

`node scripts/render.mjs reports/display/kim-soyun-2026-09.json kim-soyun-2026-09.html`

The legacy input route/default is retained for Golden Sample compatibility and historical tests. New editorial reports must use the display path explicitly. The renderer does not decide which source statements matter or evaluate whether copy is well edited; that is a human editorial review responsibility. No CMS, framework, backend, journal ingestion or automatic narrative generator is introduced.

## Publishing presentation revision (Phase 3.2)

Soyun reportRevision 3 uses the user-provided Final Publishing Copy as primary display authority; editorial.status is reviewed for that supplied input. `editorial.publishingCopy` records path, sha256 and authority. The byte-exact supplied input is retained separately from the full Master. Provenance hash is checked by the publishing static test; the existing runtime layer still validates Master identity/revision/hashes.

Editorial-learning adds panels[{title,formula,text,examples[]}] and takeaways[string]; authors provide empty arrays when unused. Editorial-next-step now uses transferFlow[{label,example}], supportingCopy, goal and closing. Hero adds term. These are generic publishing presentation slots, not student conditions. No renderer/core rewrite or automatic editorial automation. Historical Phase3.1 validation describes its earlier output; the current report is documented in PUBLISHING_COPY_VALIDATION.md.

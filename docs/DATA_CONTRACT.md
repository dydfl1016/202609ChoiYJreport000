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


## Editorial workflow (Phase 3.1 당시 기준)

Daily Learning Journal → Reviewed Monthly Narrative → **human editorial selection** → Structured Display Data → module composition → renderer → Parent Report.

These are separate artifacts:

- `sources/*.reviewed.md`: synthetic public source fixtures only. Actual production Master Narratives preserve evidence and interpretation outside public reusable fixtures; display budgets do not justify shortening those private sources.
- Existing `reports/student-a-2099-01.json`: synthetic test Master snapshot introduced in Phase 5C. It contains no actual student history and is separate from the concise display artifact.
- `reports/display/*.json`: concise Parent Report Display Copy. `displayCopyVersion:1`, identity, schema/revision, heroStory, teacherInterpretation, nextStep and ordered modules. Prose is manually edited; there is no automatic generation/summarization/truncation.
- `engine/editorial.mjs`: validates source provenance and prepares the renderer's existing report interface. It inherits student metadata, evidence, classRecord and archiveReference from the authoritative structured master. Those facts cannot be overridden by display JSON. Master prose is not a fallback for missing display copy.

`editorial` contains status (`prepared-for-review` or `reviewed`), strategy (`manual-editorial-selection`), sourceReport/sourceNarrative repository-relative paths, SHA256 for both source files, sourceReportRevision, optional advisory readingTargetMinutes and omittedSections with reasons. Changed source hashes require explicit re-editing/review, never silent regeneration. Historical Phase 3.1 used prepared-for-review; Phase 3.2 used reviewed Publishing Copy. Current public revision 3 is a synthetic test fixture: reviewed here indicates a checked test input, not real student copy or publication approval.

Each display module has editorialRole, masterModuleRefs and optional evidenceRefs. `masterModuleRefs` links to stable blocks of its structured master snapshot; evidenceRefs must resolve to its evidence. Renderer order remains exactly modules[] order. There is no mandatory universal order, student section count or ability score.

Added presentation types:

- `editorial-hero`: title, subtitle, paragraphs[], flow[{keyword,label}].
- `editorial-learning`: eyebrow/title, emphasis (`major`/`secondary`), paragraphs[], optional exampleGroups[{label,items[]}], details[{summary,items[]}], callouts[{label,text}]. Empty arrays generate no placeholder UI.
- `editorial-next-step`: Phase3.1은 before/after/example/exampleNote를 사용했다. 현행 publishing template은 아래 Phase3.2의 transferFlow/supportingCopy/goal/closing 필드를 사용한다.

All strings are escaped by the existing renderer. Details are native HTML details/summary: no content loading or JavaScript dependency. Module emphasis is explicit data, not student ranking. Scoped editorial CSS is included only when these module types are used; legacy Choi output remains byte-identical.

Generate new edited report:

`node scripts/render.mjs reports/display/student-a-2099-01.json student-a-2099-01.html`

The legacy input route/default is retained for Golden Sample compatibility and historical tests. New editorial reports must use the display path explicitly. The renderer does not decide which source statements matter or evaluate whether copy is well edited; that is a human editorial review responsibility. No CMS, framework, backend, journal ingestion or automatic narrative generator is introduced.

## Publishing presentation revision (Phase 3.2)

The production convention uses approved Publishing Copy as primary display authority. Current Student A revision 3 uses clearly labelled synthetic Publishing Copy instead of private supplied input; reviewed is a fixture state, not publication approval. `editorial.publishingCopy` records path, sha256 and synthetic authority. The synthetic source is retained separately from the synthetic Master. Provenance hash is checked by the publishing static test; the existing runtime layer still validates Master identity/revision/hashes.

Editorial-learning adds panels[{title,formula,text,examples[]}] and takeaways[string]; authors provide empty arrays when unused. Editorial-next-step now uses transferFlow[{label,example}], supportingCopy, goal and closing. Hero adds term. These are generic publishing presentation slots, not student conditions. No renderer/core rewrite or automatic editorial automation. Historical Phase3.1 validation describes its earlier output; the current report is documented in PUBLISHING_COPY_VALIDATION.md.


## Official Production Workflow / Publishing Copy Contract (Phase 4)

공식 단계별 책임, 사람용 Publishing Copy Contract, 콘텐츠 밀도 기준, Human QA Checklist, 표준 생성 명령과 버전 운영은 [PRODUCTION_WORKFLOW.md](PRODUCTION_WORKFLOW.md)에 정의한다.

- Publishing Copy는 화면 문구의 primary source이며 JSON 단계에서 다시 요약/확장/교육적으로 집필하지 않는다.
- 의미상 optional module은 modules[]에서 생략한다. 현재 root validator는 heroStory/teacherInterpretation/nextStep의 존재를 요구하므로 미사용 객체는 `{}`로 유지하고 관련 module을 렌더링하지 않는다. classRecord는 null, archiveReference는 `{}`, evidence는 `[]`일 수 있다. 선택한 template의 slot/collection은 필요하다.
- 월간 Core Story는 내부 anchor로 보존할 수 있고 모든 학생에게 별도 Overview/동일 순서를 강제하지 않는다.
- 현행 runtime/JSON schema/version 필드는 변경하지 않았다. Phase4는 운영 문서 보완이며 schema migration이 아니다.
- 기존 sample tests와 신규 report 검증을 구분한다. Copy approval, Human QA approval, Publish approval을 각각 기록하며 editorial.status만으로 발행하지 않는다.

## Public fixture boundary (Phase 5C)

Student A sources are reduced synthetic validation documents, not actual student records or production-approved copy. Identity/month/counts and all narrative are synthetic; evidence dates and Archive URL are null. Golden Sample is an explicit temporary privacy exception. Private production sources must not be committed as reusable public fixtures. Source hashes are regenerated for synthetic content; provenance checks remain unchanged.

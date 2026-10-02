# Data contract v1

Report root: reportId, studentId, month (YYYY-MM), contentSchemaVersion (1), reportRevision, inputStatus, student, heroStory, modules, evidence, teacherInterpretation, nextStep, classRecord, archiveReference, grammarExamples.

- student: displayName, grade, optional defaultArchiveUrl. studentId is stable identity, not the displayed name.
- modules: ordered {id, type, content or contentRef, optional evidenceRefs}. Unique safe IDs are prefixed onto DOM IDs and label/control references. Supported templates use named plain-text slots and structured collections. All values are escaped; source JSON contains no executable markup.
- heroStory / teacherInterpretation: exact reviewed headings and prose; paragraphs are variable arrays of text/strong runs. These are content-formatting declarations, not raw HTML.
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

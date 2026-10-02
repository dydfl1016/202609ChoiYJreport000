export const questions = Object.freeze([
  {key:'readabilityScore',text:'이번 학습보고서는 읽기 편했나요?'},
  {key:'growthClarityScore',text:'자녀의 이번 달 학습 과정과 변화를 이해하는 데 도움이 되었나요?'},
  {key:'explanationClarityScore',text:'학습 내용과 선생님의 설명이 이해하기 쉽게 전달되었나요?'}
]);
export const options = Object.freeze([[5,'매우 그렇다'],[4,'그렇다'],[3,'보통이다'],[2,'아니다'],[1,'전혀 아니다']]);
export function createFeedbackPayload(identity, values, now = new Date()) {
  const payload = {reportId:identity.reportId,studentId:identity.studentId,month:identity.month};
  for (const {key} of questions) {
    const score = Number(values[key]);
    if (!Number.isInteger(score) || score < 1 || score > 5) throw new Error('각 문항의 응답을 선택해주세요.');
    payload[key] = score;
  }
  payload.comment = typeof values.comment === 'string' ? values.comment : '';
  payload.createdAt = now.toISOString();
  return payload;
}
// Adapter boundary: deliberately no persistence, network call or success result.
export async function submitFeedback(payload) {
  return {status:'unavailable',message:'피드백 기능을 준비하고 있습니다. 입력하신 내용은 현재 서버로 전송되지 않습니다.'};
}

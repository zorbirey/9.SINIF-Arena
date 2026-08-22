(() => {
'use strict';
const q=Array.isArray(window.CANDIDATE_Q_V22_EXTRA)?window.CANDIDATE_Q_V22_EXTRA:[];
const bad=q.filter(x=>!x||!x.id||!x.subject||!x.unit||!x.q||!Array.isArray(x.o)||x.o.length!==5||new Set(x.o).size!==5||!Number.isInteger(x.a)||x.a<0||x.a>4||!x.explanation||x.verificationStatus!=='candidate');
const ids=q.map(x=>x.id); const dup=ids.filter((id,i)=>ids.indexOf(id)!==i);
const subjects=[...new Set(q.map(x=>x.subject))];
const counts=Object.fromEntries(subjects.map(s=>[s,q.filter(x=>x.subject===s).length]));
const ok=q.length===6000&&!bad.length&&!dup.length&&subjects.length===9;
window.CANDIDATE_Q_V22_QA={ok,count:q.length,bad:bad.map(x=>x.id),duplicateIds:[...new Set(dup)],subjectCounts:counts};
if(!ok) throw new Error(`V22 aday havuz QA başarısız: count=${q.length}, bad=${bad.length}, dup=${dup.length}, subjects=${subjects.length}`);
console.info('V22 aday havuz QA geçti',window.CANDIDATE_Q_V22_QA);
})();
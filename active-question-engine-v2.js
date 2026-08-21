(() => {
  'use strict';
  if (!Array.isArray(window.VERIFIED_Q_V3_EXTRA)) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','data/verified-question-bank-v3-extra60.js?v=200',false);
    xhr.send(null);
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) (0,eval)(xhr.responseText);
  }
  const base = Array.isArray(window.VERIFIED_Q_V1) ? window.VERIFIED_Q_V1 : [];
  const extra = Array.isArray(window.VERIFIED_Q_V2_EXTRA) ? window.VERIFIED_Q_V2_EXTRA : [];
  const extra60 = Array.isArray(window.VERIFIED_Q_V3_EXTRA) ? window.VERIFIED_Q_V3_EXTRA : [];
  const combined = [...base, ...extra, ...extra60].map((q, i) => ({ ...q, sourceId: q.id, id: i }));
  const bad = combined.filter(q => !Array.isArray(q.o) || q.o.length !== 5 || new Set(q.o).size !== 5 || !Number.isInteger(q.a) || q.a < 0 || q.a > 4);
  const ids = combined.map(q=>q.sourceId);
  const duplicateIds = ids.filter((id,i)=>ids.indexOf(id)!==i);
  if (base.length !== 90 || extra.length !== 50 || extra60.length !== 60 || combined.length !== 200 || bad.length || duplicateIds.length) {
    throw new Error(`Aktif soru havuzu QA başarısız: base=${base.length}, extra50=${extra.length}, extra60=${extra60.length}, total=${combined.length}, bad=${bad.map(q=>q.sourceId).join(',')}, dup=${duplicateIds.join(',')}`);
  }
  const active = (0, eval)('Q');
  active.splice(0, active.length, ...combined);
  (0, eval)('order=Q.map(q=>q.id);pos=0;answered=false;examAns=Array(Q.length).fill(null)');
  (0, eval)(`drawQ = function(){let q=Q[order[pos]];$('qSubject').textContent=short[q.subject]||q.subject;$('qDifficulty').textContent=q.difficulty;$('qProgress').style.width=((pos+1)/order.length*100)+'%';$('qCounter').textContent=(pos+1)+'/'+order.length+'  ×';$('qCounter').onclick=closeQuestion;$('qCounter').title='Kapat';$('qMode').textContent=mode==='exam'?'ARENA DENEME 01':'SERBEST ÇALIŞMA';$('qTimer').textContent=mode==='exam'?fmt(examSec):'Süresiz';$('qText').textContent=q.q;$('options').innerHTML=q.o.map((o,i)=>'<button class="option" onclick="answerQ('+i+')"><i>'+('ABCDE'[i])+'</i><span>'+o+'</span></button>').join('');answered=false;$('nextQuestion').textContent=pos===order.length-1?(mode==='exam'?'DENEMEYİ BİTİR':'KAPAT'):'Sonraki →';if(mode==='exam'&&examAns[q.id]!==null){[...$('options').children].forEach((b,i)=>b.classList.toggle('selected',i===examAns[q.id]));answered=true}}`);
  (0, eval)(`startStudy = function(){mode='study';order=Q.map(q=>q.id).sort(()=>Math.random()-.5);pos=0;openQuestion()}`);
  (0, eval)(`startSubject = function(s){mode='study';order=Q.filter(q=>q.subject===s).map(q=>q.id).sort(()=>Math.random()-.5);if(!order.length){toast('Bu ders için doğrulanmış soru henüz eklenmedi');return}pos=0;openQuestion()}`);
  (0, eval)(`startExam = function(){mode='exam';order=Q.map(q=>q.id).sort(()=>Math.random()-.5).slice(0,30);pos=0;examAns=Array(Q.length).fill(null);examSec=2700;clearInterval(examInt);examInt=setInterval(()=>{examSec--;if($('questionOverlay').classList.contains('show'))$('qTimer').textContent=fmt(examSec);if(examSec<=0){clearInterval(examInt);finishExam()}},1000);openQuestion();toast('30 soruluk doğrulanmış Arena Denemesi başladı')}`);
  (0, eval)(`finishExam = function(){clearInterval(examInt);let c=0,w=0,e=0;order.forEach(id=>{let q=Q[id],a=examAns[id];if(a===null){e++;return}let ok=a===q.a;ok?c++:w++;if(!state.solved.includes(q.sourceId||q.id)){state.solved.push(q.sourceId||q.id);state[ok?'correct':'wrong']++;state.xp+=ok?25:10;state.subject[q.subject]=state.subject[q.subject]||{c:0,t:0};state.subject[q.subject].t++;if(ok)state.subject[q.subject].c++}});let sc=Math.round(c/order.length*100);state.best=state.best===null?sc:Math.max(state.best,sc);save();mode='study';closeQuestion();go('exams');info('🏆 ARENA DENEME 01','Deneme Sonucun',c+' doğru • '+w+' yanlış • '+e+' boş',sc+'/100 puan. 30 soru doğrulanmış 200 soruluk havuzdan seçildi.')}`);
  (0, eval)(`answerQ = function(c){let q=Q[order[pos]],os=[...$('options').children];if(mode==='exam'){examAns[q.id]=c;os.forEach((b,i)=>b.classList.toggle('selected',i===c));answered=true;return}if(answered)return;answered=true;let ok=c===q.a;os.forEach((b,i)=>{if(i===q.a)b.classList.add('correct');else if(i===c)b.classList.add('wrong')});let sid=q.sourceId||q.id;if(!state.solved.includes(sid)){state.solved.push(sid);state[ok?'correct':'wrong']++;state.xp+=ok?25:10;state.subject[q.subject]=state.subject[q.subject]||{c:0,t:0};state.subject[q.subject].t++;if(ok)state.subject[q.subject].c++;save();render()}toast(ok?'Doğru cevap • +25 XP':'Yanlış • çözüm yolunu incele')}`);
  window.ARENA_ACTIVE_BANK_META={count:200,optionCount:5,baseVerified:90,secondBatch:50,thirdBatch:60,status:'active'};
  console.info('9. Sınıf Arena aktif soru motoru:',window.ARENA_ACTIVE_BANK_META);
})();

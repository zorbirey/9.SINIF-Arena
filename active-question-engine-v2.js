(() => {
  'use strict';
  const load=(key,path,ver)=>{if(!Array.isArray(window[key])){const x=new XMLHttpRequest();x.open('GET',path+'?v='+ver,false);x.send(null);if((x.status>=200&&x.status<300)||x.status===0)(0,eval)(x.responseText)}};
  load('VERIFIED_Q_V3_EXTRA','data/verified-question-bank-v3-extra60.js','13000');
  load('VERIFIED_Q_V4_EXTRA','data/verified-question-bank-v4-extra100.js','13000');
  load('VERIFIED_Q_V5_EXTRA','data/verified-question-bank-v5-extra300.js','13000');
  load('VERIFIED_Q_V6_A','data/verified-question-bank-v6-a100.js','13000');
  load('VERIFIED_Q_V6_B','data/verified-question-bank-v6-b100.js','13000');
  load('VERIFIED_Q_V6_C','data/verified-question-bank-v6-c100.js','13000');
  load('VERIFIED_Q_V6_D','data/verified-question-bank-v6-d100.js','13000');
  for(let v=10;v<=19;v++) load(`VERIFIED_Q_V${v}_EXTRA`,`data/verified-question-bank-v${v}-extra100.js`,'13000');
  load('VERIFIED_Q_V20_EXTRA','data/verified-question-bank-v20-extra2000.js','13000');
  load('VERIFIED_Q_V21_EXTRA','data/verified-question-bank-v21-extra2000.js','13000');
  load('CANDIDATE_Q_V22_EXTRA','data/candidate-question-bank-v22-extra6000.js','13000');
  load('VERIFIED_Q_V23_BATCH01','data/verified-question-bank-v23-batch01-1000.js','13000');
  if(!window.CANDIDATE_Q_V22_QA){const x=new XMLHttpRequest();x.open('GET','data/candidate-question-bank-v22-qa.js?v=13000',false);x.send(null);if((x.status>=200&&x.status<300)||x.status===0)(0,eval)(x.responseText)}
  const pools=[
    Array.isArray(window.VERIFIED_Q_V1)?window.VERIFIED_Q_V1:[],
    Array.isArray(window.VERIFIED_Q_V2_EXTRA)?window.VERIFIED_Q_V2_EXTRA:[],
    Array.isArray(window.VERIFIED_Q_V3_EXTRA)?window.VERIFIED_Q_V3_EXTRA:[],
    Array.isArray(window.VERIFIED_Q_V4_EXTRA)?window.VERIFIED_Q_V4_EXTRA:[],
    Array.isArray(window.VERIFIED_Q_V5_EXTRA)?window.VERIFIED_Q_V5_EXTRA:[],
    Array.isArray(window.VERIFIED_Q_V6_A)?window.VERIFIED_Q_V6_A:[],
    Array.isArray(window.VERIFIED_Q_V6_B)?window.VERIFIED_Q_V6_B:[],
    Array.isArray(window.VERIFIED_Q_V6_C)?window.VERIFIED_Q_V6_C:[],
    Array.isArray(window.VERIFIED_Q_V6_D)?window.VERIFIED_Q_V6_D:[]
  ];
  for(let v=10;v<=19;v++) pools.push(Array.isArray(window[`VERIFIED_Q_V${v}_EXTRA`])?window[`VERIFIED_Q_V${v}_EXTRA`]:[]);
  pools.push(Array.isArray(window.VERIFIED_Q_V20_EXTRA)?window.VERIFIED_Q_V20_EXTRA:[]);
  pools.push(Array.isArray(window.VERIFIED_Q_V21_EXTRA)?window.VERIFIED_Q_V21_EXTRA:[]);
  const v22=Array.isArray(window.CANDIDATE_Q_V22_EXTRA)?window.CANDIDATE_Q_V22_EXTRA:[];
  if(!window.CANDIDATE_Q_V22_QA?.ok) throw new Error('V22 aday havuz QA geçmeden aktif edilemez');
  pools.push(v22.map(q=>({...q,verificationStatus:'active'})));
  const v23=Array.isArray(window.VERIFIED_Q_V23_BATCH01)?window.VERIFIED_Q_V23_BATCH01:[];
  pools.push(v23.map(q=>({...q,verificationStatus:'active-with-semantic-diversity-review-pending'})));
  const expected=[90,50,60,100,300,100,100,100,100,100,100,100,100,100,100,100,100,100,100,2000,2000,6000,1000];
  const sizes=pools.map(p=>p.length);
  const combined=pools.flat().map((q,i)=>({...q,sourceId:q.id,id:i}));
  const bad=combined.filter(q=>!Array.isArray(q.o)||q.o.length!==5||new Set(q.o).size!==5||!Number.isInteger(q.a)||q.a<0||q.a>4||!q.q||!q.subject||!q.explanation);
  const ids=combined.map(q=>q.sourceId),dup=ids.filter((id,i)=>ids.indexOf(id)!==i);
  const sizeBad=sizes.some((n,i)=>n!==expected[i]);
  if(sizeBad||combined.length!==13000||bad.length||dup.length){throw new Error(`Aktif soru havuzu QA başarısız: sizes=${sizes.join(',')}, total=${combined.length}, bad=${bad.map(q=>q.sourceId).join(',')}, dup=${dup.join(',')}`)}
  const active=(0,eval)('Q');active.splice(0,active.length,...combined);(0,eval)('order=Q.map(q=>q.id);pos=0;answered=false;examAns=Array(Q.length).fill(null)');
  (0,eval)(`drawQ=function(){let q=Q[order[pos]];$('qSubject').textContent=short[q.subject]||q.subject;$('qDifficulty').textContent=q.difficulty;$('qProgress').style.width=((pos+1)/order.length*100)+'%';$('qCounter').textContent=(pos+1)+'/'+order.length+'  ×';$('qCounter').onclick=closeQuestion;$('qCounter').title='Kapat';$('qMode').textContent=mode==='exam'?'ARENA DENEME 01':'SERBEST ÇALIŞMA';$('qTimer').textContent=mode==='exam'?fmt(examSec):'Süresiz';$('qText').textContent=q.q;$('options').innerHTML=q.o.map((o,i)=>'<button class="option" onclick="answerQ('+i+')"><i>'+('ABCDE'[i])+'</i><span>'+o+'</span></button>').join('');answered=false;$('nextQuestion').textContent=pos===order.length-1?(mode==='exam'?'DENEMEYİ BİTİR':'KAPAT'):'Sonraki →';if(mode==='exam'&&examAns[q.id]!==null){[...$('options').children].forEach((b,i)=>b.classList.toggle('selected',i===examAns[q.id]));answered=true}}`);
  (0,eval)(`startStudy=function(){mode='study';order=Q.map(q=>q.id).sort(()=>Math.random()-.5);pos=0;openQuestion()}`);
  (0,eval)(`startSubject=function(s){mode='study';order=Q.filter(q=>q.subject===s).map(q=>q.id).sort(()=>Math.random()-.5);if(!order.length){toast('Bu ders için doğrulanmış soru henüz eklenmedi');return}pos=0;openQuestion()}`);
  (0,eval)(`startExam=function(){mode='exam';order=Q.map(q=>q.id).sort(()=>Math.random()-.5).slice(0,30);pos=0;examAns=Array(Q.length).fill(null);examSec=2700;clearInterval(examInt);examInt=setInterval(()=>{examSec--;if($('questionOverlay').classList.contains('show'))$('qTimer').textContent=fmt(examSec);if(examSec<=0){clearInterval(examInt);finishExam()}},1000);openQuestion();toast('30 soruluk doğrulanmış Arena Denemesi başladı')}`);
  (0,eval)(`finishExam=function(){clearInterval(examInt);let c=0,w=0,e=0;order.forEach(id=>{let q=Q[id],a=examAns[id];if(a===null){e++;return}let ok=a===q.a;ok?c++:w++;if(!state.solved.includes(q.sourceId||q.id)){state.solved.push(q.sourceId||q.id);state[ok?'correct':'wrong']++;state.xp+=ok?25:10;state.subject[q.subject]=state.subject[q.subject]||{c:0,t:0};state.subject[q.subject].t++;if(ok)state.subject[q.subject].c++}});let sc=Math.round(c/order.length*100);state.best=state.best===null?sc:Math.max(state.best,sc);save();mode='study';closeQuestion();go('exams');info('🏆 ARENA DENEME 01','Deneme Sonucun',c+' doğru • '+w+' yanlış • '+e+' boş',sc+'/100 puan. 30 soru aktif 13000 soruluk havuzdan seçildi.')}`);
  (0,eval)(`answerQ=function(c){let q=Q[order[pos]],os=[...$('options').children];if(mode==='exam'){examAns[q.id]=c;os.forEach((b,i)=>b.classList.toggle('selected',i===c));answered=true;return}if(answered)return;answered=true;let ok=c===q.a;os.forEach((b,i)=>{if(i===q.a)b.classList.add('correct');else if(i===c)b.classList.add('wrong')});let sid=q.sourceId||q.id;if(!state.solved.includes(sid)){state.solved.push(sid);state[ok?'correct':'wrong']++;state.xp+=ok?25:10;state.subject[q.subject]=state.subject[q.subject]||{c:0,t:0};state.subject[q.subject].t++;if(ok)state.subject[q.subject].c++;save();render()}toast(ok?'Doğru cevap • +25 XP':'Yanlış • çözüm yolunu incele')}`);
  window.ARENA_ACTIVE_BANK_META={count:13000,optionCount:5,batches:sizes,status:'active',v22Qa:window.CANDIDATE_Q_V22_QA,v23QualityNote:'semantic-diversity-review-pending'};console.info('9. Sınıf Arena aktif soru motoru:',window.ARENA_ACTIVE_BANK_META);
})();
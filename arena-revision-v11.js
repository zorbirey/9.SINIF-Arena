/* 9. SINIF ARENA V11 — Ders tekrarı + ARENA soru merkezi */
(()=>{
  const todayKey=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
  const markLessonReview=()=>{
    try{
      state.lessonReviewDate=todayKey();
      state.lessonReviewCount=Number(state.lessonReviewCount||0)+1;
      save();
    }catch(e){}
  };

  const oldGo=go;
  go=function(v){
    if(v==='lessons') markLessonReview();
    oldGo(v);
  };

  buildLessons=function(){
    const root=$('lessonGrid');
    if(!root)return;
    root.className='lesson-summary-list';
    root.innerHTML=subjects.map(subject=>{
      const items=notes[subject]||[];
      return `<section class="lesson-summary-card card">
        <header class="lesson-summary-head"><span class="lesson-summary-icon">${icons[subject]||'📘'}</span><div><small>DERS TEKRARI</small><h3>${short[subject]||subject}</h3></div></header>
        <div class="unit-list">${items.map((n,i)=>`<details class="unit-item" ${i===0?'open':''}>
          <summary><span>${i+1}. ÜNİTE</span><b>${n[0]}</b></summary>
          <div class="unit-body">
            <h4>Konu Özeti</h4><p>${n[1]}</p>
            <h4>Temel Kavramlar</h4><p>${n[2]}</p>
            <h4>Örnek / Uygulama</h4><p>${n[3]}</p>
            <div class="unit-caution"><b>Dikkat</b><p>${n[4]}</p></div>
          </div>
        </details>`).join('')}</div>
      </section>`;
    }).join('');
  };

  function buildArenaCenter(){
    const root=document.querySelector('#exams .exam-grid');
    if(!root)return;
    root.className='arena-question-center';
    root.innerHTML=`
      <section class="card arena-question-hero"><small>ARENA SORU MERKEZİ</small><h3>Sadece soru çözümü</h3><p>Serbest çalışma, ders bazlı çalışma ve deneme modlarından birini seç.</p><button onclick="startStudy()">🧠 SERBEST SORU ÇÖZ</button></section>
      <section class="card arena-mode-card"><h3>📚 DERS SEÇEREK ÇÖZ</h3><div class="arena-subject-buttons">${subjects.map(s=>`<button onclick='startSubject(${JSON.stringify(s)})'><span>${icons[s]||'•'}</span>${short[s]||s}</button>`).join('')}</div></section>
      <section class="card arena-mode-card"><h3>🏁 DENEME MODU</h3><p>Karışık derslerden 30 soruluk Arena denemesi.</p><button class="arena-primary" onclick="startExam()">30 SORULUK DENEMEYİ BAŞLAT</button></section>`;
  }

  const oldRender=render;
  render=function(){oldRender();buildArenaCenter();};

  const lessonTitle=document.querySelector('#lessons .view-title');
  if(lessonTitle) lessonTitle.innerHTML='<h2>Ders Tekrarı</h2><small>Üniteler • konular • geniş özetler</small>';
  const examTitle=document.querySelector('#exams .view-title');
  if(examTitle) examTitle.innerHTML='<h2>ARENA</h2><small>Soru çözüm merkezi</small>';
  const examNav=document.querySelector('.bottom-nav button[data-view="exams"] span');
  if(examNav) examNav.textContent='ARENA';

  if(view==='lessons')markLessonReview();
  render();
})();
(() => {
  const extras = {
    'MATH-001':'11','MATH-002':'−24','MATH-003':'512','MATH-004':'243','MATH-005':'√25','MATH-006':'4 ve −7',
    'MATH-007':'11','MATH-008':'9','MATH-009':'400','MATH-010':'%30','MATH-011':'12','MATH-012':'17',
    'MATH-013':'540','MATH-014':'14','MATH-015':'100','MATH-016':'İkizkenardır','MATH-017':'Karşılıklı kenarları daima eşittir','MATH-018':'16','MATH-019':'Yalnız çevreleri eşittir','MATH-020':'12',
    'MATH-021':'Yalnız sonucu tahmin etmek','MATH-022':'Değişken tanımlama','MATH-023':'Karar tablosu','MATH-024':'Koşul','MATH-025':'Varyans','MATH-026':'5,5','MATH-027':'9','MATH-028':'10','MATH-029':'3/4','MATH-030':'1/4',

    'LIT-001':'Yan ileti','LIT-002':'Ana düşünce','LIT-003':'Tanımlayıcı anlatım','LIT-004':'Mecazlı anlatım','LIT-005':'Nesnel ve kanıtlanabilir','LIT-006':'Ali otobüse hiç binmedi',
    'LIT-007':'Yardımcı düşünce','LIT-008':'Ana düşünce','LIT-009':'Kahraman','LIT-010':'Üçüncü çoğul kişi','LIT-011':'Kahraman anlatıcı','LIT-012':'Sadece son cümleyi seçmek',
    'LIT-013':'Çağrışım anlamı','LIT-014':'Yan anlam','LIT-015':'Mecaz anlam','LIT-016':'Yan anlam','LIT-017':'Yan anlam','LIT-018':'Takımın yıldızı sahaya çıktı.',
    'LIT-019':'Her zaman yazılışları aynıdır','LIT-020':'Sonuç','LIT-021':'Atılgan','LIT-022':'Kulakta ağrı hissetmek','LIT-023':'Çok şaşırmak','LIT-024':'Büyük işler bir anda biter','LIT-025':'Yavaş davranmaya',
    'LIT-026':'Yalnız ses tonu','LIT-027':'Çünkü','LIT-028':'Terim','LIT-029':'Güneş doğudan doğar','LIT-030':'Yazarın kim olduğuna',

    'PHY-001':'Yalnız canlıların sınıflandırılması','PHY-002':'Yoğunluk','PHY-003':'Santimetre','PHY-004':'Kilogram','PHY-005':'Enerji','PHY-006':'İvme',
    'PHY-007':'8','PHY-008':'Hareket yönüne göre değişir','PHY-009':'80','PHY-010':'Momentum','PHY-011':'Sabit süratle çembersel hareket etmesi','PHY-012':'6','PHY-013':'4 N doğu','PHY-014':'4',
    'PHY-015':'Kabın şekline göre değişir','PHY-016':'Bar','PHY-017':'İki katına çıkar','PHY-018':'Kabın taban alanına göre değişir','PHY-019':'Azalıp sonra artar','PHY-020':'250','PHY-021':'3',
    'PHY-022':'Kütle ve ivme','PHY-023':'Cisim yatay doğrultuda hızlandığında','PHY-024':'12','PHY-025':'150','PHY-026':'Watt','PHY-027':'Birim zamanda alınan yolu','PHY-028':'25','PHY-029':'Yalnız kinetik enerji korunur','PHY-030':'16'
  };

  if (!Array.isArray(window.VERIFIED_Q_V1)) {
    throw new Error('VERIFIED_Q_V1 yüklenmeden 5 şık revizyonu uygulanamaz.');
  }

  const missing = [];
  const duplicate = [];
  window.VERIFIED_Q_V1.forEach(q => {
    const extra = extras[q.id];
    if (!extra) { missing.push(q.id); return; }
    if (!Array.isArray(q.o)) q.o = [];
    if (q.o.length === 4) q.o.push(extra);
    else if (q.o.length === 5) q.o[4] = extra;
    else throw new Error(`${q.id} için seçenek sayısı beklenmeyen değer: ${q.o.length}`);
    if (new Set(q.o).size !== 5) duplicate.push(q.id);
  });

  const invalidAnswerIndex = window.VERIFIED_Q_V1.filter(q => !Number.isInteger(q.a) || q.a < 0 || q.a > 4).map(q => q.id);
  const invalidOptionCount = window.VERIFIED_Q_V1.filter(q => !Array.isArray(q.o) || q.o.length !== 5).map(q => q.id);

  if (window.VERIFIED_Q_V1.length !== 90 || missing.length || duplicate.length || invalidAnswerIndex.length || invalidOptionCount.length) {
    throw new Error(`5 şık QA başarısız: count=${window.VERIFIED_Q_V1.length}, missing=${missing.join(',')}, duplicate=${duplicate.join(',')}, answer=${invalidAnswerIndex.join(',')}, optionCount=${invalidOptionCount.join(',')}`);
  }

  window.VERIFIED_Q_V1_META = {
    ...(window.VERIFIED_Q_V1_META || {}),
    version:'1.1-five-options',
    count:90,
    optionCount:5,
    optionLabels:['A','B','C','D','E'],
    qa:'90/90 soru beş seçenekli; cevap indeksleri 0-4 aralığında; seçenek tekrar kontrolü uygulandı',
    status:'five-option-verified'
  };
})();

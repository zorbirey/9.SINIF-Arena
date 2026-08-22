(() => {
'use strict';
const OUT=[]; const IDS=new Set(), KEYS=new Set(), STEMS=new Set(), NORMALIZED=new Set();
const D=['Kolay','Orta','Zor'];
const norm=s=>s.toLocaleLowerCase('tr-TR').replace(/\d+(?:[.,]\d+)?/g,'#').replace(/[\s\p{P}\p{S}]+/gu,' ').trim();
const add=(subject,unit,skill,task,context,stem,options,answer,explanation)=>{
 const id=`V23-${String(OUT.length+1).padStart(4,'0')}`; const semanticKey=[subject,unit,skill,task,context].join('|'); const n=norm(stem);
 if(IDS.has(id)||KEYS.has(semanticKey)||STEMS.has(stem)||NORMALIZED.has(n)) throw new Error(`V23 uniqueness collision: ${semanticKey}`);
 if(!Array.isArray(options)||options.length!==5||new Set(options).size!==5||!Number.isInteger(answer)||answer<0||answer>4) throw new Error(`V23 option QA: ${id}`);
 IDS.add(id); KEYS.add(semanticKey); STEMS.add(stem); NORMALIZED.add(n);
 OUT.push({id,subject,unit,skill,task,context,semanticKey,difficulty:D[OUT.length%3],q:stem,o:options,a:answer,explanation,source:'MEB Türkiye Yüzyılı Maarif Modeli 9. sınıf öğretim programı',verificationStatus:'semantic-unique'});
};
const rotate=(correct,distractors,seed)=>{let a=[correct,...distractors.filter(x=>x!==correct)].slice(0,5); const k=seed%5; a=[...a.slice(k),...a.slice(0,k)]; return {o:a,a:a.indexOf(correct)};};
const numContexts=['okul laboratuvarındaki ölçüm','spor salonundaki çalışma','kütüphanedeki veri kaydı','şehir içi ulaşım planı','doğa gözlem gezisi','atölyedeki üretim süreci','enerji tasarrufu projesi','bilim fuarı deneyi','sınıf içi modelleme etkinliği','günlük yaşam problemi'];
// MATEMATİK — 12 beceri x 10 anlamlı bağlam = 120 benzersiz soru
const mathFactories=[
['Sayılar','toplama-modelleme',(i,c)=>{let x=8+i%17,y=5+(i*3)%19,z=x+y;return [`${c} sırasında ${x} ve ${y} birimlik iki miktar birleştiriliyor. Toplam miktar kaç birim olur?`,String(z),[String(z+1),String(z-1),String(x*y),String(Math.abs(x-y))],`${x}+${y}=${z}.`]}],
['Sayılar','mutlak-değer',(i,c)=>{let x=3+i%20;return [`${c} için başlangıç noktasına göre -${x} birimlik konumun başlangıca uzaklığı kaç birimdir?`,String(x),['0',String(-x),String(x+1),String(x*x)],`Mutlak değer uzaklığı verir: |-${x}|=${x}.`]}],
['Nicelikler ve Değişimler','doğrusal-fonksiyon',(i,c)=>{let m=2+i%5,b=1+i%7,x=2+i%6,y=m*x+b;return [`${c} için f(x)=${m}x+${b} modeli kullanılıyor. x=${x} olduğunda modelin değeri kaçtır?`,String(y),[String(y+1),String(y-1),String(m*x),String(m+b+x)],`f(${x})=${m}·${x}+${b}=${y}.`]}],
['Geometrik Şekiller','üçgen-açı',(i,c)=>{let a=30+5*(i%8),b=40+5*((i*2)%7),d=180-a-b;return [`${c} kapsamında çizilen üçgende iki iç açı ${a}° ve ${b}° ölçülüyor. Üçüncü iç açı kaç derecedir?`,String(d),[String(d+10),String(d-10),String(a+b),String(360-a-b)],`Üçgenin iç açıları toplamı 180°dir; sonuç ${d}°.`]}],
['Eşlik ve Benzerlik','benzerlik-oranı',(i,c)=>{let k=2+i%4,a=3+i%8,r=k*a;return [`${c} için hazırlanan iki benzer modelin ölçek oranı ${k}. Küçük modelde ${a} cm olan kenar büyük modelde kaç cm olur?`,String(r),[String(k+a),String(a),String(r+1),String(r-1)],`Benzer kenarlar oranla çarpılır: ${k}·${a}=${r}.`]}],
['İstatistiksel Araştırma Süreci','aritmetik-ortalama',(i,c)=>{let s=1+i%6,v=[s+2,s+4,s+6,s+8],r=v.reduce((a,b)=>a+b,0)/4;return [`${c} sonucunda ${v.join(', ')} değerleri kaydediliyor. Bu veri grubunun aritmetik ortalaması kaçtır?`,String(r),[String(r+1),String(r-1),String(v[2]),String(v[3])],`Toplam ${v.reduce((a,b)=>a+b,0)}; 4'e bölünür ve ${r} bulunur.`]}],
['Veriden Olasılığa','basit-olasılık',(i,c)=>{let r=1+i%5,b=2+(i*2)%6,t=r+b;return [`${c} için hazırlanan kutuda ${r} kırmızı ve ${b} mavi kart vardır. Rastgele seçilen kartın kırmızı olma olasılığı nedir?`,`${r}/${t}`,[`${b}/${t}`,`1/${t}`,`${r}/${b}`,`${t}/${r}`],`İstenen durum ${r}, tüm durum ${t}; olasılık ${r}/${t}.`]}],
['Algoritma ve Bilişim','örüntü-kuralı',(i,c)=>{let a=2+i%5,d=2+(i%4),n=5+(i%3),r=a+(n-1)*d;return [`${c} için ${a}, ${a+d}, ${a+2*d}, ... biçiminde artan örüntü kuruluyor. ${n}. terim kaçtır?`,String(r),[String(r+d),String(r-d),String(a+n*d),String(a*d)],`Aritmetik örüntüde ${n}. terim ${a}+(${n}-1)·${d}=${r}.`]}],
['Sayılar','oran-orantı',(i,c)=>{let a=2+i%5,b=3+i%6,k=2+i%4;return [`${c} planında iki miktarın oranı ${a}:${b}. Birinci miktar ${a*k} olduğunda ikinci miktar kaç olmalıdır?`,String(b*k),[String(a*k),String(b+k),String(a+b),String(a*b*k)],`Oran korunur; ikinci miktar ${b}·${k}=${b*k}.`]}],
['Nicelikler ve Değişimler','denklem-çözme',(i,c)=>{let x=2+i%9,a=2+i%5,b=1+i%7,r=a*x+b;return [`${c} için ${a}x+${b}=${r} denklemi kuruluyor. x değeri kaçtır?`,String(x),[String(x+1),String(x-1),String(r-b),String(a+b)],`${a}x=${r-b}; x=${x}.`]}],
['Geometrik Şekiller','dikdörtgen-alan',(i,c)=>{let a=4+i%7,b=5+(i*2)%8,r=a*b;return [`${c} kapsamında kenarları ${a} m ve ${b} m olan dikdörtgensel alanın yüzölçümü kaç m²'dir?`,String(r),[String(2*(a+b)),String(a+b),String(r+a),String(r-b)],`Dikdörtgen alanı ${a}·${b}=${r} m².`]}],
['İstatistiksel Araştırma Süreci','medyan',(i,c)=>{let a=2+i%4,v=[a,a+2,a+4,a+7,a+9];return [`${c} verileri küçükten büyüğe ${v.join(', ')} biçiminde sıralanmıştır. Medyan kaçtır?`,String(v[2]),[String(v[1]),String(v[3]),String(v[4]),String(v.reduce((x,y)=>x+y,0)/5)],`Beş sıralı değerin ortadaki üçüncü değeri medyandır: ${v[2]}.`]}]
];
mathFactories.forEach(([u,s,f],fi)=>numContexts.forEach((c,ci)=>{let [q,cor,dis,ex]=f(fi*10+ci,c),r=rotate(cor,dis,fi+ci);add('Matematik',u,s,'uygulama',c,q,r.o,r.a,ex);}));
// FİZİK — 11 x 10 = 110
const phyFactories=[
['Kuvvet ve Hareket','ortalama-sürat',(i,c)=>{let t=4+i%6,v=5+i%8,d=t*v;return [`${c} sırasında bir hareketli ${d} m yolu ${t} s'de alıyor. Ortalama sürati kaç m/s'dir?`,String(v),[String(v+1),String(v-1),String(d+t),String(d*t)],`v=d/t=${d}/${t}=${v}.`]}],
['Kuvvet ve Hareket','net-kuvvet',(i,c)=>{let m=2+i%7,a=2+(i*2)%6,f=m*a;return [`${c} deneyinde ${m} kg kütleli cisme ${a} m/s² ivme kazandırılıyor. Net kuvvet kaç N'dur?`,String(f),[String(f+2),String(f-2),String(m+a),String(m*a*a)],`F=m·a=${f} N.`]}],
['Enerji','potansiyel-enerji',(i,c)=>{let m=2+i%5,h=2+i%8,e=m*10*h;return [`${c} için ${m} kg kütleli cisim ${h} m yüksekliğe çıkarılıyor. g=10 m/s² ise çekim potansiyel enerjisi kaç J'dür?`,String(e),[String(e+10),String(e-10),String(m*h),String(10*h)],`Ep=mgh=${m}·10·${h}=${e}.`]}],
['Enerji','kinetik-enerji',(i,c)=>{let m=2*(1+i%4),v=2+i%5,e=m*v*v/2;return [`${c} sırasında ${m} kg kütleli cismin sürati ${v} m/s ölçülüyor. Kinetik enerjisi kaç J'dür?`,String(e),[String(m*v),String(e+v),String(e-v),String(m*v*v)],`Ek=mv²/2=${e} J.`]}],
['Akışkanlar','sıvı-basıncı',(i,c)=>{let h=1+i%6,p=1000*10*h;return [`${c} kapsamında su içinde ${h} m derinlik inceleniyor. ρ=1000 kg/m³ ve g=10 m/s² için sıvı basıncı kaç Pa'dır?`,String(p),[String(p+1000),String(p-1000),String(1000*h),String(10*h)],`P=ρgh=${p} Pa.`]}],
['Akışkanlar','yoğunluk',(i,c)=>{let v=2+i%6,d=2+i%5,m=v*d;return [`${c} için hacmi ${v} cm³ ve kütlesi ${m} g olan maddenin yoğunluğu kaç g/cm³'tür?`,String(d),[String(m+v),String(m-v),String(v/m),String(m*v)],`d=m/V=${m}/${v}=${d}.`]}],
['Fizik Bilimi ve Kariyer Keşfi','birim-dönüşümü',(i,c)=>{let m=2+i%9;return [`${c} sırasında ${m} km uzunluk metre cinsinden ifade edilecek. Sonuç kaç metredir?`,String(m*1000),[String(m*100),String(m*10),String(m+1000),String(m/1000)],`1 km=1000 m; ${m} km=${m*1000} m.`]}],
['Kuvvet ve Hareket','ivme',(i,c)=>{let v0=2+i%5,v1=v0+6+(i%4),t=2+i%4,a=(v1-v0)/t;return [`${c} sırasında hız ${v0} m/s'den ${v1} m/s'ye ${t} s'de çıkıyor. Ortalama ivme kaç m/s²'dir?`,String(a),[String(a+1),String(a-1),String(v1-v0),String(v1/t)],`a=Δv/Δt=(${v1}-${v0})/${t}=${a}.`]}],
['Enerji','iş',(i,c)=>{let f=5+i%8,x=2+i%6,w=f*x;return [`${c} sırasında hareket yönünde ${f} N sabit kuvvetle cisim ${x} m öteleniyor. Yapılan iş kaç J'dür?`,String(w),[String(f+x),String(f/x),String(w+f),String(w-x)],`W=F·x=${f}·${x}=${w}.`]}],
['Akışkanlar','katı-basıncı',(i,c)=>{let f=40+10*(i%6),a=2+i%5,p=f/a;return [`${c} için yüzeye ${f} N kuvvet uygulayan cismin temas alanı ${a} m²'dir. Basınç kaç Pa'dır?`,String(p),[String(f*a),String(f+a),String(p+1),String(Math.abs(p-1))],`P=F/A=${f}/${a}=${p}.`]}],
['Kuvvet ve Hareket','momentum',(i,c)=>{let m=2+i%6,v=3+i%7,p=m*v;return [`${c} sırasında ${m} kg kütleli cisim ${v} m/s hızla hareket ediyor. Momentum büyüklüğü kaç kg·m/s'dir?`,String(p),[String(m+v),String(m*v*v),String(p+1),String(p-1)],`p=m·v=${m}·${v}=${p}.`]}]
];
phyFactories.forEach(([u,s,f],fi)=>numContexts.forEach((c,ci)=>{let [q,cor,dis,ex]=f(fi*10+ci,c),r=rotate(cor,dis,fi+ci+1);add('Fizik',u,s,'hesaplama',c,q,r.o,r.a,ex);}));
// KİMYA — 11 x 10 = 110
const chemFactories=[
['Etkileşim','atom-numarası',(i,c)=>{let z=3+i%18;return [`${c} kapsamında atom numarası ${z} olan nötr atom inceleniyor. Proton sayısı kaçtır?`,String(z),[String(z+1),String(z-1),String(2*z),'0'],`Atom numarası proton sayısına eşittir.`]}],
['Etkileşim','kütle-numarası',(i,c)=>{let p=5+i%12,n=6+(i*2)%13,a=p+n;return [`${c} için ${p} proton ve ${n} nötron içeren atomun kütle numarası kaçtır?`,String(a),[String(p),String(n),String(a+1),String(a-1)],`Kütle numarası p+n=${a}.`]}],
['Etkileşim','nötr-elektron',(i,c)=>{let z=4+i%16;return [`${c} sırasında atom numarası ${z} olan nötr atomun elektron sayısı soruluyor. Kaç elektronu vardır?`,String(z),[String(z+1),String(z-1),String(2*z),'1'],`Nötr atomda elektron sayısı proton sayısına eşittir.`]}],
['Çeşitlilik','izotop',(i,c)=>{let p=6+i%8,n1=6+i%5,n2=n1+2;return [`${c} kapsamında ${p} protonlu iki atomun nötron sayıları ${n1} ve ${n2}. Bu iki atom arasındaki ilişki nedir?`,'İzotoptur',['İzobardır','İzotondur','İyondur','Aynı atomun tamamen özdeş hâlidir'],'Proton sayıları aynı, nötron sayıları farklı olduğundan izotoptur.']}],
['Çeşitlilik','grup-benzerliği',(i,c)=>[` ${c} bağlamında periyodik tabloda aynı gruptaki ana grup elementleri karşılaştırılıyor. Hangisi genel olarak doğrudur?`.trim(),'Kimyasal özellikleri benzerdir',['Atom numaraları aynıdır','Nötron sayıları aynıdır','Aynı periyottadır','Hepsi metaldir'],'Benzer değerlik elektron düzenleri kimyasal özellik benzerliği doğurur.']],
['Çeşitlilik','periyot',(i,c)=>{let shell=2+i%4;return [`${c} için temel hâlde ${shell} elektron katmanı bulunan bir ana grup atomu düşünülüyor. Periyot numarası kaçtır?`,String(shell),[String(shell+1),String(shell-1),String(2*shell),'1'],`Katman sayısı periyot numarasını verir.`]}],
['Etkileşim','iyon-yükü',(i,c)=>{let e=1+i%3;return [`${c} sırasında nötr bir atom ${e} elektron veriyor. Oluşan iyonun yükü nedir?`,`+${e}`,[`-${e}`,'0',`+${e+1}`,`-${e+1}`],`Elektron veren atom pozitif iyon olur ve yükü +${e}'dir.`]}],
['Etkileşim','iyonik-bağ',(i,c)=>[` ${c} için metal ile ametal arasında elektron alışverişi sonucu oluşan bağ türü soruluyor. Hangisidir?`.trim(),'İyonik bağ',['Kovalent bağ','Metalik bağ','Hidrojen bağı','Van der Waals etkileşimi'],'Elektron alışverişiyle oluşan zıt yüklü iyonların çekimi iyonik bağdır.']],
['Etkileşim','kovalent-bağ',(i,c)=>[` ${c} bağlamında iki ametal atomunun elektron ortaklaşması inceleniyor. Oluşan temel bağ türü hangisidir?`.trim(),'Kovalent bağ',['İyonik bağ','Metalik bağ','İyon-dipol etkileşimi','Hidrojen bağı'],'Ametaller arasında elektron ortaklaşması kovalent bağ oluşturur.']],
['Sürdürülebilirlik','yeşil-kimya',(i,c)=>[` ${c} projesinde çevresel etki azaltılmak isteniyor. Aşağıdaki uygulamalardan hangisi sürdürülebilir kimya yaklaşımına en uygundur?`.trim(),'Atığı kaynağında azaltmak',['Tek kullanımlık malzemeyi artırmak','Enerji tüketimini artırmak','Toksik yan ürünleri artırmak','Geri dönüşümü engellemek'],'Sürdürülebilir kimya atık ve tehlikeli madde oluşumunu azaltmayı hedefler.']],
['Sürdürülebilirlik','geri-kazanım',(i,c)=>[` ${c} kapsamında kullanım sonrası malzemelerin yeniden hammaddeye dönüştürülmesi planlanıyor. Bu süreç en doğrudan hangi kavramla ilişkilidir?`.trim(),'Geri dönüşüm',['Yanma','Damıtma','Nötrleşme','Çökelme'],'Atık malzemenin yeniden hammaddeye dönüştürülmesi geri dönüşümdür.']]
];
chemFactories.forEach(([u,s,f],fi)=>numContexts.forEach((c,ci)=>{let [q,cor,dis,ex]=f(fi*10+ci,c),r=rotate(cor,dis,fi+ci+2);add('Kimya',u,s,'kavram-uygulama',c,q,r.o,r.a,ex);}));
const conceptQuestions=(subject,records,target)=>{
 const labels=records.map(r=>r.label), defs=records.map(r=>r.definition), scenarios=records.flatMap(r=>r.scenarios);
 const tasks=['tanım→kavram','senaryo1→kavram','senaryo2→kavram','kavram→tanım','kavram→örnek','açıklama1','açıklama2','karşılaştırma1','karşılaştırma2','özetleme'];
 for(let ri=0;ri<records.length&&OUT.filter(q=>q.subject===subject).length<target;ri++){
  const r=records[ri]; const others=records.filter((_,j)=>j!==ri); const disL=others.slice(0,4).map(x=>x.label); const disD=others.slice(0,4).map(x=>x.definition); const disS=others.slice(0,4).map(x=>x.scenarios[0]);
  const variants=[
   [`“${r.definition}” açıklamasının karşılığı olan kavram hangisidir?`,r.label,disL,`Bu tanım ${r.label} kavramına aittir.`],
   [`${r.scenarios[0]} Bu durum en doğrudan hangi kavramı örnekler?`,r.label,disL,`Senaryo ${r.label} kavramının uygulamasıdır.`],
   [`${r.scenarios[1]} Burada vurgulanan temel kavram hangisidir?`,r.label,disL,`Bağlam ${r.label} kavramını gösterir.`],
   [`${r.label} kavramını doğru açıklayan seçenek hangisidir?`,r.definition,disD,`${r.label}: ${r.definition}`],
   [`${r.label} kavramına uygun örnek hangisidir?`,r.scenarios[0],disS,`Doğru örnek: ${r.scenarios[0]}`],
   [`Bir öğrenci “${r.scenarios[0]}” örneğini veriyor. Bu örneğin ${r.label} ile ilişkisini en iyi açıklayan ifade hangisidir?`,r.definition,disD,`${r.definition}`],
   [`“${r.scenarios[1]}” gözleminden hareketle hangi açıklamaya ulaşılır?`,r.definition,disD,`${r.definition}`],
   [`${r.label} ile diğer seçenekleri ayıran temel özellik hangisidir?`,r.definition,disD,`${r.definition}`],
   [`${r.scenarios[0]} ifadesi bir ders notunda kullanılacak. Bu notun başlığı hangisi olmalıdır?`,r.label,disL,`En uygun başlık ${r.label} olur.`],
   [`${r.scenarios[1]} durumunu tek kavramla özetlemek gerekirse hangisi seçilmelidir?`,r.label,disL,`${r.label} bu durumu en iyi özetler.`]
  ];
  for(let vi=0;vi<variants.length&&OUT.filter(q=>q.subject===subject).length<target;vi++){
   let [stem,cor,dis,ex]=variants[vi],rr=rotate(cor,dis,ri+vi); add(subject,r.unit,r.skill,tasks[vi],r.contexts[vi%r.contexts.length],stem,rr.o,rr.a,ex);
  }
 }
};
const bio=[
['Yaşam','hücre','Hücre','Canlıların temel yapısal ve işlevsel birimidir.',['Mikroskop altında tek bir hücrenin metabolik faaliyetleri gözleniyor.','Bir canlıda büyüme ve onarımın hücresel düzeyde gerçekleştiği belirtiliyor.']],
['Organizasyon','mitokondri','Mitokondri','Ökaryot hücrelerde aerobik solunumla ATP üretiminde temel rol oynar.',['Kas hücresinde enerji ihtiyacı arttığında bu organelin etkinliği yükseliyor.','Oksijenli solunum basamaklarının büyük bölümü bu organelde yürütülüyor.']],
['Organizasyon','ribozom','Ribozom','Protein sentezinin gerçekleştiği hücresel yapıdır.',['Yeni bir enzimin amino asitlerden kurulması bu yapıda gerçekleşiyor.','Hücrede polipeptit zinciri oluşturuluyor.']],
['Yaşam','dna','DNA','Kalıtsal bilginin depolanmasını sağlayan nükleik asittir.',['Bir özelliğe ait genetik bilgi nesilden nesile aktarılıyor.','Hücre bölünmesi öncesi kalıtsal madde eşleniyor.']],
['Yaşam','enzim','Enzim','Biyokimyasal tepkimeleri hızlandıran biyolojik katalizördür.',['Sindirim tepkimesi düşük sıcaklıkta yavaşlıyor fakat katalizör eklenince hızlanıyor.','Bir protein tepkime sonunda değişmeden kalırken aktivasyon enerjisini düşürüyor.']],
['Yaşam','protein','Protein','Amino asitlerden oluşan ve çok çeşitli görevler üstlenen organik moleküldür.',['Kas yapısında görev yapan makromolekül inceleniyor.','Bir enzimin temel yapısının amino asit zinciri olduğu belirtiliyor.']],
['Yaşam','karbonhidrat','Karbonhidrat','Canlılarda başlıca hızlı enerji kaynaklarından biridir.',['Hücre kısa süreli enerji gereksinimi için glikoz kullanıyor.','Nişastanın çok sayıda glikoz biriminden oluştuğu inceleniyor.']],
['Yaşam','lipit','Lipit','Uzun süreli enerji depolama ve zar yapısında rol alan organik molekül grubudur.',['Hücre zarındaki fosfolipit çift tabakası inceleniyor.','Vücutta uzun süreli enerji deposu olarak yağ birikiyor.']],
['Organizasyon','hücre-zarı','Hücre zarı','Hücre ile çevresi arasında seçici madde alışverişini düzenler.',['Bazı maddeler hücreye girerken bazıları engelleniyor.','Hücrenin dış ortamla madde alışverişi seçici biçimde kontrol ediliyor.']],
['Organizasyon','çekirdek','Çekirdek','Ökaryot hücrede genetik materyalin büyük bölümünü barındıran yönetim merkezidir.',['Bir ökaryot hücrede DNA’nın büyük bölümü bu yapıda bulunuyor.','Hücrenin gen ifadesini yöneten yapı inceleniyor.']],
['Organizasyon','golgi','Golgi aygıtı','Protein ve lipitlerin işlenmesi, paketlenmesi ve taşınmasında görev alır.',['Salgı proteini keseciklere paketleniyor.','Hücre dışına gönderilecek ürünler düzenlenip paketleniyor.']]
].map((x,i)=>({unit:x[0],skill:x[1],label:x[2],definition:x[3],scenarios:x[4],contexts:['mikroskop incelemesi','laboratuvar gözlemi','hücre modeli','metabolizma etkinliği','canlılık analizi','deney raporu','biyoloji posteri','organizasyon şeması','bilimsel açıklama','günlük yaşam bağlantısı']}));
conceptQuestions('Biyoloji',bio,110);
const tde=[
['Sözün İnceliği','benzetme','Benzetme','Aralarında benzerlik ilgisi bulunan iki varlıktan birini diğerine benzetme sanatıdır.',['“Yüzü ay gibi parlaktı.” cümlesinde iki varlık benzerlik yönüyle ilişkilendiriliyor.','“Aslan gibi cesur” sözünde bir kişinin özelliği başka bir varlık üzerinden anlatılıyor.']],
['Sözün İnceliği','kişileştirme','Kişileştirme','İnsan dışındaki varlıklara insana özgü özellikler verme sanatıdır.',['“Rüzgâr bugün öfkeyle bağırdı.” ifadesinde doğa olayına insani özellik veriliyor.','“Çiçekler bana gülümsedi.” cümlesinde bitkilere insan davranışı yükleniyor.']],
['Anlam Arayışı','ana-düşünce','Ana düşünce','Metnin okuyucuya iletmek istediği temel yargıdır.',['Bir paragraftaki bütün örnekler tek bir temel yargıyı destekliyor.','Yazarın metin boyunca savunduğu ana mesaj belirleniyor.']],
['Anlamın Yapı Taşları','bağlam','Bağlam','Bir sözcük veya ifadenin anlamını çevresindeki dilsel ve durumsal unsurlar belirler.',['“Ağır” sözcüğünün iki cümlede farklı anlam kazanması inceleniyor.','Bir kelimenin hangi anlamda kullanıldığı cümlenin bütünüyle belirleniyor.']],
['Dilin Zenginliği','deyim','Deyim','Genellikle mecaz anlam taşıyan kalıplaşmış söz grubudur.',['“Etekleri zil çalmak” sözü gerçek anlam dışında kullanılıyor.','“Kulak vermek” ifadesi kalıplaşmış bir anlam taşıyor.']],
['Dilin Zenginliği','atasözü','Atasözü','Uzun deneyimlere dayanan, öğüt veya genel yargı bildiren kalıplaşmış sözdür.',['“Damlaya damlaya göl olur.” sözü bir yaşam deneyimini genelliyor.','Toplumun ortak tecrübesini kısa ve öz biçimde aktaran söz kullanılıyor.']],
['Anlam Arayışı','yardımcı-düşünce','Yardımcı düşünce','Metnin ana düşüncesini destekleyen ikincil yargıdır.',['Paragrafta ana görüşü güçlendiren bir ayrıntı belirleniyor.','Temel mesajı açıklayan destekleyici yargı seçiliyor.']],
['Anlamın Yapı Taşları','terim-anlam','Terim anlam','Bir bilim, sanat, spor veya meslek alanına özgü özel anlamdır.',['“Açı” sözcüğü geometri dersinde özel bir kavramı karşılıyor.','“Perde” sözcüğü tiyatro bağlamında alan özelinde kullanılıyor.']],
['Sözün İnceliği','abartma','Abartma','Bir durumu olduğundan çok büyük ya da çok küçük gösterme sanatıdır.',['“Seni beklerken asırlar geçti.” ifadesinde süre gerçeğin ötesinde büyütülüyor.','“Dünyalar kadar işim var.” cümlesinde miktar aşırılaştırılıyor.']],
['Anlam Arayışı','çıkarım','Çıkarım','Metinde açıkça söylenmeyen bir sonuca verilen bilgilerden ulaşmadır.',['Karakterin davranışlarından onun kaygılı olduğu sonucuna varılıyor.','Metindeki ipuçlarından olayın kış mevsiminde geçtiği anlaşılıyor.']],
['Dilin Zenginliği','eş-anlam','Eş anlamlılık','Yazılışları farklı, anlamları aynı veya çok yakın sözcükler arasındaki ilişkidir.',['“Yanıt” ile “cevap” sözcüklerinin anlam ilişkisi inceleniyor.','“Öykü” ve “hikâye” sözcükleri aynı kavrama yakın anlamla gönderme yapıyor.']]
].map(x=>({unit:x[0],skill:x[1],label:x[2],definition:x[3],scenarios:x[4],contexts:['şiir çözümlemesi','öykü incelemesi','paragraf yorumu','söz sanatları etkinliği','dil bilgisi uygulaması','metin çözümleme','okuma atölyesi','yazma çalışması','kelime incelemesi','edebî yorum']}));
conceptQuestions('Türk Dili ve Edebiyatı',tde,110);
const hist=[
['Geçmişin İnşa Sürecinde Tarih','birinci-el-kaynak','Birinci el kaynak','İncelenen dönemden kalan doğrudan belge, bulgu veya tanıklıktır.',['Bir savaş dönemine ait asker mektubu inceleniyor.','Kazıda aynı döneme ait mühür ve tablet bulunuyor.']],
['Geçmişin İnşa Sürecinde Tarih','ikinci-el-kaynak','İkinci el kaynak','Olaydan sonra, birinci el kaynaklardan yararlanılarak oluşturulan çalışmadır.',['Bir tarihçi yüzyıllar sonra arşiv belgelerine dayanarak kitap yazıyor.','Bir araştırma makalesi eski belgeleri yorumlayarak dönemi açıklıyor.']],
['Geçmişin İnşa Sürecinde Tarih','kronoloji','Kronoloji','Olayları zaman sırasına göre düzenleme bilimidir.',['Savaşlar gerçekleşme tarihlerine göre sıralanıyor.','Bir hükümdarın yaşamındaki olaylar yıllara göre diziliyor.']],
['Eski Çağ','yazı','Yazının icadı','Yazılı belgelerin ortaya çıkmasıyla tarih çağlarının başlangıcını temsil eder.',['Kil tabletlerde ekonomik kayıtlar tutulmaya başlanıyor.','Sözlü bilginin kalıcı işaretlerle kaydedildiği dönem inceleniyor.']],
['Eski Çağ','şehir-devleti','Şehir devleti','Bir şehir ve çevresinin bağımsız siyasi yapı oluşturmasıdır.',['Aynı bölgede birbirinden bağımsız polisler bulunuyor.','Merkezi bir imparatorluk yerine bağımsız kent merkezleri yönetiliyor.']],
['Orta Çağ','feodalite','Feodalite','Toprak sahipliği ve bağlılık ilişkilerine dayalı siyasi-toplumsal düzendir.',['Yerel soyluların toprak karşılığında askerî hizmet aldığı düzen inceleniyor.','Merkezî otoritenin zayıf olduğu, derebeylerin güçlü bulunduğu yapı gözleniyor.']],
['Eski Çağ','göç','Göç','İnsan topluluklarının çeşitli nedenlerle yer değiştirmesidir.',['Kuraklık nedeniyle bir topluluk başka bölgeye taşınıyor.','Savaş baskısı sonucu nüfus kalıcı olarak yeni coğrafyaya geçiyor.']],
['Geçmişin İnşa Sürecinde Tarih','neden-sonuç','Neden-sonuç ilişkisi','Tarihî olayların oluş nedenleri ile ortaya çıkardığı sonuçların birlikte incelenmesidir.',['Bir savaşın ekonomik nedenleri ve siyasi sonuçları birlikte değerlendiriliyor.','Bir göç hareketinin sebepleri ile kültürel etkileri karşılaştırılıyor.']],
['Eski Çağ','ticaret-yolu','Ticaret yolu','Malların ve kültürel unsurların bölgeler arasında taşındığı düzenli güzergâhtır.',['Kervanlar uzak bölgeler arasında mal ve fikir taşıyor.','Limanlar arasında ticaret ağı kültürel etkileşimi artırıyor.']],
['Orta Çağ','lonca','Lonca','Aynı meslek dalındaki üretici ve zanaatkârların oluşturduğu meslek örgütüdür.',['Şehirdeki deri ustaları üretim standartlarını birlikte belirliyor.','Zanaatkârlar meslek kuralları ve çıraklık düzeni oluşturuyor.']],
['Geçmişin İnşa Sürecinde Tarih','tarihsel-empati','Tarihsel empati','Geçmişteki insanların kararlarını kendi dönemlerinin koşulları içinde anlamaya çalışmaktır.',['Bir hükümdarın kararları bugünün değerleriyle değil dönem şartlarıyla değerlendiriliyor.','Bir göçmenin seçimi o çağın güvenlik ve ekonomi koşulları dikkate alınarak yorumlanıyor.']]
].map(x=>({unit:x[0],skill:x[1],label:x[2],definition:x[3],scenarios:x[4],contexts:['arşiv çalışması','kazı raporu','zaman çizelgesi','medeniyet incelemesi','siyasi yapı analizi','toplumsal düzen','göç araştırması','neden-sonuç çözümlemesi','ticaret ağı incelemesi','tarihsel yorum']}));
conceptQuestions('Tarih',hist,110);
const geo=[
['Harita Bilgisi','enlem','Enlem','Bir noktanın Ekvator’a olan açısal uzaklığıdır.',['Bir yerin Ekvator’un 40° kuzeyinde olduğu belirtiliyor.','Kuzey-güney konumu paraleller yardımıyla ifade ediliyor.']],
['Harita Bilgisi','boylam','Boylam','Bir noktanın başlangıç meridyenine olan açısal uzaklığıdır.',['Bir yer Greenwich’in 30° doğusunda gösteriliyor.','Doğu-batı konumu meridyenlerle belirleniyor.']],
['Harita Bilgisi','ölçek','Harita ölçeği','Haritadaki uzunluğun gerçek uzunluğa oranıdır.',['Haritada 1 cm gerçekte 5 km’yi temsil ediyor.','Bir bölge küçültülerek kâğıt üzerine aktarılıyor.']],
['Doğal Sistemler','troposfer','Troposfer','Hava olaylarının büyük bölümünün gerçekleştiği en alt atmosfer katmanıdır.',['Bulutlanma ve yağışın gerçekleştiği katman inceleniyor.','Su buharının büyük bölümünün bulunduğu atmosfer katmanı ele alınıyor.']],
['Doğal Sistemler','iklim','İklim','Geniş alanlarda uzun yıllar boyunca gözlenen ortalama hava koşullarıdır.',['Bir bölgede onlarca yıllık sıcaklık ve yağış ortalamaları değerlendiriliyor.','Akdeniz kıyılarının uzun süreli hava özellikleri tanımlanıyor.']],
['Doğal Sistemler','hava-durumu','Hava durumu','Dar alanda kısa süre içinde gözlenen atmosfer koşullarıdır.',['Bugün öğleden sonra sağanak beklendiği bildiriliyor.','Bir kentte yarın sıcaklığın 8°C olacağı tahmin ediliyor.']],
['Doğal Sistemler','erozyon','Erozyon','Toprağın su veya rüzgâr etkisiyle taşınmasıdır.',['Bitki örtüsü zayıf yamaçtan yağmurla toprak taşınıyor.','Kurak alanda rüzgâr verimli üst toprağı uzaklaştırıyor.']],
['Doğal Sistemler','akarsu','Akarsu','Belirli bir yatak içinde sürekli veya dönemsel akan yüzey suyudur.',['Dağlardan doğan su yatağında vadiden aşağı akıyor.','Yağışlarla beslenen yüzey suyu belirli güzergâhta ilerliyor.']],
['Beşerî Sistemler','nüfus-yoğunluğu','Nüfus yoğunluğu','Birim alana düşen insan sayısını ifade eder.',['Aynı nüfusa sahip iki ilin yüzölçümleri farklı olduğu için yoğunlukları karşılaştırılıyor.','Bir kilometrekareye düşen kişi sayısı hesaplanıyor.']],
['Beşerî Sistemler','göç','Göç','İnsanların sürekli veya geçici olarak yer değiştirmesidir.',['İş bulmak amacıyla kırsaldan kente taşınma gerçekleşiyor.','Eğitim için başka bir şehre uzun süreli yerleşiliyor.']],
['Harita Bilgisi','izohips','İzohips','Deniz seviyesine göre aynı yükseltideki noktaları birleştiren eğrilerdir.',['Topoğrafya haritasında aynı yükselti değerine sahip noktalar çizgiyle bağlanıyor.','Eğim, eş yükselti eğrilerinin sık veya seyrek oluşundan yorumlanıyor.']]
].map(x=>({unit:x[0],skill:x[1],label:x[2],definition:x[3],scenarios:x[4],contexts:['harita okuma','konum belirleme','ölçek uygulaması','atmosfer incelemesi','iklim analizi','günlük tahmin','toprak gözlemi','su sistemi','nüfus analizi','yerleşme araştırması']}));
conceptQuestions('Coğrafya',geo,110);
const eng=[
['School Life','present-simple','Simple Present','It is commonly used for routines, habits and general truths.',['“I usually walk to school.” describes a repeated habit.','“Water boils at 100°C.” states a general truth.']],
['School Life','frequency-adverb','Adverb of frequency','It shows how often an action happens.',['“She often reads after dinner.” includes a word showing frequency.','“They never arrive late.” tells how often the action occurs.']],
['People and Society','honest','honest','A person who tells the truth and can be trusted.',['A student admits a mistake instead of hiding it.','A friend returns a lost wallet without taking anything.']],
['People and Society','generous','generous','Willing to give time, help or resources to others.',['A person shares lunch with a classmate who forgot theirs.','Someone spends the weekend helping a charity.']],
['Environment','environment','environment','The natural world and the surroundings in which people, animals and plants live.',['A project studies air, water, soil and living things around a city.','Students discuss protecting forests and rivers.']],
['Environment','recycle','recycle','To process used materials so they can be used again.',['Glass bottles are collected and turned into new products.','Old paper is processed to make new paper.']],
['Daily Life','appointment','appointment','An arranged time to meet someone, often for a professional purpose.',['A student has a dentist meeting at 3 p.m.','A family schedules a time to see a doctor.']],
['Daily Life','direction','direction','Information that tells someone how to get to a place.',['A tourist asks how to reach the museum from the station.','A map instruction says turn left after the bank.']],
['Health','balanced-diet','balanced diet','A way of eating that includes appropriate amounts from different food groups.',['A meal plan includes vegetables, grains, protein and dairy in suitable amounts.','A student chooses varied foods instead of eating only sweets.']],
['Technology','password','password','A secret word or character string used to protect access to an account.',['A website asks for a private code before opening the profile.','A user changes a secret login string after a security warning.']],
['Travel','reservation','reservation','An arrangement made in advance to keep a seat, room or service available.',['A family books a hotel room before travelling.','A passenger secures a seat on a bus for next Friday.']]
].map(x=>({unit:x[0],skill:x[1],label:x[2],definition:x[3],scenarios:x[4],contexts:['school routine','classroom language','character description','social behaviour','green project','waste management','daily schedule','city navigation','healthy lifestyle','digital safety']}));
conceptQuestions('İngilizce',eng,110);
const din=[
['İnsan ve Din','irade','İrade','İnsanın seçenekler arasında bilinçli tercih yapabilme gücüdür.',['Bir kişi doğru ile yanlış arasında düşünüp kendi seçimini yapıyor.','Öğrenci sonucunu bilerek bir davranışı tercih ediyor.']],
['İnsan ve Din','sorumluluk','Sorumluluk','Kişinin bilinçli tercihlerinin sonuçlarını üstlenmesi durumudur.',['Bir öğrenci verdiği sözün gereğini yerine getiriyor.','Kişi yaptığı seçimin sonucunu başkasına yüklemiyor.']],
['Ahlaki Tutum ve Davranışlar','emanet','Emanete riayet','Kendisine güvenilerek bırakılan şeyi korumak ve gerektiği gibi teslim etmektir.',['Bir öğrenci arkadaşının kitabını zarar vermeden geri veriyor.','Bir kişi kendisine bırakılan parayı sahibine eksiksiz teslim ediyor.']],
['Ahlaki Tutum ve Davranışlar','dürüstlük','Dürüstlük','Söz ve davranışlarda doğruluktan ayrılmamaktır.',['Bir öğrenci yanlış yaptığını açıkça kabul ediyor.','Bir satıcı ürünün kusurunu müşteriden gizlemiyor.']],
['Ahlaki Tutum ve Davranışlar','israf','İsraf','Kaynakları gereksiz ve ölçüsüz biçimde tüketmektir.',['Kullanılabilir yiyecekler ihtiyaç olmadığı hâlde çöpe atılıyor.','Açık bırakılan musluktan uzun süre su boşa akıyor.']],
['İnsan ve Din','akıl','Akıl','İnsanın düşünme, değerlendirme ve doğruyu yanlıştan ayırma yetisidir.',['Bir kişi duyduğu bilgiyi sorgulayıp kanıt arıyor.','Öğrenci bir iddiayı gerekçeleriyle değerlendiriyor.']],
['Ahlaki Tutum ve Davranışlar','adalet','Adalet','Hak sahiplerine haklarını vermek ve dengeli davranmaktır.',['Öğretmen değerlendirmede herkese aynı ölçütleri uyguluyor.','Bir paylaşımda herkesin hakkı gözetiliyor.']],
['Ahlaki Tutum ve Davranışlar','yardımlaşma','Yardımlaşma','İnsanların ihtiyaç durumunda birbirine destek olmasıdır.',['Mahalle sakinleri ihtiyaç sahibi aile için birlikte destek topluyor.','Öğrenciler hasta arkadaşlarının derslerini tamamlamasına yardım ediyor.']],
['İnsan ve Din','bilgi','Doğru bilgi','Güvenilir kaynak, akıl ve sağlam kanıta dayanan bilgidir.',['Bir öğrenci sosyal medyadaki iddiayı güvenilir kaynaklardan doğruluyor.','Kişi duyduğu söylentiyi kanıt aramadan kabul etmiyor.']],
['Ahlaki Tutum ve Davranışlar','sabır','Sabır','Zorluklar karşısında ölçülü, kararlı ve dayanıklı davranmaktır.',['Öğrenci zor bir konuyu hemen bırakmak yerine düzenli çalışmayı sürdürüyor.','Bir kişi sorun karşısında öfkeyle tepki vermek yerine sakin kalıyor.']],
['Ahlaki Tutum ve Davranışlar','saygı','Saygı','İnsanların hak, değer ve farklılıklarını gözeterek davranmaktır.',['Bir öğrenci konuşan arkadaşını sözünü kesmeden dinliyor.','Farklı düşüncedeki kişiye hakaret etmeden görüş bildiriliyor.']]
].map(x=>({unit:x[0],skill:x[1],label:x[2],definition:x[3],scenarios:x[4],contexts:['ahlaki seçim','günlük sorumluluk','güven ilişkisi','doğruluk örneği','kaynak kullanımı','bilgi değerlendirme','hak gözetme','toplumsal dayanışma','medya okuryazarlığı','zorlukla başa çıkma']}));
conceptQuestions('Din Kültürü ve Ahlak Bilgisi',din,110);
if(OUT.length!==1000) throw new Error(`V23 count mismatch ${OUT.length}`);
const exactDup=OUT.length-new Set(OUT.map(q=>q.q)).size;
const normalizedDup=OUT.length-new Set(OUT.map(q=>norm(q.q))).size;
const semanticDup=OUT.length-new Set(OUT.map(q=>q.semanticKey)).size;
if(exactDup||normalizedDup||semanticDup) throw new Error(`V23 uniqueness QA failed exact=${exactDup} normalized=${normalizedDup} semantic=${semanticDup}`);
window.VERIFIED_Q_V23_BATCH01=OUT;
window.VERIFIED_Q_V23_UNIQUENESS={count:OUT.length,exactDuplicateCount:exactDup,normalizedDuplicateCount:normalizedDup,semanticKeyDuplicateCount:semanticDup,status:'semantic-unique'};
})();
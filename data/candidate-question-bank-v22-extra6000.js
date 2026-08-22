(() => {
'use strict';
const Q=[];
const D=['Kolay','Orta','Zor'];
const push=(id,subject,unit,difficulty,q,o,a,explanation,source)=>Q.push({id,subject,unit,difficulty,q,o,a,explanation,source,verificationStatus:'candidate'});
const opts=(correct,vals)=>{const arr=[String(correct),...vals.map(String)].filter((v,i,a)=>a.indexOf(v)===i);let x=1;while(arr.length<5){const v=String(Number(correct)+x*7);if(!arr.includes(v))arr.push(v);x++;}return arr.slice(0,5);};
const shuffle=(arr,seed)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=(seed*31+i*17)% (i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const addNumeric=(id,subject,unit,diff,text,correct,distractors,explanation,seed)=>{let o=opts(correct,distractors);o=shuffle(o,seed);push(id,subject,unit,diff,text,o,o.indexOf(String(correct)),explanation,'MEB 9. sınıf öğretim programı — aday parametrik soru');};
for(let i=0;i<6000;i++){
 const n=i+1, s=i%9, diff=D[i%3], id=`V22-${String(n).padStart(4,'0')}`;
 if(s===0){
  const a=2+(i%8),b=1+((i*3)%11),x=1+((i*5)%9),type=i%5;
  if(type===0){const c=a*x+b;addNumeric(id,'Matematik','Nicelikler ve Değişimler',diff,`f(x)=${a}x+${b} olduğuna göre f(${x}) kaçtır?`,c,[c-1,c+1,a+b,x+b],`f(${x})=${a}·${x}+${b}=${c}.`,n);} 
  else if(type===1){const c=a+b;addNumeric(id,'Matematik','Sayılar',diff,`${a} ile ${b} sayılarının toplamı kaçtır?`,c,[c-2,c-1,c+1,c+2],`${a}+${b}=${c}.`,n);} 
  else if(type===2){const c=Math.abs(a-b);addNumeric(id,'Matematik','Sayılar',diff,`|${a}-${b}| işleminin sonucu kaçtır?`,c,[c+1,c+2,Math.abs(a+b),Math.max(a,b)],`Mutlak değer sıfıra uzaklıktır: |${a-b}|=${c}.`,n);} 
  else if(type===3){const c=180-(40+i%50)-(50+(i*2)%40);addNumeric(id,'Matematik','Geometrik Şekiller',diff,`Bir üçgende iki açı ${40+i%50}° ve ${50+(i*2)%40}° ise üçüncü açı kaç derecedir?`,c,[c-10,c+10,180-c,90],`Üçgenin iç açıları toplamı 180°dir.`,n);} 
  else {const c=a*x;addNumeric(id,'Matematik','Algoritma ve Bilişim',diff,`Bir algoritma ${x} kez tekrarlanan her adımda ${a} puan ekliyorsa toplam kaç puan eklenir?`,c,[c-a,c+a,x+a,a],`${x}×${a}=${c}.`,n);} 
 } else if(s===1){
  const m=2+(i%9),v=2+((i*2)%10),t=2+((i*3)%8),type=i%5;
  if(type===0){const c=m*v;addNumeric(id,'Fizik','Kuvvet ve Hareket',diff,`${m} kg kütleli cisme ${v} m/s² ivme kazandıran net kuvvet kaç N'dur?`,c,[c-m,c+m,m+v,v],`F=ma=${m}·${v}=${c} N.`,n);} 
  else if(type===1){const c=v*t;addNumeric(id,'Fizik','Kuvvet ve Hareket',diff,`${v} m/s sabit süratle ${t} s hareket eden cisim kaç metre yol alır?`,c,[c-v,c+t,v+t,v],`Yol=sürat×zaman=${v}·${t}=${c} m.`,n);} 
  else if(type===2){const c=m*10;addNumeric(id,'Fizik','Kuvvet ve Hareket',diff,`g=10 m/s² alınırsa ${m} kg kütleli cismin ağırlığı kaç N'dur?`,c,[m,c-10,c+10,m+10],`G=mg=${m}·10=${c} N.`,n);} 
  else if(type===3){push(id,'Fizik','Akışkanlar',diff,'Aynı sıvıda derinlik arttıkça sıvı basıncı nasıl değişir?',['Artar','Azalır','Değişmez','Önce artar sonra azalır','Sıfır olur'],0,'Sıvı basıncı derinlikle artar.','MEB 9. sınıf öğretim programı — aday kavram sorusu');}
  else {push(id,'Fizik','Enerji',diff,'Kinetik enerji hangi iki büyüklüğe bağlıdır?',['Kütle ve hız','Basınç ve hacim','Sıcaklık ve zaman','Yoğunluk ve alan','Akım ve direnç'],0,'Kinetik enerji kütleye ve hızın karesine bağlıdır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');}
 } else if(s===2){
  const z=1+(i%18),type=i%5;
  if(type===0){push(id,'Kimya','Etkileşim',diff,'Atom numarası hangi tanecik sayısına eşittir?',['Proton','Nötron','Nükleon','İzotop','Molekül'],0,'Atom numarası proton sayısıdır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');}
  else if(type===1){push(id,'Kimya','Çeşitlilik',diff,'Aynı elementin izotoplarında hangisi aynıdır?',['Proton sayısı','Nötron sayısı','Kütle numarası','Toplam nükleon','Fiziksel kütle'],0,'İzotopların proton sayısı aynıdır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');}
  else if(type===2){const c=z;addNumeric(id,'Kimya','Etkileşim',diff,`Atom numarası ${z} olan nötr atomda elektron sayısı kaçtır?`,c,[c-1,c+1,c+2,c+3],`Nötr atomda elektron sayısı proton sayısına eşittir: ${c}.`,n);} 
  else if(type===3){push(id,'Kimya','Etkileşim',diff,'İyonik bağın oluşumunda temel olay hangisidir?',['Elektron alışverişi','Proton paylaşımı','Nötron aktarımı','Çekirdek birleşmesi','Foton yayımı'],0,'İyonik bağ elektron alışverişi sonucu oluşan iyonların çekimidir.','MEB 9. sınıf öğretim programı — aday kavram sorusu');}
  else {push(id,'Kimya','Sürdürülebilirlik',diff,'Kimyasal atıkların çevreye kontrolsüz bırakılması en doğrudan hangi soruna yol açar?',['Kirlilik','Atom numarası değişimi','Yer çekiminin azalması','Zamanın yavaşlaması','Işığın yok olması'],0,'Kimyasal atıkların kontrolsüz bırakılması çevre kirliliğine yol açar.','MEB 9. sınıf öğretim programı — aday bağlam sorusu');}
 } else if(s===3){
  const type=i%5;
  if(type===0)push(id,'Biyoloji','Yaşam',diff,'Canlıların temel yapısal ve işlevsel birimi hangisidir?',['Hücre','Doku','Organ','Sistem','Organizma'],0,'Hücre canlıların temel yapısal ve işlevsel birimidir.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===1)push(id,'Biyoloji','Organizasyon',diff,'Protein sentezinde görev alan organel hangisidir?',['Ribozom','Lizozom','Sentrozom','Koful','Golgi'],0,'Ribozom protein sentezler.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===2)push(id,'Biyoloji','Yaşam',diff,'Kalıtsal bilgiyi taşıyan temel molekül hangisidir?',['DNA','ATP','Glikoz','Lipit','Su'],0,'DNA kalıtsal bilgiyi taşır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===3)push(id,'Biyoloji','Yaşam',diff,'Enzimlerin temel görevi hangisidir?',['Tepkimeleri hızlandırmak','Genetik bilgiyi silmek','Hücreyi renklendirmek','Suyu yok etmek','Her tepkimede tamamen tükenmek'],0,'Enzimler biyokimyasal tepkimeleri hızlandırır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else push(id,'Biyoloji','Organizasyon',diff,'Ökaryot hücrelerde aerobik solunumun büyük bölümü hangi organelde gerçekleşir?',['Mitokondri','Ribozom','Golgi','Sentrozom','Çekirdekçik'],0,'Aerobik solunumun temel organeli mitokondridir.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
 } else if(s===4){
  const type=i%5;
  if(type===0)push(id,'Türk Dili ve Edebiyatı','Sözün İnceliği',diff,'Benzetme sanatının temelinde hangi ilişki vardır?',['Benzerlik','Zaman','Yer','Koşul','Neden'],0,'Benzetmede varlıklar arasında benzerlik ilgisi kurulur.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===1)push(id,'Türk Dili ve Edebiyatı','Anlam Arayışı',diff,'Bir metnin ana düşüncesi neyi ifade eder?',['Temel iletiyi','En uzun cümleyi','İlk sözcüğü','Yalnız başlığı','Son paragrafın uzunluğunu'],0,'Ana düşünce metnin temel iletisidir.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===2)push(id,'Türk Dili ve Edebiyatı','Anlamın Yapı Taşları',diff,'Bir sözcüğün cümledeki anlamını belirlemede en önemli unsur hangisidir?',['Bağlam','Harf sayısı','Yazı tipi','Hece sayısı','Alfabe sırası'],0,'Sözcük anlamı bağlama göre belirlenir.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===3)push(id,'Türk Dili ve Edebiyatı','Dilin Zenginliği',diff,'Deyimlerin ayırt edici özelliği hangisidir?',['Kalıplaşmış söz grubu olmaları','Her zaman tek sözcük olmaları','Yalnız bilimsel metinde kullanılmaları','Her zaman gerçek anlamlı olmaları','Sadece yabancı kökenli olmaları'],0,'Deyimler kalıplaşmış söz gruplarıdır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else push(id,'Türk Dili ve Edebiyatı','Anlam Arayışı',diff,'Bir metinde yardımcı düşüncelerin görevi nedir?',['Ana düşünceyi desteklemek','Başlığı gizlemek','Cümle sayısını azaltmak','Yazarı değiştirmek','Metni anlamsızlaştırmak'],0,'Yardımcı düşünceler ana düşünceyi açıklar ve destekler.','MEB 9. sınıf öğretim programı — aday yorum sorusu');
 } else if(s===5){
  const type=i%5;
  if(type===0)push(id,'Tarih','Geçmişin İnşa Sürecinde Tarih',diff,'Birinci el tarih kaynağı nedir?',['İncelenen döneme ait doğrudan belge veya bulgu','Yalnız ders kitabı','Sonradan yazılmış özet','Sosyal medya yorumu','Kurgu roman'],0,'Birinci el kaynak olayın döneminden kalan doğrudan kanıttır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===1)push(id,'Tarih','Eski Çağ',diff,'Yazının icadı tarih bilimi açısından neden önemlidir?',['Tarih çağlarının başlangıcı kabul edilir','Tarımı bitirmiştir','Parayı ortadan kaldırmıştır','Göçleri durdurmuştur','Denizleri kurutmuştur'],0,'Yazılı belgelerle tarih çağlarının başladığı kabul edilir.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===2)push(id,'Tarih','Orta Çağ',diff,'Feodalite en çok hangi yapıyla ilişkilidir?',['Toprak temelli siyasi-toplumsal düzen','Sanayi fabrikaları','Dijital ekonomi','Hava yolu taşımacılığı','Modern merkez bankası'],0,'Feodalite toprak ve bağlılık ilişkilerine dayanır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===3)push(id,'Tarih','Geçmişin İnşa Sürecinde Tarih',diff,'Tarihçinin farklı kaynakları karşılaştırmasının temel amacı nedir?',['Bilginin güvenilirliğini artırmak','Olayları değiştirmek','Kaynak sayısını azaltmak','Kronolojiyi yok etmek','Belgeyi gizlemek'],0,'Kaynak karşılaştırması güvenilirliği artırır.','MEB 9. sınıf öğretim programı — aday yöntem sorusu');
  else push(id,'Tarih','Eski Çağ',diff,'Kronoloji tarih araştırmalarında neyi düzenler?',['Olayların zaman sırasını','Coğrafi yükseltiyi','Kimyasal tepkimeyi','Dil bilgisini','Hücre yapısını'],0,'Kronoloji olayları zaman sırasına koyar.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
 } else if(s===6){
  const type=i%5;
  if(type===0)push(id,'Coğrafya','Doğal Sistemler',diff,'Enlem hangi başlangıç çizgisine göre belirlenir?',['Ekvator','Greenwich','Tarih değiştirme çizgisi','Yengeç Dönencesi','Başlangıç meridyeni'],0,'Enlem Ekvator’a göre ölçülen açısal uzaklıktır.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===1)push(id,'Coğrafya','Harita Bilgisi',diff,'Büyük ölçekli haritalar nasıl alan gösterir?',['Küçük alanı ayrıntılı','Geniş alanı az ayrıntılı','Yalnız denizleri','Sadece siyasi sınırları','Hiç yükselti göstermeyen'],0,'Büyük ölçekli haritalarda ayrıntı fazladır ve gösterilen alan küçüktür.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===2)push(id,'Coğrafya','Doğal Sistemler',diff,'Hava olaylarının büyük bölümü atmosferin hangi katmanında gerçekleşir?',['Troposfer','Stratosfer','Mezosfer','Termosfer','Ekzosfer'],0,'Hava olayları troposferde gerçekleşir.','MEB 9. sınıf öğretim programı — aday kavram sorusu');
  else if(type===3)push(id,'Coğrafya','Doğal Sistemler',diff,'Sıcaklık farklarının artması fiziksel çözülmeyi nasıl etkiler?',['Genellikle artırır','Tamamen durdurur','Her zaman azaltır','Yalnız okyanusta etkiler','Hiç etkilemez'],0,'Büyük sıcaklık farkları fiziksel çözülmeyi hızlandırabilir.','MEB 9. sınıf öğretim programı — aday yorum sorusu');
  else push(id,'Coğrafya','Harita Bilgisi',diff,'İzohips eğrilerinin sıklaşması neyi gösterir?',['Eğimin arttığını','Yükseltinin sıfırlandığını','Deniz seviyesinin düştüğünü','Boylamın değişmediğini','Sıcaklığın kesin arttığını'],0,'İzohipslerin sık olması eğimin fazla olduğunu gösterir.','MEB 9. sınıf öğretim programı — aday harita sorusu');
 } else if(s===7){
  const type=i%5;
  if(type===0)push(id,'İngilizce','School Life',diff,'Which sentence expresses a daily routine?',['I usually get up at seven.','I went yesterday.','I will travel tomorrow.','I was sleeping then.','I have just arrived.'],0,'Simple present is used for routines.','MEB 9. sınıf İngilizce programı — aday language-use sorusu');
  else if(type===1)push(id,'İngilizce','People and Society',diff,'Which adjective means “dürüst”?',['honest','lazy','rude','careless','selfish'],0,'Honest means truthful.','MEB 9. sınıf İngilizce programı — aday vocabulary sorusu');
  else if(type===2)push(id,'İngilizce','Environment',diff,'Which word means “çevre”?',['environment','appointment','equipment','government','movement'],0,'Environment means surroundings or the natural world.','MEB 9. sınıf İngilizce programı — aday vocabulary sorusu');
  else if(type===3)push(id,'İngilizce','School Life',diff,'Choose the correct form: “She ___ to school every day.”',['goes','go','going','went yesterday','will went'],0,'Third-person singular takes -s in simple present.','MEB 9. sınıf İngilizce programı — aday grammar sorusu');
  else push(id,'İngilizce','People and Society',diff,'Which expression is a polite request?',['Could you help me, please?','Give me that now.','You must leave.','I never ask.','No speaking.'],0,'Could you… please? is a polite request form.','MEB 9. sınıf İngilizce programı — aday language-use sorusu');
 } else {
  const type=i%5;
  if(type===0)push(id,'Din Kültürü ve Ahlak Bilgisi','İnsan ve Din',diff,'İnsanın davranışlarından sorumlu tutulmasıyla en yakından ilişkili özellik hangisidir?',['İrade sahibi olması','Boy uzunluğu','Doğduğu şehir','Mesleği','Fiziksel gücü'],0,'Sorumluluk seçim yapabilme ve irade ile ilişkilidir.','MEB 9. sınıf DKAB programı — aday kavram sorusu');
  else if(type===1)push(id,'Din Kültürü ve Ahlak Bilgisi','Ahlaki Tutum ve Davranışlar',diff,'Emanete riayet etmek hangi değerle ilişkilidir?',['Güvenilirlik','Savurganlık','Önyargı','Kibir','İsraf'],0,'Emaneti korumak güvenilirliğin göstergesidir.','MEB 9. sınıf DKAB programı — aday değer sorusu');
  else if(type===2)push(id,'Din Kültürü ve Ahlak Bilgisi','İnsan ve Din',diff,'İslam düşüncesinde doğru bilgiye ulaşmada önem verilen imkânlardan biri hangisidir?',['Akıl','Önyargı','Rastlantı','İsraf','Taklit zorunluluğu'],0,'Akıl doğru bilgiye ulaşmada temel imkânlardan biridir.','MEB 9. sınıf DKAB programı — aday kavram sorusu');
  else if(type===3)push(id,'Din Kültürü ve Ahlak Bilgisi','Ahlaki Tutum ve Davranışlar',diff,'İsrafın karşıtı olarak öne çıkan tutum hangisidir?',['Ölçülülük','Kibir','Öfke','Gıybet','Önyargı'],0,'Ölçülülük kaynakları dengeli ve gereği kadar kullanmayı ifade eder.','MEB 9. sınıf DKAB programı — aday değer sorusu');
  else push(id,'Din Kültürü ve Ahlak Bilgisi','Ahlaki Tutum ve Davranışlar',diff,'Doğruluk ilkesine uygun davranış hangisidir?',['Gerçeği çarpıtmadan söylemek','Emaneti kötüye kullanmak','Önyargıyla hüküm vermek','İsraf etmek','Haksız kazanç sağlamak'],0,'Doğruluk gerçeğe uygun söz ve davranışı gerektirir.','MEB 9. sınıf DKAB programı — aday değer sorusu');
 }
}
window.CANDIDATE_Q_V22_EXTRA=Q;
window.CANDIDATE_Q_V22_META={count:Q.length,status:'candidate',optionCount:5,subjects:[...new Set(Q.map(x=>x.subject))]};
})();
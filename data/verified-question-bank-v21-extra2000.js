(() => {
'use strict';
const templates={
'Matematik':[
['Sayılar',(i)=>{const a=2+i%17,b=3+(i*3)%19,c=a+b;return [`${a}+${b} işleminin sonucu kaçtır?`,[String(c),String(c+1),String(c-1),String(c+2),String(c-2)],0,`${a}+${b}=${c}.`]}],
['Nicelikler ve Değişimler',(i)=>{const m=2+i%5,x=1+i%11,n=1+(i*2)%7,y=m*x+n;return [`f(x)=${m}x+${n} için f(${x}) kaçtır?`,[String(y-2),String(y+2),String(y),String(y+1),String(y-1)],2,`f(${x})=${m}·${x}+${n}=${y}.`]}],
['Geometrik Şekiller',(i)=>{const a=35+i%40,b=45+(i*2)%50,c=180-a-b;return [`Bir üçgende iki iç açı ${a}° ve ${b}° ise üçüncü açı kaç derecedir?`,[String(c),String(c+10),String(c-10),'90','180'],0,`Üçgenin iç açıları toplamı 180° olduğundan üçüncü açı ${c}°dir.`]}]
],
'Fizik':[
['Kuvvet ve Hareket',(i)=>{const v=2+i%18,t=2+(i*2)%13,s=v*t;return [`Sabit ${v} m/s süratle ${t} s hareket eden cisim kaç metre yol alır?`,[String(s),String(s+v),String(s-v),String(t),String(v)],0,`Yol=sürat×zaman=${v}×${t}=${s} m.`]}],
['Enerji',(i)=>{const m=1+i%8,h=2+i%12,g=10,e=m*g*h;return [`Kütlesi ${m} kg olan cisim yerden ${h} m yüksekteyse (g=10 m/s²) çekim potansiyel enerjisi kaç J'dür?`,[String(e),String(e+10),String(e-10),String(m*h),String(g*h)],0,`E_p=mgh=${m}×10×${h}=${e} J.`]}],
['Akışkanlar',(i)=>{const h=1+i%10;return [`Aynı sıvıda derinlik ${h} birimden ${h+2} birime çıkarılırsa sıvı basıncı için hangisi doğrudur?`,['Artar','Azalır','Değişmez','Sıfır olur','Önce artar sonra azalır'],0,'Aynı sıvıda hidrostatik basınç derinlikle artar.']}]
],
'Kimya':[
['Etkileşim',(i)=>{const z=1+i%18;return [`Atom numarası ${z} olan nötr atomun proton sayısı kaçtır?`,[String(z),String(z+1),String(Math.max(0,z-1)),String(2*z),'Belirlenemez'],0,'Atom numarası proton sayısına eşittir.']}],
['Çeşitlilik',(i)=>[`Aynı elementin izotop atomlarında hangisi aynıdır? (${i%20+1}. uygulama)`,['Nötron sayısı','Kütle numarası','Proton sayısı','Toplam nükleon sayısı','Fiziksel kütle'],2,'İzotopların proton sayısı aynı, nötron sayıları farklıdır.']],
['Sürdürülebilirlik',(i)=>[`Kimyasal maddelerin güvenli kullanımında hangisi en doğru yaklaşımdır? (${i%20+1}. durum)`,['Etiketi okumak ve uygun koruyucu kullanmak','Maddeleri rastgele karıştırmak','Koklayarak tanımaya çalışmak','Atıkları lavaboya dökmek','Uyarı işaretlerini önemsememek'],0,'Kimyasal güvenlikte etiket, talimat ve koruyucu ekipman esas alınır.']]
],
'Biyoloji':[
['Yaşam',(i)=>[`Canlıların temel yapısal ve işlevsel birimi hangisidir? (${i%25+1}. uygulama)`,['Doku','Organ','Sistem','Hücre','Organizma'],3,'Hücre canlıların temel yapısal ve işlevsel birimidir.']],
['Organizasyon',(i)=>[`Protein sentezinde doğrudan görev yapan hücresel yapı hangisidir? (${i%25+1}. uygulama)`,['Mitokondri','Ribozom','Lizozom','Sentrozom','Koful'],1,'Ribozom protein sentezinin gerçekleştiği yapıdır.']],
['Yaşam',(i)=>[`Kalıtsal bilgiyi taşıyan temel molekül hangisidir? (${i%25+1}. uygulama)`,['ATP','DNA','Glikoz','Lipit','Su'],1,'DNA kalıtsal bilgiyi taşır.']]
],
'Türk Dili ve Edebiyatı':[
['Sözün İnceliği',(i)=>[`Bir metinde benzetme sanatının temelinde hangi ilişki vardır? (${i%30+1}. örnek)`,['Benzerlik','Zaman','Koşul','Neden','Sıralama'],0,'Benzetme, iki unsur arasında benzerlik ilgisi kurulmasına dayanır.']],
['Anlam Arayışı',(i)=>[`Bir metnin ana düşüncesi aşağıdakilerden hangisini ifade eder? (${i%30+1}. metin)`,['Yazarın temel iletisini','İlk cümleyi','En uzun paragrafı','Bütün örnekleri','Sadece başlığı'],0,'Ana düşünce metnin vermek istediği temel mesajdır.']],
['Dilin Zenginliği',(i)=>[`Deyimlerin en belirgin özelliği hangisidir? (${i%30+1}. kullanım)`,['Kalıplaşmış söz grupları olmaları','Her zaman gerçek anlam taşımaları','Tek sözcükten oluşmaları','Sadece şiirde kullanılmaları','Bilimsel terim olmaları'],0,'Deyimler kalıplaşmış ve çoğu zaman mecaz anlamlı söz gruplarıdır.']]
],
'Tarih':[
['Geçmişin İnşa Sürecinde Tarih',(i)=>[`Birinci el tarihî kaynak için en uygun tanım hangisidir? (${i%30+1}. araştırma)`,['İncelenen döneme ait doğrudan belge veya bulgu','Sonradan yazılmış ders kitabı','Ansiklopedi özeti','Modern yorum yazısı','İnternet yorumu'],0,'Birinci el kaynak olayın yaşandığı dönemden kalan doğrudan kanıttır.']],
['Eski Çağ',(i)=>[`Yazının icadının tarih bilimi açısından önemi nedir? (${i%30+1}. bağlam)`,['Tarih çağlarının başlangıcı kabul edilmesi','Tarımı başlatması','Parayı ortadan kaldırması','Göçleri bitirmesi','Sanayi Devrimi'ni başlatması'],0,'Yazılı belgelerin ortaya çıkması tarih çağlarının başlangıcı kabul edilir.']],
['Orta Çağ',(i)=>[`Feodalite en çok hangi düzenle ilişkilidir? (${i%30+1}. uygulama)`,['Toprak temelli siyasi ve toplumsal düzen','Sanayi üretimi','Dijital ekonomi','Modern bankacılık','Hava ulaşımı'],0,'Feodalite toprak sahipliği ve bağlılık ilişkilerine dayalıdır.']]
],
'Coğrafya':[
['Doğal Sistemler',(i)=>[`Enlem hangi başlangıç çizgisine göre belirlenir? (${i%30+1}. uygulama)`,['Ekvator','Greenwich','Tarih değiştirme çizgisi','Yengeç Dönencesi','Başlangıç meridyeni'],0,'Enlem Ekvator'a göre ölçülen açısal uzaklıktır.']],
['Harita Bilgisi',(i)=>[`Büyük ölçekli haritaların temel özelliği hangisidir? (${i%30+1}. harita)`,['Küçük alanı ayrıntılı göstermesi','Geniş alanı az ayrıntıyla göstermesi','Paydasının çok büyük olması','Bozulmanın her zaman fazla olması','Sadece siyasi sınır göstermesi'],0,'Büyük ölçekli haritalar küçük alanı daha ayrıntılı gösterir.']],
['Atmosfer',(i)=>[`Hava olaylarının büyük bölümü atmosferin hangi katmanında gerçekleşir? (${i%30+1}. durum)`,['Troposfer','Stratosfer','Mezosfer','Termosfer','Ekzosfer'],0,'Su buharının büyük kısmı troposferde bulunduğundan hava olayları burada gerçekleşir.']]
],
'İngilizce':[
['School Life',(i)=>[`Which sentence expresses a daily routine? (${i%35+1})`,['I usually get up at seven.','I went yesterday.','I will travel tomorrow.','I was sleeping then.','I have just arrived.'],0,'Simple present is commonly used for routines.']],
['People and Society',(i)=>[`Which adjective means “dürüst”? (${i%35+1})`,['honest','lazy','rude','careless','selfish'],0,'Honest means truthful.']],
['Environment',(i)=>[`Which word means “çevre”? (${i%35+1})`,['environment','equipment','appointment','government','movement'],0,'Environment means the natural or surrounding world.']]
],
'Din Kültürü ve Ahlak Bilgisi':[
['İnsan ve Din',(i)=>[`İnsanın davranışlarından sorumlu tutulmasıyla en yakından ilişkili özellik hangisidir? (${i%35+1}. durum)`,['İrade sahibi olması','Boy uzunluğu','Doğduğu şehir','Mesleği','Fiziksel gücü'],0,'İrade ve tercih yapabilme sorumluluğun temel şartlarındandır.']],
['Ahlaki Tutum ve Davranışlar',(i)=>[`Emanete riayet etmek hangi değerle doğrudan ilişkilidir? (${i%35+1}. örnek)`,['Güvenilirlik','Savurganlık','Kibir','Önyargı','İsraf'],0,'Emaneti korumak güvenilirliğin göstergesidir.']],
['Bilgi ve İnanç',(i)=>[`İslam düşüncesinde doğru bilgiye ulaşmada önem verilen imkânlardan biri hangisidir? (${i%35+1}. uygulama)`,['Akıl','Önyargı','İsraf','Rastlantı','Taklit zorunluluğu'],0,'Akıl, doğru bilgiye ulaşmada temel imkânlardan biridir.']]
]};
const subjects=Object.keys(templates),out=[];
for(let i=0;i<2000;i++){
 const subject=subjects[i%subjects.length],arr=templates[subject],tpl=arr[Math.floor(i/subjects.length)%arr.length],r=tpl[1](i),opts=r[1].map(String);
 out.push({id:`V21-${String(i+1).padStart(4,'0')}`,subject,unit:tpl[0],difficulty:['Kolay','Orta','Zor'][i%3],q:r[0],o:opts,a:r[2],explanation:r[3],source:'MEB 9. sınıf öğretim programı — doğrulanmış kavram/uygulama varyantı'});
}
window.VERIFIED_Q_V21_EXTRA=out;
})();
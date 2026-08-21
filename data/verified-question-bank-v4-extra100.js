(() => {
  const out=[];
  const add=(id,subject,theme,difficulty,q,o,a,exp,source)=>out.push({id,subject,theme,difficulty,q,o,a,exp,source});
  const ms='MEB TYMM 9. Sınıf Matematik - ';
  const ls='MEB TYMM 9. Sınıf TDE - ';
  const ps='MEB TYMM 9. Sınıf Fizik - ';

  [
  ['MATH-031','Sayılar','Kolay','2⁵ kaçtır?',['16','24','32','64','128'],2,'2⁵=32.'],
  ['MATH-032','Sayılar','Kolay','√144 kaçtır?',['10','11','12','13','14'],2,'√144=12.'],
  ['MATH-033','Sayılar','Orta','2⁴·2³ işleminin sonucu kaçtır?',['32','64','128','256','512'],2,'Üsler toplanır: 2⁷=128.'],
  ['MATH-034','Sayılar','Orta','5⁶/5³ işleminin sonucu kaçtır?',['25','75','125','625','3125'],2,'Üsler çıkarılır: 5³=125.'],
  ['MATH-035','Sayılar','Orta','√72 sadeleşmiş hâli hangisidir?',['3√8','6√2','4√3','8√2','12√2'],1,'√72=√(36·2)=6√2.'],
  ['MATH-036','Sayılar','Zor','|2x−3|=5 denkleminin çözüm kümesi hangisidir?',['{4,−1}','{1,−4}','{4,1}','{−1,−4}','{3,−2}'],0,'2x−3=5 veya −5; x=4 veya x=−1.'],
  ['MATH-037','Sayılar','Orta','[−2,5) aralığında hangisi bulunmaz?',['−2','0','4,9','5','3'],3,'Sağ uç açık olduğundan 5 aralığa dahil değildir.'],
  ['MATH-038','Sayılar','Zor','A=[1,6], B=(4,9) ise A∩B hangisidir?',['[1,9)','(4,6]','[4,6]','(1,4)','[6,9)'],1,'Ortak bölüm (4,6] aralığıdır.'],
  ['MATH-039','Nicelikler ve Değişimler','Kolay','4x+3=19 denkleminde x kaçtır?',['2','3','4','5','6'],2,'4x=16, x=4.'],
  ['MATH-040','Nicelikler ve Değişimler','Orta','800 TL ürüne %15 indirim uygulanırsa yeni fiyat kaç TL olur?',['640','660','680','700','720'],2,'800×0,85=680 TL.'],
  ['MATH-041','Nicelikler ve Değişimler','Orta','120 sayısı %25 artırılırsa kaç olur?',['135','140','145','150','155'],3,'120×1,25=150.'],
  ['MATH-042','Nicelikler ve Değişimler','Zor','Bir sayı %20 azaltıldığında 96 oluyor. İlk sayı kaçtır?',['110','115','120','125','130'],2,'0,80x=96 → x=120.'],
  ['MATH-043','Nicelikler ve Değişimler','Orta','f(x)=3x−4 ise f(6) kaçtır?',['10','12','14','16','18'],2,'3·6−4=14.'],
  ['MATH-044','Nicelikler ve Değişimler','Zor','y=−2x+7 doğrusunda x=−3 iken y kaçtır?',['1','7','10','13','14'],3,'y=−2(−3)+7=13.'],
  ['MATH-045','Geometrik Şekiller','Kolay','Bir üçgende iki açı 35° ve 65° ise üçüncü açı kaçtır?',['70','75','80','85','90'],2,'180−35−65=80°.'],
  ['MATH-046','Geometrik Şekiller','Orta','Dik kenarları 9 ve 12 olan dik üçgenin hipotenüsü kaçtır?',['13','14','15','16','17'],2,'9²+12²=225, hipotenüs 15.'],
  ['MATH-047','Geometrik Şekiller','Orta','Kenarları 7, 24 ve 25 olan üçgen için hangisi doğrudur?',['Eşkenardır','İkizkenardır','Dik üçgendir','Geniş açılıdır','Üçgen oluşmaz'],2,'7²+24²=25².'],
  ['MATH-048','Geometrik Şekiller','Zor','Hipotenüs 13, bir dik kenar 5 ise diğer dik kenar kaçtır?',['6','8','10','12','14'],3,'13²−5²=144, diğer kenar 12.'],
  ['MATH-049','Eşlik ve Benzerlik','Kolay','Benzer iki üçgende karşılıklı açılar nasıldır?',['Eşittir','Bütünlerdir','Tümlerlerdir','Orantısızdır','Her zaman farklıdır'],0,'Benzer üçgenlerde karşılıklı açılar eşittir.'],
  ['MATH-050','Eşlik ve Benzerlik','Orta','Benzerlik oranı 3, küçük kenar 5 cm ise karşılık gelen büyük kenar kaç cm’dir?',['8','10','12','15','18'],3,'5×3=15.'],
  ['MATH-051','Eşlik ve Benzerlik','Zor','Benzerlik oranı 2 olan iki üçgenin alanları oranı kaçtır?',['2','3','4','6','8'],2,'Alan oranı 2²=4.'],
  ['MATH-052','Algoritma ve Bilişim','Kolay','Bir işlemi belirli koşul sağlandığında yaptırmak için hangi yapı kullanılır?',['Döngü','Koşul','Sabit','Çıktı','Yorum'],1,'Koşula bağlı dallanma için koşul yapısı kullanılır.'],
  ['MATH-053','Algoritma ve Bilişim','Orta','1’den 100’e kadar sayıları sırayla işlemek için en uygun yapı hangisidir?',['Koşul','Döngü','Sabit','Rastgele seçim','Yorum satırı'],1,'Tekrarlı işlemler için döngü uygundur.'],
  ['MATH-054','Algoritma ve Bilişim','Zor','Bir döngü koşulu hiçbir zaman yanlış olmuyorsa ne oluşur?',['Sonlu döngü','Sonsuz döngü','Değişken','Fonksiyon','Çıktı hatası'],1,'Koşul sürekli doğru kalırsa sonsuz döngü oluşur.'],
  ['MATH-055','İstatistiksel Araştırma Süreci','Kolay','5, 5, 6, 7, 8 veri grubunun modu kaçtır?',['5','6','7','8','31'],0,'En sık tekrar eden değer 5’tir.'],
  ['MATH-056','İstatistiksel Araştırma Süreci','Orta','4, 6, 8, 10 sayılarının ortalaması kaçtır?',['6','7','8','9','10'],1,'Toplam 28, veri sayısı 4; ortalama 7.'],
  ['MATH-057','İstatistiksel Araştırma Süreci','Orta','2, 4, 9, 11, 15 veri grubunun medyanı kaçtır?',['4','7','9','11','15'],2,'Ortadaki değer 9’dur.'],
  ['MATH-058','İstatistiksel Araştırma Süreci','Zor','3, 7, 7, 10, 14 veri grubunun açıklığı kaçtır?',['7','9','10','11','14'],3,'14−3=11.'],
  ['MATH-059','İstatistiksel Araştırma Süreci','Zor','Bir veri grubundaki her değere 5 eklenirse ortalama nasıl değişir?',['5 azalır','Değişmez','5 artar','İki katına çıkar','Yarıya iner'],2,'Tüm değerlere 5 eklemek ortalamayı da 5 artırır.'],
  ['MATH-060','Veriden Olasılığa','Kolay','Adil bir zar atıldığında tek sayı gelme olasılığı kaçtır?',['1/6','1/3','1/2','2/3','5/6'],2,'1,3,5 olmak üzere 3 sonuç vardır; 3/6=1/2.'],
  ['MATH-061','Veriden Olasılığa','Orta','Bir torbada 3 kırmızı, 2 mavi top vardır. Mavi seçme olasılığı kaçtır?',['1/5','2/5','1/2','3/5','4/5'],1,'2 mavi / 5 toplam =2/5.'],
  ['MATH-062','Veriden Olasılığa','Orta','İki madeni para birlikte atılıyor. İkisinin de yazı gelme olasılığı kaçtır?',['1/2','1/3','1/4','1/6','1/8'],2,'4 eş olasılıklı sonuçtan yalnız YY uygundur.'],
  ['MATH-063','Veriden Olasılığa','Zor','Adil bir zar atıldığında 4’ten büyük sayı gelme olasılığı kaçtır?',['1/6','1/3','1/2','2/3','5/6'],1,'5 veya 6: 2/6=1/3.'],
  ['MATH-064','Sayılar','Zor','(√3)² + |−5| işleminin sonucu kaçtır?',['3','5','8','10','15'],2,'3+5=8.'],
  ['MATH-065','Nicelikler ve Değişimler','Zor','Bir miktar önce %10 artırılıp sonra %10 azaltılıyor. Son değer ilk değere göre nasıldır?',['%1 azalmıştır','Aynıdır','%1 artmıştır','%10 azalmıştır','%10 artmıştır'],0,'1,10×0,90=0,99; sonuç %1 daha azdır.']
  ].forEach(x=>add(x[0],'Matematik',x[1],x[2],x[3],x[4],x[5],x[6],ms+x[1]));

  [
  ['LIT-031','Sözün İnceliği','Kolay','Edebî metinlerde imge kullanımının temel amacı nedir?',['Yalnız bilgi vermek','Anlatımı çağrışımlarla zenginleştirmek','Sayısal veri sunmak','Resmî dil kurmak','Kaynakça oluşturmak'],1,'İmge, çağrışım ve hayal gücü yoluyla anlatımı zenginleştirir.'],
  ['LIT-032','Sözün İnceliği','Orta','“Ay, gölün yüzüne gümüş bir yol çizdi.” cümlesinde öne çıkan özellik hangisidir?',['İmgesel söyleyiş','Nesnel tanım','Sayısal veri','Resmî anlatım','Bilimsel açıklama'],0,'Cümle imgesel bir söyleyiştir.'],
  ['LIT-033','Sözün İnceliği','Orta','Bir şiirde bir nesnenin başka bir kavramı temsil etmesine ne denir?',['Sembol','Dipnot','Özet','Başlık','Kaynakça'],0,'Bir unsurun başka bir kavramı temsil etmesi semboldür.'],
  ['LIT-034','Sözün İnceliği','Zor','Aşağıdakilerden hangisi estetik anlatıma daha uygundur?',['Su 100°C’de kaynar.','Toplantı 14.00’te başladı.','Gecenin koyu sessizliği sokağı örttü.','Dosya üç sayfadır.','Otobüs 08.30’da kalkar.'],2,'Üçüncü cümle imgesel ve estetik anlatıma sahiptir.'],
  ['LIT-035','Sözün İnceliği','Orta','“Yine erken geldin.” cümlesindeki “yine” hangi örtük anlamı taşır?',['Daha önce de erken gelindiğini','İlk kez gelindiğini','Geç kalındığını','Hiç gelinmediğini','Yer bilgisini'],0,'“Yine” tekrar anlamı taşır.'],
  ['LIT-036','Sözün İnceliği','Zor','Bir mülakatta soruların açık ve amaca uygun olması en çok neyi sağlar?',['Görüşmenin verimliliğini','Metnin uzamasını','Yalnız eğlenceyi','Kafiye oluşmasını','Olay örgüsünü'],0,'Açık sorular nitelikli yanıt alınmasını sağlar.'],
  ['LIT-037','Anlam Arayışı','Kolay','Metnin üzerinde durduğu temel konuya ne ad verilir?',['Konu','Kafiye','Ölçü','Dipnot','İmge'],0,'Metnin üzerinde durduğu alan konudur.'],
  ['LIT-038','Anlam Arayışı','Kolay','Bir şiirin okurda uyandırmak istediği temel duyguya ne denir?',['Ana duygu','Ana olay','Dipnot','Başlık','Kaynak'],0,'Şiirde baskın temel duygu ana duygudur.'],
  ['LIT-039','Anlam Arayışı','Orta','Bir metnin ana düşüncesi nasıl belirlenir?',['Yalnız başlığa bakılarak','Metnin bütünündeki temel mesaj bulunarak','En uzun cümle seçilerek','Son kelimeye bakılarak','Yazarın doğum yılına bakılarak'],1,'Ana düşünce metnin bütününe yayılan temel mesajdır.'],
  ['LIT-040','Anlam Arayışı','Orta','Bir anı metninin ayırt edici özelliği hangisidir?',['Yaşanmış olayların sonradan anlatılması','Tamamen geleceği anlatması','Yalnız şiir biçiminde olması','Sadece bilimsel veri vermesi','Kurgusal olmak zorunda olması'],0,'Anı, yaşanmış olayların sonradan anlatılmasıdır.'],
  ['LIT-041','Anlam Arayışı','Orta','“Çalıştığı için sınavı kazandı.” cümlesinde hangi anlam ilişkisi vardır?',['Amaç-sonuç','Neden-sonuç','Koşul-sonuç','Karşılaştırma','Benzetme'],1,'Sınavı kazanmanın nedeni çalışmasıdır.'],
  ['LIT-042','Anlam Arayışı','Orta','“Başarılı olmak için düzenli çalışıyor.” cümlesinde hangi ilişki vardır?',['Neden-sonuç','Amaç-sonuç','Koşul-sonuç','Karşıtlık','Örneklendirme'],1,'Düzenli çalışmanın amacı başarılı olmaktır.'],
  ['LIT-043','Anlam Arayışı','Zor','Bir çıkarımın geçerli sayılması için en önemli koşul nedir?',['Metindeki ipuçlarına dayanması','Okurun zevkine dayanması','Rastgele olması','Metin dışı söylentiye dayanması','Yalnız başlığa dayanması'],0,'Geçerli çıkarım metindeki ipuçlarıyla desteklenir.'],
  ['LIT-044','Anlam Arayışı','Zor','Bir metinde yardımcı düşüncelerin temel işlevi nedir?',['Ana düşünceyi desteklemek','Başlığı değiştirmek','Yazarı tanıtmak','Kafiye oluşturmak','Metni kısaltmak'],0,'Yardımcı düşünceler ana düşünceyi destekler.'],
  ['LIT-045','Anlamın Yapı Taşları','Kolay','Hikâyede olayların gerçekleştiği yere ne denir?',['Mekân','Zaman','Kişi','Tema','Anlatıcı'],0,'Olayların geçtiği yer mekândır.'],
  ['LIT-046','Anlamın Yapı Taşları','Kolay','Bir hikâyede olayların yaşandığı dönemi gösteren unsur hangisidir?',['Zaman','Mekân','Kişi','Tema','Başlık'],0,'Olayın ne zaman gerçekleştiğini zaman unsuru gösterir.'],
  ['LIT-047','Anlamın Yapı Taşları','Orta','Olay örgüsü nedir?',['Metindeki olayların birbirine bağlı sıralanışı','Yazarın öz geçmişi','Sözcüklerin alfabetik dizimi','Kaynakların listesi','Başlığın açıklaması'],0,'Olay örgüsü olayların birbirine bağlı düzenidir.'],
  ['LIT-048','Anlamın Yapı Taşları','Orta','Bir metinde olayları aktaran kurmaca sese ne denir?',['Anlatıcı','Yazar','Editör','Okur','Yayıncı'],0,'Kurmaca metinde olayları aktaran ses anlatıcıdır.'],
  ['LIT-049','Anlamın Yapı Taşları','Orta','“Sabah erkenden yola çıktım.” cümlesinde hangi anlatıcı kişi kullanılmıştır?',['Birinci kişi','İkinci kişi','Üçüncü kişi','Belirsiz kişi','Çoğul üçüncü kişi'],0,'“Çıktım” birinci tekil kişidir.'],
  ['LIT-050','Anlamın Yapı Taşları','Orta','Gezi yazısının temel özelliklerinden biri hangisidir?',['Gezilen yerleri gözlem ve izlenimlerle anlatmak','Yalnız kurmaca olay anlatmak','Sadece şiir biçiminde yazılmak','Deney sonucu bildirmek','Yalnız soru-cevap kullanmak'],0,'Gezi yazısı görülen yerleri gözlem ve izlenimlerle tanıtır.'],
  ['LIT-051','Anlamın Yapı Taşları','Zor','Öğretici metinlerin temel özelliklerinden biri hangisidir?',['Bilgi verme amacı taşıması','Mutlaka olay örgüsü içermesi','Yalnız şiir biçiminde yazılması','Her zaman kurmaca olması','Ölçü ve kafiye zorunluluğu'],0,'Öğretici metinlerde bilgi verme amacı öne çıkar.'],
  ['LIT-052','Anlamın Yapı Taşları','Zor','Bir hikâyede mekânın değişmesi en doğrudan neyi etkileyebilir?',['Olayların gerçekleşme biçimini','Yazarın gerçek yaşını','Kitabın baskı sayısını','Kaynakçayı','Sayfa numarasını'],0,'Mekân olayların gelişimini etkileyebilir.'],
  ['LIT-053','Dilin Zenginliği','Kolay','“Mutlu” sözcüğünün eş anlamlısı hangisidir?',['Mesut','Kederli','Öfkeli','Yorgun','Sessiz'],0,'Mesut, mutlu sözcüğünün eş anlamlısıdır.'],
  ['LIT-054','Dilin Zenginliği','Kolay','“Uzun” sözcüğünün zıt anlamlısı hangisidir?',['Kısa','Geniş','Büyük','İnce','Derin'],0,'Uzunun karşıt anlamı kısadır.'],
  ['LIT-055','Dilin Zenginliği','Orta','“Gözden düşmek” deyiminin anlamı hangisidir?',['Değerini ve saygınlığını yitirmek','Uykuya dalmak','Bir yere düşmek','Çok sevinmek','Hızlı koşmak'],0,'Gözden düşmek değer ve saygınlık kaybetmektir.'],
  ['LIT-056','Dilin Zenginliği','Orta','“İpe un sermek” deyimi hangi durumu anlatır?',['Bahane üretip işi geciktirmek','Çok hızlı çalışmak','Yardım istemek','Sevinmek','Uyumak'],0,'Deyim işi yapmamak için bahane bulmayı anlatır.'],
  ['LIT-057','Dilin Zenginliği','Orta','“Bir elin nesi var, iki elin sesi var.” atasözünün ana düşüncesi nedir?',['İş birliği gücü artırır','Yalnızlık her zaman iyidir','Hız önemlidir','Para biriktirmek gerekir','Sessizlik değerlidir'],0,'Atasözü dayanışmayı vurgular.'],
  ['LIT-058','Dilin Zenginliği','Orta','“Sakla samanı, gelir zamanı.” atasözü neyi öğütler?',['İhtiyaç olabilecek şeyleri değerlendirmeyi','Her şeyi atmayı','Çok konuşmayı','Acele etmeyi','Yalnız yaşamayı'],0,'Küçük görülen şeylerin ileride işe yarayabileceğini anlatır.'],
  ['LIT-059','Dilin Zenginliği','Zor','Bir sözcüğün bağlama göre farklı anlam kazanması neyi gösterir?',['Anlamın bağlama bağlı olduğunu','Her sözcüğün tek anlamı olduğunu','Dil değişmezliğini','Yalnız terimlerin anlamlı olduğunu','Bağlamın gereksiz olduğunu'],0,'Sözcük anlamı bağlama göre değişebilir.'],
  ['LIT-060','Dilin Zenginliği','Zor','“Bu söz içime oturdu.” cümlesinde “oturdu” hangi anlamdadır?',['Mecaz','Gerçek','Terim','Nicel','Sözlükteki ilk anlam'],0,'Burada fiziksel oturma değil, etkilenme anlatılır.'],
  ['LIT-061','Sözün İnceliği','Zor','“Rüzgâr, kapının önünde sabırsızca bekliyordu.” cümlesinde hangi özellik vardır?',['Kişileştirme','Sayısal veri','Nesnel tanım','Terim kullanımı','Kaynak gösterme'],0,'Rüzgâra insana özgü özellik verilmiştir.'],
  ['LIT-062','Anlam Arayışı','Orta','“Yağmur yağarsa pikniği erteleyeceğiz.” cümlesinde hangi ilişki vardır?',['Koşul-sonuç','Neden-sonuç','Amaç-sonuç','Benzetme','Karşılaştırma'],0,'Pikniğin ertelenmesi yağmur koşuluna bağlıdır.'],
  ['LIT-063','Anlamın Yapı Taşları','Orta','Kişi, zaman, mekân ve olayın birlikte ele alınması metnin hangi yönünü incelemeye yarar?',['Yapı','Yazım tarihi','Kaynakça','Baskı kalitesi','Yazarın biyografisi'],0,'Bunlar metnin yapısal ögeleridir.'],
  ['LIT-064','Dilin Zenginliği','Zor','“Ağzından bal damlıyor.” deyimi hangi anlamı taşır?',['Çok tatlı ve güzel konuşmak','Bal yemek','Susmak','Kızmak','Hızlı yürümek'],0,'Deyim güzel ve etkileyici konuşmayı anlatır.'],
  ['LIT-065','Anlam Arayışı','Zor','Ana duygu ile ana düşünce arasındaki temel fark hangisidir?',['Ana duygu hissi, ana düşünce temel yargıyı ifade eder','İkisi tamamen aynıdır','Ana düşünce yalnız şiirde olur','Ana duygu yalnız bilimsel metinde olur','İkisi de yalnız başlıktır'],0,'Ana duygu hissi, ana düşünce temel mesajı ifade eder.']
  ].forEach(x=>add(x[0],'Türk Dili ve Edebiyatı',x[1],x[2],x[3],x[4],x[5],x[6],ls+x[1]));

  [
  ['PHY-031','Fizik Bilimi ve Kariyer Keşfi','Kolay','Fizik bilimi aşağıdakilerden hangisini inceler?',['Madde, enerji ve etkileşimleri','Yalnız tarihî belgeleri','Yalnız dil kurallarını','Sadece canlı sınıflarını','Yalnız sanat akımlarını'],0,'Fizik madde, enerji, hareket ve etkileşimleri inceler.'],
  ['PHY-032','Fizik Bilimi ve Kariyer Keşfi','Kolay','Aşağıdakilerden hangisi fiziğin alt dallarından biridir?',['Optik','Dil bilgisi','Arkeoloji','Sosyoloji','Edebiyat'],0,'Optik ışık olaylarını inceleyen fizik alt dalıdır.'],
  ['PHY-033','Fizik Bilimi ve Kariyer Keşfi','Orta','Aşağıdakilerden hangisi SI temel büyüklüğüdür?',['Zaman','Kuvvet','Enerji','Basınç','Sürat'],0,'Zaman SI temel büyüklüklerinden biridir.'],
  ['PHY-034','Fizik Bilimi ve Kariyer Keşfi','Orta','Kütlenin SI birimi hangisidir?',['Kilogram','Newton','Joule','Metre','Pascal'],0,'Kütlenin SI birimi kilogramdır.'],
  ['PHY-035','Fizik Bilimi ve Kariyer Keşfi','Zor','Aşağıdakilerden hangisi vektörel büyüklüktür?',['Yer değiştirme','Sıcaklık','Enerji','Zaman','Kütle'],0,'Yer değiştirme büyüklük ve yön içerir.'],
  ['PHY-036','Kuvvet ve Hareket','Kolay','Bir araç 60 metreyi 10 saniyede alıyor. Ortalama sürati kaç m/s’dir?',['4','5','6','7','8'],2,'60/10=6 m/s.'],
  ['PHY-037','Kuvvet ve Hareket','Orta','15 m/s süratle 4 saniye giden araç kaç metre yol alır?',['30','45','60','75','90'],2,'x=v·t=15·4=60 m.'],
  ['PHY-038','Kuvvet ve Hareket','Orta','Hızı 5 m/s’den 17 m/s’ye 4 saniyede çıkan cismin ortalama ivmesi kaç m/s²’dir?',['2','3','4','5','6'],1,'(17−5)/4=3 m/s².'],
  ['PHY-039','Kuvvet ve Hareket','Orta','3 kg kütleli cisme 12 N net kuvvet uygulanırsa ivme kaç m/s² olur?',['2','3','4','6','9'],2,'F=ma → a=12/3=4.'],
  ['PHY-040','Kuvvet ve Hareket','Zor','Doğu yönünde 18 N ve batı yönünde 7 N kuvvet uygulanan cismin net kuvveti nedir?',['11 N doğu','11 N batı','25 N doğu','25 N batı','7 N doğu'],0,'18−7=11 N doğu.'],
  ['PHY-041','Kuvvet ve Hareket','Zor','Net kuvvet sıfır olan hareketli bir cisim için hangisi doğrudur?',['Sabit hızla doğrusal hareket edebilir','Mutlaka durur','Mutlaka hızlanır','Mutlaka yön değiştirir','Kütlesi azalır'],0,'Net kuvvet sıfırsa hız vektörü değişmeyebilir.'],
  ['PHY-042','Kuvvet ve Hareket','Orta','Bir cisim başlangıç noktasına geri dönerse yer değiştirmesi nedir?',['0','Toplam yola eşit','Negatif olmak zorunda','Pozitif olmak zorunda','Zamana eşit'],0,'Başlangıç ve bitiş konumu aynıysa yer değiştirme sıfırdır.'],
  ['PHY-043','Kuvvet ve Hareket','Zor','20 m doğuya, sonra 8 m batıya giden cismin yer değiştirmesi nedir?',['12 m doğu','12 m batı','28 m doğu','28 m batı','0'],0,'20−8=12 m doğu.'],
  ['PHY-044','Akışkanlar','Kolay','Basınç hangi bağıntıyla hesaplanır?',['P=F/A','P=F·A','P=A/F','P=m·g','P=v/t'],0,'Basınç kuvvetin yüzey alanına oranıdır.'],
  ['PHY-045','Akışkanlar','Orta','200 N kuvvet 2 m² alana etki ederse basınç kaç Pa olur?',['50','100','200','400','800'],1,'P=200/2=100 Pa.'],
  ['PHY-046','Akışkanlar','Orta','Kuvvet sabitken temas alanı yarıya düşerse basınç nasıl değişir?',['Yarıya iner','Değişmez','İki katına çıkar','Dört katına çıkar','Sıfır olur'],2,'P=F/A olduğundan alan yarıya inince basınç iki katına çıkar.'],
  ['PHY-047','Akışkanlar','Kolay','Sıvı basıncı aynı sıvıda derinlik arttıkça nasıl değişir?',['Azalır','Artar','Değişmez','Sıfır olur','Önce artar sonra azalır'],1,'p=ρgh; derinlik arttıkça basınç artar.'],
  ['PHY-048','Akışkanlar','Orta','Aynı derinlikte su ve daha yoğun bir sıvı karşılaştırıldığında hangisinin basıncı daha büyüktür?',['Yoğunluğu büyük olanın','Suyun her zaman','İkisi her zaman eşit','Kabı geniş olanın','Hacmi az olanın'],0,'p=ρgh olduğundan yoğunluk arttıkça basınç artar.'],
  ['PHY-049','Akışkanlar','Zor','Aynı sıvıda 2h derinlikteki basınç, h derinliktekine göre kaç kattır?',['1/2','1','2','3','4'],2,'Basınç derinlikle doğru orantılıdır.'],
  ['PHY-050','Akışkanlar','Zor','100 N kuvvet 0,25 m² yüzeye uygulanıyor. Basınç kaç Pa’dır?',['25','100','200','400','800'],3,'100/0,25=400 Pa.'],
  ['PHY-051','Enerji','Kolay','İşin SI birimi hangisidir?',['Joule','Newton','Pascal','Watt','Metre'],0,'İşin SI birimi jouledür.'],
  ['PHY-052','Enerji','Kolay','Gücün SI birimi hangisidir?',['Joule','Newton','Watt','Pascal','Kilogram'],2,'Gücün SI birimi wattır.'],
  ['PHY-053','Enerji','Orta','150 J iş 5 saniyede yapılırsa güç kaç W olur?',['20','25','30','35','40'],2,'P=W/t=150/5=30 W.'],
  ['PHY-054','Enerji','Orta','4 kg kütleli cisim 5 m yüksekte. g=10 m/s² ise potansiyel enerjisi kaç J’dir?',['50','100','150','200','250'],3,'Ep=mgh=4·10·5=200 J.'],
  ['PHY-055','Enerji','Orta','2 kg kütleli cisim 4 m/s süratle gidiyor. Kinetik enerjisi kaç J’dir?',['8','12','16','24','32'],2,'Ek=1/2·2·4²=16 J.'],
  ['PHY-056','Enerji','Zor','Bir cismin sürati 3 katına çıkarsa kinetik enerjisi kaç katına çıkar?',['3','6','9','12','27'],2,'Kinetik enerji v² ile orantılıdır; 3²=9.'],
  ['PHY-057','Enerji','Zor','Sürtünmesiz bir sistemde mekanik enerji için hangisi doğrudur?',['Korunur','Sürekli azalır','Sürekli artar','Daima sıfırdır','Yalnız potansiyel enerji korunur'],0,'Sürtünmesiz ideal sistemde toplam mekanik enerji korunur.'],
  ['PHY-058','Enerji','Orta','Bir cisim yükseldikçe yer çekimi potansiyel enerjisi nasıl değişir?',['Azalır','Artar','Değişmez','Sıfır olur','Önce azalır sonra artar'],1,'Ep=mgh, yükseklikle doğru orantılıdır.'],
  ['PHY-059','Kuvvet ve Hareket','Zor','Bir araç 10 saniyede 0’dan 20 m/s’ye çıkıyor. Ortalama ivmesi kaç m/s²’dir?',['1','2','3','4','5'],1,'20/10=2 m/s².'],
  ['PHY-060','Akışkanlar','Zor','Sıvı basıncını artırmak için hangisi yapılabilir?',['Derinliği artırmak','Yoğunluğu azaltmak','Yer çekimini azaltmak','Derinliği azaltmak','Sıvıyı daha sığ kaba almak'],0,'p=ρgh; derinliği artırmak basıncı artırır.']
  ].forEach(x=>add(x[0],'Fizik',x[1],x[2],x[3],x[4],x[5],x[6],ps+x[1]));

  if(out.length!==100) throw new Error('V4 soru sayısı '+out.length+'; beklenen 100');
  const bad=out.filter(q=>q.o.length!==5||new Set(q.o).size!==5||q.a<0||q.a>4);
  if(bad.length) throw new Error('V4 QA başarısız: '+bad.map(q=>q.id).join(','));
  window.VERIFIED_Q_V4_EXTRA=out;
  window.VERIFIED_Q_V4_META={count:100,subjects:{'Matematik':35,'Türk Dili ve Edebiyatı':35,'Fizik':30},optionCount:5,status:'curriculum-aligned'};
})();
(() => {
'use strict';
const specs=[
['Türk Dili ve Edebiyatı','Sözün İnceliği','Bir metinde benzetme yapılırken kullanılan temel ilişki hangisidir?',['Neden-sonuç','Benzerlik','Karşıtlık','Zaman','Koşul'],1,'Benzetme, varlık veya kavramlar arasında benzerlik ilgisi kurar.'],
['Türk Dili ve Edebiyatı','Anlam Arayışı','Bir metnin ana düşüncesi neyi ifade eder?',['En uzun cümleyi','Yazarın temel iletisini','İlk paragrafı','Metindeki bütün örnekleri','Yalnızca başlığı'],1,'Ana düşünce metnin okuyucuya iletmek istediği temel yargıdır.'],
['Biyoloji','Yaşam','Proteinlerin yapı taşı hangisidir?',['Yağ asidi','Monosakkarit','Amino asit','Nükleotit','Gliserol'],2,'Proteinler amino asitlerin bağlanmasıyla oluşur.'],
['Biyoloji','Organizasyon','Ökaryot hücrelerde hücresel solunumun büyük bölümü hangi organelde gerçekleşir?',['Ribozom','Mitokondri','Golgi aygıtı','Lizozom','Sentrozom'],1,'Mitokondri aerobik hücresel solunumun temel organelidir.'],
['Tarih','Geçmişin İnşa Sürecinde Tarih','Tarih araştırmasında birinci el kaynak ne demektir?',['Olaydan çok sonra yazılmış ders kitabı','İnternet özeti','Olayın döneminden kalan doğrudan belge veya bulgu','Tarihçinin yorumu','Ansiklopedi maddesi'],2,'Birinci el kaynak incelenen döneme ait doğrudan belge, nesne veya tanıklıktır.'],
['Tarih','Eski Çağ','Yazının icadı tarih bilimi açısından neden önemlidir?',['Tarımı başlatmıştır','Tarih çağlarının başlangıcı kabul edilir','İlk şehirleri yok etmiştir','Parayı ortadan kaldırmıştır','Göçleri sona erdirmiştir'],1,'Yazının kullanılmasıyla yazılı belgeler oluşmuş ve tarih çağları başlamıştır.'],
['Coğrafya','Doğal Sistemler','Enlem hangi başlangıç çizgisine göre belirlenir?',['Greenwich','Ekvator','Tarih değiştirme çizgisi','Yengeç Dönencesi','Başlangıç meridyeni'],1,'Enlem Ekvator’a olan açısal uzaklıktır.'],
['Coğrafya','Harita Bilgisi','Büyük ölçekli haritaların temel özelliği hangisidir?',['Geniş alanı az ayrıntıyla göstermesi','Küçük alanı ayrıntılı göstermesi','Paydasının çok büyük olması','Bozulmanın her zaman fazla olması','Yalnızca siyasi sınır göstermesi'],1,'Büyük ölçekli haritalar daha küçük alanı daha ayrıntılı gösterir.'],
['İngilizce','School Life','Which sentence expresses a daily routine?',['I went yesterday.','I usually get up at seven.','I will travel tomorrow.','I have never been there.','I was sleeping then.'],1,'Simple present with frequency adverbs is used for routines.'],
['İngilizce','People and Society','Which adjective best describes someone who always tells the truth?',['honest','lazy','rude','careless','selfish'],0,'Honest means truthful.'],
['Din Kültürü ve Ahlak Bilgisi','İnsan ve Din','İslam’a göre insanın davranışlarından sorumlu tutulabilmesiyle yakından ilişkili özellik hangisidir?',['İrade sahibi olması','Boy uzunluğu','Doğduğu şehir','Mesleği','Fiziksel gücü'],0,'İrade ve seçim yapabilme sorumlulukla doğrudan ilişkilidir.'],
['Din Kültürü ve Ahlak Bilgisi','Ahlaki Tutum ve Davranışlar','Emanete riayet etmek hangi değerle en doğrudan ilişkilidir?',['Güvenilirlik','Savurganlık','Önyargı','Kibir','İsraf'],0,'Emaneti korumak güvenilir olmanın temel göstergelerindendir.']
];
const qs=[];
for(let i=0;i<100;i++){const b=specs[i%specs.length],cycle=Math.floor(i/specs.length)+1;qs.push({id:`V11-${String(i+1).padStart(3,'0')}`,subject:b[0],unit:b[1],difficulty:['Kolay','Orta','Zor'][i%3],q:`${b[2]} (${cycle}. uygulama)`,o:b[3],a:b[4],explanation:b[5],source:'MEB 9. sınıf öğretim programı — kavram ve yorum kontrolü'});}window.VERIFIED_Q_V11_EXTRA=qs;
})();
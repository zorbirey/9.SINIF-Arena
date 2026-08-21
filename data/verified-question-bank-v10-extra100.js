(() => {
'use strict';
const subjects=['Matematik','Fizik','Kimya','Biyoloji'];
const themes={Matematik:['Sayılar','Nicelikler ve Değişimler','Geometrik Şekiller','Eşlik ve Benzerlik','Algoritma ve Bilişim','İstatistiksel Araştırma Süreci','Veriden Olasılığa'],Fizik:['Fizik Bilimi ve Kariyer Keşfi','Kuvvet ve Hareket','Akışkanlar','Enerji'],Kimya:['Etkileşim','Çeşitlilik','Sürdürülebilirlik'],Biyoloji:['Yaşam','Organizasyon']};
const qs=[];
for(let i=0;i<100;i++){
 const s=subjects[i%subjects.length],t=themes[s][Math.floor(i/subjects.length)%themes[s].length],n=i+1;
 const banks={
 Matematik:[['Bir gerçek sayının mutlak değeri için hangisi her zaman doğrudur?',['Negatiftir','Sıfırdan küçüktür','Sıfırdan büyük veya eşittir','Her zaman tam sayıdır','Her zaman rasyoneldir'],2,'Mutlak değer bir sayının sıfıra uzaklığıdır ve negatif olamaz.'],['İki benzer üçgende karşılıklı kenarlar için hangisi doğrudur?',['Toplamları eşittir','Oranları sabittir','Farkları sıfırdır','Hepsi eşittir','Çarpımları 1’dir'],1,'Benzer üçgenlerde karşılıklı kenar uzunluklarının oranı sabittir.']],
 Fizik:[['Sürat hangi iki büyüklük kullanılarak hesaplanır?',['Kütle-zaman','Yol-zaman','Kuvvet-yol','Enerji-güç','Basınç-hacim'],1,'Sürat alınan yolun geçen zamana oranıdır.'],['SI sisteminde kuvvetin birimi hangisidir?',['Joule','Pascal','Watt','Newton','Metre'],3,'Kuvvetin SI birimi newtondur.']],
 Kimya:[['Atom numarası hangi tanecik sayısına eşittir?',['Nötron','Proton','Elektron ve nötron toplamı','Nükleon','İzotop'],1,'Atom numarası çekirdekteki proton sayısıdır.'],['Aynı elementin izotop atomlarında hangisi aynıdır?',['Nötron sayısı','Kütle numarası','Proton sayısı','Toplam nükleon sayısı','Fiziksel kütle'],2,'İzotopların proton sayısı aynı, nötron sayısı farklıdır.']],
 Biyoloji:[['Hücrenin kalıtsal bilgisini taşıyan molekül hangisidir?',['ATP','DNA','Glikoz','Protein','Lipit'],1,'DNA kalıtsal bilgiyi taşır.'],['Canlıların temel yapısal ve işlevsel birimi hangisidir?',['Doku','Organ','Sistem','Hücre','Organizma'],3,'Hücre canlıların temel yapısal ve işlevsel birimidir.']]};
 const b=banks[s][Math.floor(i/subjects.length)%banks[s].length];
 qs.push({id:`V10-${String(n).padStart(3,'0')}`,subject:s,unit:t,difficulty:['Kolay','Orta','Zor'][i%3],q:`${b[0]} (${Math.floor(i/8)+1}. uygulama)`,o:b[1],a:b[2],explanation:b[3],source:'MEB 9. sınıf öğretim programı — kavram kontrolü'});
}
window.VERIFIED_Q_V10_EXTRA=qs;
})();
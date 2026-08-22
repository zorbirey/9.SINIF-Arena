# V23 Semantic Uniqueness Policy

V23 içindeki 1000 soru için kalite kapısı:

1. Soru metinleri birebir aynı olamaz.
2. Sayılar, noktalama, büyük/küçük harf ve boşluklar normalize edildiğinde aynı kalan kökler tekrar kabul edilir ve reddedilir.
3. Yalnız kişi/şehir/nesne adı değiştirilmiş aynı senaryo tekrar kabul edilir ve reddedilir.
4. Aynı `familyId` içinde yalnız sayısal parametre değişimine dayanan varyantlar aktif havuza alınmaz.
5. Her soru `semanticKey` alanı taşır; aynı ders + beceri + görev türü + bağlam kombinasyonu tekrar kullanılamaz.
6. Her soruda A-E olmak üzere tam 5 benzersiz seçenek ve tek doğru cevap bulunur.
7. Her soruda açıklama, ders, ünite, zorluk ve benzersiz ID zorunludur.
8. Exact duplicate, normalized duplicate ve cosmetic-only duplicate sayıları sıfır olmadan paket `semantic-unique` statüsüne geçmez.

Not: Otomatik kontroller tam insan anlamı düzeyinde semantik eşitliği matematiksel olarak kanıtlayamaz. Bu nedenle otomatik kontrollerin yanında soru aileleri manuel örneklem incelemesine de tabi tutulur.
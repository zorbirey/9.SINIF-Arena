# 9. Sınıf Arena — Android destek standardı

Bu proje Android öncelikli geliştirilecektir.

- Minimum destek: Android 10 (API 29)
- Önerilen sürüm: Android 12 veya üzeri
- Hedef sürüm: Android 16 (API 36)
- Destek aralığı: Android 10–16
- Cihazlar: telefon ve tablet
- Tarayıcı/PWA: güncel Chrome ve Android System WebView önerilir
- Telefon ve tablet aynı kod tabanını kullanır; arayüz ekran genişliğine göre responsive/adaptive çalışır.

## Native APK/TWA kabuğuna geçildiğinde

Android yapılandırması şu değerlerle sabitlenecektir:

```gradle
android {
    compileSdk 36

    defaultConfig {
        minSdk 29
        targetSdk 36
    }
}
```

Mevcut repository saf HTML/PWA olduğu için şu anda Gradle/AndroidManifest tabanlı bir native derleme bulunmamaktadır. Bu dosya APK/TWA aşamasında uygulanacak resmi proje standardını tanımlar.

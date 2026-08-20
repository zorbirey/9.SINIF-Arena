(() => {
  'use strict';
  const ZEUS = './assets/zeus-real-v10.webp?v=10';
  let deferredPrompt = null;
  const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  function appToast(message) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(window.__arenaToastTimer);
    window.__arenaToastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  async function installApp() {
    if (isStandalone()) { appToast('9. Sınıf Arena zaten uygulama olarak çalışıyor.'); return; }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') appToast('9. Sınıf Arena ana ekrana ekleniyor.');
      deferredPrompt = null;
      return;
    }
    if (isIos()) { appToast("iPhone/iPad: Safari'de Paylaş → Ana Ekrana Ekle seçeneğini kullan."); return; }
    appToast('Tarayıcı menüsünden “Uygulamayı yükle” seçeneğini kullan.');
  }

  function installVerifiedZeus() {
    document.querySelectorAll('img[data-zeus], img.verified-zeus').forEach(img => {
      const target = new URL(ZEUS, document.baseURI).href;
      if (img.src !== target) img.src = ZEUS;
    });
    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (/zeus(?:-v\d+|-full|-watermark|-real[^.]*)?\.(?:webp|png|svg|jpg)/i.test(src) && !src.includes('zeus-real-v10.webp')) img.src = ZEUS;
    });

    const shell = document.getElementById('shell');
    let watermark = document.getElementById('globalZeusWatermark');
    if (shell && !watermark) {
      watermark = document.createElement('img');
      watermark.id = 'globalZeusWatermark';
      watermark.className = 'global-zeus-watermark';
      watermark.alt = '';
      watermark.setAttribute('aria-hidden', 'true');
      shell.appendChild(watermark);
    }
    if (watermark) watermark.src = ZEUS;

    const avatar = document.getElementById('zeusAvatarBtn');
    if (avatar && !avatar.dataset.zeusBound) {
      avatar.dataset.zeusBound = '1';
      avatar.addEventListener('click', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (typeof window.go === 'function') window.go('zeus');
      }, true);
    }
  }

  function enterArena() {
    const cover = document.getElementById('cover');
    const shell = document.getElementById('shell');
    if (!cover || !shell) return;
    cover.classList.add('leaving');
    setTimeout(() => {
      cover.classList.add('hidden');
      shell.classList.remove('hidden');
      installVerifiedZeus();
      window.scrollTo(0, 0);
    }, 180);
  }
  window.enterArena = enterArena;

  const coverButton = document.getElementById('skipCover');
  if (coverButton) coverButton.addEventListener('click', enterArena, true);

  installVerifiedZeus();

  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredPrompt = event; const b=document.getElementById('installAppBtn'); if(b)b.hidden=false; });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; const b=document.getElementById('installAppBtn'); if(b)b.hidden=true; appToast('9. Sınıf Arena telefona kuruldu.'); });

  window.addEventListener('load', () => {
    installVerifiedZeus();
    const installBtn = document.getElementById('installAppBtn');
    if (installBtn) installBtn.addEventListener('click', event => { event.preventDefault(); installApp(); }, true);
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      navigator.serviceWorker.register('./service-worker-v10.js?v=10')
        .then(reg => { reg.update().catch(() => {}); if (reg.waiting) reg.waiting.postMessage('SKIP_WAITING'); })
        .catch(() => appToast('Çevrimdışı kullanım servisi etkinleştirilemedi.'));
    }
  });

  window.Arena9Pwa = { installApp, installVerifiedZeus };
})();

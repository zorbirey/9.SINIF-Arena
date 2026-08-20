(function(){
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){navigator.serviceWorker.register('./sw.js').catch(function(){});});
  }
  var deferredPrompt=null;
  var btn=document.getElementById('installAppBtn');
  window.addEventListener('beforeinstallprompt',function(e){
    e.preventDefault();
    deferredPrompt=e;
    if(btn)btn.hidden=false;
  });
  if(btn){
    btn.addEventListener('click',async function(){
      if(!deferredPrompt)return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt=null;
      btn.hidden=true;
    });
  }
  window.addEventListener('appinstalled',function(){if(btn)btn.hidden=true;});
})();

(function(){
  try{
    var fix=document.createElement('style');
    fix.textContent='.gate:before{background-image:var(--arena-gate-zeus,none)!important}';
    document.head.appendChild(fix);
    fetch('./style.css?v=13202',{cache:'no-store'}).then(function(r){return r.text()}).then(function(css){
      var m=css.match(/--zeus\s*:\s*url\((?:"|\')?([^"\')]+)(?:"|\')?\)/i);
      if(m&&m[1]) document.documentElement.style.setProperty('--arena-gate-zeus','url("'+m[1]+'")');
    }).catch(function(){});
  }catch(e){}
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){navigator.serviceWorker.register('./sw.js?v=13202').catch(function(){});});
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

(()=>{
  async function load(){
    try{
      const r=await fetch('mobile-demo/assets/cover.b64?v=9',{cache:'no-store'});
      if(!r.ok)throw new Error('cover');
      const b64=(await r.text()).trim();
      if(!b64)throw new Error('empty');
      const src=`data:image/jpeg;base64,${b64}`;
      document.documentElement.style.setProperty('--zeus',`url("${src}")`);
      document.documentElement.dataset.zeus='approved-cover';
      document.querySelectorAll('.zeus-avatar,.zeus-face,.zeus-big').forEach(el=>{
        el.style.backgroundImage=`url("${src}")`;
        el.style.backgroundSize='cover';
        el.style.backgroundPosition='center 18%';
      });
      document.querySelectorAll('.hero,.coach-banner').forEach(el=>{
        el.style.setProperty('--approved-zeus',`url("${src}")`);
      });
      document.querySelectorAll('.view').forEach(view=>{
        let wm=view.querySelector(':scope > .zeus-watermark');
        if(!wm){wm=document.createElement('div');wm.className='zeus-watermark';view.prepend(wm)}
        wm.style.backgroundImage=`url("${src}")`;
      });
    }catch(e){
      document.documentElement.dataset.zeus='load-error';
      console.error('Zeus kapak görseli yüklenemedi',e);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
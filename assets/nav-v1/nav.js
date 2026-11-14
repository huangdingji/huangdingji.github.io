(()=>{'use strict';
/* Unified header behaviour.
   Menu toggle: Home / Products / OEM already get it from home.js, so this
   binds it only where home.js is absent (the older pages).
   Resources dropdown: the older pages already load main.min.js, which
   drives .nav-dropdown; this binds the click toggle only where main.min.js
   is absent (Home / Products / OEM). */
const hasHomeJs=!!document.querySelector('script[src*="home.js"]');
const hasMainJs=!!document.querySelector('script[src*="main.min.js"]');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav&&!hasHomeJs){
  const closeMenu=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');};
  toggle.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')!=='true';
    nav.classList.toggle('is-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
}
if(!hasMainJs){
  document.querySelectorAll('.nav-dropdown').forEach(dd=>{
    const btn=dd.querySelector('.nav-more');
    if(!btn)return;
    btn.addEventListener('click',()=>{
      const open=dd.classList.toggle('open');
      btn.setAttribute('aria-expanded',String(open));
    });
  });
  document.addEventListener('click',e=>{
    if(e.target.closest('.nav-dropdown'))return;
    document.querySelectorAll('.nav-dropdown.open').forEach(dd=>{
      dd.classList.remove('open');
      const btn=dd.querySelector('.nav-more');
      if(btn)btn.setAttribute('aria-expanded','false');
    });
  });
}
})();

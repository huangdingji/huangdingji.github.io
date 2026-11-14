(()=>{'use strict';
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
const closeMenu=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');};
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const href=a.getAttribute('href')||'',link_text=(a.textContent||'').trim(),cta_location=a.closest('header')?'header':a.closest('footer')?'footer':a.closest('.hero')?'hero':'content';let event;if(a.matches('[data-whatsapp]')||href.includes('wa.me'))event='whatsapp_inquiry_click';else if(href.startsWith('mailto:'))event='email_inquiry_click';else if(href.includes('/contact/'))event='inquiry_cta_click';if(event&&typeof window.gtag==='function')window.gtag('event',event,{transport_type:'beacon',page_path:location.pathname,link_text,link_url:href,cta_location});});

// The selected category remains open for pointer, touch and keyboard users.
const cards=[...document.querySelectorAll('.category-card')];
const activate=selected=>cards.forEach(card=>{
  const active=card===selected;
  card.classList.toggle('is-active',active);
  card.querySelector('.category-switch').setAttribute('aria-expanded',String(active));
  card.querySelector('.category-details').inert=!active;
});
cards.forEach((card,index)=>{
  const button=card.querySelector('.category-switch');
  card.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')activate(card);});
  card.addEventListener('focusin',()=>activate(card));
  button.addEventListener('click',()=>activate(card));
  button.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%cards.length;
    if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+cards.length-1)%cards.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=cards.length-1;
    if(next!==undefined){event.preventDefault();activate(cards[next]);cards[next].querySelector('.category-switch').focus();}
  });
});
if(cards.length)activate(cards[0]);

// Reveal each content group once; reduced-motion users see every group directly.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reducedMotion.matches&&'IntersectionObserver' in window){
  const targets=[...document.querySelectorAll('.category-grid,.factory-layout,.production-grid figure,.factory-order-row')];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});
  },{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
  targets.forEach((element,index)=>{element.classList.add('reveal');element.style.setProperty('--reveal-delay',`${index<2?0:(index-2)*65}ms`);observer.observe(element);});
  reducedMotion.addEventListener('change',event=>{if(event.matches){observer.disconnect();targets.forEach(element=>element.classList.add('is-visible'));}});
}
})();

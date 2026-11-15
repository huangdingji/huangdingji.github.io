(()=>{'use strict';
// One controller owns this page’s navigation and entrance effects.
const menuToggle=document.querySelector('.menu-toggle'),mainNav=document.querySelector('#mainNav');
const closeMenu=()=>{mainNav.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');};
if(menuToggle&&mainNav){
 menuToggle.addEventListener('click',event=>{event.stopPropagation();const open=menuToggle.getAttribute('aria-expanded')!=='true';mainNav.classList.toggle('is-open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
 mainNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
}
const closeResources=()=>document.querySelectorAll('.nav-dropdown.open').forEach(dropdown=>{dropdown.classList.remove('open');dropdown.querySelector('.nav-more').setAttribute('aria-expanded','false');});
document.querySelectorAll('.nav-more').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();const dropdown=button.closest('.nav-dropdown'),open=!dropdown.classList.contains('open');closeResources();dropdown.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));}));
document.addEventListener('click',event=>{if(!event.target.closest('.nav-dropdown'))closeResources();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeResources();if(menuToggle&&mainNav)closeMenu();}});
document.addEventListener('click',event=>{
 const link=event.target.closest('a');if(!link)return;
 const href=link.getAttribute('href')||'';
 const type=link.matches('[data-whatsapp]')||href.includes('wa.me')?'whatsapp_inquiry_click':href.startsWith('mailto:')?'email_inquiry_click':href.includes('/contact/')?'inquiry_cta_click':null;
 if(type&&typeof window.gtag==='function')window.gtag('event',type,{transport_type:'beacon',page_path:location.pathname,link_text:link.textContent.trim(),link_url:href,cta_location:link.closest('header')?'header':link.closest('footer')?'footer':'markets'});
});
const inquiry=document.querySelector('#marketInquiry');
if(inquiry){
 inquiry.addEventListener('submit',event=>{
  event.preventDefault();
  const destination=inquiry.elements.product.value.trim();
  const next=new URL(inquiry.action,location.href);
  next.searchParams.set('product',destination?'Market inquiry — Destination: '+destination:'Market inquiry — PTFE tape wholesale');
  if(typeof window.gtag==='function')window.gtag('event','inquiry_cta_click',{transport_type:'beacon',page_path:location.pathname,cta_location:'markets_destination'});
  location.assign(next.href);
 });
}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const targets=[...document.querySelectorAll('.markets-reveal')],animations=new WeakMap();
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  observer.unobserve(entry.target);
  if(!reduced.matches&&entry.target.animate)animations.set(entry.target,entry.target.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:620,easing:'cubic-bezier(.2,.65,.3,1)'}));
 }),{threshold:.08});
 targets.forEach(el=>observer.observe(el));
 reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();targets.forEach(el=>animations.get(el)?.cancel());}});
}
})();

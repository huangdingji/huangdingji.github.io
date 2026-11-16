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
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
// The HTML contains every region and article; tabs enhance it without hiding
// content from visitors whose JavaScript is unavailable.
const regionTabs=[...document.querySelectorAll('[data-region-tab]')];
const regionPanels=[...document.querySelectorAll('[data-region-panel]')];
const regionLinks=[...document.querySelectorAll('[data-region-link]')];
if(regionTabs.length&&regionPanels.length){
 const tablist=document.querySelector('.markets-region-tabs');
 tablist.setAttribute('role','tablist');
 let panelAnimation;
 const activate=(id,{updateHash=false,focus=false,animate=false}={})=>{
  if(!regionTabs.some(tab=>tab.dataset.regionTab===id))return;
  panelAnimation?.cancel();
  regionTabs.forEach(tab=>{
   const active=tab.dataset.regionTab===id;
   tab.setAttribute('role','tab');
   tab.setAttribute('aria-controls','region-'+tab.dataset.regionTab);
   tab.setAttribute('aria-selected',String(active));
   tab.tabIndex=active?0:-1;
   if(active&&focus)tab.focus();
  });
  regionPanels.forEach(panel=>{
   const active=panel.dataset.regionPanel===id;
   panel.hidden=!active;
   panel.setAttribute('role','tabpanel');
   panel.setAttribute('aria-labelledby','region-tab-'+panel.dataset.regionPanel);
   panel.tabIndex=0;
   if(active&&animate&&!reduced.matches&&panel.animate)panelAnimation=panel.animate([{opacity:.25,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'});
  });
  regionLinks.forEach(link=>{if(link.dataset.regionLink===id)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
  if(updateHash)history.replaceState(null,'','#region-'+id);
 };
 const fromHash=()=>{
  const id=location.hash.replace(/^#region-/,'');
  return regionTabs.some(tab=>tab.dataset.regionTab===id)?id:regionTabs[0].dataset.regionTab;
 };
 activate(fromHash());
 regionTabs.forEach((tab,index)=>{
  tab.addEventListener('click',event=>{event.preventDefault();activate(tab.dataset.regionTab,{updateHash:true,animate:true});});
  tab.addEventListener('keydown',event=>{
   let next;
   if(event.key==='ArrowRight')next=(index+1)%regionTabs.length;
   if(event.key==='ArrowLeft')next=(index-1+regionTabs.length)%regionTabs.length;
   if(event.key==='Home')next=0;
   if(event.key==='End')next=regionTabs.length-1;
   if(next===undefined)return;
   event.preventDefault();activate(regionTabs[next].dataset.regionTab,{updateHash:true,focus:true,animate:true});
  });
 });
 regionLinks.forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();activate(link.dataset.regionLink,{updateHash:true,animate:true});
  document.querySelector('#market-guides').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
 }));
 window.addEventListener('hashchange',()=>activate(fromHash()));
}
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

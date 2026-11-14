(()=>{'use strict';
const controls=document.querySelector('.filter-bar');
if(!controls)return;
const cards=[...document.querySelectorAll('.tape-card')],filters=[...document.querySelectorAll('[data-filter]')],width=document.querySelector('#widthFilter');
const more=document.querySelector('.catalogue-more'),load=more.querySelector('button'),status=document.querySelector('#resultCount'),shown=document.querySelector('#shownCount'),empty=document.querySelector('.empty-state');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),revealed=new WeakSet(),animations=new WeakMap();
const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const element=entry.target;observer.unobserve(element);
    element.classList.remove('motion-pending');
    if(element.hidden)return;
    revealed.add(element);
    if(reduced.matches||!element.animate)return;
    const columns=getComputedStyle(document.querySelector('.tape-grid')).gridTemplateColumns.split(' ').length;
    const delay=element.matches('.tape-card')?(Number(element.dataset.motionIndex||0)%columns)*90:0;
    const animation=element.animate([{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],{duration:780,delay,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'});
    animations.set(element,animation);
  });
},{threshold:.08,rootMargin:'0px 0px -24px 0px'}):null;
const prepareMotion=(element,restart=false)=>{
  if(restart){animations.get(element)?.cancel();revealed.delete(element);observer?.unobserve(element);}
  if(!observer||reduced.matches){element.classList.remove('motion-pending');return;}
  if(!revealed.has(element)){element.classList.add('motion-pending');observer.observe(element);}
};
document.querySelectorAll('.catalogue-heading,.range-contact-inner').forEach(element=>prepareMotion(element));
reduced.addEventListener('change',()=>{
  if(!reduced.matches)return;
  observer?.disconnect();
  document.querySelectorAll('.tape-card,.catalogue-heading,.range-contact-inner').forEach(element=>{element.classList.remove('motion-pending');animations.get(element)?.cancel();});
});
let category='all',limit=8;
const render=(restart=false)=>{
  const matching=cards.filter(card=>(category==='all'||card.dataset.category===category)&&(width.value==='all'||card.dataset.width===width.value));
  const visible=new Set(matching.slice(0,limit));
  cards.forEach(card=>{
    card.hidden=!visible.has(card);
    if(card.hidden){observer?.unobserve(card);animations.get(card)?.cancel();card.classList.remove('motion-pending');}
  });
  matching.slice(0,limit).forEach((card,index)=>{card.dataset.motionIndex=String(index);prepareMotion(card,restart);});
  filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
  status.textContent=`${matching.length} product option${matching.length===1?'':'s'}`;
  shown.textContent=`Showing ${Math.min(limit,matching.length)} of ${matching.length} options`;
  more.hidden=matching.length<=limit;empty.hidden=matching.length!==0;
  return matching;
};
filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;limit=8;render(true);}));
width.addEventListener('change',()=>{limit=8;render(true);});
load.addEventListener('click',()=>{const firstNew=render()[limit];limit+=8;render();if(firstNew){firstNew.setAttribute('tabindex','-1');firstNew.focus({preventScroll:true});}});
document.querySelector('#resetFilters').addEventListener('click',()=>{category='all';width.value='all';limit=8;render(true);filters[0].focus({preventScroll:true});});
const followHash=()=>{
  const id=location.hash.slice(1),target=cards.find(card=>card.id===id);
  if(!target)return;
  category=target.dataset.category;width.value='all';limit=40;render();
  requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
};
controls.hidden=false;render();followHash();window.addEventListener('hashchange',followHash);
})();

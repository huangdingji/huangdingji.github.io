(()=>{'use strict';
const controls=document.querySelector('.filter-bar');
if(!controls)return;
const cards=[...document.querySelectorAll('.tape-card')],filters=[...document.querySelectorAll('[data-filter]')],width=document.querySelector('#widthFilter');
const more=document.querySelector('.catalogue-more'),load=more.querySelector('button'),status=document.querySelector('#resultCount'),shown=document.querySelector('#shownCount'),empty=document.querySelector('.empty-state');
let category='all',limit=8;
const render=()=>{
  const matching=cards.filter(card=>(category==='all'||card.dataset.category===category)&&(width.value==='all'||card.dataset.width===width.value));
  const visible=new Set(matching.slice(0,limit));
  cards.forEach(card=>{card.hidden=!visible.has(card);});
  filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
  status.textContent=`${matching.length} product option${matching.length===1?'':'s'}`;
  shown.textContent=`Showing ${Math.min(limit,matching.length)} of ${matching.length} options`;
  more.hidden=matching.length<=limit;empty.hidden=matching.length!==0;
  return matching;
};
filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;limit=8;render();}));
width.addEventListener('change',()=>{limit=8;render();});
load.addEventListener('click',()=>{const firstNew=render()[limit];limit+=8;render();if(firstNew){firstNew.setAttribute('tabindex','-1');firstNew.focus({preventScroll:true});}});
document.querySelector('#resetFilters').addEventListener('click',()=>{category='all';width.value='all';limit=8;render();filters[0].focus({preventScroll:true});});
const followHash=()=>{
  const id=location.hash.slice(1),target=cards.find(card=>card.id===id);
  if(!target)return;
  category=target.dataset.category;width.value='all';limit=40;render();
  requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
};
controls.hidden=false;render();followHash();window.addEventListener('hashchange',followHash);
})();

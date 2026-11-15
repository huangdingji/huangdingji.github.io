(()=>{'use strict';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const nav=document.querySelector('.oem-option-nav'),tabs=[...document.querySelectorAll('.oem-option-tab')],panels=[...document.querySelectorAll('.oem-option-panel')];
if(nav&&tabs.length===panels.length&&tabs.length){
  nav.setAttribute('role','tablist');
  const setOrientation=()=>nav.setAttribute('aria-orientation',window.matchMedia('(min-width: 961px)').matches?'vertical':'horizontal');
  setOrientation();window.matchMedia('(min-width: 961px)').addEventListener('change',setOrientation);
  document.querySelector('.oem-options-layout').classList.add('oem-options-enhanced');
  tabs.forEach((tab,i)=>{tab.setAttribute('role','tab');tab.setAttribute('aria-controls',panels[i].id);panels[i].setAttribute('role','tabpanel');panels[i].tabIndex=0;});
  let animation;
  const activate=(index,animate=true)=>{
    animation?.cancel();
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});
    if(animate&&!reduced.matches&&panels[index].animate)animation=panels[index].animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:460,easing:'cubic-bezier(.2,.65,.3,1)'});
  };
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',event=>{event.preventDefault();activate(i);});
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(i+1)%tabs.length;
      if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(event.key===' '||event.key==='Enter')next=i;
      if(next!==undefined){event.preventDefault();activate(next);tabs[next].focus({preventScroll:true});}
    });
  });
  const followHash=()=>{
    const index=panels.findIndex(panel=>panel.id===location.hash.slice(1));
    if(index<0)return false;
    activate(index,false);requestAnimationFrame(()=>document.querySelector('#oem-options').scrollIntoView({block:'start',behavior:'instant'}));return true;
  };
  if(!followHash())activate(0,false);
  window.addEventListener('hashchange',followHash);
  reduced.addEventListener('change',()=>{if(reduced.matches)animation?.cancel();});
}
const video=document.querySelector('.oem-video-frame video');
if(video){
  const stopAutomaticPlayback=()=>{if(reduced.matches){video.autoplay=false;video.pause();}};
  stopAutomaticPlayback();video.addEventListener('loadedmetadata',stopAutomaticPlayback);reduced.addEventListener('change',stopAutomaticPlayback);
}
const targets=[...document.querySelectorAll('.oem-reveal')],animations=new WeakMap();
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target;observer.unobserve(el);el.classList.remove('oem-motion-pending');
      if(!reduced.matches&&el.animate)animations.set(el,el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:720,delay:Number(el.dataset.oemDelay||0),easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'}));
    });
  },{threshold:.06,rootMargin:'0px 0px -20px 0px'});
  if(!reduced.matches)targets.forEach(el=>{el.classList.add('oem-motion-pending');const siblings=el.parentElement.querySelectorAll(':scope>.oem-reveal');el.dataset.oemDelay=String(Math.min([...siblings].indexOf(el)*70,210));observer.observe(el);});
  reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();targets.forEach(el=>{el.classList.remove('oem-motion-pending');animations.get(el)?.cancel();});}});
}
})();

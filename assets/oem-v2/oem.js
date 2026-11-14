(()=>{'use strict';
/* Timed captions for the OEM hero video.
   The video has no audio track, so these are descriptive captions
   (what is on screen), timed to the scene cuts at
   0s / 4.57s / 17.03s / 20.13s / 24.33s / 27s. They mirror the
   WebVTT track. The track itself is kept hidden so the browser
   never renders a second copy of the same line. */
const cues=[
  [0,'Custom spool colors for your brand.'],
  [4.5,'Winding tape onto your spools.'],
  [17,'Finished spools, checked before packing.'],
  [20.1,'Slitting tape to your width.'],
  [24.3,'Packing rolls into export cartons.'],
  [27,'Bulk rolls ready for shipment.']
];
const video=document.querySelector('.oem-hero-visual video');
const caption=document.getElementById('oemVideoCaption');
if(video&&caption){
  const show=t=>{
    let text=cues[0][1];
    for(const [start,line] of cues){ if(t>=start) text=line; }
    if(caption.textContent!==text) caption.textContent=text;
  };
  video.addEventListener('timeupdate',()=>show(video.currentTime||0));
  video.addEventListener('loadedmetadata',()=>show(0));
  show(0);
  /* Keep the <track> element for screen readers, but never let the
     browser render it: the caption bar below is the only visible one,
     otherwise the same line shows twice. */
  const track=video.querySelector('track');
  if(track) track.mode='hidden';
}
/* Reveal each content group once; reduced-motion users see everything directly. */
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches&&'IntersectionObserver' in window){
  const targets=[...document.querySelectorAll('.oem-scroll-reveal')];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  },{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
  targets.forEach((el,i)=>{ el.classList.add('reveal'); el.style.setProperty('--reveal-delay',`${Math.min(i*65,300)}ms`); observer.observe(el); });
}
})();

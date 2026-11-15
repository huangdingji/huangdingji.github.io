(()=>{'use strict';
// One page controller owns navigation, inquiry state and contact actions.
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
 const type=link.matches('[data-whatsapp]')||href.includes('wa.me')?'whatsapp_inquiry_click':href.startsWith('mailto:')?'email_inquiry_click':null;
 if(type&&typeof window.gtag==='function')window.gtag('event',type,{transport_type:'beacon',page_path:location.pathname,link_text:link.textContent.trim(),link_url:href,cta_location:link.closest('header')?'header':link.closest('footer')?'footer':'contact'});
});
const form=document.querySelector('#quoteForm');
if(!form)return;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const contact=form.elements.contact,reply=form.elements.reply_method,name=form.elements.name;
const productParam=new URLSearchParams(location.search).get('product');
if(productParam){
 const reference=productParam.slice(0,5000);
 document.querySelector('[data-product-selection]').hidden=false;
 document.querySelector('[data-product-reference]').textContent=reference;
 form.elements.product_reference.value=reference;
 if(!form.elements.message.value)form.elements.message.value='Product / requirement: '+reference+'\n\n';
 const ranges=[[/oem|private.label|logo|printing|packing|spool style/i,'OEM branded PTFE tape'],[/gas|yellow/i,'Gas / yellow PTFE tape'],[/high.density/i,'High density PTFE tape'],[/thick/i,'Thick PTFE tape'],[/wide/i,'Wide PTFE tape'],[/standard/i,'Standard PTFE thread seal tape']];
 const matched=ranges.find(([pattern])=>pattern.test(reference));
 form.elements.product.value=matched?matched[1]:'Other custom requirement';
 requestAnimationFrame(()=>document.querySelector('.contact-form-panel').scrollIntoView({block:'start',behavior:'instant'}));
}
const validateContact=()=>{
 const value=contact.value.trim();
 let message='';
 if(value){
  const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const digits=value.replace(/\D/g,'');
  const phone=/^\+?[\d\s().-]+$/.test(value)&&digits.length>=7&&digits.length<=15;
  if(!email&&!phone)message='Enter a valid email address or WhatsApp number with country code.';
  else if(reply.value==='Email'&&!email)message='Enter an email address, or change your preferred reply method.';
  else if(reply.value==='WhatsApp'&&!phone)message='Enter a WhatsApp number, or change your preferred reply method.';
 }
 contact.setCustomValidity(message);
 return !message;
};
contact.addEventListener('input',()=>{contact.setCustomValidity('');contact.removeAttribute('aria-invalid');});
contact.addEventListener('blur',()=>{validateContact();if(contact.value&&!contact.validity.valid)contact.setAttribute('aria-invalid','true');});
reply.addEventListener('change',()=>{validateContact();if(contact.validity.valid)contact.removeAttribute('aria-invalid');});
name.addEventListener('input',()=>name.setCustomValidity(''));
form.addEventListener('invalid',event=>event.target.setAttribute('aria-invalid','true'),true);
form.querySelectorAll('input,textarea,select').forEach(field=>field.addEventListener('input',()=>field.removeAttribute('aria-invalid')));
const success=document.querySelector('.contact-success'),error=document.querySelector('.contact-error'),button=form.querySelector('button[type=submit]');
let sending=false;
const report=(element)=>{element.hidden=false;element.focus({preventScroll:true});element.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});};
form.addEventListener('submit',async event=>{
 event.preventDefault();
 if(sending)return;
 name.setCustomValidity(name.value.trim()?'':'Please enter your name.');
 validateContact();
 if(!form.reportValidity())return;
 const data=new FormData(form);
 for(const key of ['name','contact','company','country','size','quantity','packing'])data.set(key,String(data.get(key)||'').trim());
 sending=true;button.disabled=true;button.setAttribute('aria-busy','true');
 const label=button.innerHTML;button.textContent='Sending…';error.hidden=true;success.hidden=true;
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});
  if(!response.ok)throw new Error('Inquiry submission failed');
  form.hidden=true;
  report(success);
  if(typeof window.gtag==='function')window.gtag('event','inquiry_form_submit',{transport_type:'beacon',page_path:location.pathname,product:form.elements.product.value,country:form.elements.country.value});
 }catch(_error){report(error);}
 finally{clearTimeout(timer);sending=false;button.disabled=false;button.removeAttribute('aria-busy');button.innerHTML=label;}
});
const copyButton=document.querySelector('[data-copy-wechat]'),copyStatus=document.querySelector('.contact-copy-status');
if(copyButton)copyButton.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText('+86 13015953036');copyStatus.textContent='WeChat number copied.';}
 catch(_error){copyStatus.textContent='Please select and copy the number above.';}
});
const targets=[...document.querySelectorAll('.contact-reveal')];
if(!reduced.matches&&'IntersectionObserver' in window){
 const animations=new WeakMap();
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  observer.unobserve(entry.target);
  if(!reduced.matches&&entry.target.animate)animations.set(entry.target,entry.target.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,easing:'cubic-bezier(.2,.65,.3,1)'}));
 }),{threshold:.06});
 targets.forEach(element=>observer.observe(element));
 reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();targets.forEach(element=>animations.get(element)?.cancel());}});
}
})();

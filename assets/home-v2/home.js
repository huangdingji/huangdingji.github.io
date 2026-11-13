(()=>{'use strict';
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
const closeMenu=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');};
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
function trackEvent(name,params={}){const details={page_path:location.pathname,page_title:document.title,page_location:location.href,...params};if(typeof window.gtag==='function')window.gtag('event',name,{transport_type:'beacon',...details});if(typeof window.fbq==='function'){window.fbq('trackCustom',name,details);window.fbq('track','Lead',{content_name:name,...details});}}
document.addEventListener('click',e=>{const a=e.target.closest('a,button');if(!a)return;const href=a.getAttribute('href')||'',link_text=(a.textContent||'').trim(),cta_location=a.closest('header')?'header':a.closest('footer')?'footer':a.closest('.hero')?'hero':a.closest('form')?'form':'content';if(a.matches('[data-whatsapp]')||href.includes('wa.me'))trackEvent('whatsapp_inquiry_click',{inquiry_channel:'whatsapp',link_text,cta_location});else if(href.startsWith('mailto:'))trackEvent('email_inquiry_click',{inquiry_channel:'email',link_text,cta_location});else if(a.matches('[data-product]'))trackEvent('request_quote_click',{link_text,product:a.dataset.product});else if(href==='#inquiry'||href.includes('/contact/'))trackEvent('inquiry_cta_click',{link_text,link_url:href,cta_location});});
document.querySelectorAll('[data-product]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('specification').value=a.dataset.product;document.getElementById('message').focus({preventScroll:true});}));
document.querySelectorAll('[data-filter]').forEach(control=>control.addEventListener('click',()=>{const selected=control.dataset.filter;document.querySelectorAll('.product-card').forEach(card=>card.hidden=selected!=='all'&&card.dataset.series!==selected);document.querySelectorAll('.filters button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===selected)));}));
const form=document.getElementById('homeInquiry'),status=document.getElementById('formStatus'),button=form.querySelector('button[type="submit"]');
form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;
if(!['www.qzjy.store','qzjy.store'].includes(location.hostname)){status.hidden=false;status.textContent='Preview mode: your inquiry has not been sent. Use WhatsApp or email to contact the factory.';return;}
button.disabled=true;button.textContent='Sending…';status.hidden=true;
trackEvent('inquiry_form_submit',{form_name:'homepage_inquiry',product:form.elements.size.value,country:form.elements.country.value});
try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!response.ok)throw Error('send failed');status.hidden=false;status.textContent='Thank you. Your inquiry has been sent. We will reply using your contact details.';form.reset();}
catch{status.hidden=false;status.textContent='Your inquiry could not be sent. Please try again or contact us by WhatsApp or email.';}
finally{button.disabled=false;button.textContent='Send inquiry';}});
})();

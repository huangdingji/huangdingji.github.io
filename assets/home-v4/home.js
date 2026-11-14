(()=>{'use strict';
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
const closeMenu=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');};
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const href=a.getAttribute('href')||'',link_text=(a.textContent||'').trim(),cta_location=a.closest('header')?'header':a.closest('footer')?'footer':a.closest('.hero')?'hero':'content';let event;if(a.matches('[data-whatsapp]')||href.includes('wa.me'))event='whatsapp_inquiry_click';else if(href.startsWith('mailto:'))event='email_inquiry_click';else if(href.includes('/contact/'))event='inquiry_cta_click';if(event&&typeof window.gtag==='function')window.gtag('event',event,{transport_type:'beacon',page_path:location.pathname,link_text,link_url:href,cta_location});});
})();

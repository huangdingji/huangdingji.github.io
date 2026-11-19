(() => {
  'use strict';
  // Keep previously shared order details when continuing to the common inquiry form.
  const incoming = new URLSearchParams(location.search);
  const sharedFields = ['size', 'density', 'country', 'quantity'];
  document.querySelectorAll('[data-wholesale-inquiry]').forEach(link => {
    const url = new URL(link.href);
    const general = link.dataset.wholesaleInquiry === 'general';
    const fields = general ? [...sharedFields, 'product', 'range', 'packing'] : sharedFields;
    fields.forEach(key => {
      const value = (incoming.get(key) || '').trim().slice(0, 5000);
      if (value) url.searchParams.set(key, value);
    });
    const message = (incoming.get('message') || '').trim().slice(0, 5000);
    const reference = !general ? (incoming.get('product') || '').trim().slice(0, 5000) : '';
    if (message || reference) url.searchParams.set('message', [reference && 'Product reference: ' + reference, message, url.searchParams.get('message')].filter(Boolean).join('\n\n'));
    link.href = url.href;
  });
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'landing_page_view', {
      page_type: 'wholesale_landing_page',
      landing_page: 'ptfe_tape_wholesale'
    });
  }
  // Retain the landing report's channel events alongside the shared inquiry tracking.
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !link.closest('main') || typeof window.gtag !== 'function') return;
    const href = link.getAttribute('href') || '';
    const name = href.includes('wa.me/') ? 'click_whatsapp' : href.startsWith('mailto:') ? 'click_email' : null;
    if (name) window.gtag('event', name, {
      page_type: 'wholesale_landing_page',
      landing_page: 'ptfe_tape_wholesale',
      cta_location: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'content'
    });
  });
})();

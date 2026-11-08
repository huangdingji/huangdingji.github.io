/* Track the article-to-product step separately from inquiry clicks. */
(() => {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-product-guide]');
    if (!link || typeof trackEvent !== 'function') return;
    trackEvent('product_guide_click', {
      link_url: link.getAttribute('href'),
      link_text: link.textContent.trim(),
      product_path: new URL(link.href, window.location.href).pathname,
      cta_location: link.dataset.location || 'content',
    });
  });
})();

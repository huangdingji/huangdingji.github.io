(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#mainNav');
  const closeResources = () => document.querySelectorAll('.nav-dropdown.open').forEach(item => {
    item.classList.remove('open');
    item.querySelector('.nav-more')?.setAttribute('aria-expanded', 'false');
  });
  const closeMenu = () => {
    nav?.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation');
    closeResources();
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (!open) closeResources();
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.querySelectorAll('.nav-more').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.nav-dropdown');
    const open = !item.classList.contains('open');
    closeResources();
    item.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-dropdown')) closeResources();
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const type = link.matches('[data-whatsapp]') || href.includes('wa.me') ? 'whatsapp_inquiry_click' : href.startsWith('mailto:') ? 'email_inquiry_click' : null;
    if (type && typeof window.gtag === 'function') window.gtag('event', type, {
      transport_type: 'beacon', page_path: location.pathname,
      link_text: link.textContent.trim(), link_url: href,
      cta_location: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'blog'
    });
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const grid = document.querySelector('[data-blog-grid]');
  const filters = document.querySelector('[data-blog-filters]');
  const search = document.querySelector('[data-blog-search]');
  const sort = document.querySelector('[data-blog-sort]');
  const pagination = document.querySelector('[data-blog-pagination]');
  const summary = document.querySelector('[data-blog-status]');
  const reset = document.querySelector('[data-blog-reset]');
  if (!posts.length || !grid || !filters || !search || !sort || !pagination || !summary || !reset) return;
  const buttons = [...filters.querySelectorAll('[data-category]')];
  const categories = new Set(buttons.map(button => button.dataset.category));
  const pageSize = 9;
  const originalOrder = new Map(posts.map((post, index) => [post.slug, index]));
  const normalize = value => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const indexed = posts.map(post => ({...post, searchText: normalize([post.title, post.description, post.categoryLabel, post.slug].join(' '))}));
  const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
  const arrow = '<svg aria-hidden="true" class="arrow-icon" viewBox="0 0 20 20"><path d="M3 10h13m-5-5 5 5-5 5"></path></svg>';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const readState = () => {
    const params = new URLSearchParams(location.search);
    const page = Number.parseInt(params.get('page'), 10);
    return {
      category: categories.has(params.get('category')) ? params.get('category') : 'all',
      query: (params.get('q') || '').slice(0, 200),
      sort: params.get('sort') === 'title' ? 'title' : 'suggested',
      page: Number.isSafeInteger(page) && page > 0 ? page : 1
    };
  };
  let state = readState();
  const syncUrl = method => {
    const url = new URL(location.href);
    ['category', 'q', 'page', 'sort'].forEach(key => url.searchParams.delete(key));
    if (state.category !== 'all') url.searchParams.set('category', state.category);
    if (state.query.trim()) url.searchParams.set('q', state.query.trim());
    if (state.sort !== 'suggested') url.searchParams.set('sort', state.sort);
    if (state.page > 1) url.searchParams.set('page', String(state.page));
    if (url.href !== location.href) history[method === 'push' ? 'pushState' : 'replaceState'](null, '', url);
  };
  const render = (historyMethod = 'replace', scroll = false) => {
    const terms = normalize(state.query.trim()).split(/\s+/).filter(Boolean);
    const matches = indexed.filter(post => (state.category === 'all' || post.category === state.category) && terms.every(term => post.searchText.includes(term)));
    matches.sort(state.sort === 'title'
      ? (a, b) => a.title.localeCompare(b.title, 'en', {numeric: true})
      : (a, b) => originalOrder.get(a.slug) - originalOrder.get(b.slug));
    const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
    state.page = Math.min(state.page, totalPages);
    const start = (state.page - 1) * pageSize;
    const items = matches.slice(start, start + pageSize);
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === state.category)));
    if (search.value !== state.query) search.value = state.query;
    sort.value = state.sort;
    reset.hidden = state.category === 'all' && !state.query && state.sort === 'suggested';
    summary.textContent = matches.length ? `Showing ${start + 1}–${Math.min(start + pageSize, matches.length)} of ${matches.length} guides` : 'No matching guides';
    grid.innerHTML = items.length ? items.map(post => `<article class="blog-card"><p class="blog-card-category">${escapeHtml(post.categoryLabel)}</p><h3><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></h3><p class="blog-card-description">${escapeHtml(post.description)}</p><a class="blog-card-link" href="${escapeHtml(post.url)}">Read guide ${arrow}</a></article>`).join('') : '<div class="blog-empty"><h3>No guides match these filters.</h3><p>Try a shorter search term, or reset the filters to browse the full library.</p><button type="button" class="blog-reset" data-blog-empty-reset>Browse all guides <span aria-hidden="true">↺</span></button></div>';
    pagination.hidden = totalPages <= 1;
    pagination.innerHTML = totalPages <= 1 ? '' : `<button type="button" data-page="previous"${state.page === 1 ? ' disabled' : ''}>← Previous</button><span>Page ${state.page} of ${totalPages}</span><button type="button" data-page="next"${state.page === totalPages ? ' disabled' : ''}>Next →</button>`;
    if (historyMethod !== 'none') syncUrl(historyMethod);
    if (scroll) {
      summary.focus({preventScroll: true});
      summary.scrollIntoView({block: 'start', behavior: reduced.matches ? 'instant' : 'smooth'});
    }
  };
  const resetFilters = () => {
    state = {category: 'all', query: '', sort: 'suggested', page: 1};
    render('push');
    search.focus();
  };
  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    state.category = button.dataset.category;
    state.page = 1;
    render('push');
  });
  const updateSearch = () => {
    state.query = search.value.slice(0, 200);
    state.page = 1;
    render();
  };
  search.addEventListener('input', event => { if (!event.isComposing) updateSearch(); });
  search.addEventListener('compositionend', updateSearch);
  sort.addEventListener('change', () => {
    state.sort = sort.value;
    state.page = 1;
    render('push');
  });
  reset.addEventListener('click', resetFilters);
  grid.addEventListener('click', event => { if (event.target.closest('[data-blog-empty-reset]')) resetFilters(); });
  pagination.addEventListener('click', event => {
    const button = event.target.closest('[data-page]');
    if (!button || button.disabled) return;
    state.page += button.dataset.page === 'next' ? 1 : -1;
    render('push', true);
  });
  window.addEventListener('popstate', () => { state = readState(); render('none'); });
  render();
  document.querySelector('[data-blog-controls]').hidden = false;
})();

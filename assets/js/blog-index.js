(function () {
  'use strict';

  var posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  var grid = document.querySelector('[data-blog-grid]');
  var filters = document.querySelector('[data-blog-filters]');
  var search = document.querySelector('[data-blog-search]');
  var pagination = document.querySelector('[data-blog-pagination]');

  if (!grid || !filters || !search || !pagination) return;


  var pageSize = 9;
  var params = new URLSearchParams(window.location.search);
  var state = {
    category: params.get('category') || 'all',
    query: params.get('q') || '',
    page: Math.max(1, Number.parseInt(params.get('page') || '1', 10) || 1)
  };

  var categoryOrder = ['all', 'buyer', 'specification', 'packing', 'product', 'market'];
  var categoryLabels = {
    all: 'All guides',
    buyer: 'Buyer channels',
    specification: 'Specifications',
    packing: 'Packing & OEM',
    product: 'Product & use',
    market: 'Market notes'
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function formatDate(value) {
    var date = new Date(value + 'T00:00:00');
    return Number.isNaN(date.getTime())
      ? ''
      : new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  }

  function filteredPosts() {
    var query = state.query.trim().toLowerCase();
    return posts.filter(function (post) {
      var matchesCategory = state.category === 'all' || post.category === state.category;
      var haystack = (post.title + ' ' + post.description + ' ' + post.categoryLabel).toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });
  }

  function syncUrl() {
    var url = new URL(window.location.href);
    ['category', 'q', 'page'].forEach(function (key) { url.searchParams.delete(key); });
    if (state.category !== 'all') url.searchParams.set('category', state.category);
    if (state.query.trim()) url.searchParams.set('q', state.query.trim());
    if (state.page > 1) url.searchParams.set('page', String(state.page));
    window.history.replaceState({}, '', url);
  }

  function renderFilters() {
    var counts = posts.reduce(function (result, post) {
      result[post.category] = (result[post.category] || 0) + 1;
      return result;
    }, {});

    filters.innerHTML = categoryOrder.map(function (category) {
      var count = category === 'all' ? posts.length : (counts[category] || 0);
      return '<button type="button" data-category="' + category + '" aria-pressed="' + (state.category === category) + '">' +
        '<span>' + escapeHtml(categoryLabels[category]) + '</span><small>' + count + '</small></button>';
    }).join('');
  }

  function renderCards(items) {
    if (!items.length) {
      grid.innerHTML = '<div class="blog-empty"><strong>No matching guides.</strong><p>Try another search term or choose “All guides”.</p></div>';
      return;
    }

    grid.innerHTML = items.map(function (post) {
      return '<article class="post-card">' +
        '<div class="post-card-body">' +
          '<div class="post-meta"><span>' + escapeHtml(post.categoryLabel) + '</span><time datetime="' + escapeHtml(post.published) + '">' + escapeHtml(formatDate(post.published)) + '</time></div>' +
          '<h2><a href="' + escapeHtml(post.url) + '">' + escapeHtml(post.title) + '</a></h2>' +
          '<p>' + escapeHtml(post.description) + '</p>' +
          '<a class="post-read" href="' + escapeHtml(post.url) + '">Read guide <span>→</span></a>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function renderPagination(totalPages) {
    if (totalPages <= 1) {
      pagination.hidden = true;
      pagination.innerHTML = '';
      return;
    }

    pagination.hidden = false;
    pagination.innerHTML =
      '<button type="button" data-page="previous"' + (state.page === 1 ? ' disabled' : '') + '>← Previous</button>' +
      '<span>Page <strong>' + state.page + '</strong> of ' + totalPages + '</span>' +
      '<button type="button" data-page="next"' + (state.page === totalPages ? ' disabled' : '') + '>Next →</button>';
  }

  function render() {
    var matches = filteredPosts();
    var totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
    state.page = Math.min(state.page, totalPages);
    var start = (state.page - 1) * pageSize;

    renderFilters();
    renderCards(matches.slice(start, start + pageSize));
    renderPagination(totalPages);
    search.value = state.query;
    syncUrl();
  }

  filters.addEventListener('click', function (event) {
    var button = event.target.closest('[data-category]');
    if (!button) return;
    state.category = button.dataset.category;
    state.page = 1;
    render();
  });

  search.addEventListener('input', function () {
    state.query = search.value;
    state.page = 1;
    render();
  });

  pagination.addEventListener('click', function (event) {
    var button = event.target.closest('[data-page]');
    if (!button || button.disabled) return;
    state.page += button.dataset.page === 'next' ? 1 : -1;
    render();
    document.querySelector('.blog-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  render();
}());

(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  var page = document.body;
  var selectorGroups = [];

  if (page.classList.contains('blog-page')) {
    selectorGroups = [
      ['.browser-heading > *', ['left', 'right']],
      ['.blog-controls', ['up']],
      ['.post-card', ['up']],
      ['.blog-pagination', ['up']]
    ];
  } else if (page.classList.contains('markets-page')) {
    selectorGroups = [
      ['.markets-intro-grid > *', ['left', 'right']],
      ['.markets-directory-head > *', ['left', 'right']],
      ['.market-brief', ['up']],
      ['.markets-prepare-grid > *', ['left', 'right']],
      ['.markets-contact-grid > *', ['up']]
    ];
  } else if (page.classList.contains('about-page')) {
    selectorGroups = [
      ['.about-intro-head > *', ['left', 'right']],
      ['.about-gallery figure', ['up']],
      ['.about-supply-grid > *', ['left', 'right']],
      ['.about-detail-list article', ['up']],
      ['.about-workflow-grid > *', ['left', 'right']],
      ['.about-workflow-copy li', ['up']],
      ['.about-profile-grid > *', ['left', 'right']],
      ['.about-profile-list div', ['up']],
      ['.about-contact-grid > *', ['up']]
    ];
  }

  if (!selectorGroups.length) return;

  document.documentElement.classList.add('motion-ready');
  var registered = new WeakSet();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });

  function registerElements() {
    selectorGroups.forEach(function (group) {
      var elements = document.querySelectorAll(group[0]);
      elements.forEach(function (element, index) {
        if (registered.has(element)) return;
        registered.add(element);
        element.setAttribute('data-reveal', group[1][index % group[1].length]);
        element.style.setProperty('--reveal-delay', ((index % 4) * 65) + 'ms');
        observer.observe(element);
      });
    });
  }

  registerElements();

  var mutationObserver = new MutationObserver(function (mutations) {
    var hasNewElements = mutations.some(function (mutation) {
      return mutation.addedNodes.length > 0;
    });
    if (hasNewElements) registerElements();
  });
  mutationObserver.observe(document.querySelector('main'), { childList: true, subtree: true });
}());

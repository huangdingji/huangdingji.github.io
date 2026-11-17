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
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  const tablist = document.querySelector('.qc-tabs');
  const tabs = [...document.querySelectorAll('.qc-tabs a')];
  const panels = tabs.map(tab => document.querySelector(tab.getAttribute('href')));
  if (tablist && tabs.length && panels.every(Boolean)) {
    const activate = (index, focus = false) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
    };
    document.querySelector('.qc-inspector').classList.add('qc-enhanced');
    tablist.setAttribute('role', 'tablist');
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panels[i].id);
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tab.id);
      panels[i].tabIndex = 0;
      tab.addEventListener('click', event => {
        event.preventDefault();
        activate(i);
        history.replaceState(null, '', tab.getAttribute('href'));
      });
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        activate(next, true);
        history.replaceState(null, '', tabs[next].getAttribute('href'));
      });
    });
    const syncHash = () => {
      const index = panels.findIndex(panel => '#' + panel.id === location.hash);
      if (index >= 0) activate(index);
    };
    const initial = panels.findIndex(panel => '#' + panel.id === location.hash);
    activate(Math.max(0, initial));
    window.addEventListener('hashchange', syncHash);
    document.querySelectorAll('.qc-scope a').forEach(link => link.addEventListener('click', event => {
      const index = panels.findIndex(panel => '#' + panel.id === link.hash);
      if (index < 0) return;
      event.preventDefault();
      activate(index, true);
      history.replaceState(null, '', link.hash);
      document.querySelector('#quality-checks').scrollIntoView({block: 'start'});
    }));
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const type = link.matches('[data-whatsapp]') || href.includes('wa.me') ? 'whatsapp_inquiry_click' : href.startsWith('mailto:') ? 'email_inquiry_click' : null;
    if (type && typeof window.gtag === 'function') window.gtag('event', type, {
      transport_type: 'beacon', page_path: location.pathname,
      link_text: link.textContent.trim(), link_url: href,
      cta_location: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'quality'
    });
  });
  const sampleVideo = document.querySelector('#qcSampleVideo');
  const samplePlay = document.querySelector('[data-qc-video-start]');
  if (sampleVideo && samplePlay) {
    sampleVideo.controls = false;
    sampleVideo.tabIndex = 0;
    samplePlay.hidden = false;
    samplePlay.addEventListener('click', async () => {
      if (samplePlay.disabled) return;
      samplePlay.disabled = true;
      samplePlay.querySelector('span').textContent = 'Loading sample video…';
      try {
        sampleVideo.controls = true;
        await sampleVideo.play();
        samplePlay.hidden = true;
        sampleVideo.focus({preventScroll: true});
      } catch (_error) {
        sampleVideo.controls = false;
        samplePlay.querySelector('span').textContent = 'Try video again';
      } finally {
        samplePlay.disabled = false;
      }
    });
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (reduced.matches || !entry.target.animate) return;
      const animation = entry.target.animate([
        {opacity: 0, transform: 'translateY(16px)'},
        {opacity: 1, transform: 'translateY(0)'}
      ], {duration: 550, easing: 'cubic-bezier(.2,.65,.3,1)'});
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation)).catch(() => {});
    }), {threshold: .08});
    document.querySelectorAll('.qc-reveal').forEach(item => observer.observe(item));
    reduced.addEventListener('change', () => {
      if (!reduced.matches) return;
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    });
  }
})();

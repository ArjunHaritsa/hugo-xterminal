(function () {
  const STORAGE_KEY = 'themeVariant';
  const DARK = 'glossy-dark';
  const LIGHT = 'glossy-light';

  function applyVariant(variant) {
    const html = document.documentElement;
    const body = document.body;
    // Apply to both html and body so viewport background updates in all browsers
    html.classList.remove(DARK, LIGHT);
    body.classList.remove(DARK, LIGHT);
    if (variant === LIGHT) { html.classList.add(LIGHT); body.classList.add(LIGHT); }
    else { html.classList.add(DARK); body.classList.add(DARK); }

    // Force browsers (Edge, Samsung Internet) to fully repaint when
    // CSS custom properties change on the root element.
    // Without this, some browsers only partially update, leaving a hazy overlay.
    body.style.display = 'none';
    body.offsetHeight; // trigger reflow
    body.style.display = '';

    try { localStorage.setItem(STORAGE_KEY, variant); } catch (_) {}
    const control = document.getElementById('theme-toggle');
    if (control) {
      if (control.tagName === 'INPUT') {
        control.checked = (variant === LIGHT);
        control.setAttribute('aria-checked', control.checked ? 'true' : 'false');
      } else {
        control.textContent = variant === LIGHT ? 'Dark Mode' : 'Light Mode';
        control.setAttribute('aria-pressed', variant === LIGHT ? 'true' : 'false');
      }
    }
  }

  function init() {
    const saved = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; } })();
    const initial = saved || DARK;
    applyVariant(initial);

    const control = document.getElementById('theme-toggle');
    if (control) {
      const handler = function () {
        const next = (control.tagName === 'INPUT' ? (control.checked ? LIGHT : DARK)
                                                : (document.body.classList.contains(LIGHT) ? DARK : LIGHT));
        applyVariant(next);
      };
      const eventName = (control.tagName === 'INPUT') ? 'change' : 'click';
      control.addEventListener(eventName, handler);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function () {
  const STORAGE_KEY = 'themeVariant';
  const DARK = 'glossy-dark';
  const LIGHT = 'glossy-light';

  function applyVariant(variant) {
    const body = document.body;
    body.classList.remove(DARK, LIGHT);
    if (variant === LIGHT) body.classList.add(LIGHT);
    else body.classList.add(DARK);
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

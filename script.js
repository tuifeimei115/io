(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}
    if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '🌞' : '🌙';
  }

  function initTheme() {
    const stored = (() => { try { return localStorage.getItem('theme'); } catch (_) { return null; }})();
    if (stored) return setTheme(stored);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initTheme();
})();



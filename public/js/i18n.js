const I18n = (() => {
  const DEFAULT = 'vi';
  const SUPPORTED = ['en', 'vi'];

  function getLang() {
    const s = localStorage.getItem('lang');
    return SUPPORTED.includes(s) ? s : DEFAULT;
  }

  async function load(lang) {
    const depth = location.pathname.split('/').filter(Boolean).length;
    const prefix = depth > 1 ? '../'.repeat(depth - 1) : './';
    try {
      const res = await fetch(`${prefix}lang/${lang}.json?v=${Date.now()}`);
      return res.json();
    } catch (e) { return {}; }
  }

  async function apply() {
    const lang = getLang();
    const t = await load(lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (t[el.dataset.i18n] !== undefined)
        el.textContent = t[el.dataset.i18n];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      if (t[el.dataset.i18nPlaceholder] !== undefined)
        el.placeholder = t[el.dataset.i18nPlaceholder];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      if (t[el.dataset.i18nHtml] !== undefined)
        el.innerHTML = t[el.dataset.i18nHtml];
    });

    document.querySelectorAll('.lang-sel__opt').forEach(btn => {
      const oc = btn.getAttribute('onclick') || '';
      btn.classList.toggle('active', oc.includes(`'${lang}'`));
    });

    const cur = document.getElementById('currentLang');
    if (cur) cur.textContent = lang.toUpperCase();

    document.documentElement.lang = lang;
  }

  function switch_(code) {
    localStorage.setItem('lang', code);
    location.reload();
  }

  return { apply, switch_, getLang };
})();
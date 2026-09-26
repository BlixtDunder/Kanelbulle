/*! Kanelbulle - a cookie banner, but for buns. GPL-3.0 License. */
(function () {
  var script = document.currentScript;
  var opt = Object.assign({}, script && script.dataset, window.KanelbulleConfig);
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var daysLeft = Math.round((new Date(now.getFullYear(), 9, 4) - today) / 864e5); // Kanelbullens dag, October 4th

  // Site owners can preview with #kanelbulle (the day) or #kanelbulle-3 (countdown, 3 days left)
  var preview = /^#kanelbulle(?:-(\d+))?$/.exec(location.hash);
  if (preview) daysLeft = +(preview[1] || 0);
  else if (daysLeft < 0 || daysLeft > (+opt.countdown || 0)) return;

  var countdown = daysLeft > 0;
  var key = 'kanelbulle-' + now.getFullYear() + (countdown ? '-countdown' : '');
  if (!preview) try { if (localStorage.getItem(key)) return; } catch (e) {}

  var lang = (opt.lang || document.documentElement.lang || '').toLowerCase();
  var sv = lang.indexOf('sv') === 0;
  var t = sv ? {
    title: 'V\u00e5r kanelbullepolicy',
    day: '\u00c4garna till den h\u00e4r webbplatsen st\u00f6ttar fika. ' +
      'Idag \u00e4r det Kanelbullens dag, och genom att forts\u00e4tta surfa godk\u00e4nner du att ta en fika med kanelbulle.',
    soon: '\u00c4garna till den h\u00e4r webbplatsen st\u00f6ttar fika. ' +
      'Den 4 oktober \u00e4r det Kanelbullens dag, s\u00e5 passa p\u00e5 att f\u00f6rbereda dig: planera din fika och se till att ha kanelbullar hemma.',
    left: function (n) { return n + (n === 1 ? ' dag' : ' dagar') + ' kvar till Kanelbullens dag'; },
    accept: 'Acceptera alla bullar',
    necessary: 'Endast n\u00f6dv\u00e4ndiga bullar',
    links: '<a href="{b}">Hitta n\u00e4rmaste bageri</a> eller <a href="{r}">baka sj\u00e4lv</a>.',
    bakeryUrl: 'https://www.google.com/maps/search/bageri',
    recipeUrl: 'https://www2.ankarsrum.com/se/recept/klassiska-kanelbullar-kalljasta'
  } : {
    title: 'Our cinnamon bun policy',
    day: 'The owners of this website support fika, the Swedish coffee break. ' +
      'Today is Kanelbullens dag, Sweden\u2019s Cinnamon Bun Day, and by continuing to browse you agree to have a fika with a cinnamon bun.',
    soon: 'The owners of this website support fika, the Swedish coffee break. ' +
      'October 4th is Kanelbullens dag, Sweden\u2019s Cinnamon Bun Day, so get prepared: plan your fika and make sure you have cinnamon buns at home.',
    left: function (n) { return n + (n === 1 ? ' day' : ' days') + ' until Kanelbullens dag'; },
    accept: 'Accept all buns',
    necessary: 'Only necessary buns',
    links: '<a href="{b}">Find the nearest bakery</a> or <a href="{r}">bake your own</a>.',
    bakeryUrl: 'https://www.google.com/maps/search/bakery',
    recipeUrl: 'https://scandinaviancookbook.com/kanelbullar-swedish-cinnamon-buns/'
  };
  if (opt.recipe) t.recipeUrl = String(opt.recipe).replace(/"/g, '&quot;');

  var links = t.links.replace('{b}', t.bakeryUrl).replace('{r}', t.recipeUrl);

  var safe = 'env(safe-area-inset-bottom,0px)';
  var card = ';max-width:min(420px,calc(100% - 32px))';
  var pos = {
    'top': 'top:0;left:0;right:0',
    'bottom': 'bottom:0;left:0;right:0;padding-bottom:calc(24px + ' + safe + ')',
    'top-left': 'top:16px;left:16px' + card,
    'top-right': 'top:16px;right:16px' + card,
    'bottom-left': 'bottom:calc(16px + ' + safe + ');left:16px' + card,
    'bottom-right': 'bottom:calc(16px + ' + safe + ');right:16px' + card,
    'center': 'top:50%;left:16px;right:16px;margin:0 auto;transform:translateY(-50%);max-width:480px'
  };
  var bar = opt.position === 'top' || opt.position === 'bottom';
  var place = pos[opt.position] || pos['bottom-left'];

  var bun = '<svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true">' +
    '<circle cx="16" cy="16" r="14" fill="#d9954a"/>' +
    '<path d="M14 16a2 2 0 1 1 4 0a4 4 0 1 1-8 0a6 6 0 1 1 12 0a8 8 0 1 1-16 0a10 10 0 1 1 20 0" ' +
    'fill="none" stroke="#8b4513" stroke-width="2" stroke-linecap="round"/><g fill="#fff">' +
    '<rect x="8" y="8" width="2" height="2" rx=".6"/><rect x="21" y="7" width="2" height="2" rx=".6"/>' +
    '<rect x="24" y="19" width="2" height="2" rx=".6"/><rect x="10" y="23" width="2" height="2" rx=".6"/>' +
    '<rect x="17" y="11" width="2" height="2" rx=".6"/><rect x="5" y="16" width="2" height="2" rx=".6"/></g></svg>';

  var dark = '.k{--bg:#000;--fg:#fff;--mu:#c4c4c4;--ul:rgba(255,255,255,.4);--bd:rgba(255,255,255,.16);--sh:none}';
  var theme = opt.theme === 'dark' ? dark : opt.theme === 'light' ? '' : '@media (prefers-color-scheme:dark){' + dark + '}';

  var host = document.createElement('div');
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  root.innerHTML =
    '<style>' +
    '.k{--bg:#fff;--fg:#000;--mu:#4a4a4a;--ul:rgba(0,0,0,.3);--bd:transparent;--sh:0 4px 32px rgba(0,0,0,.15)}' + theme +
    '.k{position:fixed;z-index:2147483647;box-sizing:border-box;padding:' + (bar ? '24px 32px' : '32px 36px') + ';' + place + ';' +
    'background:var(--bg);color:var(--fg);border:1px solid var(--bd);box-shadow:var(--sh);-webkit-font-smoothing:antialiased;' +
    'font:15px/1.55 system-ui,-apple-system,"Segoe UI Variable Text","Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;' +
    'display:flex;gap:' + (bar ? '16px 32px;flex-wrap:wrap;align-items:center' : '20px;flex-direction:column') + '}' +
    '.t{flex:' + (bar ? '1 1 360px' : 'none') + '}svg{display:block;flex:none}' +
    'h2{margin:0 0 6px;font-size:18px;line-height:1.3;font-weight:600;letter-spacing:-.01em}p{margin:0;color:var(--mu)}' +
    '.c{margin:0 0 6px;font-size:12px;font-weight:500;letter-spacing:.06em;text-transform:uppercase}' +
    'button{font:inherit;background:none;border:0;padding:0;cursor:pointer}' +
    'a,button{color:var(--fg);font-weight:500;text-decoration:underline 1px var(--ul);text-underline-offset:4px}' +
    'a:hover,button:hover{text-decoration-color:currentColor}' +
    '.b{display:flex;flex-wrap:wrap;gap:12px 28px}' +
    ':focus-visible{outline:2px solid currentColor;outline-offset:4px}' +
    '@media print{.k{display:none}}' +
    '</style>' +
    '<div class="k" role="dialog" aria-live="polite" aria-labelledby="kt">' + bun +
    '<div class="t">' + (countdown ? '<p class="c">' + t.left(daysLeft) + '</p>' : '') +
    '<h2 id="kt">' + t.title + '</h2><p>' + (countdown ? t.soon : t.day) + ' ' + links + '</p></div>' +
    '<div class="b"><button>' + t.accept + '</button><button>' + t.necessary + '</button></div></div>';

  root.querySelectorAll('a').forEach(function (a) { a.target = '_blank'; a.rel = 'noopener'; });
  root.querySelector('.b').addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') return;
    try { localStorage.setItem(key, '1'); } catch (err) {}
    host.remove();
  });

  function mount() { document.body.appendChild(host); }
  document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);
})();

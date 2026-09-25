/*! Kanelbulle - a cookie banner, but for buns. GPL-3.0 License. */
(function () {
  var script = document.currentScript;
  var opt = Object.assign({}, script && script.dataset, window.KanelbulleConfig);
  var now = new Date();
  var key = 'kanelbulle-' + now.getFullYear();

  if (now.getMonth() !== 9 || now.getDate() !== 4) return; // Kanelbullens dag, October 4th only
  try { if (localStorage.getItem(key)) return; } catch (e) {}

  var lang = (opt.lang || document.documentElement.lang || '').toLowerCase();
  var sv = lang.indexOf('sv') === 0;
  var t = sv ? {
    title: 'V\u00e5r kanelbullepolicy',
    body: '\u00c4garna till den h\u00e4r webbplatsen st\u00f6ttar fika. ' +
      'Den 4 oktober \u00e4r det Kanelbullens dag, och genom att forts\u00e4tta surfa godk\u00e4nner du att ta en fika med kanelbulle.',
    accept: 'Acceptera alla bullar',
    necessary: 'Endast n\u00f6dv\u00e4ndiga bullar',
    links: '<a href="{b}">Hitta n\u00e4rmaste bageri</a> eller <a href="{r}">baka sj\u00e4lv</a>.',
    bakeryUrl: 'https://www.google.com/maps/search/bageri',
    recipeUrl: 'https://www.arla.se/recept/kanelbullar/'
  } : {
    title: 'Our cinnamon bun policy',
    body: 'The owners of this website support fika, the Swedish coffee break. ' +
      'October 4th is Kanelbullens dag, Sweden\u2019s Cinnamon Bun Day, and by continuing to browse you agree to have a fika with a cinnamon bun.',
    accept: 'Accept all buns',
    necessary: 'Only necessary buns',
    links: '<a href="{b}">Find the nearest bakery</a> or <a href="{r}">bake your own</a>.',
    bakeryUrl: 'https://www.google.com/maps/search/bakery',
    recipeUrl: 'https://scandinaviancookbook.com/kanelbullar-swedish-cinnamon-buns/'
  };
  if (opt.recipe) t.recipeUrl = String(opt.recipe).replace(/"/g, '&quot;');

  var links = t.links.replace('{b}', t.bakeryUrl).replace('{r}', t.recipeUrl);

  var pos = {
    'top': 'top:0;left:0;right:0',
    'bottom': 'bottom:0;left:0;right:0',
    'top-left': 'top:16px;left:16px;max-width:420px',
    'top-right': 'top:16px;right:16px;max-width:420px',
    'bottom-left': 'bottom:16px;left:16px;max-width:420px',
    'bottom-right': 'bottom:16px;right:16px;max-width:420px',
    'center': 'top:50%;left:50%;transform:translate(-50%,-50%);max-width:480px'
  };
  var place = pos[opt.position] || pos.bottom;
  var bar = opt.position === 'top' || opt.position === 'bottom' || !pos[opt.position];

  var bun = '<svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true">' +
    '<circle cx="16" cy="16" r="14" fill="#d9954a"/>' +
    '<path d="M14 16a2 2 0 1 1 4 0a4 4 0 1 1-8 0a6 6 0 1 1 12 0a8 8 0 1 1-16 0a10 10 0 1 1 20 0" ' +
    'fill="none" stroke="#8b4513" stroke-width="2" stroke-linecap="round"/><g fill="#fff">' +
    '<rect x="8" y="8" width="2" height="2" rx=".6"/><rect x="21" y="7" width="2" height="2" rx=".6"/>' +
    '<rect x="24" y="19" width="2" height="2" rx=".6"/><rect x="10" y="23" width="2" height="2" rx=".6"/>' +
    '<rect x="17" y="11" width="2" height="2" rx=".6"/><rect x="5" y="16" width="2" height="2" rx=".6"/></g></svg>';

  var dark = '.k{--bg:#000;--fg:#fff;--sh:none}';
  var theme = opt.theme === 'dark' ? dark : opt.theme === 'light' ? '' : '@media (prefers-color-scheme:dark){' + dark + '}';

  var host = document.createElement('div');
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  root.innerHTML =
    '<style>' +
    '.k{--bg:#fff;--fg:#000;--sh:0 4px 32px rgba(0,0,0,.15)}' + theme +
    '.k{position:fixed;z-index:2147483647;' + place + ';box-sizing:border-box;padding:' + (bar ? '24px 32px' : '32px 36px') + ';' +
    'background:var(--bg);color:var(--fg);box-shadow:var(--sh);font:16px/1.6 "Helvetica Neue",Helvetica,Arial,sans-serif;' +
    'letter-spacing:.01em;display:flex;gap:' + (bar ? '16px 32px;flex-wrap:wrap;align-items:center' : '20px;flex-direction:column') + '}' +
    '.t{flex:' + (bar ? '1 1 360px' : 'none') + '}svg{display:block;flex:none}' +
    'h2{margin:0 0 6px;font-size:16px;font-weight:700}p{margin:0}' +
    'a,button{color:inherit;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px}' +
    'a:hover,button:hover{text-decoration-thickness:2px}' +
    '.b{display:flex;flex-wrap:wrap;gap:12px 28px}' +
    'button{font:inherit;letter-spacing:inherit;background:none;border:0;padding:0;cursor:pointer}' +
    ':focus-visible{outline:2px solid currentColor;outline-offset:4px}' +
    '</style>' +
    '<div class="k" role="dialog" aria-live="polite" aria-labelledby="kt">' + bun +
    '<div class="t"><h2 id="kt">' + t.title + '</h2><p>' + t.body + ' ' + links + '</p></div>' +
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

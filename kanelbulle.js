/*! Kanelbulle – a cookie banner, but for buns. GPL-3.0 License. */
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
    title: 'Vår kanelbullepolicy',
    body: 'Ägarna till den här webbplatsen stöttar fika. ' +
      'Den 4 oktober är det Kanelbullens dag, och genom att fortsätta surfa godkänner du att ta en fika med kanelbulle.',
    accept: 'Acceptera alla bullar',
    necessary: 'Endast nödvändiga bullar',
    bakery: 'Hitta närmaste bageri',
    recipe: 'Baka själv',
    bakeryUrl: 'https://www.google.com/maps/search/bageri',
    recipeUrl: 'https://www.arla.se/recept/kanelbullar/'
  } : {
    title: 'Our cinnamon bun policy',
    body: 'The owners of this website support fika, the Swedish coffee break. ' +
      'October 4th is Kanelbullens dag, Sweden’s Cinnamon Bun Day, and by continuing to browse you agree to have a fika with a cinnamon bun.',
    accept: 'Accept all buns',
    necessary: 'Only necessary buns',
    bakery: 'Find the nearest bakery',
    recipe: 'Bake your own',
    bakeryUrl: 'https://www.google.com/maps/search/bakery',
    recipeUrl: 'https://scandinaviancookbook.com/kanelbullar-swedish-cinnamon-buns/'
  };
  if (opt.recipe) t.recipeUrl = String(opt.recipe).replace(/"/g, '&quot;');

  var pos = {
    'top': 'top:0;left:0;right:0',
    'bottom': 'bottom:0;left:0;right:0',
    'top-left': 'top:16px;left:16px;max-width:380px',
    'top-right': 'top:16px;right:16px;max-width:380px',
    'bottom-left': 'bottom:16px;left:16px;max-width:380px',
    'bottom-right': 'bottom:16px;right:16px;max-width:380px',
    'center': 'top:50%;left:50%;transform:translate(-50%,-50%);max-width:420px'
  };
  var place = pos[opt.position] || pos.bottom;
  var bar = opt.position === 'top' || opt.position === 'bottom' || !pos[opt.position];

  var bun = '<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">' +
    '<circle cx="16" cy="16" r="14" fill="#d9954a"/>' +
    '<path d="M14 16a2 2 0 1 1 4 0a4 4 0 1 1-8 0a6 6 0 1 1 12 0a8 8 0 1 1-16 0a10 10 0 1 1 20 0" ' +
    'fill="none" stroke="#8b4513" stroke-width="2" stroke-linecap="round"/><g fill="#fff">' +
    '<rect x="8" y="8" width="2" height="2" rx=".6"/><rect x="21" y="7" width="2" height="2" rx=".6"/>' +
    '<rect x="24" y="19" width="2" height="2" rx=".6"/><rect x="10" y="23" width="2" height="2" rx=".6"/>' +
    '<rect x="17" y="11" width="2" height="2" rx=".6"/><rect x="5" y="16" width="2" height="2" rx=".6"/></g></svg>';

  var dark = '.k{--bg:#2b1d14;--fg:#f5e6d3;--ac:#e8a45c;--on:#2b1d14;--sh:rgba(0,0,0,.5)}';
  var theme = opt.theme === 'dark' ? dark : opt.theme === 'light' ? '' : '@media (prefers-color-scheme:dark){' + dark + '}';

  var host = document.createElement('div');
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  root.innerHTML =
    '<style>' +
    '.k{--bg:#fff8ee;--fg:#4a2c17;--ac:#a0522d;--on:#fff;--sh:rgba(74,44,23,.25)}' + theme +
    '.k{position:fixed;z-index:2147483647;' + place + ';box-sizing:border-box;margin:0 auto;padding:20px 24px;' +
    'background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
    'box-shadow:0 4px 24px var(--sh);border-radius:' + (bar ? '0' : '12px') + ';' +
    'display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;' + (bar ? '' : 'flex-direction:column;align-items:stretch') + '}' +
    '.t{flex:' + (bar ? '1 1 320px' : 'none') + '}h2{margin:0 0 4px;font-size:17px;display:flex;align-items:center;gap:8px}svg{flex:none}p{margin:0}' +
    '.l{margin-top:8px;display:flex;flex-wrap:wrap;gap:4px 16px}a{color:var(--ac);font-weight:600}' +
    '.b{display:flex;flex-wrap:wrap;gap:8px}button{font:inherit;font-weight:600;cursor:pointer;padding:10px 16px;' +
    'border-radius:8px;border:2px solid var(--ac);background:var(--ac);color:var(--on);flex:1 1 auto}' +
    'button+button{background:transparent;color:var(--ac)}button:hover{filter:brightness(1.1)}' +
    '</style>' +
    '<div class="k" role="dialog" aria-live="polite" aria-labelledby="kt">' +
    '<div class="t"><h2 id="kt">' + bun + t.title + '</h2><p>' + t.body + '</p>' +
    '<div class="l"><a href="' + t.bakeryUrl + '" target="_blank" rel="noopener">📍 ' + t.bakery + '</a>' +
    '<a href="' + t.recipeUrl + '" target="_blank" rel="noopener">📖 ' + t.recipe + '</a></div></div>' +
    '<div class="b"><button>' + t.accept + '</button><button>' + t.necessary + '</button></div></div>';

  root.querySelector('.b').addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') return;
    try { localStorage.setItem(key, '1'); } catch (err) {}
    host.remove();
  });

  function mount() { document.body.appendChild(host); }
  document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);
})();

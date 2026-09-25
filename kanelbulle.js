/*! Kanelbulle – a cookie banner, but for buns. GPL-3.0 License. */
(function () {
  var script = document.currentScript;
  var opt = Object.assign({}, script && script.dataset, window.KanelbulleConfig);
  var now = new Date();
  var isDay = now.getMonth() === 9 && now.getDate() === 4; // October 4th
  var key = 'kanelbulle-' + now.getFullYear();

  if (!isDay && String(opt.always) !== 'true') return;
  try { if (localStorage.getItem(key)) return; } catch (e) {}

  var lang = (opt.lang || document.documentElement.lang || '').toLowerCase();
  var sv = lang.indexOf('sv') === 0;
  var t = sv ? {
    title: 'Vi använder kanelbullar',
    body: 'Den här webbplatsen använder kanelbullar för att förbättra din upplevelse. ' +
      'Den 4 oktober är det Kanelbullens dag, och genom att fortsätta surfa godkänner du att ta en fika.',
    accept: 'Acceptera alla bullar',
    necessary: 'Endast nödvändiga bullar',
    bakery: 'Hitta närmaste bageri',
    recipe: 'Baka själv',
    bakeryUrl: 'https://www.google.com/maps/search/bageri',
    recipeUrl: 'https://www.arla.se/recept/kanelbullar/'
  } : {
    title: 'We use cinnamon buns',
    body: 'This website uses kanelbullar (cinnamon buns) to improve your experience. ' +
      'October 4th is Kanelbullens dag, Sweden’s Cinnamon Bun Day. By continuing to browse you agree to have a fika.',
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

  var host = document.createElement('div');
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  root.innerHTML =
    '<style>' +
    '.k{position:fixed;z-index:2147483647;' + place + ';box-sizing:border-box;margin:0 auto;padding:20px 24px;' +
    'background:#fff8ee;color:#4a2c17;font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
    'box-shadow:0 4px 24px rgba(74,44,23,.25);border-radius:' + (bar ? '0' : '12px') + ';' +
    'display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;' + (bar ? '' : 'flex-direction:column;align-items:stretch') + '}' +
    '.t{flex:' + (bar ? '1 1 320px' : 'none') + '}h2{margin:0 0 4px;font-size:17px}p{margin:0}' +
    '.l{margin-top:8px;display:flex;flex-wrap:wrap;gap:4px 16px}a{color:#a0522d;font-weight:600}' +
    '.b{display:flex;flex-wrap:wrap;gap:8px}button{font:inherit;font-weight:600;cursor:pointer;padding:10px 16px;' +
    'border-radius:8px;border:2px solid #a0522d;background:#a0522d;color:#fff;flex:1 1 auto}' +
    'button+button{background:transparent;color:#a0522d}button:hover{filter:brightness(1.1)}' +
    '</style>' +
    '<div class="k" role="dialog" aria-live="polite" aria-labelledby="kt">' +
    '<div class="t"><h2 id="kt">🍩 ' + t.title + '</h2><p>' + t.body + '</p>' +
    '<div class="l"><a href="' + t.bakeryUrl + '" target="_blank" rel="noopener">🥐 ' + t.bakery + '</a>' +
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

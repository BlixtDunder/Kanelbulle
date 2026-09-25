# Kanelbulle

A cookie consent banner, except it's about the other kind of cookie. On October 4th, Kanelbullens dag (Cinnamon Bun Day), it shows your visitors "Our cinnamon bun policy" and links them to the nearest bakery and a recipe.

- About 5 KB, no dependencies, no build step
- Shows up only on October 4th, and only once per visitor per year
- Swedish on Swedish sites (`<html lang="sv">`), English everywhere else
- Styles live in a Shadow DOM, so your CSS won't touch the banner and the banner won't touch your CSS
- Minimal black-and-white design with a kanelbulle icon
- Light and dark mode, following the visitor's system setting unless you pick one
- Sets no cookies (the dismissal goes in `localStorage`)

## Usage

```html
<script src="https://cdn.jsdelivr.net/gh/BlixtDunder/kanelbulle/kanelbulle.min.js" data-position="bottom-right" defer></script>
```

jsDelivr minifies `.min.js` automatically. You can also just copy `kanelbulle.js` onto your own server.

## Options

Set options as `data-` attributes on the script tag, or through `window.KanelbulleConfig = { ... }` before the script loads.

| Option     | Values                                                                               | Default                      |
|------------|--------------------------------------------------------------------------------------|------------------------------|
| `position` | `bottom`, `top`, `bottom-left`, `bottom-right`, `top-left`, `top-right`, `center`     | `bottom`                     |
| `theme`    | `auto`, `light`, `dark`                                                               | `auto` (follows the visitor's system setting) |
| `lang`     | `sv`, `en`                                                                           | from `<html lang>`           |
| `recipe`   | a URL to your favourite recipe                                                       | Arla (sv) / Scandinavian Cookbook (en) |

## Demo

Open `index.html` in a browser. The demo pretends it's October 4th and lets you switch position and language.

## License

GPL-3.0, see [LICENSE](LICENSE).

Made by [Blixt & Dunder](https://www.blixtdunder.com).

# Kanelbulle

A cookie consent banner, except it's about the other kind of cookie. On October 4th, Kanelbullens dag (Cinnamon Bun Day), it shows your visitors "Our cinnamon bun policy" and links them to the nearest bakery and a recipe.

- About 3 KB over the wire (gzipped), no dependencies, no build step
- Shows up only on October 4th, and only once per visitor per year
- Optional countdown in the days before, reminding visitors to get prepared
- Swedish on Swedish sites (`<html lang="sv">`), English everywhere else
- Styles live in a Shadow DOM, so your CSS won't touch the banner and the banner won't touch your CSS
- Minimal black-and-white design with a kanelbulle icon
- Light and dark mode, following the visitor's system setting unless you pick one
- Sets no cookies (the dismissal goes in `localStorage`)

## Usage

```html
<script src="https://cdn.jsdelivr.net/gh/BlixtDunder/Kanelbulle@1/kanelbulle.min.js" defer></script>
```

`@1` gets you bug fixes but never breaking changes. jsDelivr minifies `.min.js` automatically. You can also just copy `kanelbulle.js` onto your own server.

### Preview it on your site

The banner only appears around October 4th, so to check how it looks on your site before then, add `#kanelbulle` to any page URL (for example `https://example.com/#kanelbulle`). Use `#kanelbulle-3` to see the countdown version with three days to go. Only you see it; visitors don't.

## Options

Set options as `data-` attributes on the script tag, or through `window.KanelbulleConfig = { ... }` before the script loads.

| Option     | Values                                                                               | Default                      |
|------------|--------------------------------------------------------------------------------------|------------------------------|
| `position` | `bottom-left`, `bottom-right`, `top-left`, `top-right`, `center`, `bottom`, `top`     | `bottom-left`                |
| `theme`    | `auto`, `light`, `dark`                                                               | `auto` (follows the visitor's system setting) |
| `countdown`| number of days before October 4th to show a countdown banner, e.g. `7`                | `0` (off)                    |
| `lang`     | `sv`, `en`                                                                           | from `<html lang>`           |
| `recipe`   | a URL to your favourite recipe                                                       | Ankarsrum (sv) / Scandinavian Cookbook (en) |

## Demo

Try it at **https://blixtdunder.github.io/Kanelbulle/**, or open `index.html` locally. The demo lets you switch between the day and countdown versions, position, language and theme.

## License

GPL-3.0, see [LICENSE](LICENSE).

Made by [Blixt & Dunder](https://www.blixtdunder.com).

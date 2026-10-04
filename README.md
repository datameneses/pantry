# Pantry

Personal archives of coffee, wine, books and vinyl records, in one site with a shared menu. Plain HTML/CSS/JS, no build step, hosted on GitHub Pages at <https://datameneses.github.io/pantry/>.

## Layout

- `index.html`: home page with a tile per section
- `shared/menu.js`, `shared/menu.css`: the header menu (one dropdown per section) used by every page; edit the `MENU` list in `menu.js` to add or rename a page
- `shared/home.css`: styles for the home page
- `coffee/`, `wine/`, `books/`, `vinyls/`: one self-contained site per section, each with its own `css/`, `js/`, `data/`, `images/` and pages. Each keeps its own accent colour and theme

Adding an entry is the same as before: add an object to the section's `data/*.json` file (see the README inside each section for the fields). Run a local server to preview, for example `python3 -m http.server`, since the pages fetch their data files.

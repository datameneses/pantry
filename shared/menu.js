// Shared header menu for every page: brand + a nav with one dropdown per
// section. Runs right after the (empty) <header data-menu> element, before
// each section's own main.js wires up the mobile hamburger toggle.
(function () {
  const MENU = [
    { id: "coffee", label: "Coffee", pages: [["Beans", "index.html"], ["Recipes", "recipes.html"], ["Equipment", "equipment.html"], ["About", "about.html"]] },
    { id: "wine", label: "Wine", pages: [["Wines", "index.html"], ["About", "about.html"]] },
    { id: "books", label: "Books", pages: [["Read", "index.html"], ["To Read", "tbr.html"]] },
    { id: "vinyls", label: "Vinyls", pages: [["Vinyls", "index.html"], ["About", "about.html"]] }
  ];

  const script = document.currentScript;
  const root = new URL("../", script.src).pathname; // e.g. "/pantry/" or "/"
  const header = document.querySelector("header[data-menu]");
  if (!header) return;

  const here = window.location.pathname.replace(/index\.html$/, "");
  const currentSection = document.body.dataset.section;
  const href = (section, page) => root + section + "/" + page;
  const isHere = (section, page) => href(section, page).replace(/index\.html$/, "") === here;

  const groups = MENU.map((s) => {
    const links = s.pages
      .map(([label, page]) => `<a href="${href(s.id, page)}"${isHere(s.id, page) ? ' class="active" aria-current="page"' : ""}>${label}</a>`)
      .join("");
    return `<div class="menu-group${s.id === currentSection ? " current" : ""}">
        <a class="menu-top${s.id === currentSection ? " active" : ""}" href="${href(s.id, s.pages[0][1])}">${s.label}</a>
        <button class="menu-caret" type="button" aria-label="${s.label} pages" aria-expanded="false">&#9662;</button>
        <div class="submenu">${links}</div>
      </div>`;
  }).join("");

  header.innerHTML = `
    <a class="brand" href="${root}index.html">Pantry</a>
    <button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">&#9776;</button>
    <nav class="site-nav">${groups}</nav>`;

  // Caret buttons toggle a dropdown on touch/keyboard; hover works via CSS.
  header.querySelectorAll(".menu-caret").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const group = btn.closest(".menu-group");
      const open = !group.classList.contains("open");
      header.querySelectorAll(".menu-group.open").forEach((g) => {
        g.classList.remove("open");
        g.querySelector(".menu-caret").setAttribute("aria-expanded", "false");
      });
      group.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("click", () => {
    header.querySelectorAll(".menu-group.open").forEach((g) => {
      g.classList.remove("open");
      g.querySelector(".menu-caret").setAttribute("aria-expanded", "false");
    });
  });
})();

import { navItems, state } from "../state.js";

const assetBase = import.meta.env.BASE_URL;

export function renderTopbar() {
  return `
    <header class="topbar">
      <div class="brand">
        <img class="brand-logo" src="${assetBase}logo.png" alt="InkMind logo" />
        <div>
          <div class="brand-kicker">画完就跑小组</div>
          <div class="brand-title">笔墨通心</div>
        </div>
      </div>
      <nav class="nav" aria-label="主导航">
        ${navItems
          .map(
            ([key, no, name]) => `
              <button class="nav-button ${key === state.activePage ? "active" : ""}" data-page="${key}">
                <span class="page-no">${no}</span><span>${name}</span>
              </button>`,
          )
          .join("")}
      </nav>
    </header>`;
}

export function renderPageHeader(eyebrow, title, summary) {
  return `
    <div class="page-header">
      <div>
        <div class="eyebrow">${eyebrow}</div>
        <h1>${title}</h1>
      </div>
      <div class="header-side">
        <span>${summary}</span>
      </div>
    </div>`;
}

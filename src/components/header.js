import { MOCK_NOTICE } from "../data/mock-data.js";
import { navItems, state } from "../state.js";

export function renderTopbar() {
  return `
    <header class="topbar">
      <div class="brand">
        <div class="brand-seal">笔墨</div>
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
        <span class="mock-badge">${MOCK_NOTICE}</span>
      </div>
    </div>`;
}

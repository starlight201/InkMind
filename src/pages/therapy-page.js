import { problems, therapyCatalog } from "../data/mock-data.js";
import { state } from "../state.js";
import { renderPageHeader } from "../components/header.js";

export function renderTherapyPage() {
  return `
    <section class="page ${state.activePage === "therapy" ? "active" : ""}" data-page-panel="therapy">
      ${renderPageHeader("传统心理干预方式横向观察", "传统心理疗法优缺点分析", "按心理问题查看三项效果指标")}
      <div class="content therapy-layout">
        <article class="card therapy-card">
          <div class="card-heading">
            <div><h2>同一心理问题下，传统疗法效果对比</h2><p>每种疗法包含改善率、情绪效价指数（效应量 d × 100）和满意度。</p></div>
            <div class="filter-tabs">${renderProblemTabs()}</div>
          </div>
          <div class="therapy-chart-wrap"><div id="therapy-chart" class="chart"></div></div>
          <div class="therapy-actions">${therapyCatalog.map(renderTherapyAction).join("")}</div>
        </article>
      </div>
    </section>`;
}

function renderProblemTabs() {
  return problems
    .map(
      (item) =>
        `<button class="filter-tab ${item.key === state.selectedProblem ? "active" : ""}" data-problem="${item.key}">${item.name}</button>`,
    )
    .join("");
}

function renderTherapyAction(therapy) {
  return `
    <div class="therapy-action">
      <span>${therapy.shortName}</span>
      <button class="info-button" data-therapy-info="${therapy.key}" aria-label="查看${therapy.name}详情">详</button>
    </div>`;
}

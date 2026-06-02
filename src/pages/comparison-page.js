import { therapyCatalog } from "../data/mock-data.js";
import { state } from "../state.js";
import { renderPageHeader } from "../components/header.js";

export function renderComparisonPage() {
  return `
    <section class="page ${state.activePage === "comparison" ? "active" : ""}" data-page-panel="comparison">
      ${renderPageHeader("多维观察干预方式差异", "中国画疗法与传统疗法综合对比", "红蓝雷达叠加，面积越大表示综合表现越优")}
      <div class="content comparison-layout">
        <article class="card comparison-card">
          <div class="card-heading">
            <div><h2>疗法五维雷达图</h2><p>中国画疗法固定显示，选择一种传统疗法进行叠加对比。</p></div>
            <div class="therapy-tabs">${therapyCatalog.map(renderTherapyTab).join("")}</div>
          </div>
          <div class="radar-wrap"><div id="radar-chart" class="chart"></div></div>
        </article>
        <aside class="card summary-card">
          <h2>对比摘要</h2>
          <p>中国画疗法以朱砂红固定展示，蓝色区域为当前选择的传统疗法。</p>
          <div class="comparison-legend">
            <div class="legend-item"><i class="legend-line" style="--accent:var(--red)"></i>中国画美育疗法</div>
            <div class="legend-item"><i class="legend-line" style="--accent:var(--blue)"></i><span id="summary-therapy-name"></span></div>
          </div>
          <div class="summary-list" id="summary-list"></div>
          <div class="summary-note" id="summary-note"></div>
        </aside>
      </div>
    </section>`;
}

function renderTherapyTab(therapy) {
  return `
    <button class="therapy-tab ${therapy.key === state.selectedTherapy ? "active" : ""}"
      data-radar-therapy="${therapy.key}">${therapy.shortName}</button>`;
}

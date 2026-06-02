import { COLORS, problems } from "../data/mock-data.js";
import { state } from "../state.js";
import { renderPageHeader } from "../components/header.js";

export function renderMentalStatusPage() {
  return `
    <section class="page ${state.activePage === "status" ? "active" : ""}" data-page-panel="status">
      ${renderPageHeader("中国画美育疗法数据可视化平台", "大学生心理问题现状总览", "心理问题占比与人数变化趋势")}
      <div class="content status-layout">
        <article class="card">
          <div class="card-heading"><div><h2>2025 年四类心理问题患病率</h2><p>四类问题可能重叠，患病率不做合计。点击后聚焦对应趋势。</p></div></div>
          <div class="chart-wrap"><div id="distribution-chart" class="chart"></div></div>
        </article>
        <article class="card">
          <div class="card-heading"><div><h2>心理问题人数变化趋势</h2><p>2016 至 2025 年，四类问题在同一图表中横向比较。</p></div></div>
          <div class="chart-wrap"><div id="status-trend-chart" class="chart"></div></div>
        </article>
        <article class="card analysis-row">
          ${problems.map(renderProblemCard).join("")}
        </article>
      </div>
    </section>`;
}

function renderProblemCard(item) {
  return `
    <button class="problem-card ${state.selectedProblem === item.key ? "active" : ""}"
      data-problem-focus="${item.key}" style="--accent:${COLORS[item.key]}">
      <div class="problem-head">
        <span class="problem-title"><i class="problem-dot"></i>${item.name}</span>
        <span class="problem-short">${item.short}</span>
      </div>
      <p>${item.description}</p>
    </button>`;
}

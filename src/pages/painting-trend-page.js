import { paintingTrend } from "../data/mock-data.js";
import { state } from "../state.js";
import { renderPageHeader } from "../components/header.js";

export function renderPaintingTrendPage() {
  const total = paintingTrend.reduce((sum, item) => sum + item.participants, 0);
  const latest = paintingTrend.at(-1);
  return `
    <section class="page ${state.activePage === "trend" ? "active" : ""}" data-page-panel="trend">
      ${renderPageHeader("中国画美育疗法发展观察", "国画疗愈调研", "参与人数与满意度的十年变化")}
      <div class="content trend-layout">
        <aside class="trend-stats">
          <article class="card stat-card" data-mark="人">
            <div class="stat-label">累计参与人数</div>
            <div class="stat-value">${total.toLocaleString()}<small> 人</small></div>
            <div class="stat-foot">2016-2025 年模拟统计</div>
          </article>
          <article class="card stat-card" data-mark="满">
            <div class="stat-label">最新满意度</div>
            <div class="stat-value">${latest.satisfaction}<small>%</small></div>
            <div class="stat-foot">${latest.year} 年体验反馈</div>
          </article>
          <article class="card trend-notes">
            <h3>十年观察</h3>
            <p>折线展示年度参与人数增长，悬停节点可查看满意度、发展阶段与情绪效价提升度。</p>
          </article>
        </aside>
        <article class="card trend-main-card">
          <div class="card-heading"><div><h2>年份节点趋势</h2><p>纵坐标为参与人数，标签显示各年份参与规模。</p></div></div>
          <div class="trend-chart-wrap"><div id="painting-trend-chart" class="chart"></div></div>
        </article>
      </div>
    </section>`;
}

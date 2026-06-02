import { COLORS, techniqueHotspots } from "../data/mock-data.js";
import { state } from "../state.js";
import { renderPageHeader } from "../components/header.js";

export function renderTechniquePage() {
  return `
    <section class="page ${state.activePage === "technique" ? "active" : ""}" data-page-panel="technique">
      ${renderPageHeader("从画面进入技法，从技法理解情绪", "中国画技法对于每种心理问题的针对性", "悬停画面区域，点击查看技法机制")}
      <div class="content technique-layout">
        <article class="card painting-card">
          <div class="painting-stage">
            <img src="/images/chinese-painting.jpg" alt="中国画技法互动图" />
            <svg class="painting-hotspots" viewBox="0 0 100 100" preserveAspectRatio="none">
              ${techniqueHotspots.map(renderHotspot).join("")}
            </svg>
          </div>
        </article>
        <aside class="card technique-side">
          <div class="side-intro">
            <h3>画中有法，法中见心</h3>
            <p>画面被划分为四个交互区域。移动鼠标观察轮廓，点击了解对应心理问题与技法特点。</p>
          </div>
          ${techniqueHotspots.map(renderTechniqueButton).join("")}
        </aside>
      </div>
    </section>`;
}

function renderHotspot(item) {
  return `
    <polygon points="${item.points}" data-hotspot="${item.key}" />
    <g class="hotspot-label" data-hotspot-label="${item.key}" transform="translate(${item.label[0]} ${item.label[1]})">
      <rect x="-7.2" y="-2.8" width="14.4" height="5.4"></rect>
      <text text-anchor="middle" dominant-baseline="middle">${item.name}</text>
    </g>`;
}

function renderTechniqueButton(item) {
  return `
    <button class="technique-mini" data-technique="${item.key}" style="--accent:${COLORS[item.problemKey]}">
      <strong>${item.name} · ${item.problem}</strong>
      <span>${item.caption}</span>
    </button>`;
}

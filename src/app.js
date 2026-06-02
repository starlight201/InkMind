import { createCharts } from "./charts/index.js";
import { renderTopbar } from "./components/header.js";
import { renderModal } from "./components/modal.js";
import { bindEvents } from "./interactions/events.js";
import { renderRadarSummary } from "./interactions/radar-summary.js";
import {
  renderComparisonPage,
  renderMentalStatusPage,
  renderPaintingTrendPage,
  renderTechniquePage,
  renderTherapyPage,
} from "./pages/index.js";
import { state } from "./state.js";

export function createApp() {
  document.querySelector("#app").innerHTML = `
    <div class="app-shell">
      ${renderTopbar()}
      <main class="main">
        ${renderMentalStatusPage()}
        ${renderTherapyPage()}
        ${renderPaintingTrendPage()}
        ${renderTechniquePage()}
        ${renderComparisonPage()}
      </main>
      ${renderModal()}
    </div>`;

  let charts;
  const selectProblem = (key) => document.querySelector(`[data-problem-focus="${key}"]`)?.click();
  charts = createCharts(state, selectProblem);
  renderRadarSummary(state.selectedTherapy);
  bindEvents({ state, charts });
}

import { closeModal, openModal } from "../components/modal.js";
import { renderMentalTrendChart, renderRadarChart, renderTherapyBarChart, resizeCharts } from "../charts/index.js";
import { updateHotspotState, bindHotspotHover } from "./hotspots.js";
import { techniqueModalContent, therapyModalContent } from "./modal-content.js";
import { renderRadarSummary } from "./radar-summary.js";
import { bindWheelNavigation } from "./wheel-navigation.js";

const MOBILE_QUERY = "(max-width: 768px)";

export function bindEvents({ state, charts }) {
  document.addEventListener("click", (event) => handleClick(event, state, charts));
  bindHotspotHover(() => state.selectedHotspot);
  bindWheelNavigation({ state, onNavigate: (page) => navigateTo(page, state, charts) });
  window.addEventListener("keydown", (event) => event.key === "Escape" && closeModal());
  window.addEventListener("resize", () => resizeCharts(charts));
  if (isMobileLayout()) requestAnimationFrame(() => scrollToPanel(state.activePage, "auto"));
}

function handleClick(event, state, charts) {
  const nav = event.target.closest("[data-page]");
  if (nav) return navigateTo(nav.dataset.page, state, charts);

  const problem = event.target.closest("[data-problem], [data-problem-focus]");
  if (problem) return selectProblem(problem.dataset.problem || problem.dataset.problemFocus, state, charts);

  const therapyInfo = event.target.closest("[data-therapy-info]");
  if (therapyInfo) return openModal(therapyModalContent(therapyInfo.dataset.therapyInfo, state.selectedProblem));

  const technique = event.target.closest("[data-technique], [data-hotspot]");
  if (technique) return selectTechnique(technique.dataset.technique || technique.dataset.hotspot, state);

  const radarTherapy = event.target.closest("[data-radar-therapy]");
  if (radarTherapy) return selectRadarTherapy(radarTherapy.dataset.radarTherapy, state, charts);

  if (event.target.matches(".modal-close") || event.target.matches("#modal-backdrop")) closeModal();
}

function navigateTo(page, state, charts) {
  state.activePage = page;
  const url = new URL(window.location.href);
  url.searchParams.set("page", page);
  window.history.replaceState({}, "", url);
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === page);
  });
  document.querySelectorAll("[data-page-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.pagePanel === page);
  });
  if (isMobileLayout()) scrollToPanel(page);
  requestAnimationFrame(() => resizeCharts(charts));
}

function selectProblem(key, state, charts) {
  state.selectedProblem = key;
  document.querySelectorAll("[data-problem-focus]").forEach((button) => {
    button.classList.toggle("active", button.dataset.problemFocus === key);
  });
  document.querySelectorAll("[data-problem]").forEach((button) => {
    button.classList.toggle("active", button.dataset.problem === key);
  });
  renderMentalTrendChart(charts.mentalTrend, key);
  renderTherapyBarChart(charts.therapy, key);
}

function selectTechnique(key, state) {
  state.selectedHotspot = key;
  updateHotspotState(key);
  openModal(techniqueModalContent(key));
}

function selectRadarTherapy(key, state, charts) {
  state.selectedTherapy = key;
  document.querySelectorAll("[data-radar-therapy]").forEach((button) => {
    button.classList.toggle("active", button.dataset.radarTherapy === key);
  });
  renderRadarChart(charts.radar, key);
  renderRadarSummary(key);
}

function isMobileLayout() {
  return window.matchMedia?.(MOBILE_QUERY).matches ?? window.innerWidth <= 768;
}

function scrollToPanel(page, behavior = "smooth") {
  document.querySelector(`[data-page-panel="${page}"]`)?.scrollIntoView({ block: "start", behavior });
}

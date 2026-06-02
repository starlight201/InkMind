import * as echarts from "echarts";
import { renderDistributionChart } from "./distribution-chart.js";
import { renderMentalTrendChart } from "./mental-trend-chart.js";
import { renderPaintingNodeChart } from "./painting-node-chart.js";
import { renderRadarChart } from "./radar-chart.js";
import { renderTherapyBarChart } from "./therapy-bar-chart.js";

export function createCharts(state, onProblemSelect) {
  const charts = {
    distribution: echarts.init(document.querySelector("#distribution-chart")),
    mentalTrend: echarts.init(document.querySelector("#status-trend-chart")),
    therapy: echarts.init(document.querySelector("#therapy-chart")),
    paintingTrend: echarts.init(document.querySelector("#painting-trend-chart")),
    radar: echarts.init(document.querySelector("#radar-chart")),
  };

  renderDistributionChart(charts.distribution, onProblemSelect);
  renderMentalTrendChart(charts.mentalTrend, state.selectedProblem);
  renderTherapyBarChart(charts.therapy, state.selectedProblem);
  renderPaintingNodeChart(charts.paintingTrend);
  renderRadarChart(charts.radar, state.selectedTherapy);
  return charts;
}

export function resizeCharts(charts) {
  Object.values(charts).forEach((chart) => chart.resize());
}

export { renderMentalTrendChart, renderRadarChart, renderTherapyBarChart };

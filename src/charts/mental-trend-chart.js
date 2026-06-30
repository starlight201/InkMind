import { COLORS, mentalTrends, problems, statusYears } from "../data/mock-data.js";
import { formatNumber } from "../utils/format-number.js";
import { chartTooltip } from "./chart-theme.js";
import { axisText, splitInkLine } from "./ink-brush.js";

export function renderMentalTrendChart(chart, selectedProblem) {
  chart.setOption({
    animation: false,
    color: problems.map((item) => COLORS[item.key]),
    tooltip: {
      ...chartTooltip(),
      trigger: "axis",
      formatter: (items) => [
        `<strong>${items[0].axisValue}</strong>`,
        ...items.map((item) => `${item.marker}${item.seriesName}: ${formatNumber(item.value)}`),
      ].join("<br/>"),
    },
    legend: { top: 10, right: 20, textStyle: axisText(13, 600, "#64706c") },
    grid: { left: 64, right: 26, top: 62, bottom: 44 },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: statusYears,
      axisLine: { lineStyle: { color: "rgba(88,78,60,.32)" } },
      axisLabel: axisText(13, 500, "#77817d"),
    },
    yAxis: {
      type: "value",
      name: "人数",
      nameTextStyle: axisText(13, 600, "#77817d"),
      axisLabel: { ...axisText(13, 500, "#77817d"), formatter: (value) => formatNumber(value) },
      splitLine: splitInkLine(),
    },
    series: problems.map((item) => ({
      name: item.name,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: selectedProblem === item.key ? 8 : 6,
      lineStyle: { width: selectedProblem === item.key ? 4 : 2.2 },
      areaStyle: selectedProblem === item.key ? { opacity: 0.08, color: COLORS[item.key] } : undefined,
      emphasis: { focus: "series" },
      data: mentalTrends[item.key],
    })),
  });
}

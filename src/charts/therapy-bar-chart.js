import { therapyCatalog, therapyMetrics } from "../data/mock-data.js";
import { formatPercent } from "../utils/format-number.js";
import { chartTooltip } from "./chart-theme.js";

const metricConfig = [
  ["改善率", "improvementRate", "#bd493d"],
  ["情绪效价指数（d×100）", "emotionalValence", "#43836f"],
  ["满意度", "satisfaction", "#4869b2"],
];

export function renderTherapyBarChart(chart, selectedProblem) {
  const dataset = therapyMetrics[selectedProblem];
  chart.setOption(
    {
      color: metricConfig.map((item) => item[2]),
      tooltip: {
        ...chartTooltip(),
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (items) => [
          `<strong>${items[0].axisValue}</strong>`,
          ...items.map((item) => `${item.marker}${item.seriesName}: ${formatPercent(item.value)}`),
        ].join("<br/>"),
      },
      legend: { top: 18, textStyle: { color: "#64706c" } },
      grid: { left: 58, right: 32, top: 70, bottom: 52 },
      xAxis: {
        type: "category",
        data: therapyCatalog.map((item) => item.name),
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "#c9c6bb" } },
        axisLabel: { color: "#34413e", fontWeight: 700, fontSize: 14 },
      },
      yAxis: {
        type: "value",
        max: 100,
        name: "%",
        axisLabel: { color: "#77817d", formatter: (value) => formatPercent(value) },
        splitLine: { lineStyle: { color: "rgba(96,106,100,.11)", type: "dashed" } },
      },
      series: metricConfig.map(([name, key]) => ({
        name,
        type: "bar",
        barWidth: 24,
        barGap: "18%",
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: {
          show: true,
          position: "top",
          color: "#4b5652",
          fontWeight: 700,
          formatter: ({ value }) => formatPercent(value),
        },
        data: therapyCatalog.map((therapy) => dataset[therapy.key][key]),
      })),
    },
    true,
  );
}

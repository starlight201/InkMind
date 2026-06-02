import { COLORS, problems } from "../data/mock-data.js";
import { chartTooltip } from "./chart-theme.js";

export function renderDistributionChart(chart, onSelect) {
  chart.setOption({
    color: problems.map((item) => COLORS[item.key]),
    tooltip: { ...chartTooltip(), trigger: "axis", axisPointer: { type: "shadow" }, formatter: "{b}<br/><strong>{c}%</strong>" },
    grid: { left: 86, right: 38, top: 34, bottom: 30 },
    xAxis: {
      type: "value",
      max: 80,
      axisLabel: { color: "#77817d", formatter: "{value}%" },
      splitLine: { lineStyle: { color: "rgba(96,106,100,.11)", type: "dashed" } },
    },
    yAxis: {
      type: "category",
      data: problems.map((item) => item.name),
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: "#35413e", fontSize: 13, fontWeight: 700 },
    },
    series: [{
      type: "bar",
      barWidth: 26,
      label: { show: true, position: "right", color: "#4b5652", fontWeight: 700, formatter: "{c}%" },
      itemStyle: { borderRadius: [0, 5, 5, 0], color: ({ dataIndex }) => COLORS[problems[dataIndex].key] },
      data: problems.map((item) => ({ value: item.value, name: item.name, key: item.key })),
    }],
  });

  chart.off("click");
  chart.on("click", ({ data }) => onSelect(data.key));
}

import { radarComparison, radarDimensions, therapyCatalog } from "../data/mock-data.js";
import { formatNumber } from "../utils/format-number.js";
import { chartTooltip } from "./chart-theme.js";

export function renderRadarChart(chart, selectedTherapy) {
  const therapy = therapyCatalog.find((item) => item.key === selectedTherapy);
  chart.setOption(
    {
      color: ["#bd493d", "#4869b2"],
      tooltip: {
        ...chartTooltip(),
        trigger: "item",
        formatter: ({ name, value }) =>
          [`<strong>${name}</strong>`, ...radarDimensions.map((item, index) => `${item.name}: ${formatNumber(value[index])}`)].join("<br/>"),
      },
      legend: { bottom: 10, left: "center", textStyle: { color: "#64706c", fontSize: 13 } },
      radar: {
        center: ["50%", "48%"],
        radius: "68%",
        splitNumber: 5,
        indicator: radarDimensions.map((item) => ({ name: `${item.name}\n${item.direction}`, max: 100 })),
        axisName: { color: "#4f5d59", fontSize: 13, lineHeight: 19, fontWeight: 700 },
        axisLine: { lineStyle: { color: "rgba(85,96,91,.2)" } },
        splitLine: { lineStyle: { color: "rgba(85,96,91,.18)" } },
        splitArea: { areaStyle: { color: ["rgba(255,253,247,.3)", "rgba(232,225,213,.2)"] } },
      },
      series: [
        {
          type: "radar",
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { width: 3 },
          areaStyle: { opacity: 0.17 },
          data: [
            { name: "中国画美育疗法", value: radarComparison.chinesePainting },
            { name: therapy.name, value: radarComparison.traditional[selectedTherapy] },
          ],
        },
      ],
    },
    true,
  );
}

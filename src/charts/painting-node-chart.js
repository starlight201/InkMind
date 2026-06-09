import { paintingTrend } from "../data/mock-data.js";
import { chartTooltip } from "./chart-theme.js";

export function renderPaintingNodeChart(chart) {
  const participants = paintingTrend.map((item) => item.participants);
  const min = Math.min(...participants);
  const max = Math.max(...participants);
  const sizeFor = (value) => 54 + ((value - min) / (max - min)) * 28;

  chart.setOption({
    tooltip: {
      ...chartTooltip(),
      trigger: "item",
      formatter: ({ data, seriesName, dataIndex }) => {
        const row = paintingTrend[dataIndex];
        if (!row) return `${seriesName}<br/><strong>${data}</strong>`;
        return `<strong>${row.year} 年 · ${row.stage}</strong><br/>参与人数：${row.participants.toLocaleString()} 人<br/>满意度：${row.satisfaction}%<br/>情绪效价提升：d ≈ ${row.effectSize}`;
      },
    },
    grid: { left: 76, right: 46, top: 62, bottom: 58 },
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: paintingTrend.map((item) => String(item.year)),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#c9c6bb" } },
      axisLabel: { color: "#77817d", margin: 16, fontSize: 13 },
    },
    yAxis: {
      type: "value",
      name: "人数",
      nameTextStyle: { color: "#77817d", padding: [0, 0, 8, 0] },
      axisLabel: { color: "#77817d", formatter: (value) => value.toLocaleString() },
      splitLine: { lineStyle: { color: "rgba(96,106,100,.11)", type: "dashed" } },
    },
    series: [
      {
        name: "参与人数",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { color: "#bd493d", width: 2.4, opacity: 0.72 },
        areaStyle: { color: "rgba(189,73,61,.06)" },
        data: participants,
      },
      {
        name: "满意度与规模",
        type: "scatter",
        symbol: "circle",
        data: paintingTrend.map((item) => ({
          value: item.participants,
          symbol: satisfactionSymbol(item.satisfaction),
          symbolSize: sizeFor(item.participants),
          label: {
            show: true,
            position: "top",
            distance: 8,
            formatter: `${item.participants.toLocaleString()}人`,
            color: "#5e6864",
            fontSize: 11,
          },
        })),
      },
    ],
  });
}

function satisfactionSymbol(satisfaction) {
  const radius = 38;
  const angle = -Math.PI / 2 + (Math.PI * 2 * satisfaction) / 100;
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  const largeArc = satisfaction > 50 ? 1 : 0;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="49" fill="#858987"/>
      <circle cx="50" cy="50" r="${radius}" fill="#f1e6cf"/>
      <path d="M50 50 L50 12 A${radius} ${radius} 0 ${largeArc} 1 ${x.toFixed(2)} ${y.toFixed(2)} Z" fill="#bd493d"/>
    </svg>`;
  return `image://data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

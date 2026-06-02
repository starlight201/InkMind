import { paintingTrend } from "../data/mock-data.js";
import { chartTooltip } from "./chart-theme.js";

export function renderPaintingNodeChart(chart) {
  const participants = paintingTrend.map((item) => item.participants);
  const min = Math.min(...participants);
  const max = Math.max(...participants);
  const sizeFor = (value) => 70 + ((value - min) / (max - min)) * 24;

  chart.setOption({
    tooltip: {
      ...chartTooltip(),
      trigger: "item",
      formatter: ({ data, seriesName }) => {
        if (!Array.isArray(data?.value)) return `${seriesName}<br/><strong>${data}%</strong>`;
        return `<strong>${data.value[0]} 年 · ${data.stage}</strong><br/>参与人数：${data.value[2].toLocaleString()} 人<br/>满意度：${data.value[1]}%<br/>情绪效价提升：d ≈ ${data.effectSize}`;
      },
    },
    grid: { left: 62, right: 66, top: 82, bottom: 72 },
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: paintingTrend.map((item) => String(item.year)),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#c9c6bb" } },
      axisLabel: { color: "#77817d", margin: 18, fontSize: 13 },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: { color: "#77817d", formatter: "{value}%" },
      splitLine: { lineStyle: { color: "rgba(96,106,100,.11)", type: "dashed" } },
    },
    series: [
      {
        name: "满意度趋势",
        type: "line",
        smooth: 0.2,
        symbol: "none",
        lineStyle: { color: "#bd493d", width: 2.2, opacity: 0.64 },
        data: paintingTrend.map((item) => item.satisfaction),
      },
      {
        name: "年份节点",
        type: "scatter",
        symbol: "circle",
        encode: { x: 0, y: 1, tooltip: [0, 2, 1] },
        data: paintingTrend.map((item) => ({
          value: [String(item.year), item.satisfaction, item.participants],
          stage: item.stage,
          effectSize: item.effectSize,
          symbol: satisfactionSymbol(item.satisfaction),
          symbolSize: sizeFor(item.participants),
          label: {
            show: true,
            position: "right",
            distance: 8,
            formatter: `{rate|${item.satisfaction}%}\n{people|${item.participants.toLocaleString()} 人}`,
            rich: {
              rate: { color: "#283432", fontSize: 14, fontWeight: 700, lineHeight: 20 },
              people: { color: "#75807c", fontSize: 11, lineHeight: 16 },
            },
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
      <circle cx="50" cy="50" r="${radius}" fill="#eee7da"/>
      <path d="M50 50 L50 12 A${radius} ${radius} 0 ${largeArc} 1 ${x.toFixed(2)} ${y.toFixed(2)} Z" fill="#bd493d"/>
    </svg>`;
  return `image://data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

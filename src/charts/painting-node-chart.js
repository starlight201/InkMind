import { paintingTrend } from "../data/mock-data.js";
import { formatNumber, formatPercent } from "../utils/format-number.js";
import { chartTooltip } from "./chart-theme.js";
import { isMobileView } from "./ink-brush.js";

export function renderPaintingNodeChart(chart) {
  const participants = paintingTrend.map((item) => item.participants);
  const min = Math.min(...participants);
  const max = Math.max(...participants);
  const compact = isMobileView();
  const sizeFor = (value) => {
    const base = compact ? 42 : 54;
    const spread = compact ? 18 : 28;
    return base + ((value - min) / (max - min)) * spread;
  };

  chart.setOption({
    animation: false,
    tooltip: {
      ...chartTooltip(),
      trigger: "item",
      formatter: ({ dataIndex, seriesName, value }) => {
        const row = paintingTrend[dataIndex];
        if (!row) return `${seriesName}<br/><strong>${formatNumber(value)}</strong>`;
        return `<strong>${row.year} 年 · ${row.stage}</strong><br/>参与人数：${formatNumber(row.participants)} 人<br/>满意度：${formatPercent(row.satisfaction)}<br/>情绪效价提升：d ≈ ${formatNumber(row.effectSize)}`;
      },
    },
    grid: compact
      ? { left: 52, right: 24, top: 60, bottom: 48 }
      : { left: 76, right: 46, top: 62, bottom: 58 },
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: paintingTrend.map((item) => String(item.year)),
      axisTick: {
        show: true,
        alignWithLabel: true,
        length: compact ? 5 : 7,
        lineStyle: { color: "rgba(104,83,48,.26)", width: 1 },
      },
      axisLine: { lineStyle: { color: "rgba(104,83,48,.34)", width: 1 } },
      axisLabel: {
        color: "#65706b",
        fontFamily: '"LXGW WenKai Screen", "STKaiti", "KaiTi", serif',
        fontSize: compact ? 11 : 13,
        fontWeight: 600,
        margin: compact ? 12 : 16,
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
      name: "人数",
      max: 40000,
      interval: 10000,
      nameTextStyle: {
        color: "#5b645f",
        fontFamily: '"LXGW WenKai Screen", "STKaiti", "KaiTi", serif',
        fontSize: compact ? 12 : 14,
        fontWeight: 700,
        padding: [0, 0, 8, 0],
      },
      axisLabel: {
        color: "#77817d",
        fontFamily: '"LXGW WenKai Screen", "STKaiti", "KaiTi", serif',
        fontSize: compact ? 11 : 13,
        formatter: (value) => formatNumber(value),
      },
      splitLine: { lineStyle: { color: "rgba(111,95,63,.13)", type: [5, 10], width: 1 } },
    },
    series: [
      {
        name: "参与人数",
        type: "line",
        smooth: true,
        symbol: "none",
        z: 2,
        lineStyle: {
          color: "#6f4a2b",
          width: compact ? 2.2 : 2.8,
          shadowBlur: 6,
          shadowColor: "rgba(76,52,31,.18)",
        },
        areaStyle: { color: "rgba(111,74,43,.075)" },
        data: participants,
      },
      {
        name: "满意度与规模",
        type: "scatter",
        z: 4,
        symbolKeepAspect: true,
        data: paintingTrend.map((item) => ({
          value: item.participants,
          symbol: satisfactionSealSymbol(item.satisfaction),
          symbolSize: sizeFor(item.participants),
          label: {
            show: true,
            position: "top",
            distance: compact ? 7 : 8,
            formatter: `${formatNumber(item.participants)}人`,
            color: "#4e5b56",
            fontFamily: '"LXGW WenKai Screen", "STKaiti", "KaiTi", serif',
            fontSize: compact ? 10 : 11,
            fontWeight: 700,
          },
        })),
        emphasis: { scale: compact ? 1.06 : 1.08 },
      },
      {
        name: "节点热区",
        type: "scatter",
        z: 5,
        symbol: "circle",
        symbolSize: compact ? 42 : 56,
        itemStyle: { color: "rgba(255,255,255,0)" },
        emphasis: { disabled: true },
        data: paintingTrend.map((item) => item.participants),
      },
    ],
  });
}

function satisfactionSealSymbol(satisfaction) {
  const radius = 34;
  const angle = -Math.PI / 2 + (Math.PI * 2 * satisfaction) / 100;
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  const largeArc = satisfaction > 50 ? 1 : 0;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <filter id="seal-soft" x="-16%" y="-16%" width="132%" height="132%">
        <feGaussianBlur stdDeviation=".45"/>
      </filter>
      <path d="M50 5 C64 5 83 14 91 30 C99 48 91 75 72 88 C53 101 23 94 10 72 C-2 52 5 27 24 14 C32 8 40 5 50 5 Z"
        fill="#9e2f28" opacity=".2" filter="url(#seal-soft)"/>
      <circle cx="50" cy="50" r="45" fill="#f5e6c8" stroke="#8f3129" stroke-width="8" stroke-opacity=".72"/>
      <path d="M50 50 L50 16 A${radius} ${radius} 0 ${largeArc} 1 ${x.toFixed(2)} ${y.toFixed(2)} Z"
        fill="#b9463a" fill-opacity=".82"/>
      <circle cx="50" cy="50" r="25" fill="#f9edd6" fill-opacity=".92"/>
    </svg>`;
  return `image://data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

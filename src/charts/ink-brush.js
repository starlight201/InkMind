import * as echarts from "echarts";

export const INK_FONT = '"LXGW WenKai Screen", "STKaiti", "KaiTi", serif';
export const CALLIGRAPHY_FONT = '"Ma Shan Zheng", "LXGW WenKai Screen", "STKaiti", "KaiTi", serif';
export const MOBILE_QUERY = "(max-width: 768px)";

export function isMobileView() {
  return window.matchMedia?.(MOBILE_QUERY).matches ?? window.innerWidth <= 768;
}

export function axisText(size = 13, weight = 600, color = "#596561") {
  return { color, fontFamily: INK_FONT, fontSize: size, fontWeight: weight };
}

export function splitInkLine() {
  return { lineStyle: { color: "rgba(92,82,64,.15)", type: [6, 8], width: 1 } };
}

export function inkLabel(formatter, position = "right") {
  return {
    show: true,
    position,
    color: "#28322f",
    fontFamily: INK_FONT,
    fontSize: isMobileView() ? 12 : 15,
    fontWeight: 700,
    formatter,
  };
}

export function makeHorizontalBrushRenderer({ colorFor, maxValue = 100, thickness = 26 }) {
  return (params, api) => {
    const value = api.value(0);
    const yIndex = params.dataIndex;
    const start = api.coord([0, yIndex]);
    const end = api.coord([value, yIndex]);
    const full = api.coord([maxValue, yIndex]);
    const height = Math.min(thickness, api.size([0, 1])[1] * 0.8);
    const width = Math.max(end[0] - start[0], 2);
    const base = referenceBrushColor(colorFor(params.dataIndex, params));
    const top = start[1] - height / 2;
    const seed = params.dataIndex + 1;
    const wobble = height * 0.38;
    const brushStart = start[0] - height * 0.04;
    const dryTail = Math.min(width * 0.42, height * 7.5);
    const colorStop = Math.max(start[0] + width * 0.5, end[0] - dryTail);
    const tailStart = Math.max(start[0] + width * 0.42, end[0] - dryTail);
    const trackWidth = Math.max(full[0] - start[0], 2);

    return {
      type: "group",
      children: [
        {
          type: "rect",
          silent: true,
          shape: { x: start[0], y: top + height * 0.24, width: trackWidth, height: height * 0.5 },
          style: { fill: "rgba(255,253,247,.08)" },
        },
        {
          type: "path",
          silent: true,
          shape: {
            pathData: [
              `M ${start[0] - height * 0.16} ${top + height * 0.24}`,
              `C ${start[0] + width * 0.16} ${top + height * 0.03} ${start[0] + width * 0.42} ${top + height * 0.24} ${end[0] - dryTail * 0.28} ${top + height * 0.2}`,
              `L ${end[0]} ${top + height * 0.28}`,
              `L ${end[0]} ${top + height * 0.7}`,
              `C ${start[0] + width * 0.44} ${top + height * 0.74} ${start[0] + width * 0.16} ${top + height * 0.88} ${start[0] - height * 0.12} ${top + height * 0.72}`,
              `C ${start[0] - height * 0.32} ${top + height * 0.6} ${start[0] - height * 0.3} ${top + height * 0.36} ${start[0] - height * 0.16} ${top + height * 0.24}`,
              "Z",
            ].join(" "),
          },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: shade(base, -74, 0.42) },
              { offset: 0.26, color: alpha(base, 0.28) },
              { offset: 0.74, color: alpha(base, 0.08) },
              { offset: 1, color: alpha(base, 0.01) },
            ]),
          },
        },
        {
          type: "path",
          shape: {
            pathData: [
              `M ${brushStart} ${top + height * 0.16}`,
              `C ${start[0] + width * 0.08} ${top - wobble * (seed % 2 ? 0.46 : 0.22)} ${start[0] + width * 0.28} ${top + height * 0.1} ${colorStop} ${top + height * 0.2}`,
              `C ${end[0] - dryTail * 0.54} ${top + height * 0.24} ${end[0] - dryTail * 0.14} ${top + height * 0.28} ${end[0]} ${top + height * 0.3}`,
              `L ${end[0]} ${top + height * 0.68}`,
              `C ${end[0] - dryTail * 0.22} ${top + height * 0.72} ${end[0] - dryTail * 0.54} ${top + height * 0.8} ${colorStop} ${top + height * 0.78}`,
              `C ${start[0] + width * 0.34} ${top + height + wobble * 0.08} ${start[0] + width * 0.12} ${top + height * 0.84} ${brushStart} ${top + height * 0.78}`,
              `C ${start[0] - height * 0.18} ${top + height * 0.72} ${start[0] - height * 0.18} ${top + height * 0.26} ${brushStart} ${top + height * 0.16}`,
              "Z",
            ].join(" "),
          },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: shade(base, -78, 0.99) },
              { offset: 0.16, color: shade(base, -52, 0.96) },
              { offset: 0.42, color: alpha(base, 0.7) },
              { offset: 0.72, color: alpha(base, 0.22) },
              { offset: 1, color: alpha(base, 0.025) },
            ]),
            shadowBlur: 6,
            shadowColor: alpha(base, 0.2),
          },
        },
        {
          type: "path",
          silent: true,
          shape: {
            pathData: [
              `M ${start[0] + height * 0.02} ${top + height * 0.28}`,
              `C ${start[0] + width * 0.18} ${top + height * 0.1} ${start[0] + width * 0.38} ${top + height * 0.26} ${end[0] - dryTail * 0.34} ${top + height * 0.22}`,
              `L ${end[0]} ${top + height * 0.3}`,
              `L ${end[0]} ${top + height * 0.66}`,
              `C ${start[0] + width * 0.42} ${top + height * 0.7} ${start[0] + width * 0.18} ${top + height * 0.82} ${start[0] + height * 0.02} ${top + height * 0.68}`,
              "Z",
            ].join(" "),
          },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: shade(base, -62, 0.62) },
              { offset: 0.34, color: shade(base, -20, 0.42) },
              { offset: 0.72, color: alpha(base, 0.16) },
              { offset: 1, color: alpha(base, 0.015) },
            ]),
          },
        },
        ...makeDryBrushLines({
          x1: start[0] + height * 0.18,
          x2: end[0],
          y: start[1],
          height,
          color: base,
          seed,
          tailStart,
        }),
        ...makeInkBloom({
          x: start[0] + height * 0.06,
          y: start[1],
          size: height * 1.1,
          color: base,
          seed,
        }),
        ...makeInkBloom({
          x: start[0] + height * 0.28,
          y: start[1] - height * 0.02,
          size: height * 0.78,
          color: base,
          seed: seed + 2,
        }),
        {
          type: "path",
          shape: {
            pathData: [
              `M ${start[0] - height * 0.2} ${start[1] - height * 0.12}`,
              `C ${start[0] - height * 0.24} ${start[1] - height * 0.48} ${start[0] + height * 0.08} ${start[1] - height * 0.56} ${start[0] + height * 0.22} ${start[1] - height * 0.34}`,
              `C ${start[0] + height * 0.54} ${start[1] - height * 0.48} ${start[0] + height * 0.88} ${start[1] - height * 0.18} ${start[0] + height * 0.66} ${start[1] + height * 0.04}`,
              `C ${start[0] + height * 0.86} ${start[1] + height * 0.36} ${start[0] + height * 0.34} ${start[1] + height * 0.56} ${start[0] + height * 0.02} ${start[1] + height * 0.44}`,
              `C ${start[0] - height * 0.24} ${start[1] + height * 0.46} ${start[0] - height * 0.42} ${start[1] + height * 0.12} ${start[0] - height * 0.2} ${start[1] - height * 0.12}`,
              "Z",
            ].join(" "),
          },
          style: { fill: shade(base, -90, 0.96), shadowBlur: 4, shadowColor: alpha(base, 0.25) },
        },
        {
          type: "rect",
          silent: true,
          shape: { x: tailStart, y: top + height * 0.42, width: Math.max(end[0] - tailStart, 1), height: height * 0.1 },
          style: { fill: alpha(base, 0.055) },
        },
        {
          type: "text",
          silent: true,
          style: {
            x: end[0] + 12,
            y: start[1],
            text: `${value}%`,
            fill: "#2e3734",
            fontFamily: INK_FONT,
            fontSize: isMobileView() ? 14 : 18,
            fontWeight: 800,
            verticalAlign: "middle",
          },
        },
      ],
    };
  };
}

export function makeVerticalBrushRenderer({ color, offset = 0, count = 1 }) {
  return (params, api) => {
    const value = api.value(1);
    const category = api.value(0);
    const base = api.coord([category, 0]);
    const topPoint = api.coord([category, value]);
    const band = api.size([1, 0])[0];
    const width = Math.max(18, Math.min(36, (band * 0.72) / count));
    const gap = width * 1.14;
    const cx = base[0] + offset * gap;
    const yTop = topPoint[1];
    const yBase = base[1];
    const height = Math.max(yBase - yTop, 2);
    const lean = width * 0.18 * ((params.dataIndex % 2) * 2 - 1);
    const topLeft = cx - width * 0.52;
    const topRight = cx + width * 0.52;
    const fadeTop = yTop + Math.min(height * 0.36, width * 3.4);

    return {
      type: "group",
      children: [
        {
          type: "path",
          silent: true,
          shape: {
            pathData: [
              `M ${cx - width * 0.72} ${yBase}`,
              `C ${cx - width * 1.04 + lean} ${yBase - height * 0.34} ${cx - width * 0.78 - lean} ${yTop + height * 0.16} ${topLeft - width * 0.12} ${yTop + width * 0.18}`,
              `L ${topRight + width * 0.14} ${yTop + width * 0.18}`,
              `C ${cx + width * 0.98 - lean} ${yTop + height * 0.26} ${cx + width * 0.96 + lean} ${yBase - height * 0.22} ${cx + width * 0.66} ${yBase}`,
              `C ${cx + width * 0.16} ${yBase + width * 0.36} ${cx - width * 0.26} ${yBase + width * 0.28} ${cx - width * 0.72} ${yBase}`,
              "Z",
            ].join(" "),
          },
          style: { fill: alpha(color, 0.2), shadowBlur: 14, shadowColor: alpha(color, 0.26) },
        },
        {
          type: "path",
          shape: {
            pathData: [
              `M ${cx - width * 0.55} ${yBase}`,
              `C ${cx - width * 0.92 + lean} ${yBase - height * 0.22} ${cx - width * 0.68 - lean} ${fadeTop} ${topLeft - width * 0.06} ${yTop + width * 0.14}`,
              `C ${cx - width * 0.24} ${yTop - width * 0.2} ${cx + width * 0.22} ${yTop - width * 0.16} ${topRight + width * 0.08} ${yTop + width * 0.12}`,
              `C ${cx + width * 0.78 - lean} ${fadeTop} ${cx + width * 0.82 + lean} ${yBase - height * 0.16} ${cx + width * 0.5} ${yBase}`,
              `C ${cx + width * 0.14} ${yBase + width * 0.34} ${cx - width * 0.25} ${yBase + width * 0.24} ${cx - width * 0.55} ${yBase}`,
              "Z",
            ].join(" "),
          },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: shade(color, -58, 0.98) },
              { offset: 0.38, color: shade(color, -32, 0.88) },
              { offset: 0.72, color: alpha(color, 0.42) },
              { offset: 1, color: alpha(color, 0.08) },
            ]),
            shadowBlur: 12,
            shadowColor: alpha(color, 0.36),
          },
        },
        {
          type: "path",
          silent: true,
          shape: {
            pathData: [
              `M ${cx - width * 0.38} ${yBase - width * 0.08}`,
              `C ${cx - width * 0.62} ${yBase - height * 0.32} ${cx - width * 0.44} ${yBase - height * 0.62} ${cx - width * 0.28} ${yTop + width * 0.4}`,
              `C ${cx - width * 0.1} ${yTop + width * 0.14} ${cx + width * 0.28} ${yTop + width * 0.2} ${cx + width * 0.36} ${yTop + width * 0.5}`,
              `C ${cx + width * 0.24} ${yBase - height * 0.48} ${cx + width * 0.36} ${yBase - height * 0.18} ${cx + width * 0.26} ${yBase - width * 0.04}`,
              `C ${cx + width * 0.1} ${yBase + width * 0.12} ${cx - width * 0.18} ${yBase + width * 0.12} ${cx - width * 0.38} ${yBase - width * 0.08}`,
              "Z",
            ].join(" "),
          },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: shade(color, -76, 0.42) },
              { offset: 0.36, color: alpha(color, 0.22) },
              { offset: 1, color: alpha(color, 0.015) },
            ]),
          },
        },
        ...makeVerticalDryBrushLines({ cx, yTop, yBase, width, color, seed: params.dataIndex + 1 }),
        ...makeInkBloom({ x: cx - width * 0.1, y: yBase - width * 0.08, size: width * 1.95, color, seed: params.dataIndex + 1 }),
        {
          type: "rect",
          silent: true,
          shape: { x: topLeft - width * 0.05, y: yTop + width * 0.05, width: topRight - topLeft + width * 0.1, height: Math.max(height * 0.16, 2) },
          style: { fill: alpha(color, 0.08) },
        },
        {
          type: "text",
          silent: true,
          style: {
            x: cx,
            y: yTop - 10,
            text: `${Math.round(value)}%`,
            fill: "#2e3734",
            fontFamily: INK_FONT,
            fontSize: isMobileView() ? 11 : 13,
            fontWeight: 800,
            align: "center",
            verticalAlign: "bottom",
          },
        },
      ],
    };
  };
}

function makeDryBrushLines({ x1, x2, y, height, color, seed, tailStart }) {
  const lines = [
    [0.1, -0.18, 0.98, 0.2],
    [0.18, -0.04, 0.94, 0.14],
    [0.2, 0.18, 1, 0.16],
    [0.38, 0.3, 0.86, 0.1],
    [0.48, 0.02, 1, 0.08],
  ];
  const width = Math.max(x2 - x1, 1);

  return lines.map(([from, dy, to, opacity], index) => {
    const jitter = ((seed + index) % 3) * height * 0.025;
    const startX = Math.max(x1 + width * from, tailStart - width * 0.34);
    const endX = x1 + width * to;

    return {
      type: "line",
      silent: true,
      shape: {
        x1: startX,
        y1: y + height * dy + jitter,
        x2: endX,
        y2: y + height * (dy * 0.68) - jitter,
      },
      style: {
        stroke: alpha(color, opacity),
        lineWidth: Math.max(1, height * (index === 0 ? 0.075 : 0.042)),
        lineCap: "round",
      },
    };
  });
}

function makeVerticalDryBrushLines({ cx, yTop, yBase, width, color, seed }) {
  const lines = [
    [-0.22, 0.12, 0.96, 0.23],
    [0.06, 0.26, 0.9, 0.16],
    [0.24, 0.08, 0.74, 0.13],
  ];
  const height = Math.max(yBase - yTop, 1);

  return lines.map(([dx, from, to, opacity], index) => {
    const jitter = ((seed + index) % 3) * width * 0.03;

    return {
      type: "line",
      silent: true,
      shape: {
        x1: cx + width * dx + jitter,
        y1: yBase - height * from,
        x2: cx + width * (dx * 0.58) - jitter,
        y2: yBase - height * to,
      },
      style: {
        stroke: alpha(color, opacity),
        lineWidth: Math.max(1, width * 0.1),
        lineCap: "round",
      },
    };
  });
}

function makeInkBloom({ x, y, size, color, seed }) {
  const dots = [
    [-0.18, -0.18, 0.24, 0.34],
    [0.02, 0.02, 0.32, 0.28],
    [-0.08, 0.25, 0.18, 0.2],
  ];

  return dots.map(([dx, dy, radius, opacity], index) => ({
    type: "circle",
    silent: true,
    shape: {
      cx: x + size * dx + ((seed + index) % 2 ? size * 0.04 : 0),
      cy: y + size * dy,
      r: size * radius,
    },
    style: { fill: shade(color, -88, opacity) },
  }));
}

function referenceBrushColor(hex) {
  const normalized = hex.toLowerCase();
  const palette = {
    "#c99432": "#2a241a",
    "#bd493d": "#b23b31",
    "#43836f": "#2f6254",
    "#715da2": "#4f3c74",
  };
  return palette[normalized] ?? hex;
}

export function ringSymbol(progress = 72, size = 96) {
  const angle = -90 + (Math.max(0, Math.min(progress, 100)) / 100) * 360;
  const end = polar(50, 50, 36, angle);
  const large = progress > 50 ? 1 : 0;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.35"/>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="33" fill="none" stroke="#2f3531" stroke-opacity=".36" stroke-width="13" stroke-linecap="round"
        stroke-dasharray="18 8 34 7 39 10" transform="rotate(-24 50 50)" filter="url(#soft)"/>
      <circle cx="50" cy="50" r="37" fill="none" stroke="#171d1a" stroke-opacity=".62" stroke-width="7.2" stroke-linecap="round"
        stroke-dasharray="48 9 18 8 42 11" transform="rotate(18 50 50)"/>
      <path d="M50 13 A37 37 0 ${large} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}" fill="none" stroke="#bd231f" stroke-width="13.5" stroke-linecap="round" stroke-opacity=".94"/>
      <path d="M62 20 C77 35 78 55 66 73" fill="none" stroke="#7c1d18" stroke-width="3" stroke-linecap="round" opacity=".34"/>
      <path d="M42 17 C61 20 75 34 77 51" fill="none" stroke="#f0c5b9" stroke-width="3" stroke-linecap="round" opacity=".42"/>
    </svg>`;
  return `image://data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function alpha(hex, opacity) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${opacity})`;
}

function shade(hex, amount, opacity = 1) {
  const { r, g, b } = hexToRgb(hex);
  const next = (value) => Math.max(0, Math.min(255, value + amount));
  return `rgba(${next(r)},${next(g)},${next(b)},${opacity})`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function polar(cx, cy, r, angle) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

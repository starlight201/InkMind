import { INK_FONT } from "./ink-brush.js";

export function chartTooltip() {
  return {
    backgroundColor: "rgba(255,253,247,.96)",
    borderColor: "rgba(86,76,59,.18)",
    textStyle: { color: "#384440", fontSize: 14, fontFamily: INK_FONT, fontWeight: 600 },
    extraCssText: "box-shadow:0 10px 26px rgba(60,51,39,.12);border-radius:8px;",
  };
}

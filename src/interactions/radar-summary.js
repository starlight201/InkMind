import { radarComparison, radarDimensions, therapyCatalog } from "../data/mock-data.js";
import { formatNumber } from "../utils/format-number.js";

export function renderRadarSummary(selectedTherapy) {
  const therapy = therapyCatalog.find((item) => item.key === selectedTherapy);
  const chinese = radarComparison.chinesePainting;
  const traditional = radarComparison.traditional[selectedTherapy];
  document.querySelector("#summary-therapy-name").textContent = therapy.name;
  document.querySelector("#summary-list").innerHTML = radarDimensions
    .map(
      (item, index) => `
        <div class="summary-row">
          <div class="summary-row-head"><span>${item.name}</span><span>${item.direction}</span></div>
          <div class="summary-values"><strong>国画 ${formatNumber(chinese[index])}</strong><span>vs</span><em>${therapy.shortName} ${formatNumber(traditional[index])}</em></div>
        </div>`,
    )
    .join("");

  const better = radarDimensions
    .filter((_, index) => chinese[index] > traditional[index])
    .map((item) => item.name)
    .join("、");
  document.querySelector("#summary-note").textContent = better
    ? `根据项目数据表，中国画疗法在${better}维度更具优势。雷达面积用于直观比较，不代表医疗结论。`
    : "根据项目数据表，两种疗法各有侧重。雷达面积用于直观比较，不代表医疗结论。";
}

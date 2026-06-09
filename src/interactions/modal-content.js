import { problems, techniqueHotspots, therapyCatalog, therapyMetrics } from "../data/mock-data.js";
import { formatNumber, formatPercent } from "../utils/format-number.js";

export function therapyModalContent(therapyKey, problemKey) {
  const therapy = therapyCatalog.find((item) => item.key === therapyKey);
  const problem = problems.find((item) => item.key === problemKey);
  const metrics = therapyMetrics[problemKey][therapyKey];
  return `
    <div class="modal-kicker">${problem.name} / 传统疗法观察</div>
    <h2>${therapy.name}</h2>
    <div class="modal-subtitle">${therapy.description}</div>
    <div class="modal-grid">
      <div class="modal-metric"><span>改善率</span><strong>${formatPercent(metrics.improvementRate)}</strong></div>
      <div class="modal-metric"><span>情绪效价提升</span><strong>d ≈ ${formatNumber(metrics.effectSize)}</strong></div>
      <div class="modal-metric"><span>满意度</span><strong>${formatPercent(metrics.satisfaction)}</strong></div>
    </div>
    <div class="modal-note"><strong>针对 ${problem.name} 的优点：</strong>${metrics.advantage}</div>
    <div class="modal-note"><strong>需要注意：</strong>${metrics.limitation}</div>`;
}

export function techniqueModalContent(hotspotKey) {
  const item = techniqueHotspots.find((hotspot) => hotspot.key === hotspotKey);
  return `
    <div class="modal-kicker">${item.problem} / ${item.name}</div>
    <h2>${item.principle}</h2>
    <div class="modal-subtitle">${item.caption}</div>
    <div class="modal-body">${item.description}</div>`;
}

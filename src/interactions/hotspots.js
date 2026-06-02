export function updateHotspotState(key) {
  document.querySelectorAll("[data-hotspot]").forEach((shape) => {
    shape.classList.toggle("active", shape.dataset.hotspot === key);
  });
  document.querySelectorAll("[data-hotspot-label]").forEach((label) => {
    label.classList.toggle("visible", label.dataset.hotspotLabel === key);
  });
  document.querySelectorAll("[data-technique]").forEach((button) => {
    button.classList.toggle("active", button.dataset.technique === key);
  });
}

export function bindHotspotHover(getSelectedHotspot) {
  document.querySelectorAll("[data-hotspot]").forEach((shape) => {
    shape.addEventListener("mouseenter", () => updateHotspotState(shape.dataset.hotspot));
    shape.addEventListener("mouseleave", () => updateHotspotState(getSelectedHotspot()));
  });
}

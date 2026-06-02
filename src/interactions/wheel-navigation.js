import { navItems } from "../state.js";

const SWITCH_THRESHOLD = 100;
const SWITCH_COOLDOWN = 850;

export function bindWheelNavigation({ state, onNavigate }) {
  let accumulatedDelta = 0;
  let lockedUntil = 0;

  window.addEventListener(
    "wheel",
    (event) => {
      if (event.deltaY <= 0) {
        accumulatedDelta = 0;
        return;
      }

      if (document.querySelector("#modal-backdrop.open") || hasScrollableContentBelow(event.target)) return;

      const activePanel = document.querySelector(`[data-page-panel="${state.activePage}"]`);
      if (!isAtBottom(activePanel)) return;

      const pageKeys = navItems.map(([key]) => key);
      const currentIndex = pageKeys.indexOf(state.activePage);
      const nextPage = pageKeys[currentIndex + 1];
      if (!nextPage) return;

      event.preventDefault();
      if (Date.now() < lockedUntil) return;

      accumulatedDelta += event.deltaY;
      if (accumulatedDelta < SWITCH_THRESHOLD) return;

      accumulatedDelta = 0;
      lockedUntil = Date.now() + SWITCH_COOLDOWN;
      onNavigate(nextPage);
    },
    { passive: false },
  );
}

function hasScrollableContentBelow(target) {
  let element = target instanceof Element ? target : null;
  while (element && !element.matches("[data-page-panel]")) {
    const style = getComputedStyle(element);
    const scrollable = /(auto|scroll)/.test(style.overflowY);
    if (scrollable && !isAtBottom(element)) return true;
    element = element.parentElement;
  }
  return false;
}

function isAtBottom(element) {
  if (!element) return false;
  return element.scrollTop + element.clientHeight >= element.scrollHeight - 2;
}

const pageFromUrl = new URLSearchParams(window.location.search).get("page");
const validPages = ["status", "therapy", "trend", "technique", "comparison"];

export const state = {
  activePage: validPages.includes(pageFromUrl) ? pageFromUrl : "status",
  selectedProblem: "anxiety",
  selectedTherapy: "cbt",
  selectedHotspot: null,
};

export const navItems = [
  ["status", "01", "心理现状统计"],
  ["therapy", "02", "传统疗法对比"],
  ["trend", "03", "国画疗愈调研"],
  ["technique", "04", "画技对症详解"],
  ["comparison", "05", "各类疗法横评"],
];

const pageFromUrl = new URLSearchParams(window.location.search).get("page");
const validPages = ["status", "therapy", "trend", "technique", "comparison"];

export const state = {
  activePage: validPages.includes(pageFromUrl) ? pageFromUrl : "status",
  selectedProblem: "anxiety",
  selectedTherapy: "cbt",
  selectedHotspot: null,
};

export const navItems = [
  ["status", "01", "心理现状"],
  ["therapy", "02", "传统疗法"],
  ["trend", "03", "国画趋势"],
  ["technique", "04", "技法针对性"],
  ["comparison", "05", "综合对比"],
];

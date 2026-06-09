export const paintingTrend = [
  { year: 2016, participants: 1650, satisfaction: 73.8, effectSize: 0.4, stage: "探索期" },
  { year: 2017, participants: 2300, satisfaction: 75.2, effectSize: 0.45, stage: "探索期" },
  { year: 2018, participants: 3800, satisfaction: 78.5, effectSize: 0.49, stage: "规范期" },
  { year: 2019, participants: 5200, satisfaction: 80.1, effectSize: 0.53, stage: "规范期" },
  { year: 2020, participants: 8900, satisfaction: 83.4, effectSize: 0.61, stage: "爆发期" },
  { year: 2021, participants: 13400, satisfaction: 84.6, effectSize: 0.65, stage: "爆发期" },
  { year: 2022, participants: 19000, satisfaction: 86.2, effectSize: 0.7, stage: "深化期" },
  { year: 2023, participants: 24500, satisfaction: 87.5, effectSize: 0.73, stage: "深化期" },
  { year: 2024, participants: 31000, satisfaction: 89, effectSize: 0.76, stage: "成熟期" },
  { year: 2025, participants: 38500, satisfaction: 90.5, effectSize: 0.81, stage: "成熟期" },
];

const topBoundary = "M0 36 C18 34 34 34 48 35 C60 37 72 35 78 28 C83 22 85 10 86 0";
const topBoundaryLeft = "M0 36 C18 34 34 34 48 35 C50 35 52 35 54 35";
const topBoundaryCenter = "M54 35 C60 37 72 35 78 28 C83 22 85 10 86 0";
const leftBoundary = "M54 35 C53 48 51 60 48 72 C46 83 45 93 45 100";
const rightBoundary = "M100 34 C94 34 88 39 82 48 C76 58 72 72 69 100";

export const techniqueHotspots = [
  {
    key: "inkLandscape",
    name: "泼墨山水",
    problem: "抑郁",
    problemKey: "depression",
    principle: "情感宣泄与打破防御",
    caption: "上方大片山水以泼墨气势容纳难以言说的情绪",
    description:
      "抑郁状态常伴随情感压抑和动力下降。写意与泼墨需要调动较大的身体动作，墨色在宣纸上自然晕染和碰撞。创作中的不完全可控性提供了相对开放的表达空间，使体验者通过墨色变化释放压抑情绪。",
    path: `${topBoundary} L100 0 L0 0 Z`,
    label: [43, 18],
  },
  {
    key: "lightColorLandscape",
    name: "浅绛山水",
    problem: "学习压力",
    problemKey: "studyPressure",
    principle: "注意力恢复与空间拓展",
    caption: "左下浅绛山水留白开阔，为紧绷思绪让出空间",
    description:
      "持续学习压力可能造成注意力疲劳，并压缩心理空间。浅绛山水通过自然色彩、远近层次、留白和开阔构图，形成舒缓的视觉体验。画面中的空间延展感有助于体验者暂时从紧绷状态中抽离。",
    path: `${topBoundaryLeft} ${leftBoundary.replace("M54 35", "")} L45 100 L0 100 L0 36 Z`,
    label: [23, 70],
  },
  {
    key: "lineDrawing",
    name: "工笔白描",
    problem: "焦虑",
    problemKey: "anxiety",
    principle: "正念聚焦与行为抑制",
    caption: "人物与房屋的细密线条，将注意力带回当下",
    description:
      "焦虑常表现为思绪失控与对未来不确定性的担忧。工笔白描强调稳定、细致和身体控制。绘制长线时，需要集中注意力并控制手部动作，这种专注过程有助于暂时中断反复思虑，使体验者将注意力拉回当下，并获得可感知的掌控感。",
    path: `${topBoundaryCenter} L100 0 L100 34 ${rightBoundary.replace("M100 34", "")} L69 100 L45 100 C45 93 46 83 48 72 C51 60 53 48 54 35 Z`,
    label: [67, 57],
  },
  {
    key: "freehandBirdFlower",
    name: "写意花鸟",
    problem: "自我否认",
    problemKey: "selfDenial",
    principle: "接纳不完美与认知重构",
    caption: "右下花鸟的自由笔意，帮助接纳不完美的独特价值",
    description:
      "自我否认常与过度比较、害怕犯错和完美主义倾向相关。写意画不追求机械式复刻，多一笔、少一笔或颜色自然溢出，都可能形成新的画面趣味。体验者可以借此练习容忍模糊性，理解不完美也具有独特价值。",
    path: `${rightBoundary} L100 100 L100 34 Z`,
    label: [84, 74],
  },
];

export const therapyCatalog = [
  {
    key: "cbt",
    name: "CBT 认知行为疗法",
    shortName: "CBT",
    description: "通过识别并调整不合理认知模式，逐步改善情绪和行为反应。",
  },
  {
    key: "mindfulness",
    name: "正念疗法",
    shortName: "正念",
    description: "训练对当下体验保持觉察，以较少评判的方式观察情绪与想法。",
  },
  {
    key: "exercise",
    name: "运动干预",
    shortName: "运动",
    description: "通过规律身体活动改善情绪唤醒水平、睡眠质量和心理韧性。",
  },
  {
    key: "medication",
    name: "药物治疗",
    shortName: "药物",
    description: "在专业评估和医学指导下，使用药物缓解部分症状。",
  },
];

const baseMetrics = {
  anxiety: { cbt: [68, 0.78, 75], mindfulness: [62, 0.68, 85], exercise: [48, 0.5, 80], medication: [65, 0.75, 45] },
  depression: { cbt: [62, 0.7, 72], mindfulness: [50, 0.52, 82], exercise: [58, 0.65, 75], medication: [68, 0.8, 40] },
  selfDenial: { cbt: [70, 0.85, 80], mindfulness: [58, 0.6, 86], exercise: [50, 0.48, 82], medication: [20, 0.1, 35] },
  studyPressure: { cbt: [60, 0.58, 82], mindfulness: [72, 0.82, 90], exercise: [65, 0.72, 88], medication: [30, 0.1, 38] },
};

const notes = {
  anxiety: {
    cbt: ["识别灾难化思维并配合暴露脱敏，系统阻断焦虑躯体回路。", "需专业师资，部分练习可能短期引发焦虑。"],
    mindfulness: ["培养对当下感受的非评判接纳，减少焦虑带来的二次内耗。", "效果依赖稳定练习习惯。"],
    exercise: ["通过有氧运动调节自主神经，缓解肌肉和躯体紧张。", "需防范急性运动损伤。"],
    medication: ["适合快速阻断严重焦虑与惊恐发作。", "需遵医嘱，并关注胃肠不适、嗜睡等反应。"],
  },
  depression: {
    cbt: ["通过行为激活和消极自动思维重塑，打破退缩行为怪圈。", "重度阶段可能因动力不足而脱落。"],
    mindfulness: ["MBCT 对轻中度抑郁复发预防具有研究支撑。", "重度创伤早期需要谨慎使用。"],
    exercise: ["促进内啡肽与多巴胺分泌，是行动激活的轻量方式。", "抑郁低动力状态可能影响依从性。"],
    medication: ["是部分中重度抑郁急性期的重要治疗方式。", "需严密评估并遵医嘱使用。"],
  },
  selfDenial: {
    cbt: ["直接处理核心信念并重塑合理归因。", "需要较高配合度完成思维作业。"],
    mindfulness: ["通过去中心化技巧理解负面想法并不等于事实。", "需要持续练习培养接纳能力。"],
    exercise: ["通过掌控身体机能与力量变化，建立基础效能感。", "需要一定的长期自律。"],
    medication: ["可辅助处理伴随的基础症状。", "对纯认知偏差导致的自我否定缺乏直接疗效。"],
  },
  studyPressure: {
    cbt: ["理清压力源头，帮助建立积极应对方式和时间管理能力。", "作业负担较重时可能引起排斥。"],
    mindfulness: ["通过正念练习降低交感神经兴奋度，高效缓解慢性压力。", "需要主动坚持练习。"],
    exercise: ["高强度间歇运动可帮助释放过载压力。", "强度过大时可能加重身心疲劳。"],
    medication: ["严重失眠等伴随症状可在医学指导下短期辅助处理。", "单纯学业压力不建议单独使用药物。"],
  },
};

export const therapyMetrics = Object.fromEntries(
  Object.entries(baseMetrics).map(([problemKey, therapies]) => [
    problemKey,
    Object.fromEntries(
      Object.entries(therapies).map(([therapyKey, values]) => {
        const [advantage, limitation] = notes[problemKey][therapyKey];
        return [
          therapyKey,
          {
            improvementRate: values[0],
            emotionalValence: values[1] * 100,
            effectSize: values[1],
            satisfaction: values[2],
            advantage,
            limitation,
          },
        ];
      }),
    ),
  ]),
);

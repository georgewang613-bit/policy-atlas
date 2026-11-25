// Each observation describes only what a reviewer could know at that point in the exercise.
export const alertScenarios = {
  age: {
    title: '谁在主持这场直播？',
    opening: {at: 0, source: '直播画面', text: '镜头里有两位参与者，轮流回答观众的问题。'},
    cue: {at: 18, source: '语音转写', text: '转写出现“我今年十七岁”，说话人尚未标明。', signal: 'age-claim'},
    corroboration: {at: 50, source: '人工资格核验', text: '复核记录确认，自报十七岁的人正在主持，本场主持人的年龄核验结果为未满十八岁。', signal: 'host-underage'},
    clarification: {at: 50, source: '人工资格核验', text: '复核记录确认，发言者是受访嘉宾，本场主持人已通过开播年龄核验。', signal: 'host-eligible'},
    observe: '两人同框不足以判断谁在主持，也无法判断年龄。',
    check: '回听原音，确认谁在发言、谁在主持，再核对主持人的年龄资格。',
    escalate: '实际主持人和核验结果已对上。优先交由审核员处理本场开播资格，并告知申诉途径。',
    clear: '可以关闭针对主持人年龄的预警。嘉宾的参与和变现资格另行判断。'
  },
  gifts: {
    title: '这句话是在索礼吗？',
    opening: {at: 0, source: '直播画面', text: '礼物功能已开启，主播向观众道谢。'},
    cue: {at: 24, source: '语音转写', text: '字幕出现“送礼就能领走这部手机”，截取的句子缺少前后文。', signal: 'gift-promise'},
    corroboration: {at: 48, source: '完整原音及置顶消息', text: '主播反复向每位送礼者许诺同一部手机，置顶消息也把指定礼物列为领取条件。', signal: 'creator-solicits'},
    clarification: {at: 48, source: '完整原音及置顶消息', text: '原音中主播正在引用冒名账号的说辞，置顶消息提醒观众提防此类索礼。', signal: 'quoted-warning'},
    observe: '礼物入口和普通致谢本身无法说明主播作了什么承诺。',
    check: '在观众继续送礼前，回听完整原音，核对是谁作出承诺，以及礼物能换来什么。',
    escalate: '语音和置顶条件相互印证。优先复核本场误导性索礼，评估是否暂停本场礼物功能。',
    clear: '原音确认这是防骗提醒。关闭针对这位主播的索礼预警，保留提醒的上下文。'
  },
  fraud: {
    title: '谁授权了这次募款？',
    opening: {at: 0, source: '直播画面', text: '主播介绍一家本地救援机构的工作。'},
    cue: {at: 16, source: '原音及直播简介', text: '主播自称受救援机构委托，邀请观众从简介打开收款页。', signal: 'claimed-authority'},
    corroboration: {at: 75, source: '机构公开渠道回函', text: '通过机构公开联系方式取得的回函指出，该机构从未授权这个账号或收款页。', signal: 'mandate-denied'},
    clarification: {at: 75, source: '机构公开渠道回函', text: '通过机构公开联系方式取得的回函确认，这个账号和收款页均在此次授权范围内。', signal: 'mandate-confirmed'},
    observe: '介绍救援工作属于正常公益表达，目前没有付款请求。',
    check: '在观众付款前，经机构公开渠道独立核对账号、收款页和授权范围。',
    escalate: '机构回函与主播的授权声明冲突。优先人工复核，评估暂停展示该收款入口，并提醒可能受影响的观众。',
    clear: '账号和收款页的授权已核实，可以关闭冒名募款预警。款项的最终用途仍需单独凭证。'
  },
  safety: {
    title: '危险正在现场发生吗？',
    opening: {at: 0, source: '直播画面', text: '直播正在播放户外训练画面。'},
    cue: {at: 12, source: '原音', text: '原音出现“我现在就下水”，镜头未显示说话人的位置，画面中可见风浪。', signal: 'hazardous-intent'},
    corroboration: {at: 24, source: '连续广角画面', text: '连续画面显示，发言者正准备越过现场警戒线，身旁人员正在劝阻。', signal: 'imminent-exposure'},
    clarification: {at: 24, source: '连续广角画面', text: '镜头拉远，画面和声音都来自室内教学播放的旧录像，主持人正在讲解如何避险。', signal: 'retrospective-lesson'},
    observe: '户外训练素材本身无法说明现场有人处于危险中。',
    check: '先提醒注意现场安全，同时请人工查看连续画面，核对说话人、地点和即时危险。',
    escalate: '现场画面印证了迫近的危险。立即转交安全审核，优先劝止并评估本场临时保护措施。',
    clear: '可以关闭针对主播现场遇险的预警。保留教学上下文，单独评估录像内容。'
  }
};

export const alertLevels = {
  observe: '继续观察',
  check: '需要核实',
  escalate: '优先人工复核',
  clear: '解除本项预警'
};

export function assessLiveAlert(scenario, observations) {
  const signals = new Set(observations.map(observation => observation.signal));
  if (!signals.has(scenario.cue.signal)) return 'observe';
  if (signals.has(scenario.corroboration.signal)) return 'escalate';
  if (signals.has(scenario.clarification.signal)) return 'clear';
  return 'check';
}

export function replayLiveAlert(ruleId, at, alternate = false) {
  const scenario = alertScenarios[ruleId];
  const review = alternate ? scenario.clarification : scenario.corroboration;
  const evidence = [scenario.opening, scenario.cue, review].filter(observation => observation.at <= at);
  const level = assessLiveAlert(scenario, evidence);
  return {evidence, level, advice: scenario[level]};
}

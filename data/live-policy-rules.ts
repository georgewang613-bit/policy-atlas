export type LivePolicyRuleId = 'age' | 'gifts' | 'fraud' | 'safety';

export interface LivePolicyRule {
  id: LivePolicyRuleId;
  title: string;
  harm: string;
  rule: string;
  scope: string;
  signal: string;
  verify: string;
  action: string;
  release: string;
  review: string;
  sources: { title: string; url: string }[];
}

export const liveRulesReviewedAt = '2026-11-25';

const communityGuidelinesUS =
  'https://ag.ny.gov/sites/default/files/social-media-policy-report/2026-q1q2-tiktok-inc-policy-1.pdf';

export const livePolicyRules: LivePolicyRule[] = [
  {
    id: 'age',
    title: '直播间里，谁需要年龄保护？',
    harm: '未成年人可能在催促下花钱，也可能在成年人主持的直播间成为性索求的对象。',
    rule: '美国和韩国的开播年龄门槛均为 18 岁。韩国送礼须满 19 岁。美国购买或使用 Coins 须年满 18 岁或达到所在地成年年龄，以较高者为准。美国社区准则还禁止向未成年人提出性要求。',
    scope: '开播还要满足当地账号条件。保护被针对的未成年人适用独立的安全条款，即使主播与送礼者均为成年人，也应复核互动本身。',
    signal: '参与者自述未到当地开播或送礼年龄，或有人用礼物向疑似未成年人提出性要求。',
    verify: '区分主持人、送礼人和被针对者，核实原话与对象。功能资格另查账号地区和年龄验证结果。',
    action: '遇到针对未成年人的性要求，先保护被针对者，交儿童安全团队处理。只有年龄线索时先核验，确认未达门槛后再限制对应功能。',
    release: '认错说话人或复核确认年龄符合要求时，撤回相应资格预警。对提出性要求者的调查单独进行。',
    review: '抽查已确认的危险互动，有多少在未成年人回应前得到干预？同时检查年龄限制经复核撤回的比例。',
    sources: [
      { title: 'TikTok 美国社区准则 · LIVE', url: communityGuidelinesUS + '#page=82' },
      { title: '美国虚拟物品政策 · Coins 年龄条件', url: 'https://t.tiktok.com/legal/page/us/virtual-items/en' },
      { title: 'TikTok 美国社区准则 · 未成年人保护', url: communityGuidelinesUS + '#page=50' },
      { title: 'TikTok 韩国 · LIVE 年龄门槛', url: 'https://newsroom.tiktok.com/enhancing-the-live-community-experience-kr?lang=ko-KR' },
    ],
  },
  {
    id: 'gifts',
    title: '什么时候属于诱导送礼？',
    harm: '观众相信付费能换来奖品或机会，可能在弄清条件之前就花掉金币。',
    rule: 'TikTok 将误导观众、操纵互动或奖励的内容列为不符合 LIVE 变现资格，列举的情形包括诱导送礼。',
    scope: '关于诱导送礼的摘要依据创作者网络政策第 2.3 节对 LIVE 变现准则的说明。该条涉及变现资格，抽奖许可需按举办地区另行审查。',
    signal: '主播将指定礼物与中奖资格挂钩，屏幕上的参与条件却与口播不同。',
    verify: '回看片段前后如何介绍奖品、谁能参加、礼物改变了什么，再核对实际参与流程。',
    action: '若承诺与实际资格冲突，优先限制涉事直播的变现，并单独审查内容本身。',
    release: '若原音证实主播在引用骗局提醒观众，可撤回索礼预警。若确有付费抽奖，即使规则写得清楚，也需另查抽奖资格。',
    review: '在有礼物记录的确认案例中，统计首笔相关礼物前发出预警的比例。再抽查被限制的场次，核对有多少属于正常互动。',
    sources: [
      { title: 'TikTok LIVE 变现准则', url: 'https://www.tiktok.com/live/creators/en-US/rules_and_guidance/live_monetization_guidelines' },
      { title: 'TikTok 创作者网络政策 · 第 2.3 节', url: 'https://lf16-live-backstage.tiktokcdn.com/obj/ies-hotsoon-draft-sg/webcast-union-platform-i18n/3f1a6596-7db7-4b75-82a9-7f36dd9e7563.html?d=1791105066852' },
    ],
  },
  {
    id: 'fraud',
    title: '收款承诺能兑现吗？',
    harm: '观众可能向冒名机构付款，或因虚假的回购、退款承诺先行转账。',
    rule: '美国社区准则禁止推广或协助诈骗，包括涉及交易的骗局。美国虚拟物品政策说明，送礼用于激活虚拟物品，不会把钱直接转给另一名用户。',
    scope: '这里采用 TikTok 的美国反诈和礼物条款。捐款贴纸是另一种收款工具，核对时要看当地实际开放的功能及指定受益人。',
    signal: '主播称礼物会直接进灾民账户，或要求先转账，再按未经核实的条件退款、回购。',
    verify: '核对收款人、机构授权或交易凭据。募款要查受益人和付款入口，销售要查回购条款及实际履约记录。',
    action: '在付款前提示风险。确认冒名募款或虚构交易承诺后，处理相关内容和收款指引。',
    release: '收款人、授权和款项去向均吻合时，撤回冒名预警。交易争议再查是否按约履行，保留双方提交的凭据。',
    review: '在能核实付款时间的诈骗案例中，统计首笔付款前发出提示的比例，同时抽查哪些正常交易或募款被拦截。',
    sources: [
      { title: 'TikTok 美国社区准则 · 交易诈骗', url: communityGuidelinesUS + '#page=77' },
      { title: '美国虚拟物品政策 · 礼物', url: 'https://t.tiktok.com/legal/page/us/virtual-items/en' },
      { title: 'TikTok 美国 · 捐款贴纸', url: 'https://newsroom.tiktok.com/donation-stickers-bring-the-spirit-of-giving-to-tiktok?lang=en' },
    ],
  },
  {
    id: 'safety',
    title: '现场何时需要中止直播？',
    harm: '直播间起哄可能让主播升级危险动作。现场的暴力号召还可能让旁观者成为受害者。',
    rule: '美国社区准则禁止威胁伤人或号召暴力攻击，也会移除可能被模仿并造成严重身体伤害的危险动作内容。',
    scope: '美国准则分别规定危险挑战和暴力号召，也保留了现场纪实、批评暴力和安全教育的空间。其他地区的历史案例用于比较判断线索。',
    signal: '主播开始准备升级挑战，或现场有人号召他人参与攻击，事态可能在下一轮互动前升级。',
    verify: '核实原声、说话人和现场动作。分清主播是在动员、转述还是劝阻。若是挑战，再查保护措施和模仿风险。',
    action: '有人面临迫近危险时，立即转交人工安全处置。确认直播正在动员暴力或展示严重危险动作时，中止相关内容。',
    release: '若核实主播在记录现场或劝阻暴力，撤回动员预警。若确属安全教育，再看画面是否仍可能引发危险模仿。',
    review: '对照危险首次清楚出现和人工介入的时间，抽查被中断的现场报道、教育示范中有多少属于误判。',
    sources: [
      { title: 'TikTok 美国社区准则 · 危险活动', url: communityGuidelinesUS + '#page=58' },
      { title: 'TikTok 美国社区准则 · 暴力及犯罪行为', url: communityGuidelinesUS + '#page=44' },
    ],
  },
];

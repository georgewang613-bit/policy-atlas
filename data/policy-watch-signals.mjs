import {stageKey} from '../lib/policy-process.ts';

const day = 86_400_000;
const shanghaiCalendar = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'
});
export function shanghaiDay(date = new Date()) {
  const parts = Object.fromEntries(shanghaiCalendar.formatToParts(date).map(part => [part.type, part.value]));
  return [parts.year, parts.month, parts.day].join('-');
}

// Require a relevant topic AND explicit language in the evidence-backed record.
// Broad labels such as privacy, youth or commercial activity alone cannot trigger an alert.
const matchesRisk = {
  age: (event, fact) => event.topics.includes('未成年人保护')
    && /开播|直播功能|儿童直播|livestream/i.test(fact)
    && /未成年|儿童|\d+岁|年龄/.test(fact),
  gifts: (event, fact) => event.topics.includes('打赏与变现')
    && /礼物|打赏|PK|抽奖/.test(event.scenarios.join(' '))
    && /虚拟货币|付费抽奖|打赏诱导|诱导打赏|直播礼物|虚拟礼物/.test(fact),
  fraud: (event, fact) => event.topics.includes('欺诈与商业行为')
    && /冒充|冒名|仿冒|反诈骗|反诈守则|慈善诈骗/.test(fact)
    && /付费推广|站外引流|仿冒品牌/.test(event.scenarios.join(' ')),
  safety: (event, fact) => event.topics.some(topic => topic.includes('有害内容'))
    && (/危险挑战|危险特技|危及生命的特技|高危挑战/.test(fact)
      || (event.id === 'au-duty-bill' && event.evidence.some(e => e.url.includes('digital-duty-care-next-step-australias-world-leading-reforms'))))
};

const readings = {
  'tr-child-social-age-rules': {
    title: '既有账号的年龄核验',
    relevance: '土耳其将开户核验和既有账号核验分开，15 至 17 岁账号的开播功能也受限制。',
    action: '盘点尚未核验且具有开播权限的既有账号，测试年龄分流及误判申诉流程。'
  },
  'uk-age-forthcoming': {
    title: '青少年开播及陌生人互动',
    relevance: '英国政府把开播和陌生人互动分别列为高风险功能，提出按年龄设置不同默认值。',
    action: '按年龄和角色列出开播、嘉宾连麦及观众互动入口，等正式文本明确范围后逐项核对。'
  },
  'eu-dfa-frontier': {
    title: '虚拟货币与消费诱导',
    relevance: '欧盟委员会提案涉及虚拟货币和鼓励过度消费的设计，直播送礼前的充值和消费提示都值得检查。',
    action: '走一遍充值到送出的流程，记录观众在哪里看到实际花费、能否退出，以及承诺奖品时如何举报。'
  },
  'us-platform-impersonation-anprm': {
    title: '付费推广中的冒名诈骗',
    relevance: 'FTC 征询涉及助长政府或企业冒充诈骗的平台广告服务。可先检查借品牌名义付费推广、再引导观众付款的直播。',
    action: '抽查付费推广中的品牌授权、收款主体和落地页，单列自然流量场次。'
  },
  'sg-scams': {
    title: '指定平台的反诈骗措施',
    relevance: '新加坡警方公布的指定平台包括 TikTok。核对直播推广和外跳收款时，要分清付费广告与普通直播各自适用的措施。',
    action: '用一条冒名推广测试从直播举报到收款页复核的交接，记录完成处置的时间和依据。'
  },
  'au-duty-bill': {
    title: '面向儿童的危险特技内容',
    relevance: '澳大利亚政府提交的法案将危及生命的特技列入儿童保护议题。直播间鼓动模仿和后续推荐都可能扩大伤害。',
    action: '用“鼓动挑战”和“讲解避险”两组片段测试识别与人工升级，再对照最终条文核对范围。',
    sourcePath: 'digital-duty-care-next-step-australias-world-leading-reforms'
  }
};

const preliminaryStages = new Set(['agenda', 'draft', 'debate']);
const stageDescriptions = {
  agenda: '政策研究或预先征询', draft: '草案或征求意见', debate: '提案审议',
  pending: '已通过待实施', effective: '已生效', guidance: '监管指引'
};

export function policyWatchSignals(events, ruleId, today = shanghaiDay()) {
  const results = [];
  for (const event of events) {
    if (event.eventDate > today || event.checkedAt > today || !event.evidence.length) continue;
    const stage = stageKey(event);
    if (stage === 'case' || /已废止|已撤回|被否决|暂停执行|立法终止/.test(event.stage)) continue;
    const progressDate = event.history.reduce((last, entry) =>
      entry.date <= event.checkedAt && entry.date > last ? entry.date : last, event.eventDate);
    const openDeadline = event.deadline && event.deadline >= today ? event.deadline : null;
    const confirmedStart = (stage === 'pending' || stage === 'effective')
      && event.effectiveDate && event.effectiveDate >= today ? event.effectiveDate : null;
    const futureDate = openDeadline || confirmedStart;
    if (event.deadline && !futureDate) continue;
    const recent = Date.parse(today) - Date.parse(progressDate) <= 30 * day;
    if (!futureDate && !(preliminaryStages.has(stage) && recent)) continue;
    const facts = event.title + ' ' + event.fact;
    if (!matchesRisk[ruleId](event, facts)) continue;

    const reading = readings[event.id];
    const source = (reading?.sourcePath && event.evidence.find(entry => entry.url.includes(reading.sourcePath)))
      || event.evidence.find(entry => entry.url === event.source);
    if (!source) continue;
    results.push({
      id: event.id, region: event.region, title: reading?.title || event.title,
      stage: stage === 'effective' ? event.stage : stageDescriptions[stage], progressDate, checkedAt: event.checkedAt, futureDate,
      dateLabel: openDeadline ? event.deadlineType : '开始执行',
      relevance: reading?.relevance || event.impact, action: reading?.action || event.action,
      source: {title: source.publisher, url: source.url}, progressSource: event.source
    });
  }
  return results.sort((a, b) => (a.futureDate || '9999').localeCompare(b.futureDate || '9999')
    || b.progressDate.localeCompare(a.progressDate) || a.id.localeCompare(b.id)).slice(0, 2);
}

export const POLICY_REVIEWED='2026-11-12';
export const LMG_URL='https://www.tiktok.com/live/creators/en-US/rules_and_guidance/live_monetization_guidelines';
export const VIRTUAL_URL='https://www.tiktok.com/legal/page/us/virtual-items/en';
export const policyTopics={
 danger:{term:'Dangerous activity and challenges',note:'先核实危险行为及引导；不能等到 Gifts 到账才评估伤害。'},
 tragedy:{term:'Conflicts or tragedies',note:'灾情相关 LIVE 需要单独核对该条；没有危险挑战也不自动获得 monetization 资格。'},
 bait:{term:'Fake engagement and Gift baiting',note:'核对误导承诺、施压或交换互动，Gifts 本身不是违规证据。'},
 guest:{term:'Creator responsibility for LIVE sessions',note:'Creator 对 guests 分享的内容也负有责任；劝阻并不自动排除本场 monetization 限制。'},
 harassment:{term:'Harassment and bullying',note:'核对针对性表达、上下文及受影响者。'},
 authentic:{term:'Inauthentic LIVE experience',note:'核对预录、循环或自动化呈现，以及 Creator 是否有实质参与；仅补标签不自动恢复资格。'},
 privacy:{term:'Content safety and harm prevention',note:'核对个人信息的可识别性、同意和暴露范围；不要把每次信息展示都认定为 doxing。'},
 fundraising:{term:'Fake engagement and Gift baiting',note:'核对是否借中介募资或与创作无关的个人筹款索取 Gifts；补充款项路径不自动使该玩法合规。正式 donation tools 单独核实。'},
 quality:{term:'Low quality content',note:'核对实际互动、参与和画面质量，单帧示意图不能证明整场质量。'}
};
const topicKeys={ 'LA-1042':['danger','tragedy','bait'],'HOU-2077':['fundraising','tragedy'],'NYC-3015':['harassment','guest'],'MIA-4088':['danger'],'CHI-5091':['authentic','tragedy'],'UNK-6014':['authentic'],'SEA-7033':['bait'],'DEN-8041':['privacy']};
const tiles={'LA-1042':0,'HOU-2077':1,'NYC-3015':2,'MIA-4088':3,'CHI-5091':4,'SEA-7033':5};
export function giftingEvents(item,variant=false,at=600){
 const isCase=Boolean(item.evidence);const n=Number(item.id.replace(/\D/g,''))||1;
 const events=isCase?[
  {id:'G1',at:Math.max(1,item.at-18),sender:'viewer_demo_01',gift:'Demo Spark',quantity:2,coins:10,status:'Activated'},
  {id:'G2',at:item.id==='LA-1042'?20:Math.max(2,item.at-4),sender:'viewer_demo_02',gift:item.id==='LA-1042'?'指定 Gift · Demo Star':'Demo Star',quantity:1,coins:100,status:'Activated'},
  {id:'G3',at:item.at+65,sender:'viewer_demo_03',gift:'Demo Spark',quantity:3,coins:10,status:'Activated'}
 ]:[{id:'G1',at:40+(n%30),sender:'viewer_demo_01',gift:'Demo Spark',quantity:1+n%4,coins:10,status:'Activated'},{id:'G2',at:140+(n%30),sender:'viewer_demo_02',gift:'Demo Star',quantity:1,coins:100,status:'Activated'}];
 return events.filter(e=>e.at<=at&&!(item.id==='LA-1042'&&variant&&e.id==='G2'));
}
// Authored training fixtures, not real account records or platform eligibility results.
const accountScenarios={
 'LA-1042':{accountType:'Personal · 独立创作者',standing:'此前无已确认违规',history:'历史良好不抵消本场危险信号',disclosure:'无商业合作声明；当前未见品牌合作证据',diamonds:'历史余额 1,240 · 非本场换算',rewards:'本期资格待复核，未结算',ranking:'周榜第 18 · 模拟榜单快照'},
 'HOU-2077':{accountType:'Personal · 自称公益创作者，机构身份待核实',standing:'一次误导宣传警告，申诉处理中',history:'历史争议不直接证明本次欺诈',disclosure:'未开启；是否存在商业合作待核实',diamonds:'历史余额 860',rewards:'存在申请，审核未结束'},
 'MIA-4088':{accountType:'Personal · 户外创作者',standing:'一次危险挑战警告，已送达',history:'需核对前次与本场行为是否相同',match:'已启用 · 本轮倒计时 45 秒',ranking:'活动榜第 7 · 冲榜压力为线索，不是违规结论'},
 'NYC-3015':{accountType:'Personal · 多人连麦创作者',standing:'无当前限制',history:'嘉宾有待处理举报，未形成违规结论',match:'未启用 · Multi-guest 不等于 LIVE Match'},
 'CHI-5091':{accountType:'Personal · 新闻评论，非官方机构认证',disclosure:'无付费合作声明；素材授权另行核实',diamonds:'历史余额 3,100',rewards:'历史已结算；本场资格仍待判断'},
 'UNK-6014':{accountType:'Business · 虚拟角色工作室',disclosure:'已开启商业合作披露；AI 身份披露仍不清楚',standing:'无当前限制',history:'商业标签不能替代真实性审查'},
 'SEA-7033':{accountType:'Personal · 品牌合作创作者',disclosure:'口头提到赞助奖品，商业披露开关未开启',diamonds:'历史余额 2,400',rewards:'本期审核中，未确定资格',match:'已启用 · 双人 LIVE Match',ranking:'活动榜第 3 · 礼物积分规则待核实'}
};
export function liveContext(item,variant=false,at=600){
 const n=Number(item.id.replace(/\D/g,''))||1;const events=giftingEvents(item,variant,at);
 return {creator:`creator_demo_${item.id.toLowerCase()}`,session:item.id,language:item.language||'English',format:item.id==='NYC-3015'?'Multi-guest':'Single-host',age:item.age||'18+ · 模拟验证',accountType:'Personal · 模拟账号，认证未核实',standing:'未核实',duration:at,followers:1200+n%28000,viewers:item.viewers,peak:item.viewers+120,comments:Math.floor(at*(1+n%3)/5),reports:item.evidence?1+n%7:0,giftsEnabled:true,giftCount:events.reduce((s,e)=>s+e.quantity,0),coinsUsed:events.reduce((s,e)=>s+e.quantity*e.coins,0),gifters:new Set(events.map(e=>e.sender)).size,last60Coins:events.filter(e=>e.at>at-60).reduce((s,e)=>s+e.quantity*e.coins,0),diamonds:'未提供',rewards:'未评估',events,topics:(topicKeys[item.id]||['quality']).map(k=>policyTopics[k]),tile:tiles[item.id]??(item.evidence?null:5),purpose:item.id==='HOU-2077'?'Creator 声称用于救灾；不是已核实的 donation':item.id==='SEA-7033'?'Gift 与抽奖资格挂钩；需核对完整玩法':item.id==='LA-1042'?'指定 Gift 与危险行为承诺挂钩':'暂无已确认的 Gift 条件交换；仍需核对完整上下文',history:'历史违规、限制及 Appeal 状态未接入',disclosure:'Commercial content disclosure 状态未核实',match:item.id==='NYC-3015'?'未启用 · Multi-guest 不等于 LIVE Match':'未启用',ranking:'未接入',location:item.location||'City-level · synthetic coordinates',audience:item.audience||`${item.city} 周边 · 模拟受众分布未细分`,...(accountScenarios[item.id]||{})};
}
export function policyContext(item,variant,at){const c=liveContext(item,variant,at);return {reviewedAt:POLICY_REVIEWED,source:LMG_URL,topics:c.topics,gifting:{events:c.events,coinsUsed:c.coinsUsed,diamonds:c.diamonds,rewards:c.rewards,match:c.match,ranking:c.ranking,accountType:c.accountType,standing:c.standing,disclosure:c.disclosure,purpose:c.purpose},principles:['Community Guidelines、For You feed eligibility 和 LIVE monetization eligibility 分别判断；若确认 For You feed ineligible，LIVE monetization 也不符合资格。','Creator 对 multi-guest 内容负责；劝阻不自动免责。','Coins用于激活Gifts；Gifting不是向Creator转账。Diamonds不自动赋予Rewards资格。','AI身份标注、免费抽奖路径或未收到Gift都不能单独证明符合monetization要求。'],scope:'仅模拟研判建议，不虚构限制期限、真实账号状态或官方执行结果。'};}

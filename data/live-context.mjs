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
export function liveContext(item,variant=false,at=600){
 const n=Number(item.id.replace(/\D/g,''))||1;const events=giftingEvents(item,variant,at);
 return {creator:`creator_demo_${item.id.toLowerCase()}`,session:item.id,language:item.language||'English',format:item.id==='NYC-3015'?'Multi-guest':'Single-host',age:item.age||'18+ · 模拟验证',standing:'未核实',duration:at,followers:1200+n%28000,viewers:item.viewers,peak:item.viewers+120,comments:Math.floor(at*(1+n%3)/5),reports:item.evidence?1+n%7:0,giftsEnabled:true,giftCount:events.reduce((s,e)=>s+e.quantity,0),coinsUsed:events.reduce((s,e)=>s+e.quantity*e.coins,0),gifters:new Set(events.map(e=>e.sender)).size,last60Coins:events.filter(e=>e.at>at-60).reduce((s,e)=>s+e.quantity*e.coins,0),diamonds:null,rewards:null,events,topics:(topicKeys[item.id]||['quality']).map(k=>policyTopics[k]),tile:tiles[item.id]??(item.evidence?null:5),purpose:item.id==='HOU-2077'?'Creator 声称用于救灾；不是已核实的 donation':item.id==='SEA-7033'?'Gift 与抽奖资格挂钩；需核对完整玩法':item.id==='LA-1042'?'指定 Gift 与危险行为承诺挂钩':'暂无已确认的 Gift 条件交换；仍需核对完整上下文',history:'历史违规、限制及 Appeal 状态未接入',disclosure:'Commercial content disclosure 状态未核实',match:item.id==='NYC-3015'?'未启用 · Multi-guest 不等于 LIVE Match':'未启用',ranking:'未接入',location:item.location||'City-level · synthetic coordinates',audience:item.audience||`${item.city} 周边 · 模拟受众分布未细分`};
}
export function policyContext(item,variant,at){const c=liveContext(item,variant,at);return {reviewedAt:POLICY_REVIEWED,source:LMG_URL,topics:c.topics,gifting:{events:c.events,coinsUsed:c.coinsUsed,diamonds:null,rewards:null,purpose:c.purpose},principles:['Community Guidelines、For You feed eligibility 和 LIVE monetization eligibility 分别判断；若确认 For You feed ineligible，LIVE monetization 也不符合资格。','Creator 对 multi-guest 内容负责；劝阻不自动免责。','Coins用于激活Gifts；Gifting不是向Creator转账。Diamonds不自动赋予Rewards资格。','AI身份标注、免费抽奖路径或未收到Gift都不能单独证明符合monetization要求。'],scope:'仅模拟研判建议，不虚构限制期限、真实账号状态或官方执行结果。'};}

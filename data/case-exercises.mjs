import {guidelineComparison} from './guideline-comparison.mjs';
import {liveContext} from './live-context.mjs';
import {casePlans} from './case-briefing.mjs';
const harms={
 danger:'Physical harm / imitation：危险动作可能直接伤害主播；观众对挑战的模仿会扩大风险。',
 bait:'Financial harm / misleading engagement：观众可能因有条件的承诺送出 Gifts，误解交换条件或中奖机会。',
 tragedy:'Exploitation of tragedy：把灾情或受害者遭遇变成付费刺激，可能利用同情心并伤害当事人的尊严。',
 fundraising:'Misleading fundraising：把 Gifts 说成捐款，可能让观众误解款项接收者、用途和保障。',
 harassment:'Targeted harassment：持续针对参与者的辱骂会伤害当事人，并可能引发围观者继续攻击。',
 guest:'Creator responsibility：主播若放任 guest 持续伤害他人，风险会通过整场 LIVE 放大。',
 authentic:'Inauthentic LIVE experience：观众可能误判实时性、身份或互动方式，并据此作出观看和付费决定。',
 privacy:'Privacy / doxing risk：可识别的个人信息可能被复制、传播或用于线下骚扰；先核实归属和同意。'
};
// Authored training criteria, not TikTok internal guidelines. Status describes evidence, not a violation finding.
const checks={
 'LA-1042':{
  danger:[['Dangerous commitment',['E1'],'线索支持','原话把进入危楼作为承诺；还需原音和现场风险验证。'],['Action vs intent',['E3'],'反向线索','尚未进入建筑，不能记录为已实施危险动作。']],
  bait:[['Conditional Gift request',['E1'],'线索支持','出现“指定礼物 → 指定行为”的条件关系。'],['Gift / speech alignment',['E2'],'线索支持','模拟 Gift 记录与承诺相邻，不能据此证明观众受骗。','缺少证据','变体中尚未收到 Gift；承诺仍需审查，到账不是必要前提。']],
  tragedy:[['Tragedy context',['E1','E3'],'缺少证据','“危楼”与灾情场景是线索，仍需核实事件、受害者和内容呈现。']]
 },
 'HOU-2077':{
  fundraising:[['Fundraising claim',['E1'],'线索支持','主播明确承诺 Gifts 用于救灾，需要区分礼物与正式 donation tools。'],['Beneficiary / money trail',['E2','E3'],'缺少证据','缺少受益方与款项材料，尚不能认定资金被挪用。','待核实','出现机构与转款说明，但真实性、履约和 Gift 模式仍待核实。']],
  tragedy:[['Tragedy-linked solicitation',['E1'],'线索支持','救灾承诺与礼物索取相关；需要完整语境判断是否利用悲剧。']]
 },
 'NYC-3015':{
  harassment:[['Target / repeated conduct',['E1'],'线索支持','现场转写显示连续针对同一参与者；保留原音、对象与语境。'],['Context / response',['E2'],'待核实','主播说“停一下”是干预线索，不能抹掉 guest 已发生的表达。','线索支持','主播赞同辱骂，支持参与或放大骚扰的判断。']],
  guest:[['Host intervention',['E2'],'待核实','有口头劝阻，但是否有效需要后续记录。','线索支持','主播明确支持 guest 行为，不能以未亲自辱骂排除责任。'],['Tool availability',['E3'],'缺少证据','未见移除操作不等于拒绝操作；先核实权限和工具可用性。']]
 },
 'MIA-4088':{danger:[['Escalation / encouragement',['E1','E2'],'线索支持','观众要求升级、主播回应下一轮更难，构成升级线索。'],['Safety conditions',['E3'],'缺少证据','当前画面无法确认保护装置，不能凭互动热度判定危险。','反向线索','补充画面显示保护与指导，需重新评估动作本身和模仿风险。']]},
 'CHI-5091':{
  authentic:[['Real-time representation',['E1'],'线索支持','主播明确把画面描述为实时现场。','反向线索','已说明历史资料，原来的“冒充实时”指控减弱。'],['Provenance corroboration',['E2','E3'],'缺少证据','相似旧素材是检索线索；需要原片、拍摄时间地点和人工比对。']],
  tragedy:[['Content / monetization context',['E1'],'待核实','实时性与灾情变现是不同问题，需核实素材主题与本场用途。']]
 },
 'UNK-6014':{authentic:[['Identity representation',['E1','E2','E3'],'待核实','身份问题未被清楚回答；不能直接推断无真人参与或存在欺骗。','反向线索','账号和画面均标注 AI，身份不清这一线索减弱。'],['Substantive Creator participation',[],'缺少证据','需要连续互动样本、制作与控制记录；AI 标签和商业披露不能代替参与度证据。']]},
 'SEA-7033':{bait:[['Pay-to-participate condition',['E1'],'线索支持','指定 Gift 与参加抽奖挂钩。'],['Prize / odds disclosure',['E2'],'缺少证据','奖品描述不完整；需核实随机性、奖品及资格告知。'],['Free-entry equivalence',['E3'],'缺少证据','免费参与路径未知，需实际跑通两条入口。','待核实','新增免费路径仍需验证机会是否相同；免费入口不自动排除 Gift baiting。']]},
 'DEN-8041':{privacy:[['Identifiability / exposure',['E1','E3'],'待核实','画面和评论提示信息可能可识别；保留打码样本，避免再次扩散。'],['Ownership / consent',['E2'],'缺少证据','归属与同意未知，不能直接记录为 doxing。','反向线索','已核实是本人主动公开的工作信息，原隐私侵害线索减弱。']]}
};
export const policyRevisions={
 'LA-1042':{draft:'When a Creator links Gifts to a dangerous act, assess the dangerous commitment and LIVE monetization eligibility separately. Identify the specific act, risk and inducement; do not extend a single-session decision to all disaster coverage.',counter:'正常灾情报道，没有危险挑战或 Gift 条件交换。',metric:'危险承诺→干预的 p95 延迟；正常灾情内容的误伤率。'},
 'HOU-2077':{draft:'Distinguish Gifts from donation tools. Review fundraising claims, beneficiary identity and fulfillment evidence; a missing money trail is an evidence gap, not proof of fraud.',counter:'使用可核验的正式捐赠工具，清楚披露受益方。',metric:'误导筹款承诺的抽检命中率；正常公益表达申诉改判率。'},
 'NYC-3015':{draft:'Assess targeted harassment and Creator responsibility independently. Record guest conduct, host endorsement or intervention, and available controls; verbal objection alone does not establish effective intervention.',counter:'主播及时制止并有效移除骚扰者，仍需记录已发生内容。',metric:'持续骚扰的暴露时长；主播与 guest 归责的一致性。'},
 'MIA-4088':{draft:'Evaluate dangerous challenges using action-specific risk, escalation and verified safety conditions. Engagement volume or a LIVE Match alone must not establish a violation.',counter:'有经过核实的专业指导与保护措施的表演。',metric:'危险动作识别的漏判；专业表演误伤和申诉原因。'},
 'CHI-5091':{draft:'Separate real-time claims from provenance signals. Require human corroboration of matched footage; distinguish misleading presentation from clearly labeled historical commentary.',counter:'持续清楚标注历史资料，并有实质新闻解说。',metric:'旧素材匹配 precision；错误实时声明的复核一致性。'},
 'UNK-6014':{draft:'Assess identity disclosure and substantive Creator participation separately. AI labels clarify representation but do not alone establish an authentic LIVE experience or monetization eligibility.',counter:'身份清楚披露、主播有实质参与的虚拟角色创作。',metric:'观众身份理解正确率；正常虚拟创作的误伤率。'},
 'SEA-7033':{draft:'Review Gift-linked rewards through participation conditions, prize disclosure and actual entry paths. A free entry option is relevant evidence, not automatic clearance of Gift baiting concerns.',counter:'不以 Gifts 换取资格、规则清楚的普通互动活动。',metric:'参与入口告知完整度；付费与免费路径差异；误伤反馈。'},
 'DEN-8041':{draft:'Establish identifiability, ownership, consent and exposure before finding a privacy violation. Minimize evidence retention and distinguish non-consensual disclosure from self-published contact information.',counter:'主播主动公开自己的工作联络信息，不涉及第三人。',metric:'未经同意曝光的持续时间；正常信息展示的误判率。'}
};
export function evidenceDossier(item,evidence,variant=false,at=600){
 const c=liveContext(item,variant,at);
 const changed=evidence.some(e=>e.id===item.variant.evidenceId&&e.text===item.variant.text);
 return guidelineComparison(item,evidence).map(row=>({...row,harm:harms[row.topic],checks:(checks[item.id]?.[row.topic]||[]).map((v,i)=>{const records=evidence.filter(e=>v[1].includes(e.id));return {id:`SIM-${item.id}-${row.topic}-${i+1}`,condition:v[0],records,status:!records.length?'缺少证据':changed&&v[4]?v[4]:v[2],reason:v[1].length&&records.length<v[1].length?'当前回放尚未包含全部对应记录；继续回放或补充原始证据后再判断。':changed&&v[5]?v[5]:v[3]};}),quantitative:['bait','fundraising'].includes(row.topic)?`${c.events.length} 个 Gift events · ${c.gifters} Gifters · ${c.coinsUsed} Coins；截至回放 ${Math.floor(at/60)}:${String(at%60).padStart(2,'0')}。数量只用于对齐事件，不是违规阈值。`:null}));
}
export function executionMissions(item){const p=casePlans[item.id],r=policyRevisions[item.id];return [
 {id:'scope',title:'Define the boundary',owner:'Policy + Trust & Safety',when:'T+0 · 先处理现场',task:p.protect+'；'+p.verify,deliverable:'单场处置范围、待核实证据与保护措施',gate:'确认即时风险已有人接手；尚未证实的行为保持未定。'},
 {id:'draft',title:'Draft the revision',owner:'Policy + Legal + Creator Ops',when:'T+1 工作日 · 草案',task:'把本案提炼成行为定义、成立条件、例外和申诉条件；'+p.boundary,deliverable:'一页 policy delta + 正例 / 反例',gate:'正例解释限制依据，反例能保留正常创作。'},
 {id:'calibrate',title:'Calibrate with reviewers',owner:'Moderation QA + Policy',when:'T+2–3 工作日 · 校准',task:p.review+'；由两位 reviewer 独立判断，再讨论分歧。',deliverable:'标注样本、分歧原因与修订记录',gate:'关键成立条件仍存在分歧时，继续校准而非自动上线。'},
 {id:'pilot',title:'Pilot & communicate',owner:'Product + Creator Ops + Comms',when:'T+4–5 工作日 · 小范围演练',task:p.tool+'；'+p.creator,deliverable:'限制与恢复流程、通知模板、Appeal 入口',gate:'产品可执行、通知可理解、恢复路径可用。'},
 {id:'review',title:'Evaluate / roll back',owner:'Data + Safety + Policy',when:'试运行后 7 天 · 复核',task:r.metric,deliverable:'效果与误伤对照；继续、调整或回滚建议',gate:'没有可靠分母或反事实时，不宣称风险下降由政策造成。'}
];}

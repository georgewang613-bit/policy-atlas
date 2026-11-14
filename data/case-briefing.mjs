// Case-specific demo recommendations. Evidence remains tied to the replay cutoff.
export const casePlans={
 'LA-1042':{focus:'Gift 触发危险挑战',verify:'核对危楼位置、现场危险和主播是否进入',protect:'先中止进入危楼的危险承诺',boundary:'区分危险挑战与正常灾情记录',creator:'通知指出 Gift 与危险承诺的关联',tool:'确认本场 LIVE Gifts 和危险片段能否分别限制',review:'将原音、Gift 事件和建筑外画面对齐',harms:['主播受伤','观众模仿','Gifts 强化危险行为'],severity:'High',timing:'临近触发'},
 'HOU-2077':{focus:'救灾募捐承诺',verify:'核实受益机构、转款路径和履约记录',protect:'先要求说明 Gifts 的实际用途',boundary:'区分公益表达与未经证实的募捐承诺',creator:'说明 Gifts 不等于平台认证的捐款',tool:'确认承诺提示和单场 Gifts 限制能力',review:'核对募捐原话、页面说明和转款材料',harms:['观众财产损失','误解救灾资金用途'],severity:'Medium',timing:'承诺持续展示'},
 'NYC-3015':{focus:'Multi-guest 辱骂',verify:'核对嘉宾原音、主播回应和工具可用性',protect:'先制止持续辱骂并保护被针对者',boundary:'分别记录 guest 行为与 Creator 责任',creator:'明确需采取的现场干预动作',tool:'核实移除嘉宾和限制当前 LIVE 的工具粒度',review:'对照劝阻、支持及未干预三类片段',harms:['当事人受辱','围观放大骚扰'],severity:'High',timing:'冲突持续'},
 'MIA-4088':{focus:'危险动作升级',verify:'核实动作难度、保护装置和现场指导',protect:'先阻止继续升级危险动作',boundary:'区分专业保护表演与缺乏保护的模仿',creator:'说明触发关注的是升级动作及现场条件',tool:'确认危险片段和推荐曝光的控制能力',review:'对齐评论要求、主播回应和保护画面',harms:['主播受伤','观众危险模仿'],severity:'High',timing:'临近下一轮'},
 'CHI-5091':{focus:'旧素材冒充实时现场',verify:'比对原始素材的拍摄时间、地点与本场声明',protect:'核实前避免继续强化“实时现场”的误导',boundary:'保留标明历史素材的正常新闻解说',creator:'请 Creator 提供原片或补充历史素材标识',tool:'确认历史素材标识和本场推荐控制能力',review:'人工复核相似画面，匹配分数不直接定案',harms:['误判灾情','误导观众送出 Gifts'],severity:'Medium',timing:'实时声明持续'},
 'UNK-6014':{focus:'AI 身份和参与程度',verify:'核实身份说明、自动化程度及 Creator participation',protect:'先澄清 AI 身份和互动方式',boundary:'保留已清晰披露的虚拟角色创作',creator:'提示 Creator 说明 AI 身份和 Gifts 条件',tool:'检查身份标识和自动化互动的展示能力',review:'比较身份已披露与回避回答的完整语境',harms:['误解主播身份','基于误解送出 Gifts'],severity:'Medium',timing:'身份疑问持续'},
 'SEA-7033':{focus:'Gifts 绑定抽奖资格',verify:'核对付费、随机性、奖品及免费参与路径',protect:'先停止不清楚的付费资格承诺',boundary:'区分普通互动与 Gifts 绑定的随机奖励',creator:'要求清楚说明奖品、参与条件和免费路径',tool:'确认活动提示、资格入口和 LIVE Gifts 控制能力',review:'跑通付费与免费入口，核实机会是否一致',harms:['观众财产损失','误解中奖机会'],severity:'Medium',timing:'参与条件生效'},
 'DEN-8041':{focus:'疑似个人信息暴露',verify:'核实信息可识别性、归属及本人同意',protect:'先减少疑似个人信息的继续曝光',boundary:'区分他人隐私与本人主动公开的工作信息',creator:'通知只描述触发区域，不再次传播联系方式',tool:'确认相关画面遮挡、限制及恢复权限',review:'保留打码证据，核对展示语境和观众讨论',harms:['隐私损害','线下骚扰','信息二次传播'],severity:'High',timing:'画面持续曝光'}
};
const needs={safety:'控制实际伤害',ops:'保护正常 Creator',legal:'明确适用依据',pr:'准确解释措施',review:'形成一致判断',product:'落实执行和恢复'};
export function departmentBrief(id,item,opinion){
 const p=casePlans[item.id];
 const actions={safety:[p.protect,p.verify],ops:[p.boundary,p.creator],legal:[p.verify,'按当前行为分别核对 Content、FYF 和 Monetization 依据'],pr:[p.creator,'只回应已核实事实，保留待核实事项'],review:[p.review,p.boundary],product:[p.tool,'指定执行 Owner，跑通限制与恢复流程']};
 const ai=opinion?.source!=='预设意见'&&opinion?.proposal;
 return {need:opinion?.need||`${needs[id]} · ${p.focus}`,actions:Array.isArray(opinion?.suggestions)&&opinion.suggestions.length?opinion.suggestions.slice(0,3):ai?opinion.proposal.split(/[。；\n]+/).filter(Boolean).slice(0,3):actions[id]};
}
export function meetingSummary(item,team,opinions,context){
 const usable=team.filter(id=>opinions[id]?.context===context);
 return [{title:'先处理',items:usable.filter(id=>['safety','review'].includes(id)).map(id=>departmentBrief(id,item,opinions[id]).actions[0])},{title:'明确范围',items:usable.filter(id=>['ops','legal'].includes(id)).map(id=>departmentBrief(id,item,opinions[id]).actions[0])},{title:'执行沟通',items:usable.filter(id=>['product','pr'].includes(id)).map(id=>departmentBrief(id,item,opinions[id]).actions[0])}].filter(x=>x.items.length).map(x=>({...x,items:[...new Set(x.items)]}));
}
export function caseAssessment(item,evidence){
 const p=casePlans[item.id];
 return {harms:p.harms,risks:[{label:'Severity',value:p.severity,note:p.harms[0],level:p.severity==='High'?3:2},{label:'Immediacy',value:p.timing,note:'依据当前回放证据预评估',level:p.severity==='High'?3:2},{label:'Exposure',value:'单场 LIVE',note:'尚无跨场传播证据',level:1}],facts:evidence.slice(0,2).map(e=>({label:e.id,text:e.text,status:/尚未|未知|未确认|不足|未提供|没有核实|疑似|可疑|相似/.test(e.text)?'待核实':'已记录'}))};
}
export const decisionAxes=[
 {id:'content',label:'Content',options:['暂不限制','证据不足','建议限制相关内容'],short:['保留','补充证据','限制']},
 {id:'recommendation',label:'For You feed',options:['暂不限制','证据不足','For You feed ineligible'],short:['保留','补充证据','限制']},
 {id:'monetization',label:'Monetization',options:['暂不限制','证据不足','建议限制 LIVE Gifts'],short:['保留','补充证据','限制']}
];
export function normalizeDecisions(value={}){return Object.fromEntries(decisionAxes.map(a=>[a.id,a.options.includes(value[a.id])?value[a.id]:'证据不足']));}

export function executionTasks(item){const p=casePlans[item.id];return [p.protect+'；'+p.verify,p.boundary+'，比较误伤和执行成本',p.creator+'，写清成立要件',p.review+'；'+p.tool,'确认上线范围，监测误伤并设置回滚条件'];}

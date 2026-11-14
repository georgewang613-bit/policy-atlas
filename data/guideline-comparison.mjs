import {policyTopics,LMG_URL,POLICY_REVIEWED} from './live-context.mjs';
// Case analysis of the previously reviewed LMG text; these are not enforcement findings.
const comparisons={
 'LA-1042':[
  {topic:'danger',criterion:'危险活动及挑战需要单独审查，不能等到礼物到账或实际受伤才处理风险。',refs:['E1','E3'],assessment:'危险承诺已出现，可能触及变现限制；尚不能写成已进入危楼。',missing:'核实原音、建筑危险和现场位置。'},
  {topic:'bait',criterion:'核对以误导承诺或条件交换诱导 Gifts 的行为。',refs:['E1','E2'],assessment:'指定 Gift 与危险承诺绑定，存在需要核对的诱导线索。',missing:'确认完整承诺、礼物对应关系和后续行为。',variant:{assessment:'指定 Gift 尚未收到；承诺仍在，不能据此排除诱导风险。',missing:'核对承诺本身及观众所理解的交换条件。'}},
  {topic:'tragedy',criterion:'涉及冲突或悲剧的 LIVE，还需独立核对其变现资格。',refs:['E1','E3'],assessment:'灾情场景触发此项核对，不等于所有灾情内容都应删除。',missing:'确认灾情语境及本场内容与变现的关系。'}
 ],
 'HOU-2077':[
  {topic:'fundraising',criterion:'核对借筹款承诺索取 Gifts 的模式，并区分 Gifts 与正式 donation tools。',refs:['E1','E2','E3'],assessment:'礼物被描述为救灾资金，可能触及 Gift baiting；资金去向未知不等于已证实欺诈。',missing:'核实受益方、资金路径、工具类型与完整承诺。',variant:{assessment:'新增捐赠路径可供核对，但不自动使索取 Gifts 的模式合规。',missing:'核实路径真实性，并继续对照 Gift baiting 条件。'}},
  {topic:'tragedy',criterion:'灾情内容与变现资格分别核对。',refs:['E1'],assessment:'救灾承诺与悲剧场景有关，需要单独判断变现边界。',missing:'确认实际内容，区分公益表达和礼物索取。'}
 ],
 'NYC-3015':[
  {topic:'harassment',criterion:'核对针对个人的骚扰、辱骂与完整上下文。',refs:['E1','E2'],assessment:'持续针对另一参与者的辱骂构成风险线索，需原音支持最终判断。',missing:'核实原音、对象、持续性及前后语境。'},
  {topic:'guest',criterion:'Creator 对 LIVE 中 guests 的内容也负有责任，口头劝阻不自动排除变现限制。',refs:['E2','E3'],assessment:'已见口头劝阻，仍需核实有效干预与可用工具。',missing:'确认移除权限及主播后续措施。',variant:{assessment:'主播明确支持辱骂，Creator 责任的依据增强。',missing:'核实支持性表述与实际干预记录。'}}
 ],
 'MIA-4088':[
  {topic:'danger',criterion:'危险活动及挑战需结合具体动作、现场条件和引导方式审查。',refs:['E1','E2','E3'],assessment:'升级动作的承诺与保护措施未知同时存在，当前需要补充证据。',missing:'核实动作风险、保护装置与现场专业指导。',variant:{assessment:'保护措施已被补充确认，原风险判断需重评；不能仅凭有保护装置认定合规。',missing:'继续核对动作本身、指导资质和观众模仿风险。'}}
 ],
 'CHI-5091':[
  {topic:'authentic',criterion:'核对预录、循环或自动化呈现与 Creator 的实质参与。',refs:['E1','E2','E3'],assessment:'实时声明与旧素材匹配存在冲突，但模型相似度不能证明造假。',missing:'人工比对原片、拍摄日期和真实参与程度。',variant:{assessment:'已说明历史素材，冒充实时的线索减弱；仍需判断实质参与和呈现方式。',missing:'核实标注是否持续可见、是否有实质解说。'}},
  {topic:'tragedy',criterion:'事件或灾情相关内容的变现边界单独核对。',refs:['E1'],assessment:'不能仅凭素材真伪决定本场是否具备变现资格。',missing:'核实素材涉及的事件与本场用途。'}
 ],
 'UNK-6014':[
  {topic:'authentic',criterion:'核对自动化程度、呈现方式及 Creator participation，身份标签不能替代参与度审查。',refs:['E1','E2','E3'],assessment:'身份回应不清是调查线索，尚不足以证明欺骗或无实质参与。',missing:'核对身份披露、自动化程度、参与记录和付费承诺。',variant:{assessment:'AI 身份已经清晰说明，但不能单靠标签恢复或确认变现资格。',missing:'继续核对实质参与、自动化互动及付费承诺。'}}
 ],
 'SEA-7033':[
  {topic:'bait',criterion:'核对 Gifts 与奖励承诺绑定的条件，判断是否存在误导、施压或诱导。',refs:['E1','E2','E3'],assessment:'指定 Gift 与抽奖资格绑定，玩法披露不足，可能触及 Gift baiting。',missing:'核实奖品、随机性、付费与免费路径及机会是否一致。',variant:{assessment:'新增免费路径不自动排除 Gift baiting，仍需检查实际可用性及完整玩法。',missing:'跑通两条参与路径，对照资格、机会及告知。'}}
 ],
 'DEN-8041':[
  {topic:'privacy',criterion:'核对信息的可识别性、归属、同意及暴露范围，再判断安全风险。',refs:['E1','E2','E3'],assessment:'疑似个人信息暴露，需要先减少传播；目前不足以认定 doxing。',missing:'核实信息归属、公开范围及本人同意。',variant:{assessment:'已核实为本人主动展示的公开工作信息，该隐私侵害线索减弱。',missing:'检查是否夹带他人信息及是否出现后续骚扰。'}}
 ]
};
export function guidelineComparison(item,evidence){
 const changed=evidence.some(e=>e.id===item.variant.evidenceId&&e.text===item.variant.text);
 const available=new Set(evidence.map(e=>e.id));
 return (comparisons[item.id]||[]).map(row=>{const current=changed&&row.variant?{...row,...row.variant}:row;const refs=current.refs.filter(id=>available.has(id));return {...current,term:policyTopics[row.topic].term,refs,assessment:refs.length?current.assessment:'当前回放尚无对应证据，需要补充证据。',source:LMG_URL,reviewedAt:POLICY_REVIEWED};});
}

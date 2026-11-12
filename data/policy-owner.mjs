export const dilemmas=[
{id:'launch',label:'五天上线',brief:'PR 希望 Day 5 发布；Operations 担心正常 Creator 的收入，Legal 要求确认适用范围。',pushback:'PR：Day 5 需要的是公开回应、临时控制，还是完整执行？请给出你的推荐范围。',question:'What would you ship in five days, and what would you defer?',options:['沿用现有规则，先校准执行','单地区 pilot，补充边界案例','提出新规则，分阶段上线']},
{id:'resources',label:'资源被拒',brief:'Operations 无法增加审核人力，Product 暂无新工具排期。',pushback:'Operations：小规模 pilot 也要占用人力。你愿意缩减什么，收益怎样证明？',question:'If Operations rejects even a small pilot, what would you do next?',options:['缩小范围，复用现有队列','提交资源成本和风险收益','调整优先级，保留临时措施']},
{id:'ownership',label:'共同验收',brief:'你与同事共同负责的政策被 QA 指出执行不一致，双方对验收标准理解不同。',pushback:'QA：请明确实际缺口、你的责任、补救 Owner 和重新验收的标准。',question:'What would you own if the main error came from your co-owner?',options:['共同核对样本和验收标准','承担协调责任，分配修复 Owner','先修复线上影响，再复验']},
{id:'delay',label:'交付延期',brief:'Product 的关键能力延期三天，原定上线窗口已经确认。',pushback:'Product：最快也要三天。你选择延期、缩小范围，还是改用人工路径？谁拍板？',question:'When would you escalate a delay, and what decision would you ask for?',options:['人工承接高风险案例','缩小上线范围，拆分交付','带替代方案升级决策']}
];
export const launchDays=[
{day:'Day 1',owner:'Policy · Safety',title:'确认问题',deliverable:'风险摘要、现有规则覆盖、临时措施'},
{day:'Day 2',owner:'Policy · XFN',title:'比较方案',deliverable:'推荐路径、误伤与成本、未决分歧'},
{day:'Day 3',owner:'Policy · Legal',title:'写清标准',deliverable:'成立要件、正反案例、Escalation 标准'},
{day:'Day 4',owner:'QA · Operations',title:'Calibration',deliverable:'盲审分歧、培训材料、工具检查'},
{day:'Day 5',owner:'Decision owner',title:'Go / No-go',deliverable:'上线范围、负责人、监测与回滚条件'}
];
export const cohorts={before:{tp:84,fp:16,fn:36,tn:264,violativeMinutes:2100,viewerMinutes:60000,p90:360},after:{tp:91,fp:39,fn:9,tn:261,violativeMinutes:1080,viewerMinutes:60000,p90:240}};
export const ratio=(n,d)=>d?Math.round(n/d*1000)/10:null;
export function cohortMetrics(x){return {precision:ratio(x.tp,x.tp+x.fp),recall:ratio(x.tp,x.tp+x.fn),exposure:ratio(x.violativeMinutes,x.viewerMinutes),sample:x.tp+x.fp+x.fn+x.tn,p90:x.p90};}

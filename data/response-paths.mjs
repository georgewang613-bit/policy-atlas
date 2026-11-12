export const responsePaths=[
{id:'verify',title:'补齐事实',when:'关键事实不充分',icon:'eye',tasks:['锁定会改变判断的证据，核对原音和上下文','明确补证 Owner、时点及临时措施'],teams:['安全','审核'],output:'证据包 + 复核时间'},
{id:'clarify',title:'明确规则',when:'事实充分，规则边界不清',icon:'scales',tasks:['确定规则缺口，形成正反案例和推荐解释','组织 Policy consultation，明确审批和执行边界'],teams:['政策','法务','审核'],output:'规则解释 + Calibration 样本'},
{id:'enforce',title:'执行处置',when:'事实充分，规则明确，违规成立',icon:'shield',tasks:['分别确定 Content、FYF、Monetization 的相称处置','确认执行能力、Creator 通知及 Appeal 路径'],teams:['安全','运营','产品'],output:'处置范围 + 执行 Owner'},
{id:'retain',title:'保留观察',when:'事实充分，规则明确，违规不成立',icon:'compass',tasks:['记录不限制的依据，恢复已确认的误伤','设置复核触发条件，观察新证据和风险变化'],teams:['运营','审核','产品'],output:'保留依据 + 监测条件'}
];
export const qualitative=[
{id:'clarity',label:'规则理解',status:'ready',quote:'“正反案例能解释边界，常见场景可以独立判断。”',source:'Reviewer · 示例反馈',action:'保留正反案例，补充本地语言表达。'},
{id:'consistency',label:'审核一致性',status:'improve',quote:'“引用观众评论和主播主动施压，在不同队列中仍有分歧。”',source:'QA · 示例反馈',action:'回放原音及后续回应，统一 Calibration 样本。'},
{id:'trust',label:'Creator 理解',status:'blocked',quote:'“收到 Gifts 限制通知，但不知道是哪段行为触发。”',source:'Creator · 示例反馈',action:'通知中指出触发行为，明确 Appeal 的材料要求。'},
{id:'readiness',label:'执行准备',status:'improve',quote:'“人工路径可以承接，但跨班次交接和恢复责任不清楚。”',source:'Operations · 示例反馈',action:'明确交接 Owner，确认恢复权限和完成时点。'}
];

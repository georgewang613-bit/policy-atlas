export const responsePaths=[
{id:'verify',title:'补齐事实',when:'关键事实不充分',icon:'eye',tasks:['锁定会改变判断的证据，核对原音和上下文','明确补证 Owner、时点及临时措施'],teams:['安全','审核'],output:'证据包 + 复核时间'},
{id:'clarify',title:'明确规则',when:'事实充分，规则边界不清',icon:'scales',tasks:['确定规则缺口，形成正反案例和推荐解释','组织 Policy consultation，明确审批和执行边界'],teams:['政策','法务','审核'],output:'规则解释 + Calibration 样本'},
{id:'enforce',title:'执行处置',when:'事实充分，规则明确，违规成立',icon:'shield',tasks:['分别确定 Content、FYF、Monetization 的相称处置','确认执行能力、Creator 通知及 Appeal 路径'],teams:['安全','运营','产品'],output:'处置范围 + 执行 Owner'},
{id:'retain',title:'保留观察',when:'事实充分，规则明确，违规不成立',icon:'compass',tasks:['记录不限制的依据，恢复已确认的误伤','设置复核触发条件，观察新证据和风险变化'],teams:['运营','审核','产品'],output:'保留依据 + 监测条件'}
];
export const qualitative=[
{id:'clarity',actions:["保留有效的正反案例，作为新 Reviewer 的培训样本。", "补充本地语言表达，抽样确认规则理解没有偏差。", "每周收集新边界案例，更新 Calibration 材料。"],label:'规则理解',status:'ready',quote:'“正反案例能解释边界，常见场景可以独立判断。”',source:'Reviewer · 示例反馈',action:'保留正反案例，补充本地语言表达。'},
{id:'consistency',actions:["回放原音和后续回应，区分引用评论与主动施压。", "用同一批边界样本开展跨队列 Calibration。", "QA 追踪分歧类型，复核后再扩大执行范围。"],label:'审核一致性',status:'improve',quote:'“引用观众评论和主播主动施压，在不同队列中仍有分歧。”',source:'QA · 示例反馈',action:'回放原音及后续回应，统一 Calibration 样本。'},
{id:'trust',actions:["在通知中标明触发限制的片段、行为和对应规则。", "说明 Gifts 限制范围、持续时间及 Appeal 材料要求。", "抽访 Creator 是否理解通知，并优先修复已确认的误伤。"],label:'Creator 理解',status:'blocked',quote:'“收到 Gifts 限制通知，但不知道是哪段行为触发。”',source:'Creator · 示例反馈',action:'通知中指出触发行为，明确 Appeal 的材料要求。'},
{id:'readiness',actions:["为每个班次指定交接 Owner 和未结事项清单。", "确认谁有恢复权限，用一条模拟误伤跑通恢复流程。", "设置超时升级路径，交接时核对完成状态。"],label:'执行准备',status:'improve',quote:'“人工路径可以承接，但跨班次交接和恢复责任不清楚。”',source:'Operations · 示例反馈',action:'明确交接 Owner，确认恢复权限和完成时点。'}
];

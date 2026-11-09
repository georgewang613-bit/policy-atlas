// 独立案例研究。练习中的结论和数值不是 TikTok 内部规则、指标或面试评分。
export const studyDate = '2026-11-09';
export const studySources = [
 {id:'S1', title:'TikTok：内容执法的目标', publisher:'TikTok Newsroom', url:'https://newsroom.tiktok.com/evolving-our-approach-to-content-enforcement-us?lang=en', status:'已核对', note:'2023-03-31。说明严重伤害优先、减少违规曝光、准确一致地对待创作者，以及人工处理语境。支持治理目标，不提供本练习的处罚档位。'},
 {id:'S2', title:'TikTok：LIVE 变现资格', publisher:'TikTok Newsroom', url:'https://newsroom.tiktok.com/tiktoklive?lang=en-ZA', status:'已核对', note:'公开发布说明区分社区规则与 LIVE 变现资格。不能用这篇公告代替最新 Gift baiting 条款全文。'},
 {id:'S3', title:'Precision、Recall 和 FPR', publisher:'Google for Developers', url:'https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall', status:'已核对', note:'分类指标定义和阈值权衡。这里只借用数学定义；评估单位、抽样方式和上线门槛需为 LIVE 单独设计。'},
 {id:'S4', title:'违规观看率的抽样方法', publisher:'YouTube Transparency Report Help', url:'https://support.google.com/transparencyreport/answer/9209072?hl=en', status:'已核对', note:'从已观看视频抽样、人工判定并报告置信区间。官方明确：VVR 不包含直播，仅含转为点播的直播；本项目的观看分钟指标是方法改编。'},
 {id:'S5', title:'文化语境、通知和申诉', publisher:'Santa Clara Principles 2.0', url:'https://santaclaraprinciples.org/', status:'已核对', note:'民间组织和专家提出的治理建议，涉及本地语境、可理解的规则和人工申诉。不是法律，也不能据此声称 TikTok 已采用全部建议。'},
 {id:'S6', title:'如何识别政策效果', publisher:'英国财政部 / Evaluation Task Force', url:'https://www.gov.uk/government/publications/the-magenta-book/magenta-book-annex-a-analytical-methods-for-use-within-an-evaluation-html', status:'已核对', note:'2026-05-15 更新，A2.7 双重差分。要求考虑平行趋势及数据质量；类似市场并不自动构成有效对照。'},
 {id:'S7', title:'TikTok：欧盟第七份透明度报告公告', publisher:'TikTok Newsroom', url:'https://newsroom.tiktok.com/digital-services-act-our-seventh-transparency-report-on-content-moderation-in-europe?lang=en-150', status:'已核对', note:'2026-08-31，覆盖 2026 年上半年。94.1% 是平台自报的自动化处置占比，涉及多个内容类型；不是本题的 Precision、Recall 或 gift baiting 识别效果。'},
 {id:'S8', title:'LIVE Monetization Guidelines', publisher:'TikTok LIVE Creator Hub', url:'https://www.tiktok.com/live/creators/en-US/rules_and_guidance/live_monetization_guidelines', status:'用户提供正文已核对', note:'2026-11-09逐项核对用户从公开页面提供的英文正文；页面更新时间及是否为官网最新版本未能独立确认。正文明确区分社区规则、推荐资格和变现资格，并列出情绪或义务感施压、虚假承诺、多人连麦责任及按严重性和频次限制变现等原则。案例中的细化阈值仍是项目建议。'},
];

export const competencies = [
 {title:'边界能否落到证据', question:'什么使这次索礼构成施压？', signal:'指出谁说了什么、如何把礼物与欠人情或忠诚挂钩；给出只改变一个事实就不成立的反例。', weak:'用“感觉不舒服”“出现礼物关键词”代替判断。'},
 {title:'处置是否与伤害相称', question:'需要限制哪项功能、多久、如何纠错？', signal:'按严重性和重复性选择措施；正常创作者收入是需要保护的利益，头部主播的收入规模不改变违规边界。', weak:'所有情况一律封号，或为了收益放宽同一条边界。'},
 {title:'能否跨语言稳定执行', question:'换一种语言、换成弹幕或连麦，还能判断吗？', signal:'保留原音、发言人和前后回应；用当地成对例子校准，不用国家标签代替语境。', weak:'认为翻译完成就等于理解，或用“当地习惯”免除所有压力行为。'},
 {title:'是否理解 AI 的边界', question:'模型有把握，是否就能处罚？', signal:'把线索、证据和决定分开；验证模型在各语言的误差，并让不确定案例进入人工复核。', weak:'直接让 LLM 打分决定处罚，把模型置信度当作事实。'},
 {title:'是否能证明有效', question:'违规下降了，怎么知道是政策的作用？', signal:'说明样本总体、分母、漏判和对照条件；同时看合规主播被错误限制的时间。', weak:'只报删除量、申诉量或总收入，凭上线前后变化下因果结论。'},
 {title:'能否把发现变成修正', question:'风险下降但误伤很高，下一步是什么？', signal:'先纠正仍在发生的错误，再定位规则、模型、审核或执行环节；用独立样本验证修正。', weak:'只说“加强培训、优化模型”，没有具体错误和复测办法。'},
];

export type PracticeCase = {id:string; title:string; scene:string; options:string[]; answer:number; evidence:string; boundary:string; action:string; followup:string};
export const practiceCases: PracticeCase[] = [
 {id:'favor',title:'恩惠变成索礼条件',scene:'主播：“刚才为你多唱了一首，怎么也该送朵玫瑰吧。”观众说暂时不方便，主播继续点名：“别让大家觉得你只会占便宜。”',options:['按本练习的施压规则处理','仅凭没收到礼物，不处理','立即永久封号'],answer:0,evidence:'索礼、过去的恩惠、拒绝后的点名贬低都由主播表达；三者共同支持义务感施压的判断。',boundary:'是否真的收到礼物不决定施压是否成立；付款结果用于衡量影响。仅有一句“谢谢支持”则不满足这些证据。',action:'记录原话和拒绝后的持续行为，考虑暂时限制相关变现功能并告知理由；期限与升级条件应由适用政策规定，不在案例中编造。',followup:'如果观众没有明确拒绝，你还需要哪些证据？拒绝不是必要条件，清晰的“欠我所以必须付出”也可能建立压力。'},
 {id:'thanks',title:'感谢和自愿支持',scene:'主播：“谢谢今天送礼的朋友，想支持可以送一朵玫瑰，不方便也没关系。”随后继续唱歌，没有点名、威胁或许诺回报。',options:['只要提到礼物就处罚','本条证据不支持施压','打赏多就说明没有违规'],answer:1,evidence:'案例中的选择仍是自愿的，没有礼物与人情债、忠诚检验或负面后果的关联。',boundary:'这是“本条不成立”，不是对全部变现规则作出合规保证；机械重复索礼、年龄、欺诈等需另查。',action:'不按义务感施压处罚。保留此类负例，检验模型是否错误匹配“支持、礼物、感谢”等词。',followup:'如果后来变成每十秒重复索礼，应核查另一类规则；不要为了命中本条而虚构“义务感”。'},
 {id:'quote',title:'读出弹幕是在制止',scene:'弹幕：“小林，主播上次帮过你，你得刷礼物。”主播念出这句话，随即说：“别逼小林，不送也欢迎。”',options:['主播念了索礼话术，应处罚','本条证据不支持主播施压','收到礼物后才判断'],answer:1,evidence:'完整回应显示主播在拒绝该要求。只截取朗读部分会把引用误作赞同。',boundary:'观众弹幕是否涉及骚扰应另行审核；本练习不把一条弹幕自动归责给主播。',action:'保留原始发言人、弹幕与回应的时间关系；把这种“引用后否定”加入审核校准样本。',followup:'如果主播改说“说得对，小林该表示一下”，结论会怎样变化？变化来自主播的明确认可。'},
 {id:'context',title:'玩笑还是忠诚施压',scene:'仅有六秒片段：主播说“老朋友要给面子呀”，同时指向礼物图标。没有此前对话，也不知道是否存在点名或拒绝。',options:['这是当地玩笑，直接放行','一定是施压，直接处罚','证据不足，补充语境'],answer:2,evidence:'存在索礼线索，但尚不能确定“给面子”在这次交流中是否与人情债或忠诚压力相连。',boundary:'信息缺失既不等于违规，也不等于合规。不能凭语言或国籍猜测表达含义。',action:'查看前后原音、弹幕、目标观众和手势，由熟悉该语言的审核员复核；严重即时风险按对应安全规则另行响应。',followup:'当需要快速决定而上下文拿不到时，说明证据缺口和临时措施的依据，不把永久处罚建立在猜测上。'},
 {id:'guest',title:'连麦责任分开看',scene:'连麦嘉宾说“不刷礼物就不是真粉丝”，主播立即打断并移出嘉宾；没有证据显示主播提前安排或支持这段话。',options:['主播制止了，所以所有规则都不适用','仅凭同框认定主播主动施压','分别核查嘉宾行为与主持人责任'],answer:2,evidence:'施压话术来自嘉宾，主播有及时制止记录；这是评估个人行为和处置强度的重要事实。',boundary:'公开指南明确主播对整场直播及嘉宾内容负责，嘉宾违规可导致该场直播受到变现限制；及时制止影响比例判断，但不使整场责任自动消失。',action:'记录发言、制止时间、重复次数和主持人控制手段；依严重性和频次决定是否警告或限制相关变现功能，并保留申诉。',followup:'如果主播明知嘉宾反复施压仍继续邀请，哪些新增证据会改变处置强度？'},
 {id:'deception',title:'欺骗和施压不是同一要件',scene:'主播承诺“送礼就一定获得手机”，却没有准备奖品。没有提及恩惠、忠诚或不送礼的后果。',options:['不属于义务感施压，全部放行','按欺骗线索核查，不硬套本条','礼物少所以不必处理'],answer:1,evidence:'关键证据是承诺、履约能力和是否误导；本案例没有建立义务感施压。',boundary:'不同风险可以并存，但应逐条证明。不能把“施压”和“欺骗”当成同一个标签。',action:'保存承诺、条件和履约材料，依适用的欺骗性索礼规则判断；涉及随机有奖活动时另核查参与条件和地区法律。',followup:'怎样评估新规则效果？先固定你测的是“义务感施压”还是全部 deceptive gift baiting，避免分母在上线前后改变。'},
];

export const transferCases = [
 {title:'AI 主播让用户误认真人',question:'“送礼后我就做你的真人女友。”屏幕角落有很小的 AI 标记，够不够？',principle:'分别检查身份是否误导、送礼承诺是否虚假，以及直播是否缺乏有意义的创作者参与。公开指南把这些放在不同判断路径中。',evidence:'标记的位置与持续时间、主播是否否认 AI 身份、承诺能否实现，以及是否主要由自动系统运行而缺少真实互动。使用 AI 或角色扮演本身不自动失去变现资格。',response:'项目建议：纠正披露，按已证实的欺骗或不真实直播行为处理相关变现；具体法律义务按地区和产品范围核查。',measure:'身份理解测试、欺骗暴露、真实互动率、被误限的合规角色表演，以及用户申诉。'},
 {title:'未成年人只是短暂入镜',question:'主播的孩子经过镜头并说了一句话，是否应直接取消整场变现？',principle:'指南关注未满18岁是否为直播的主要焦点、主要参与者或持续出现在变现互动中；短暂出现只是线索。',evidence:'出现时长、是否被刻意展示、是否与观众互动或参与索礼、直播标题和镜头是否围绕未成年人。',response:'补齐上下文后判断；证据只显示偶然入镜时，不按“以未成年人为主要参与者”处理，其他儿童安全规则仍需独立检查。',measure:'未成年人主体内容召回、偶然入镜误限率、复核耗时和申诉改判率。'},
 {title:'PK 变成打赏抽奖',question:'“刷指定礼物才有机会抽手机。”普通排名和抽奖的边界在哪里？',principle:'把竞争互动与付费机会型奖励拆开，不能只凭“PK”或“抽奖”两个字定性。',evidence:'是否付费参与、是否随机、奖品性质、是否存在真实免费参与路径、地区与年龄。免费路径也不自动排除法律风险。',response:'保全承诺及参与机制，核查平台有奖活动条款和当地法律；不据此断言构成违法赌博。',measure:'误导承诺发生率、已确认风险活动的暴露，以及正常 PK 被误限的比例。'},
 {title:'本地表达引发跨区误判',question:'同一句“自己人都该表示一下”，为什么不同案例可能得出不同结论？',principle:'保持反施压的原则一致，用上下文解释实际含义；同一语言内部也有不同用法。',evidence:'前后话语、目标观众、拒绝后的回应、手势和本地审核意见。比较的应是表达功能，而不只是字面。',response:'用成对案例校准；存在持续分歧时细化规则或收窄自动处置范围。',measure:'各语言的 Precision、Recall、样本量与区间；总体平均值不能掩盖小语种错误。'},
 {title:'风险下降但误伤上升',question:'暴露下降了 30%，合规主播投诉变多。继续扩大吗？',principle:'先确认风险指标口径及投诉是否代表错误，再判断安全收益与创作者损害。',evidence:'独立抽样、未申诉的被限案例、原音与模型输出、规则版本、错误限制的持续时间。',response:'先恢复已确认误限的功能；暂停扩大问题语言或场景的自动处置，保留人工覆盖和严重风险保护，修正后复测。',measure:'暴露、Recall、错误限制时长、积压与响应尾部同时过关；不只看一个“准确率”。'},
];

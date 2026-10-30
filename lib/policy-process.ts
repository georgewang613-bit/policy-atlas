import type {PolicyEvent} from './atlas-schema';
export const legalStages = [
 {id:'agenda',name:'① 尚未起草',meaning:'政府提出方向、开展研究或征集初步意见，尚无正式规则草案。',start:'正式文本公布后评估新增要求；现行义务继续执行。',action:'识别风险，建立场景清单。'},
 {id:'draft',name:'② 已有草案',meaning:'草案已公开，或已开始征集意见、证据；最终规则仍可调整。',start:'征求意见截止后进入审阅；实施时间以最终文本为准。',action:'提交意见，准备规则选项和影响评估。'},
 {id:'debate',name:'③ 正在审议',meaning:'议会审议、修订或表决。',start:'完成当地成法程序，再核对启动条款与过渡期。',action:'跟踪版本差异，预留产品与审核改造时间。'},
 {id:'pending',name:'④ 已通过待生效',meaning:'文本已确定，适用日期尚未到来。',start:'按条款适用日或合规截止日落实；分期要求分别排期。',action:'完成规则、培训、产品配置与验收。'},
 {id:'effective',name:'⑤ 已生效',meaning:'相关条款已经进入法律效力阶段。',start:'核对本服务的适用范围、合规期限及法院暂停安排。',action:'检查现有控制，修补缺口并留存证据。'},
 {id:'guidance',name:'监管指导',meaning:'监管机构解释要求或推荐做法。',start:'约束力取决于法律依据；具体通知可另设截止日。',action:'对照现行义务，评估措施差距。'},
 {id:'case',name:'诉讼 / 执法',meaning:'针对个案的调查、起诉、裁判或命令。',start:'按可执行命令的对象、期限及暂停状态落实。',action:'核对裁判正文，区分指控、认定和整改要求。'},
];
export function stageKey(e:Pick<PolicyEvent,'stage'>){
 if(/酝酿|征询预告|提出政策方向|尚未起草/.test(e.stage))return 'agenda';
 if(/和解|诉讼|调查|裁判/.test(e.stage))return 'case';
 if(/^已生效|^已适用/.test(e.stage))return 'effective';
 return /酝酿|征询预告|提出政策方向|尚未起草/.test(e.stage)?'agenda':/草案|征询|证据征集/.test(e.stage)?'draft':/审议|委员会|谈判授权/.test(e.stage)?'debate':/待实施|已通过待生效/.test(e.stage)?'pending':/执法/.test(e.stage)?'case':/指南|指引|监管指导/.test(e.stage)?'guidance':'effective';
}

// Keep stored stages and evidence intact; use the same ordered wording in the UI.
export function stageDisplay(stage:string){
 const key=stageKey({stage});
 const index=legalStages.findIndex(s=>s.id===key);
 if(index<5)return legalStages[index].name;
 const readable=stage
  .replace(/政策酝酿/g,'提出政策方向')
  .replace(/立法审议/g,'法案审议')
  .replace(/征询期已届满/g,'征求意见已结束')
  .replace(/征询已截止/g,'征求意见已结束')
  .replace(/征询预告/g,'即将征求意见')
  .replace(/征询/g,'征求意见')
  .replace(/待提案/g,'等待正式提案')
  .replace(/待法规/g,'等待法规草案')
  .replace(/待实施|已通过待生效/g,'等待实施')
  .replace(/后续待核/g,'后续待核实')
  .replace(/非约束性/g,'不具强制约束力');
 return readable;
}

export const processSteps=[
 {name:'识别风险',question:'什么伤害值得改变规则？',body:'结合用户举报、风险研究、监管进展和新功能，判断伤害的严重度、发生概率与现有控制。',output:'建议产物：风险说明、受影响人群、LIVE 场景。',gate:'触发条件：新风险出现，或现有措施效果不足。'},
 {name:'听取意见',question:'不同地区与群体如何受影响？',body:'TikTok 公开披露会征求创作者、外部专家和地区顾问委员会意见，并考虑人权与当地语境。',output:'建议产物：意见摘要、地区差异、表达与安全权衡。',gate:'进入起草：问题、目标和主要分歧已明确。'},
 {name:'形成规则',question:'什么允许，什么需要处理？',body:'明确行为定义、例外、适用对象与处置方式。LIVE 同时涉及内容、观看资格、推荐和变现权限。',output:'建议产物：规则文本、正反例、地区附录与处置矩阵。',gate:'进入准备：规则能被审核员和产品一致解释。'},
 {name:'准备上线',question:'规则能否被准确执行？',body:'公开资料确认审核指引和培训会随规则更新。项目建议同步校准样本、配置工具、准备用户通知与申诉说明。',output:'建议产物：培训包、测试结果、通知文案与上线清单。',gate:'上线条件：适用日期明确，执行工具和复核路径就绪。'},
 {name:'执行与申诉',question:'如何处置，如何纠错？',body:'自动化与人工审核共同执行；按违规情况采取内容或功能措施，向用户说明决定并提供申诉。',output:'建议产物：处置记录、理由、申诉结果与紧急升级记录。',gate:'开始落实：已公告的平台规则生效，或适用法律义务到期。'},
 {name:'评估与修订',question:'伤害减少了吗，误判增加了吗？',body:'TikTok 的欧盟风险报告评估控制后的剩余风险。本项目将该概念用于复盘 LIVE 规则效果。',output:'建议指标：确认损害、审核一致率、误判与申诉改判。',gate:'修订触发：效果不足、地区偏差或新的风险证据。'},
];

import type {PolicyEvent} from './atlas-schema';
import {stageKey} from './policy-process';
type Framework={route:string;gate:string;next:string;url?:string};
const eu='https://commission.europa.eu/law/law-making-process/adopting-eu-law_en';
const uk='https://www.parliament.uk/about/how/laws/acts/';
const au='https://www.aph.gov.au/about_parliament/house_of_representatives/powers_practice_and_procedure/00_-_infosheets/infosheet_7_-_making_laws';
const profiles:Record<string,Framework>={
 'ng-sales-promotion-draft':{route:'FCCPC草案征询 → 意见审阅与最终文本 → 联邦公报公布 → 按最终启动条款实施',gate:'草案拟以联邦公报公布日为施行日。核对最终文本、公布日期及活动范围后，确定LIVE商业合作与促销流程的义务。',next:'最终规则与联邦公报公布日'},
 'jp-election-guidance':{route:'修正法成立 → 配套指引征询 → 最终公布 → 母法施行',gate:'母法规定指定服务的风险缓解与年度公表。草案列举推荐措施，平台依据服务特性选择；选举表达与措施比例性共同评估。',next:'最终指引与省令公布',url:'https://public-comment.e-gov.go.jp/pcm/detail?CLASSNAME=PCMMSTDETAIL&Mode=0&id=145210789'},
 'sa-pdpl-draft':{route:'公开征询 → 最终修订决定 → 正式公报公布 → 拟议60日后施行',gate:'第38条的60日安排仍是草案条款。以最终决定保留的启动条款和正式公布日确定执行时间；现行PDPL义务持续适用。',next:'最终修订决定与正式公报公布日'},
 'eu-dfa-frontier':{route:'欧盟倡议 → 委员会提案 → 欧洲议会与理事会审议 → 最终文本与适用安排',gate:'EESC 意见本身不创设平台义务。需要正式提案、最终立法和适用条款；法规与指令的执行路径还需按最终法律形式判断。',next:'委员会正式提案及法律形式',url:eu},
 'eu-kids-proposal':{route:'提案反馈 → 委员会文本 → 立法机关审议 → 最终适用安排',gate:'反馈截止不是生效日。须核对正式文本、适用服务及最终生效／适用条款；现有 DSA 义务持续存在。',next:'核对反馈门户日期与正式提案版本',url:eu},
 'us-kosa':{route:'两院审议同一文本 → 总统签署或其他宪法成法路径 → 法律规定的实施安排',gate:'程序请求遭反对不等于法案永久终止，也不产生新合规义务。成法后仍须读取实际生效条款和授权规则。',next:'后续表决、替代文本与两院进程',url:'https://www.house.gov/the-house-explained/the-legislative-process'},
 'au-duty-bill':{route:'两院通过 → 总督御准 → 法律规定的 commencement → 适用义务',gate:'提出法案不是生效。平台设计义务须待最终文本、启动条款和适用范围确认；不能把草案处罚当作现行处罚。',next:'两院审议与修订文本',url:au},
 'au-feed-draft':{route:'草案征询 → 母法授权成立 → 正式制定配套文书 → 启动及过渡安排',gate:'信息流草案依赖母法获御准及后续正式文书。11月5日只是意见窗口，不是上线截止。',next:'母法御准与正式用户工具规则'},
 'ca-digital-safety-bill':{route:'众议院及参议院同文通过 → 御准 → 条款启动／配套规则',gate:'宪章声明说明权利影响，不是批准或生效证明。实际义务需按成法后的启动条款、服务定义及配套要求判断。',next:'C-34 后续审读及修订文本',url:'https://www.ourcommons.ca/procedure/our-procedure/legislativeprocess/c_g_legislativeprocess-e.html'},
 'sg-tiered-next':{route:'政策方向 → 正式法案 → 国会审议与总统同意 → 启动安排',gate:'2027年是拟提法案的政策目标，不是已确定的实施日。新年龄保证及功能义务需等待正式立法和适用安排。',next:'正式法案及年龄／功能分层定义',url:'https://www.parliament.gov.sg/about-us/parliament-information/functions'},
 'co-chatbot-draft':{route:'州监管规则草案 → 意见及听证 → 最终规则 → 规则生效与母法适用',gate:'10月26日是可能延长的意见窗口。母法义务与配套规则分别核对；新规则的最终文本和生效条款尚待确认。',next:'听证是否延续、最终规则与生效公告'},
 'br-enforcement-draft':{route:'ANPD 公开咨询 → 汇总意见与最终草案 → 审议及正式发布',gate:'ECA Digital 已经生效；程序规则仍在修订不构成全面宽限期。新增程序要求以正式决议和生效条款为准。',next:'意见汇总、董事会审议与最终决议'},
 'my-licensing-draft':{route:'MCMC 许可修订咨询 → 最终法律文书与公布 → 适用及过渡安排',gate:'门户显示咨询关闭不等于修订通过。先判断经营实体与服务是否纳入许可，再核对正式文书、费用和过渡期限。',next:'正式修订文书与海外经营者定义'},
 'id-tunas-review':{route:'现行 PP TUNAS → 实施评估 → 可能的配套或后续政策',gate:'实施评估不会自动暂停现行规则，也不等于新法草案。后续 AI 或安全功能要求须有正式依据才能作为新义务。',next:'正式配套文本与适用功能解释'},
 'uk-age-forthcoming':{route:'政府政策 → 授权法律下的法规草案 → 适用议会程序 → 正式启动',gate:'年底提交法规的目标不是生效日。须核对授权条款、适用审查程序及正式启动日期。',next:'法规草案、授权基础及议会审查方式',url:uk},
 'uk-transparency-draft':{route:'Ofcom 征询预告 → 正式征询／陈述 → 最终方法与通知 → 对指定服务执行',gate:'11月25日拟启动征询，不是提交透明度报告的日期。具体义务与截止须以适用服务收到的正式通知及法律依据判断。',next:'正式征询文件与通知草稿'},
 'uk-women-evidence':{route:'证据征集 → 监管评估 → 后续指引或规则决定',gate:'证据征集本身不新增统一义务。现有在线安全义务继续适用，后续建议需区分自愿指导和法律要求。',next:'证据汇总与后续监管决定'},
 'sg-ai-ip-consult':{route:'MinLaw／IPOS 咨询 → 政府回应 → 可能的法律或指导文件',gate:'征询结束不表示已修改版权法。AI 训练、输出及创作认定仍需按现行法律处理，后续改革形式尚待确认。',next:'政府回应及正式修法或指引'},
 'eu-minors':{route:'现行 DSA → 非约束性未成年人保护指南 → 监管评估',gate:'指南发布不是一部新法的生效日；它提供监管判断参考，平台应依据适用 DSA 义务评估措施。',next:'监管解释、指南更新及个案适用'},
 'ut-live':{route:'诉讼程序 → 实体审理或和解 → 可执行的具体裁判／命令',gate:'驳回动议未获支持不代表法院确认全部指控。直接整改义务须看具体裁判、和解和适用范围；现有法律仍独立适用。',next:'后续判决、禁令或和解及是否被暂停执行'},
 'us-coppa':{route:'FTC 最终规则公布 → 规则生效 → 多数修订合规期届满',gate:'2025年6月23日生效与2026年4月22日多数修订合规期限是两个节点；部分条款另有安排。需先确认儿童导向服务或实际知情等适用条件。',next:'适用条款、例外期限及执行变化'},
};
export type TimelineNode={date:string|null;label:string;detail:string;kind:'evidence'|'window'|'impact'|'conditional';source:string};
export function policyTimeline(e:PolicyEvent){
 const routes:Record<string,string>={agenda:'政策方向 → 正式文本 → 审议与适用安排',draft:'公开草案 → 意见审阅 → 最终文本与适用安排',debate:'立法审议 → 共同文本与正式通过 → 公布及分条款适用',pending:'最终文本 → 上线准备 → 适用日期',effective:'法律适用 → 执行检查 → 后续解释与修订',guidance:'监管指引 → 适用评估 → 措施与复核',case:'个案程序 → 裁判或和解 → 按对象与期限落实'};
 const next:Record<string,string>={agenda:'正式文本',draft:'最终文本及实施安排',debate:'后续审议与最终适用条款',pending:'适用日与验收',effective:'后续解释、过渡安排与执行变化',guidance:'后续指引与适用解释',case:'具体命令、实施期限及执行状态'};
 const key=stageKey(e);
 const f=profiles[e.id]||{route:routes[key],gate:e.policyImplication?.trigger||`核对适用日期与功能范围。${e.appliesTo}`,next:next[key]};
 const nodes:TimelineNode[]=[{date:e.eventDate,label:'已核验进展',detail:e.fact,kind:'evidence',source:e.source}];
 const history=e.history.filter(h=>h.date!==e.eventDate&&h.date!==e.effectiveDate&&h.date!==e.deadline).slice(-6);
 for(const h of history)nodes.push({date:h.date,label:'历史进展',detail:h.event,kind:'evidence',source:e.source});
 if(e.id==='jp-election-guidance'){nodes.unshift({date:'2026-07-13',label:'母法成立',detail:'修正法确立指定大规模服务的选举风险缓解和年度公表框架。',kind:'evidence',source:'https://public-comment.e-gov.go.jp/pcm/download?seqNo=0000322779'});nodes.push({date:'2027-03-01',label:'母法施行 · 业务影响节点',detail:'草案记载的母法施行日。指定服务应准备风险缓解与年度披露；指引拟同步施行，最终文本待公布。',kind:'impact',source:'https://public-comment.e-gov.go.jp/pcm/download?seqNo=0000322779'});}
 if(e.id==='co-chatbot-draft')nodes.unshift({date:'2026-10-06',label:'中期草案发布',detail:'进入草案评估与意见准备阶段。',kind:'evidence',source:e.source});
 if(e.id==='ca-digital-safety-bill')nodes.unshift({date:'2026-06-10',label:'法案一读文本',detail:'进入立法程序；后续宪章声明不应误记为法案首次提出。',kind:'evidence',source:'https://www.parl.ca/DocumentViewer/en/45-1/bill/C-34/first-reading'});
 if(e.id==='br-eca')nodes.push({date:'2026-03-17',label:'法律生效',detail:'法律义务与分阶段监管路线图分开判断，路线图不代表统一免责期。',kind:'impact',source:e.source});
 if(e.effectiveDate&&e.id!=='br-eca')nodes.push({date:e.effectiveDate,label:'生效／适用节点',detail:`已登记日期；具体受影响范围：${e.appliesTo}`,kind:'impact',source:e.source});
 if(e.deadline&&e.deadline!==e.effectiveDate)nodes.push({date:e.deadline,label:e.deadlineType,detail:/合规|实施/.test(e.deadlineType)?`核对条款范围及例外。${e.uncertainty}`:`程序窗口；义务适用日期另行确认。${e.uncertainty}`,kind:/合规|实施/.test(e.deadlineType)?'impact':'window',source:e.source});
 const explicitDates=new Set(nodes.filter(n=>n.label!=='历史进展').map(n=>n.date));
 for(let i=nodes.length-1;i>=0;i--)if(nodes[i].label==='历史进展'&&explicitDates.has(nodes[i].date))nodes.splice(i,1);
 nodes.sort((a,b)=>(a.date||'').localeCompare(b.date||''));
 nodes.push({date:null,label:f.next,detail:`后续条件与日期待确认。${f.gate}`,kind:'conditional',source:f.url||e.source});
 return {framework:f,nodes};
}

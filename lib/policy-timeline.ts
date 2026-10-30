import type {PolicyEvent} from './atlas-schema';
import {stageKey} from './policy-process.ts';
type Framework={route:string;gate:string;next:string;url?:string};
const eu='https://commission.europa.eu/law/law-making-process/adopting-eu-law_en';
const uk='https://www.parliament.uk/about/how/laws/acts/';
const au='https://www.aph.gov.au/about_parliament/house_of_representatives/powers_practice_and_procedure/00_-_infosheets/infosheet_7_-_making_laws';
const profiles:Record<string,Framework>={
 'ng-sales-promotion-draft':{route:'草案征求意见 → 修改并确定规则 → 联邦公报公布 → 按规定日期执行',gate:'草案计划从联邦公报公布当天执行。需等待最终规则，确认公布日期和哪些促销活动受约束，再调整直播商业合作流程。',next:'最终规则和联邦公报公布日期'},
 'jp-election-guidance':{route:'修正法通过 → 配套指引征求意见 → 最终指引公布 → 法律开始执行',gate:'修正法要求指定服务减少选举相关风险并每年公开报告。指引草案列出建议做法，由平台结合服务选择；措施也要保护政治表达，避免限制过度。',next:'最终指引和配套省令',url:'https://public-comment.e-gov.go.jp/pcm/detail?CLASSNAME=PCMMSTDETAIL&Mode=0&id=145210789'},
 'sa-pdpl-draft':{route:'公开征求意见 → 确定修订内容 → 正式公报公布 → 草案计划60天后执行',gate:'公布后60天执行仍是草案中的安排。需等待最终决定及正式公布日；现行PDPL要求继续执行。',next:'最终修订内容和公报公布日期'},
 'eu-dfa-frontier':{route:'提出方向 → 委员会提交提案 → 议会和理事会审议 → 确定最终规则和执行日期',gate:'欧洲经济社会委员会（EESC）的意见不会直接新增平台义务。需等正式提案通过，并确认执行日期；最终采用法规还是指令，也会影响各国落实方式。',next:'委员会正式提案，以及采用法规还是指令',url:eu},
 'eu-kids-proposal':{route:'提案征求意见 → 委员会文本 → 议会和理事会审议 → 确定执行安排',gate:'意见截止日不是生效日。需核对最终文本、哪些服务受影响，以及生效和执行日期；现有DSA要求继续执行。',next:'意见截止日和正式提案版本',url:eu},
 'us-kosa':{route:'参众两院通过相同文本 → 总统签署等法定程序 → 按法律规定的日期执行',gate:'快速通过请求遭反对，不代表法案永久终止，也没有因此新增要求。成为法律后，还需核对生效条款和后续配套规则。',next:'后续表决、修改后的文本和两院进度',url:'https://www.house.gov/the-house-explained/the-legislative-process'},
 'au-duty-bill':{route:'两院通过 → 总督批准（御准） → 到达法律规定的日期 → 开始执行',gate:'目前是法案。平台要做什么、何时开始，需等待最终文本和生效安排；草案中的处罚还不是现行处罚。',next:'两院审议进展和修改后的文本',url:au},
 'au-feed-draft':{route:'草案征求意见 → 所依据的法律获批 → 正式制定配套规则 → 按规定日期执行',gate:'须先等Digital Duty of Care法案正式获批，再制定配套规则。11月5日是意见截止日，不是功能必须上线的日期。',next:'法案是否正式获批，以及最终的信息流选择规则'},
 'ca-digital-safety-bill':{route:'两院通过相同文本 → 正式批准（御准） → 按生效条款和配套规则执行',gate:'宪章声明解释法案可能怎样影响权利，不代表法案已获批。需等法案成为法律，再核对开始日期、服务范围和配套要求。',next:'C-34后续审议和修改后的文本',url:'https://www.ourcommons.ca/procedure/our-procedure/legislativeprocess/c_g_legislativeprocess-e.html'},
 'sg-tiered-next':{route:'提出方向 → 提交法案 → 国会通过、总统同意 → 按规定日期执行',gate:'2027年是计划提交法案的年份。年龄核验和功能保护何时开始执行，需等正式法律及实施安排。',next:'正式法案，以及各年龄段能使用哪些功能',url:'https://www.parliament.gov.sg/about-us/parliament-information/functions'},
 'co-chatbot-draft':{route:'公布草案 → 征求意见和举行听证 → 确定规则 → 到达规定的执行日期',gate:'公告所列意见截止日为10月26日，听证延续时可能延长。作为依据的法律和本次配套规则要分别核对；新规则的最终内容和生效日期仍待确认。',next:'听证是否延续，以及最终规则和生效公告'},
 'br-enforcement-draft':{route:'公开征求意见 → 整理意见、修改草案 → 审议并正式发布',gate:'ECA Digital已生效，现有要求继续执行。新增执法程序须等正式决议，再按其中的生效条款落实。',next:'意见汇总、管理委员会审议和最终决议'},
 'my-licensing-draft':{route:'许可修订征求意见 → 正式公布修订 → 按执行日期和准备期限落实',gate:'征求意见结束不代表修订已通过。先确认经营公司和服务是否需要许可，再核对最终文件、费用及准备期限。',next:'最终修订文件，以及哪些境外经营者受约束'},
 'id-tunas-review':{route:'现行PP TUNAS → 检查执行效果 → 可能提出配套规则或新政策',gate:'现行规则继续执行。评估结果还不是新法草案；新增AI或安全功能要求，需等正式规则确认。',next:'正式配套规则，以及涉及哪些功能'},
 'uk-age-forthcoming':{route:'政府提出方向 → 依现行法律起草法规 → 议会按规定程序审查 → 正式执行',gate:'年底是计划提交法规的时间。开始执行前，仍需核对制定法规的法律依据、议会审查程序和正式执行日期。',next:'法规草案、制定依据和议会审查方式',url:uk},
 'uk-transparency-draft':{route:'预告征求意见 → 发布征求意见文件 → 确定方法并发出通知 → 指定服务执行',gate:'11月25日是计划开始征求意见的日期。哪些报告必须交、何时交，要看具体服务收到的正式通知及法律依据。',next:'正式征求意见文件和通知草稿'},
 'uk-women-evidence':{route:'收集证据 → 监管机构评估 → 决定是否发布新指引或规则',gate:'收集证据本身没有新增统一要求，现行网络安全要求继续执行。后续建议需区分自愿采用的做法和必须遵守的规则。',next:'证据汇总和监管机构的后续决定'},
 'sg-ai-ip-consult':{route:'公开征求意见 → 政府回应 → 可能修改法律或发布指引',gate:'意见期结束不代表版权法已经修改。AI训练和生成内容仍按现行法律处理，后续采用哪种改革方式尚未确定。',next:'政府回应，以及是否正式修法或发布指引'},
 'eu-minors':{route:'现行DSA → 发布不具强制约束力的指南 → 监管机构评估平台措施',gate:'指南供监管机构评估时参考。平台仍须遵守适用的DSA要求，指南本身没有另设统一执行日期。',next:'监管解释、指南更新，以及具体案件中的使用方式'},
 'ut-live':{route:'法院处理程序请求 → 审理是否违法或达成和解 → 执行判决或和解要求',gate:'法院拒绝提前驳回案件，不代表指控已经成立。整改要求要看具体判决或和解涉及谁、要求什么；现有法律仍须遵守。',next:'后续判决、禁令或和解，以及是否暂停执行'},
 'us-coppa':{route:'公布最终规则 → 规则生效 → 到达多数修订的完成期限',gate:'规则于2025年6月23日生效，多数修订要求在2026年4月22日前完成，部分条款另有期限。先判断服务是否面向儿童，或是否已知正在收集儿童信息。',next:'哪些条款适用、是否有不同期限，以及后续执法变化'},
};
export type TimelineNode={date:string|null;label:string;detail:string;kind:'evidence'|'window'|'impact'|'conditional';source:string};
export function policyTimeline(e:PolicyEvent){
 const routes:Record<string,string>={agenda:'提出方向 → 公布草案 → 审议并确定执行日期',draft:'公布草案 → 收集和审阅意见 → 确定规则和执行日期',debate:'审议和修改 → 通过最终文本 → 公布各项要求的执行日期',pending:'规则已通过 → 完成准备 → 按规定日期执行',effective:'规则已生效 → 检查执行情况 → 跟踪解释和修订',guidance:'发布监管指引 → 判断哪些功能受影响 → 调整并检查措施',case:'调查或诉讼 → 判决或和解 → 按要求和期限执行'};
 const next:Record<string,string>={agenda:'正式草案',draft:'最终规则和执行日期',debate:'后续审议，以及最终哪些条款适用',pending:'执行日期，以及各项准备是否完成',effective:'后续解释、留给平台的准备期限和执法变化',guidance:'后续指引，以及哪些服务需要遵守',case:'具体要求、完成期限，以及是否暂停执行'};
 const key=stageKey(e);
 const f=profiles[e.id]||{route:routes[key],gate:e.policyImplication?.trigger||`核对从哪天开始、涉及哪些功能。${e.appliesTo}`,next:next[key]};
 const nodes:TimelineNode[]=[{date:e.eventDate,label:'本次进展',detail:e.fact,kind:'evidence',source:e.source}];
 const history=e.history.filter(h=>h.date!==e.eventDate&&h.date!==e.effectiveDate&&h.date!==e.deadline).slice(-6);
 for(const h of history)nodes.push({date:h.date,label:'此前进展',detail:h.event,kind:'evidence',source:e.source});
 if(e.id==='jp-election-guidance'){nodes.unshift({date:'2026-07-13',label:'修正法通过',detail:'修正法要求指定大规模服务减少选举相关风险，并每年公开报告。',kind:'evidence',source:'https://public-comment.e-gov.go.jp/pcm/download?seqNo=0000322779'});nodes.push({date:'2027-03-01',label:'修正法开始执行',detail:'草案所列的修正法执行日期。指定服务需准备降低风险的措施和年度报告；指引计划同日执行，最终文本尚未公布。',kind:'impact',source:'https://public-comment.e-gov.go.jp/pcm/download?seqNo=0000322779'});}
 if(e.id==='co-chatbot-draft')nodes.unshift({date:'2026-10-06',label:'中期草案发布',detail:'可以开始评估草案并准备意见。',kind:'evidence',source:e.source});
 if(e.id==='ca-digital-safety-bill')nodes.unshift({date:'2026-06-10',label:'法案一读文本',detail:'法案进入立法程序。之后提交的宪章声明用于解释权利影响，并不是首次提出法案。',kind:'evidence',source:'https://www.parl.ca/DocumentViewer/en/45-1/bill/C-34/first-reading'});
 if(e.id==='br-eca')nodes.push({date:'2026-03-17',label:'法律生效',detail:'法律要求已生效。监管机构按阶段推进工作，不代表所有要求都可以延期执行。',kind:'impact',source:e.source});
 if(e.effectiveDate&&e.effectiveDate!==e.eventDate&&e.id!=='br-eca')nodes.push({date:e.effectiveDate,label:'生效或开始执行',detail:`记录的生效或执行日期。受影响的服务：${e.appliesTo}`,kind:'impact',source:e.source});
 if(e.deadline&&e.deadline!==e.effectiveDate)nodes.push({date:e.deadline,label:e.deadlineType,detail:/合规|实施/.test(e.deadlineType)?`核对哪些条款适用、是否有例外。${e.uncertainty}`:`这是参与程序的截止时间；新要求从何时执行需另行确认。${e.uncertainty}`,kind:/合规|实施/.test(e.deadlineType)?'impact':'window',source:e.source});
 const explicitDates=new Set(nodes.filter(n=>n.label!=='此前进展').map(n=>n.date));
 for(let i=nodes.length-1;i>=0;i--)if(nodes[i].label==='此前进展'&&explicitDates.has(nodes[i].date))nodes.splice(i,1);
 nodes.sort((a,b)=>(a.date||'').localeCompare(b.date||''));
 nodes.push({date:null,label:f.next,detail:`接下来：${f.gate}`,kind:'conditional',source:f.url||e.source});
 return {framework:f,nodes};
}

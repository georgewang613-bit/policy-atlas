import {useState} from 'react';
import {incidents,caseEvidence,departments,DEMO_VERSION} from '../../data/live-demo.mjs';
import {decisionAxes} from '../../data/case-briefing.mjs';
import {policyContext} from '../../data/live-context.mjs';
const steps=[
 {title:'信息汇总',framework:'Behavior → Harm → Risk → Evidence',question:'发生了什么，哪些事实还不足以支持结论？',points:['把现场行为、潜在伤害、紧迫程度分开记录。','用时间戳和 E1–E3 对齐原音、画面及 Gifts；账号与商业信息只是上下文。','注明已知、未知和反证；高风险先保护，同时继续补证。']},
 {title:'部门意见',framework:'Goal → Constraints → Options',question:'各部门担心什么，分歧如何改变方案？',points:['安全看即时伤害，运营看正常创作，法务看地区和依据。','审核校准成立要件，产品确认工具粒度，公关只回应已核实事实。','逐条记录证据、异议和改变意见的条件，不把多数赞成当作证据。']},
 {title:'决定',framework:'Evidence → Proportional action → Delivery',question:'为什么是这个措施，什么条件下会改判？',points:['分别判断内容、推荐与变现，写清各自依据和适用范围。','比较维持、定向限制、升级处理；同时考虑伤害、误伤和可逆性。','明确执行人、通知、申诉和恢复条件；用反例检查边界。']},
 {title:'复盘',framework:'Outcome → Guardrails → Learning',question:'风险是否减少，代价是否可接受？',points:['同时看风险暴露、干预延迟、误伤和申诉改判；注明分母与观察窗口。','区分模拟结果与实测结果，检查自然降温等混杂因素。','写下继续、收紧或回滚的条件，将新证据反馈到规则和审核样例。']}
];
export default function ReasoningMethod({drafts,onOpen}:any){
 const [active,setActive]=useState(0),[caseId,setCaseId]=useState(incidents[0].id);
 const item=incidents.find(x=>x.id===caseId)!;const draft=drafts[caseId];const compatible=draft?.version===DEMO_VERSION;
 const evidence=caseEvidence(item,compatible?draft.variant:false,compatible?draft.at:Math.max(item.at,180));
 const context=compatible?JSON.stringify({version:DEMO_VERSION,at:draft.at,variant:draft.variant,evidence,gifting:policyContext(item,draft.variant,draft.at).gifting}):'';
 const opinions=compatible?Object.entries(draft.opinions||{}).filter(([id,o]:any)=>(draft.team||[]).includes(id)&&o.context===context):[];
 return <section className="reasoning-method"><h2>我的政策判断框架</h2><div className="method-steps" role="tablist" aria-label="研判四步">{steps.map((s,i)=><button key={s.title} id={`method-tab-${i}`} role="tab" aria-selected={active===i} aria-controls="method-step-panel" onClick={()=>setActive(i)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?3:(active+(e.key==='ArrowRight'?1:3))%4;setActive(next);document.getElementById(`method-tab-${next}`)?.focus();}}} tabIndex={active===i?0:-1}><span>0{i+1}</span>{s.title}</button>)}</div><article className="method-step-panel" id="method-step-panel" role="tabpanel" aria-labelledby={`method-tab-${active}`}><p className="framework">{steps[active].framework}</p><h3>{steps[active].question}</h3><ul>{steps[active].points.map(p=><li key={p}>{p}</li>)}</ul></article>
 <div className="method-record-heading"><h2>案例判断记录</h2><select aria-label="选择判断记录" value={caseId} onChange={e=>setCaseId(e.target.value)}>{incidents.map(x=><option key={x.id} value={x.id}>{x.title}{drafts[x.id]?' · 有记录':''}</option>)}</select></div><p className="context-caption">{compatible?`本机记录 · ${new Date(draft.savedAt).toLocaleString('zh-CN')} · ${draft.variant?'变更情境':'原始情境'}`:draft?'旧版本记录保留在本机；打开案例后重新核对。':'尚无个人研判；以下现场资料为模拟案例。'}</p>
 <ol className="method-records"><li><h3>信息汇总</h3><ul>{evidence.map((e:any)=><li key={e.id}><b>{e.id}</b> · {e.text}</li>)}</ul><p>{compatible&&draft.initial?draft.initial:'个人初判尚未填写。'}</p></li><li><h3>部门意见</h3>{opinions.length?opinions.map(([id,o]:any)=><p key={id}><b>{departments.find(d=>d.id===id)?.name}</b> · {o.proposal}<small>{o.evidence_ids?.join(' · ')} · {o.source} · 改判条件：{o.change_condition}</small></p>):<p>尚无与当前证据一致的部门意见。</p>}</li><li><h3>决定</h3>{compatible?<><p>{draft.reason||'尚未填写决定理由。'}</p><ul>{decisionAxes.map((a:any)=><li key={a.id}>{a.label}：{draft.decisions?.[a.id]||'尚未决定'}</li>)}</ul></>:<p>尚未记录决定理由。</p>}</li><li><h3>复盘</h3><p>{compatible&&draft.workbench?.reviewNote||'尚未填写个人复盘。'}</p></li></ol><button className="secondary" onClick={()=>onOpen(item)}>继续这个案例 →</button>
 </section>;
}

import {evidenceDossier} from '../../data/case-exercises.mjs';
import {casePlans} from '../../data/case-briefing.mjs';
export default function DecisionFlow({item,evidence,variant=false,at,children}:any){
 const rows=evidenceDossier(item,evidence,variant,at);
 const sections=[
 {label:'行为概括',term:'Behavior',content:<div className="behavior-summary"><p>{casePlans[item.id].focus}</p><small>{variant?'情境条件已变化，请按本轮记录判断。':item.known}</small></div>},
 {label:'伤害与规则',term:'Harm & policy',content:<div className="guideline-comparisons">{rows.map((r:any)=><article key={r.topic}><h4><a href={r.source} target="_blank" rel="noreferrer">{r.term} ↗</a></h4><p className="harm-explanation">{r.harm}</p><p className="rule-criterion">{r.criterion}</p><p className="rule-assessment">{r.assessment}</p></article>)}<small>英文标题保留项目收录的官方术语；中文为解释。来源：LIVE Monetization Guidelines，收录核对 2026-11-12。</small></div>},
 {label:'逐项证据',term:'Evidence mapping',content:<div className="evidence-dossier"><p className="simulation-note">以下细化条件为演练设计（Simulated review criteria），不是 TikTok 内部 guideline；“线索支持”也不等于已认定违规。</p>{rows.map((r:any)=><article className="violation-evidence" key={r.topic}><h4>{r.term}</h4>{r.quantitative&&<p className="quant-evidence">{r.quantitative}</p>}{r.checks.map((c:any)=><section className="criterion-evidence" key={c.id}><div className="criterion-heading"><h5>{c.condition}</h5><span className={'evidence-status '+(c.status==='线索支持'?'supports':c.status==='反向线索'?'counter':'missing')}>{c.status}</span></div><ul>{c.records.map((e:any)=><li key={e.id}><b>{e.id}</b><div>{e.text}<small>{Math.floor(e.at/60)}:{String(e.at%60).padStart(2,'0')} · {e.source}</small></div></li>)}</ul><p>{c.reason}</p></section>)}<p className="evidence-gap"><b>下一份证据</b> {r.missing}</p></article>)}</div>},
 {label:'决定',term:'Decision',content:children}
 ];
 return <ol className="decision-spine">{sections.map((s,i)=><li key={s.term} className={i===3?'spine-final':''}><span className="spine-dot">0{i+1}</span><div className="spine-row"><div className="spine-label"><h3>{s.label}</h3><span>{s.term}</span></div><div className="spine-content">{s.content}</div></div></li>)}</ol>;
}

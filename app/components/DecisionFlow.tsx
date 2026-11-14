import {guidelineComparison} from '../../data/guideline-comparison.mjs';
import {caseAssessment,casePlans} from '../../data/case-briefing.mjs';
export default function DecisionFlow({item,evidence,children}:any){
 const assessment=caseAssessment(item,evidence);
 const sections=[
 {label:'行为',term:'Behavior',content:<div className="behavior-summary"><p>{casePlans[item.id].focus}</p><small>现场记录 {evidence.map((e:any)=>e.id).join(' · ')}，完整原话见下方证据。</small></div>},
 {label:'伤害',term:'Harm',content:<div className="harm-cards">{assessment.harms.map((h:string)=><article key={h}><strong>{h}</strong></article>)}</div>},
 {label:'规则对照',term:'Guideline check',content:<div className="guideline-comparisons">{guidelineComparison(item,evidence).map((r:any)=><article key={r.topic}><h4><a href={r.source} target="_blank" rel="noreferrer">{r.term} ↗</a></h4><p className="rule-criterion">{r.criterion}</p><div className="rule-assessment"><span>{r.refs.join(' · ')||'暂无证据'}</span><p>{r.assessment}</p></div><p className="rule-missing">待核实：{r.missing}</p></article>)}<small>LIVE Monetization Guidelines · 项目收录核对 2026-11-12。以上为案例分析，内容、推荐和变现分别作出判断。</small></div>},
 {label:'证据',term:'Evidence',content:<ul className="decision-evidence-list">{evidence.map((e:any)=><li key={e.id}><b>{e.id}</b><div><p>{e.text}</p><small>{Math.floor(e.at/60)}:{String(e.at%60).padStart(2,'0')} · {e.source}</small></div></li>)}</ul>},
 {label:'决定',term:'Decision',content:children}
 ];
 return <ol className="decision-spine">{sections.map((s,i)=><li key={s.term} className={i===4?'spine-final':''}><span className="spine-dot">0{i+1}</span><div className="spine-row"><div className="spine-label"><h3>{s.label}</h3><span>{s.term}</span></div><div className="spine-content">{s.content}</div></div></li>)}</ol>;
}

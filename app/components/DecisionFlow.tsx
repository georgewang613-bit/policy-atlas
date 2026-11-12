import {caseAssessment} from '../../data/case-briefing.mjs';
export default function DecisionFlow({item,evidence,children}:any){
 const assessment=caseAssessment(item,evidence);
 const sections=[
 {label:'行为',term:'Behavior',content:<div className="fact-cards">{assessment.facts.map((f:any)=><article key={f.label}><span className={f.status==='已记录'?'confirmed':'pending'}>{f.status} · {f.label}</span><p>{f.text}</p></article>)}</div>},
 {label:'伤害',term:'Harm',content:<div className="harm-cards">{assessment.harms.map((h:string)=><article key={h}><span>潜在影响</span><strong>{h}</strong></article>)}</div>},
 {label:'风险',term:'Risk level',content:<div className="assessed-risks">{assessment.risks.map((r:any)=><article key={r.label}><span>{r.label}</span><strong>{r.value}</strong><div className={'risk-meter level-'+r.level} role="img" aria-label={`${r.label}：${r.value}`} >{[1,2,3].map(n=><i key={n} className={n<=r.level?'filled':''}/>)}</div><small>{r.note}</small></article>)}</div>},
 {label:'证据',term:'Evidence',content:<ul className="decision-evidence-list">{evidence.map((e:any)=><li key={e.id}><b>{e.id}</b><div><p>{e.text}</p><small>{Math.floor(e.at/60)}:{String(e.at%60).padStart(2,'0')} · {e.source}</small></div></li>)}</ul>},
 {label:'决定',term:'Decision',content:children}
 ];
 return <ol className="decision-spine">{sections.map((s,i)=><li key={s.term} className={i===4?'spine-final':''}><span className="spine-dot">0{i+1}</span><div className="spine-row"><div className="spine-label"><h3>{s.label}</h3><span>{s.term}</span></div><div className="spine-content">{s.content}</div></div></li>)}</ol>;
}

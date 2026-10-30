import type {CSSProperties} from 'react';
import type {PolicyEvent} from '../../lib/atlas-schema';
import {legalStages,stageKey} from '../../lib/policy-process';
import {policyTimeline} from '../../lib/policy-timeline';
import PolicyTimeline from './PolicyTimeline';
import TextPoints,{textPoints} from './TextPoints';

export default function PolicyDetail({event:e,onClose}:{event:PolicyEvent;onClose:()=>void}){
 const stage=legalStages.find(s=>s.id===stageKey(e))!;
 const {framework}=policyTimeline(e);
 const colors:Record<string,string>={agenda:'#ad5118',draft:'#7852b4',debate:'#3066b0',pending:'#987019',effective:'#19745f',guidance:'#607388',case:'#ae4965'};
 const scope=[...new Set([e.appliesTo,e.scope])].flatMap(textPoints);
 const checks=e.policyImplication?.validation||e.deliverable;
 return <section className="drawer policy-detail" role="dialog" aria-modal="true" aria-label="政策详情" style={{'--event-accent':colors[stage.id]} as CSSProperties} onClick={ev=>ev.stopPropagation()}>
  <div className="detail-toolbar"><span>{e.region}</span><button autoFocus className="detail-close" onClick={onClose} aria-label="关闭政策详情">关闭 <span aria-hidden="true">×</span></button></div>
  <div className="policy-body">
   <div className="policy-heading">
    <div className="policy-kicker"><span className="policy-stage">{stage.name}</span><span className={'badge '+e.priority}>{e.priority}</span></div>
    <h2 id="policy-title">{e.title}</h2>
    <div className="detail-dates"><span>事件 <time>{e.eventDate}</time></span><span>核对 <time>{e.checkedAt}</time></span></div>
    <p className="detail-status">{stage.meaning}</p>
   </div>
   <section className="detail-section progress-section"><h3>事件进展</h3><TextPoints text={e.fact}/></section>
   <section className="detail-section live-impact"><h3>直播影响</h3><TextPoints text={e.impact}/><div className="scenario-tags">{e.scenarios.map(s=><span key={s}>{s}</span>)}</div></section>
   <section className="detail-section preparation-section"><h3>当前准备</h3><TextPoints text={e.action}/><div className="detail-checks"><strong>检查重点</strong><TextPoints text={checks}/></div>{checks!==e.deliverable&&<details className="inline-detail"><summary>准备材料</summary><TextPoints text={e.deliverable}/></details>}</section>
   <section className="detail-section implementation-section"><h3>执行安排</h3>
    {(e.effectiveDate||e.deadline)&&<div className="execution-dates">{e.effectiveDate&&<div><span>生效或开始执行</span><strong>{e.effectiveDate}</strong></div>}{e.deadline&&e.deadline!==e.effectiveDate&&<div><span>{e.deadlineType}</span><strong>{e.deadline}</strong></div>}</div>}
    <TextPoints text={framework.gate}/><p className="detail-next"><strong>下一步</strong>{framework.next}</p>
   </section>
   <PolicyTimeline event={e} asOf={e.checkedAt}/>
   <section className="detail-section scope-section"><h3>适用范围</h3><TextPoints items={scope}/><div className="detail-caveat"><strong>仍需核实</strong><TextPoints text={e.uncertainty}/></div></section>
   {e.policyImplication&&<section className="detail-section"><h3>实施考虑</h3><TextPoints text={e.policyImplication.tradeoff}/></section>}
   <div className="detail-reference">
    <details><summary>关注理由</summary><TextPoints text={e.priorityReason}/></details>
    <details><summary>来源记录 <span>{e.evidence.length}</span></summary><p className="reference-law">{e.lawId}</p>{e.evidence.map((v,i)=><div className="reference-source" key={i}><a href={v.url} target="_blank" rel="noreferrer">{v.publisher} ↗</a><p>{v.locator}</p><p>{v.supports}</p><small>{v.access} · 核对 {new Date(v.checkedAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false})}</small></div>)}</details>
    <details><summary>历史记录 <span>{e.history.length}</span></summary><ol className="history-records">{e.history.map((h,i)=><li key={i}><time>{h.date}</time><p>{h.event}</p></li>)}</ol></details>
   </div>
  </div>
 </section>;
}

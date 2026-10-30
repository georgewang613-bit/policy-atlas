import {displayTitle} from '../../lib/display-title';
import type {CSSProperties} from 'react';
import type {PolicyEvent} from '../../lib/atlas-schema';
import {legalStages,stageKey} from '../../lib/policy-process';
import TextPoints from './TextPoints';

export default function FutureRules({events,onOpen}:{events:PolicyEvent[];onOpen:(event:PolicyEvent)=>void}){
 const colors:Record<string,string>={agenda:'#ad5118',draft:'#7852b4',debate:'#3066b0'};
 const rules=events.filter(e=>['agenda','draft','debate'].includes(stageKey(e))).sort((a,b)=>b.eventDate.localeCompare(a.eventDate));
 return <section className="rules-page" aria-label="未来规则"><div className="rules-grid">{rules.map(e=>{
  const stage=legalStages.find(s=>s.id===stageKey(e))!;
  return <article className="rule-card" key={e.id} style={{'--rule-accent':colors[stage.id]} as CSSProperties}>
   <div className="rule-meta"><span>{stage.name}</span><span>{e.region}</span></div>
   <h2><button className="rule-title" onClick={()=>onOpen(e)}>{displayTitle(e.title)}<span aria-hidden="true">↗</span></button></h2>
   <TextPoints className="rule-progress" text={e.fact}/>
   <section className="rule-section rule-impact"><h3>直播影响</h3><TextPoints text={e.impact}/></section>
   <section className="rule-section rule-action"><h3>当前准备</h3><TextPoints text={e.action}/></section>
   <details className="rule-notes"><summary>执行安排</summary>
    <TextPoints text={e.policyImplication?.trigger||'确认最终规则影响的功能和执行日期，再完成法律核对和小范围测试。'}/>
    <h3>实施考虑</h3><TextPoints text={e.policyImplication?.tradeoff||'减少伤害，同时保护正常表达和隐私，并让用户能方便地申诉。'}/>
    <h3>准备材料</h3><TextPoints text={e.deliverable}/>
   </details>
   <footer className="rule-footer"><time dateTime={e.eventDate}>{e.eventDate}</time><button onClick={()=>onOpen(e)}>查看详情 <span aria-hidden="true">→</span></button></footer>
  </article>;
 })}</div></section>;
}

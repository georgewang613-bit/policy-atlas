import {useEffect,useRef,useState} from 'react';
import type {PolicyEvent} from '../../lib/atlas-schema';
import {policyTimeline} from '../../lib/policy-timeline';
import {timelineCaption} from '../../lib/timeline-captions';
import TextPoints from './TextPoints';

export default function PolicyTimeline({event,asOf}:{event:PolicyEvent;asOf:string}){
 const {framework,nodes}=policyTimeline(event);
 const initial=nodes.findIndex(n=>n.date===event.eventDate);
 const [active,setActive]=useState(Math.max(initial,0));
 const track=useRef<HTMLOListElement>(null);
 const index=Math.min(active,nodes.length-1),node=nodes[index];
 useEffect(()=>{
  const list=track.current,selected=list?.children[index] as HTMLElement|undefined;
  if(list&&selected){
   const visible=Math.max(1,Math.floor(list.clientWidth/selected.clientWidth));
   const start=Math.max(0,index-Math.floor(visible/2));
   const first=list.children[start] as HTMLElement;
   list.scrollTo({left:first.offsetLeft-list.offsetLeft,behavior:'auto'});
  }
 },[index]);
 const move=(delta:number)=>setActive(Math.max(0,Math.min(nodes.length-1,index+delta)));
 return <section className="policy-timeline detail-section" aria-label="政策时间线">
  <div className="timeline-heading"><h3>政策时间线</h3><div className="timeline-controls"><button aria-label="上一时间节点" disabled={index===0} onClick={()=>move(-1)}>←</button><span>{index+1} / {nodes.length}</span><button aria-label="下一时间节点" disabled={index===nodes.length-1} onClick={()=>move(1)}>→</button></div></div>
  <ol ref={track} className="timeline-track" onKeyDown={ev=>{if(ev.key==='ArrowRight'||ev.key==='ArrowLeft'){ev.preventDefault();move(ev.key==='ArrowRight'?1:-1);}}}>
   {nodes.map((n,i)=><li key={`${n.date}-${i}`} className={`${n.kind} ${i===index?'chosen':''}`}><button aria-pressed={index===i} onClick={()=>setActive(i)}><span className="timeline-dot" aria-hidden="true"/><time>{n.date||'日期待定'}</time><strong>{timelineCaption(event.id,n)}</strong><small>{!n.date?'待确认':n.date>asOf?'日期未到':n.kind==='window'?'已到截止日':'已记录'}</small></button></li>)}
  </ol>
  <div className={`timeline-detail ${node.kind}`} aria-live="polite"><h4>{timelineCaption(event.id,node)}<time>{node.date||'日期待定'}</time></h4><TextPoints text={node.detail}/><a href={node.source} target="_blank" rel="noreferrer">查看来源 ↗</a></div>
  <details className="timeline-procedure"><summary>当地程序</summary><p>{framework.route}</p></details>
 </section>;
}

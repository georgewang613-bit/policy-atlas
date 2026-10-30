'use client';
import {useState} from 'react';
import type {PolicyEvent} from '../../lib/atlas-schema';
import {policyTimeline} from '../../lib/policy-timeline';
export default function PolicyTimeline({event,asOf}:{event:PolicyEvent;asOf:string}){
 const {framework,nodes}=policyTimeline(event);const [active,setActive]=useState(0);const node=nodes[Math.min(active,nodes.length-1)];
 return <section className="policy-timeline" aria-label="政策时间线"><h3>政策时间线</h3><p className="timeline-route">{framework.route}</p><ol className="timeline-track">{nodes.map((n,i)=><li key={`${n.date}-${i}`} className={`${n.kind} ${i===active?'chosen':''}`}><button aria-pressed={active===i} onClick={()=>setActive(i)}><span className="timeline-dot">{n.kind==='impact'?'⚑':n.kind==='conditional'?'?':i+1}</span><time>{n.date||'日期待定'}</time><strong>{n.label}</strong><small>{!n.date?'待确认':n.date>asOf?'已公布，日期未到':n.kind==='window'?'已公布的截止日':'截至核对日'}</small></button></li>)}</ol><div className="timeline-detail" aria-live="polite"><span className={`timeline-tag ${node.kind}`}>{node.kind==='impact'?'开始执行或完成准备的日期':node.kind==='conditional'?'后续待确认':node.kind==='window'?'截止时间':'已发生的进展'}</span><h4>{node.date||'待确认'} · {node.label}</h4><p>{node.detail}</p><a href={node.source} target="_blank" rel="noreferrer">来源 ↗</a></div><details><summary>完整时间线</summary>{nodes.map((n,i)=><p key={i}><b>{n.date||'待定'} · {n.label}</b><br/>{n.detail} <a href={n.source} target="_blank" rel="noreferrer">来源 ↗</a></p>)}</details></section>;
}

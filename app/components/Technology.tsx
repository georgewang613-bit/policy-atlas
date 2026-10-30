import {useEffect,useRef,useState,type CSSProperties} from 'react';
import data from '../../data/technology.json';
import TextPoints from './TextPoints';
import SelectField from './SelectField';
import {organizationNames} from '../../lib/organizations';

type Update=typeof data.items[number];
const directions:Record<string,{color:string;icon:string}>={
 '审核模型':{color:'#42658d',icon:'scan'},'评测研究':{color:'#85623b',icon:'chart'},'来源验证':{color:'#6d568d',icon:'check'},
 '平台实践':{color:'#396d62',icon:'layers'},'音频处理':{color:'#a35d4f',icon:'audio'},'匹配工具':{color:'#627447',icon:'match'},'年龄识别':{color:'#2c7975',icon:'person'},
};
function DirectionIcon({kind}:{kind:string}){
 const path:Record<string,string>={scan:'M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5M8 12h8',chart:'M5 19V9m7 10V5m7 14v-7',check:'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3m-4 9 3 3 5-6',layers:'m3 8 9-5 9 5-9 5-9-5m0 5 9 5 9-5m-18 5 9 5 9-5',audio:'M3 10v4m4-8v12m5-15v18m5-15v12m4-8v4',match:'M4 4h7v7H4zm9 9h7v7h-7zM15 5h4v4M5 15v4h4',person:'M9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0m-4 13v-3c0-6 14-6 14 0v3'};
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path[kind]||path.scan}/></svg>;
}
export default function Technology(){
 const [category,setCategory]=useState('全部'),[query,setQuery]=useState(''),[selected,setSelected]=useState<Update|null>(null);
 const heading=useRef<HTMLHeadingElement>(null),previous=useRef<string|null>(null),buttons=useRef(new Map<string,HTMLButtonElement>());
 useEffect(()=>{if(selected)heading.current?.focus();else if(previous.current)buttons.current.get(previous.current)?.focus();},[selected]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setSelected(null);};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[]);
 const open=(item:Update)=>{previous.current=item.id;setSelected(item);};
 const items=data.items.filter(x=>(category==='全部'||x.category===category)&&(JSON.stringify(x)+organizationNames(JSON.stringify(x),false)).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));
 if(selected){const accent=directions[selected.category]||directions['审核模型'];return <article className="update-detail tech-detail" style={{'--tech-accent':accent.color} as CSSProperties}>
  <button className="text-button" onClick={()=>setSelected(null)}>← 返回列表</button>
  <div className="tech-detail-heading"><span className="tech-category">{selected.category}</span><h2 ref={heading} tabIndex={-1}>{selected.title}</h2><p className="tech-status">{selected.status}</p><div className="detail-meta"><span>{selected.publishedAt?'发布 / 修订 '+selected.publishedAt:'发布日期未列'}</span><span>核对 {selected.checkedAt}</span></div><p className="tech-version">{selected.version}</p></div>
  <p className="tech-detail-conclusion">{organizationNames(selected.conclusion)}</p>
  <section><h3>研究进展</h3><TextPoints text={selected.fact}/></section>
  <section><h3>直播应用</h3><TextPoints text={selected.liveUse}/></section>
  <section><h3>试用建议</h3><TextPoints text={selected.nextStep}/></section>
  <section><h3>评估指标</h3><TextPoints text={selected.measure}/></section>
  <section><h3>使用限制</h3><TextPoints text={selected.limits}/></section>
  <section className="update-sources"><h3>参考来源</h3>{selected.sources.map(s=><p key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{organizationNames(s.publisher)} ↗</a><small>{s.locator}</small></p>)}</section>
 </article>;}
 return <section className="technology technology-overview" aria-label="技术动态">
  <div className="tech-filters"><SelectField label="技术方向" value={category} onChange={setCategory} options={[{value:"全部",label:"全部方向"},...Array.from(new Set(data.items.map(x=>x.category)))]}/><input aria-label="搜索技术" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索技术或场景"/><span role="status">{items.length} 条动态</span></div>
  <div className="tech-grid">{items.map(x=>{const accent=directions[x.category]||directions['审核模型'];return <article className="tech-card" key={x.id} style={{'--tech-accent':accent.color} as CSSProperties}>
   <div className="tech-card-top"><span className="tech-category"><DirectionIcon kind={accent.icon}/>{x.category}</span><span className="tech-status">{x.status}</span></div>
   <h2><button className="update-title" ref={el=>{if(el)buttons.current.set(x.id,el);else buttons.current.delete(x.id);}} onClick={()=>open(x)}>{x.title}<span aria-hidden="true">↗</span></button></h2>
   <p className="tech-card-conclusion">{organizationNames(x.conclusion)}</p>
   <TextPoints className="tech-card-facts" text={x.fact}/>
   <div className="tech-use"><span>直播应用</span><p>{organizationNames(x.liveUse)}</p></div>
   <div className="tech-card-footer"><time dateTime={x.publishedAt||undefined}>{x.publishedAt||'发布日期未列'}</time><span>{organizationNames(x.sources[0].publisher,false)} · {x.sources.length} 项来源</span></div>
  </article>;})}</div>
  {items.length===0&&<div className="empty"><p>没有匹配结果</p><button onClick={()=>{setCategory('全部');setQuery('');}}>清除筛选</button></div>}
 </section>;
}

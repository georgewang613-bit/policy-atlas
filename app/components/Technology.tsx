import {useEffect,useRef,useState} from 'react';
import data from '../../data/technology.json';

type Update=typeof data.items[number];

export default function Technology(){
 const [category,setCategory]=useState('全部'),[query,setQuery]=useState(''),[selected,setSelected]=useState<Update|null>(null);
 const heading=useRef<HTMLHeadingElement>(null);
 const previous=useRef<string|null>(null);
 const buttons=useRef(new Map<string,HTMLButtonElement>());
 useEffect(()=>{
  if(selected)heading.current?.focus();
  else if(previous.current)buttons.current.get(previous.current)?.focus();
 },[selected]);
 const close=()=>setSelected(null);
 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();};
  document.addEventListener('keydown',key);
  return()=>document.removeEventListener('keydown',key);
 },[]);
 const items=data.items.filter(x=>(category==='全部'||x.category===category)&&JSON.stringify(x).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));

 if(selected)return <article className="update-detail">
  <button className="text-button" onClick={close}>← 返回列表</button>
  <p className="update-meta">{selected.category} · {selected.status}</p>
  <h2 ref={heading} tabIndex={-1}>{selected.title}</h2>
  <div className="update-meta detail-meta">
   <span>{selected.publishedAt?'发布 / 修订 '+selected.publishedAt:'发布日期未列'}</span>
   <span>{selected.version}</span>
   <span>核验 {selected.checkedAt}</span>
  </div>
  <div className="update-conclusion"><p>{selected.conclusion}</p></div>
  <section><h3>进展</h3><p>{selected.fact}</p></section>
  <section><h3>直播用途</h3><p>{selected.liveUse}</p></section>
  <section>
   <h3>试用建议</h3><p>{selected.nextStep}</p>
   <dl className="update-facts">
    <div><dt>关注指标</dt><dd>{selected.measure}</dd></div>
    <div><dt>适用边界</dt><dd>{selected.limits}</dd></div>
   </dl>
  </section>
  <section className="update-sources"><h3>来源</h3>{selected.sources.map(s=><p key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.publisher} ↗</a><small>{s.locator}</small></p>)}</section>
 </article>;

 return <section className="technology" aria-label="技术动态">
  <div className="tech-filters">
   <select aria-label="技术方向" value={category} onChange={e=>setCategory(e.target.value)}>{['全部',...new Set(data.items.map(x=>x.category))].map(x=><option key={x} value={x}>{x==='全部'?'全部方向':x}</option>)}</select>
   <input aria-label="搜索技术" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索方案或场景"/>
   <span role="status">{items.length} 条</span>
  </div>
  <div className="update-list">{items.map(x=><article className="update-row" key={x.id}>
   <div className="update-meta"><time dateTime={x.publishedAt||undefined}>{x.publishedAt||'持续参考'}</time><span>{x.category}</span></div>
   <div className="update-content">
    <h2><button className="update-title" ref={el=>{if(el)buttons.current.set(x.id,el);else buttons.current.delete(x.id);}} onClick={()=>{previous.current=x.id;setSelected(x);}}>{x.title}</button></h2>
    <p className="update-takeaway">{x.conclusion}</p>
    <small>{x.status}</small>
   </div>
  </article>)}</div>
  {items.length===0&&<div className="empty"><p>没有匹配结果</p><button onClick={()=>{setCategory('全部');setQuery('');}}>清除筛选</button></div>}
 </section>;
}

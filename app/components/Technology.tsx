import {Scan,ChartBar,Fingerprint,Stack,Waveform,Intersect,UserCircle,Lightbulb} from '@phosphor-icons/react';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import data from '../../data/technology.json';
import TextPoints from './TextPoints';
import SelectField from './SelectField';
import {organizationNames} from '../../lib/organizations';

type Update=typeof data.items[number];
const directions:Record<string,{color:string;icon:string}>={
 '多模态审核':{color:'#42658d',icon:'scan'},'安全评测':{color:'#85623b',icon:'chart'},
 '审核模型':{color:'#42658d',icon:'scan'},'评测研究':{color:'#85623b',icon:'chart'},'来源验证':{color:'#6d568d',icon:'check'},
 '平台实践':{color:'#396d62',icon:'layers'},'音频处理':{color:'#a35d4f',icon:'audio'},'匹配工具':{color:'#627447',icon:'match'},'年龄识别':{color:'#2c7975',icon:'person'},
};
function DirectionIcon({kind}:{kind:string}){
 const icons:any={scan:Scan,chart:ChartBar,check:Fingerprint,layers:Stack,audio:Waveform,match:Intersect,person:UserCircle};const Icon=icons[kind]||Scan;
 return <Icon size={22} weight="regular" aria-hidden="true"/>;
}
export default function Technology(){
 const [category,setCategory]=useState('全部'),[query,setQuery]=useState(''),[selected,setSelected]=useState<Update|null>(null),[answer,setAnswer]=useState('');
 const heading=useRef<HTMLHeadingElement>(null),previous=useRef<string|null>(null),buttons=useRef(new Map<string,HTMLButtonElement>());
 useEffect(()=>{if(selected)heading.current?.focus();else if(previous.current)buttons.current.get(previous.current)?.focus();},[selected]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setSelected(null);};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[]);
 const open=(item:Update)=>{previous.current=item.id;setSelected(item);};
 const items=data.items.filter(x=>(category==='全部'||x.category===category)&&(JSON.stringify(x)+organizationNames(JSON.stringify(x),false)).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));
 if(selected){const accent=directions[selected.category]||directions['审核模型'];return <article className="update-detail tech-detail" style={{'--tech-accent':accent.color} as CSSProperties}>
  <button className="text-button" onClick={()=>setSelected(null)}>← 返回列表</button>
  <div className="tech-detail-heading"><span className="tech-category"><DirectionIcon kind={accent.icon}/>{selected.category}</span><h2 ref={heading} tabIndex={-1}>{selected.title}</h2><p className="tech-status">{selected.status}</p><div className="detail-meta"><span>{selected.publishedAt?'发布 / 修订 '+selected.publishedAt:'发布日期未列'}</span><span>核对 {selected.checkedAt}</span></div><p className="tech-version">{selected.version}</p></div>
  <p className="tech-detail-conclusion">{organizationNames(selected.conclusion)}</p>
  <section><h3>研究进展</h3><TextPoints text={selected.fact}/></section>
  <section><h3>LIVE application</h3>{selected.analysisUpdatedAt&&<p className="practice-muted">分析修订 {selected.analysisUpdatedAt} · 不代表来源重新核对</p>}<TextPoints text={selected.liveUse}/></section>
  <section><h3>试用</h3><TextPoints text={selected.nextStep}/></section>
  <section><h3>Evaluation · 如何验证</h3><TextPoints text={selected.measure}/></section>
  <section><h3>Limitations</h3><TextPoints text={selected.limits}/></section>
  <section className="update-sources"><h3>参考来源</h3>{selected.sources.map(s=><p key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{organizationNames(s.publisher)} ↗</a><small>{s.locator}</small></p>)}</section>
 </article>;}
 return <section className="technology technology-overview" aria-label="技术动态">
  <details className="tech-challenge"><summary><Lightbulb size={20}/>一分钟工具题：匹配到旧视频，就能认定冒充现场吗？</summary><div className="challenge-options">{['可以直接认定','先核对原片与实时声明'].map(x=><button aria-pressed={answer===x} key={x} onClick={()=>setAnswer(x)}>{x}</button>)}</div>{answer&&<p role="status">{answer==='先核对原片与实时声明'?'这条思路保留了证据边界。':'还差一步：相似度不是事实结论。'} Provenance matching 提供线索；还需核实拍摄时间、地点和 Creator 的完整表述。</p>}<button className="inline-link" onClick={()=>{setCategory('来源验证');setQuery('');}}>查看来源验证工具 →</button></details><div className="tech-filters"><SelectField label="技术方向" value={category} onChange={setCategory} options={[{value:"全部",label:"全部方向"},...Array.from(new Set(data.items.map(x=>x.category)))]}/><input aria-label="搜索技术" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索技术或场景"/><span role="status">{items.length} 条动态</span></div>
  <div className="tech-grid">{items.map(x=>{const accent=directions[x.category]||directions['审核模型'];return <article className="tech-card" key={x.id} style={{'--tech-accent':accent.color} as CSSProperties}>
   <div className="tech-card-top"><span className="tech-category"><DirectionIcon kind={accent.icon}/>{x.category}</span><span className="tech-status">{x.status}</span></div>
   <h2><button className="update-title" ref={el=>{if(el)buttons.current.set(x.id,el);else buttons.current.delete(x.id);}} onClick={()=>open(x)}>{x.title}<span aria-hidden="true">↗</span></button></h2>
   <p className="tech-card-conclusion">{organizationNames(x.conclusion)}</p>
   <details className="tech-facts-disclosure"><summary>研究细节</summary><TextPoints className="tech-card-facts" text={x.fact}/></details>
   <div className="tech-use"><span>LIVE application · 直播应用</span><TextPoints text={x.liveUse}/></div>
   <div className="tech-card-footer"><time dateTime={x.publishedAt||undefined}>{x.publishedAt||'发布日期未列'}</time><span>{organizationNames(x.sources[0].publisher,false)} · {x.sources.length} 项来源</span></div>
  </article>;})}</div>
  {items.length===0&&<div className="empty"><p>没有匹配结果</p><button onClick={()=>{setCategory('全部');setQuery('');}}>清除筛选</button></div>}
 </section>;
}

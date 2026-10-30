import {useEffect,useId,useRef,useState,type CSSProperties,type KeyboardEvent} from 'react';
import {createPortal} from 'react-dom';

type Choice=string|{value:string;label:string};
type Position={left:number;width:number;maxHeight:number;top?:number;bottom?:number;origin:'top'|'bottom'};

export default function SelectField({label,value,options,onChange}:{label:string;value:string;options:Choice[];onChange:(value:string)=>void}){
 const choices=options.map(option=>typeof option==='string'?{value:option,label:option}:option);
 const selected=Math.max(0,choices.findIndex(option=>option.value===value));
 const [open,setOpen]=useState(false),[active,setActive]=useState(selected),[position,setPosition]=useState<Position|null>(null);
 const trigger=useRef<HTMLButtonElement>(null),menu=useRef<HTMLDivElement>(null),typed=useRef({text:'',at:0});
 const anchor=useRef({top:0,left:0});
 const id=useId();
 const show=()=>{
  const rect=trigger.current!.getBoundingClientRect(),height=window.innerHeight;
  anchor.current={top:rect.top,left:rect.left};
  const above=rect.top-12,below=height-rect.bottom-12,up=below<200&&above>below;
  const width=Math.min(rect.width,window.innerWidth-16);
  setPosition({left:Math.max(8,Math.min(rect.left,window.innerWidth-width-8)),width,maxHeight:Math.max(40,Math.min(288,up?above:below)),...(up?{bottom:height-rect.top+6}:{top:rect.bottom+6}),origin:up?'bottom':'top'});
  setActive(selected);setOpen(true);
 };
 const choose=(index:number)=>{onChange(choices[index].value);setOpen(false);trigger.current?.focus({preventScroll:true});};
 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{const target=event.target as Node;if(!trigger.current?.contains(target)&&!menu.current?.contains(target))setOpen(false);};
  const scroll=(event:Event)=>{
   if(menu.current?.contains(event.target as Node))return;
   const rect=trigger.current?.getBoundingClientRect();
   if(rect&&(Math.abs(rect.top-anchor.current.top)>1||Math.abs(rect.left-anchor.current.left)>1))setOpen(false);
  };
  const resize=()=>setOpen(false);
  document.addEventListener('pointerdown',outside);document.addEventListener('scroll',scroll,true);window.addEventListener('resize',resize);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('scroll',scroll,true);window.removeEventListener('resize',resize);};
 },[open]);
 useEffect(()=>{
  if(!open)return;
  const list=menu.current,item=list?.children[active] as HTMLElement|undefined;
  if(list&&item){if(item.offsetTop<list.scrollTop)list.scrollTop=item.offsetTop;else if(item.offsetTop+item.offsetHeight>list.scrollTop+list.clientHeight)list.scrollTop=item.offsetTop+item.offsetHeight-list.clientHeight;}
 },[open,active]);
 const keyDown=(event:KeyboardEvent<HTMLButtonElement>)=>{
  const key=event.key;
  if(key==='Escape'&&open){event.preventDefault();event.stopPropagation();setOpen(false);return;}
  if(key==='Tab'){setOpen(false);return;}
  if(['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(key)){
   event.preventDefault();
   if(!open){show();if(key==='Home')setActive(0);if(key==='End')setActive(choices.length-1);return;}
   if(key==='Enter'||key===' ')choose(active);
   else if(key==='Home')setActive(0);
   else if(key==='End')setActive(choices.length-1);
   else setActive(index=>Math.max(0,Math.min(choices.length-1,index+(key==='ArrowDown'?1:-1))));
   return;
  }
  if(key.length===1&&!event.ctrlKey&&!event.metaKey&&!event.altKey){
   const now=Date.now();typed.current={text:now-typed.current.at<700?typed.current.text+key:key,at:now};
   const index=choices.findIndex(option=>option.label.toLocaleLowerCase().startsWith(typed.current.text.toLocaleLowerCase()));
   if(index>=0){event.preventDefault();if(!open)show();setActive(index);}
  }
 };
 return <>
  <button ref={trigger} type="button" role="combobox" className="select-field" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={open?id:undefined} aria-activedescendant={open?`${id}-${active}`:undefined} onKeyDown={keyDown} onClick={()=>open?setOpen(false):show()} onBlur={()=>setOpen(false)}>
   <span>{choices[selected]?.label||value}</span><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </button>
  {open&&position&&createPortal(<div ref={menu} id={id} role="listbox" aria-label={label} className="select-menu" style={{left:position.left,width:position.width,maxHeight:position.maxHeight,top:position.top,bottom:position.bottom,'--menu-origin':position.origin} as CSSProperties} onMouseDown={event=>event.preventDefault()}>
   {choices.map((option,index)=><div key={option.value} id={`${id}-${index}`} role="option" aria-selected={option.value===value} className={`select-option ${index===active?'is-active':''}`} onPointerMove={()=>setActive(index)} onClick={()=>choose(index)}><span>{option.label}</span><span className="select-check" aria-hidden="true">{option.value===value?'✓':''}</span></div>)}
  </div>,document.body)}
 </>;
}

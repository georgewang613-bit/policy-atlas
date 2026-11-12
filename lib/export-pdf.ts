import {caseAssessment,departmentBrief,meetingSummary,casePlans,decisionAxes,executionTasks} from '../data/case-briefing.mjs';
import {liveContext,LMG_URL,VIRTUAL_URL} from '../data/live-context.mjs';
import {launchDays} from '../data/policy-owner.mjs';
type Block={title:string;lines:string[]};
const ink='#161823',muted='#5e6b76',cyan='#007b78',pink='#fe2c55';
// Rasterized at 2.5x to preserve CJK rendering on every browser without remote fonts.
export async function exportPdf(filename:string,title:string,subtitle:string,blocks:Block[]){
 await document.fonts.ready;
 const pages:HTMLCanvasElement[]=[];let canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,y=0;
 const font=(size:number,weight=400)=>`${weight} ${size}px "TikTok Sans", "PingFang SC", "Microsoft YaHei", sans-serif`;
 const newPage=()=>{canvas=document.createElement('canvas');canvas.width=1488;canvas.height=2105;ctx=canvas.getContext('2d')!;ctx.scale(2.5,2.5);ctx.fillStyle='#fff';ctx.fillRect(0,0,595.2,842);ctx.font=font(20,800);ctx.fillStyle=ink;ctx.fillText('Policy Atlas',42,43);ctx.fillStyle='#25f4ee';ctx.fillRect(42,55,38,3);ctx.fillStyle=pink;ctx.fillRect(80,55,12,3);pages.push(canvas);y=86;};
 const need=(h:number)=>{if(y+h>786)newPage();};
 const lines=(text:string,width=511)=>{const out:string[]=[];let row='';for(const word of text.match(/[A-Za-z0-9_:/.-]+|\s+|[^\x00-\x7F]|./gu)||[]){if(ctx.measureText(row+word).width>width&&row){out.push(row.trim());row='';}if(ctx.measureText(word).width>width){for(const char of word){if(ctx.measureText(row+char).width>width){out.push(row);row='';}row+=char;}}else row+=word;}if(row.trim())out.push(row.trim());return out;};
 const text=(value:string,size=11,color=ink,weight=400,indent=0)=>{ctx.font=font(size,weight);const rows=value.split("\n").flatMap(part=>lines(part,511-indent));for(const row of rows){need(size*1.7);ctx.font=font(size,weight);ctx.fillStyle=color;ctx.fillText(row,42+indent,y);y+=size*1.7;}};
 newPage();text(title,23,ink,700);y+=7;text(subtitle,10,muted);y+=20;
 for(const block of blocks){ctx.font=font(11);const height=52+block.lines.reduce((sum,line)=>sum+line.split('\n').reduce((n,part)=>n+lines(part).length*18.7,0)+9,0);need(Math.min(height,690));ctx.fillStyle='#e1f8f6';ctx.fillRect(42,y-14,511,27);text(block.title,13,cyan,650,10);y+=14;for(const line of block.lines){text(line,11,ink,400);y+=9;}y+=12;}
 pages.forEach((p,i)=>{const c=p.getContext('2d')!;c.fillStyle='#dce4e8';c.fillRect(42,803,511,1);c.font=font(9);c.fillStyle=muted;c.fillText('Policy Atlas · Demo',42,822);c.textAlign='right';c.fillText(`${i+1} / ${pages.length}`,553,822);c.textAlign='left';});
 const bytes=(s:string)=>new TextEncoder().encode(s),parts:Uint8Array[]=[],offsets:number[]=[0];let offset=0;
 const push=(b:Uint8Array)=>{parts.push(b);offset+=b.length;};
 const object=(id:number,head:string,body?:Uint8Array)=>{offsets[id]=offset;push(bytes(`${id} 0 obj\n${head}`));if(body){push(bytes('\nstream\n'));push(body);push(bytes('\nendstream'));}push(bytes('\nendobj\n'));};
 push(bytes('%PDF-1.4\n'));
 object(1,'<< /Type /Catalog /Pages 2 0 R >>');
 object(2,`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`);
 pages.forEach((p,i)=>{const page=3+i*3,img=page+1,content=page+2;const data=Uint8Array.from(atob(p.toDataURL('image/jpeg',.94).split(',')[1]),c=>c.charCodeAt(0));object(page,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.2 842] /Resources << /XObject << /Im${i} ${img} 0 R >> >> /Contents ${content} 0 R >>`);object(img,`<< /Type /XObject /Subtype /Image /Width 1488 /Height 2105 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${data.length} >>`,data);const draw=bytes(`q 595.2 0 0 842 0 0 cm /Im${i} Do Q`);object(content,`<< /Length ${draw.length} >>`,draw);});
 const xref=offset,count=3+pages.length*3;push(bytes(`xref\n0 ${count}\n0000000000 65535 f \n${offsets.slice(1).map(o=>`${String(o).padStart(10,'0')} 00000 n \n`).join('')}trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`));
 const url=URL.createObjectURL(new Blob(parts as BlobPart[],{type:'application/pdf'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
export function exportCasePdf(item:any,evidence:any[],decisions:any,reason:string,team:string[],opinions:any,context:string,at=600,variant=false){
 const a=caseAssessment(item,evidence),c=liveContext(item,variant,at);
 const blocks:Block[]=[{title:'LIVE / Gifting',lines:[`${c.viewers.toLocaleString()} Viewers · ${c.giftCount} Gifts · ${c.gifters} Gifters · ${c.coinsUsed} Coins`,c.purpose]},{title:'决定',lines:[...decisionAxes.map(axis=>`${axis.label}：${decisions[axis.id]}`),`理由：${reason||'未填写'}`]},{title:'行为和潜在伤害',lines:[...a.facts.map((f:any)=>`${f.status} · ${f.label}：${f.text}`),`潜在伤害：${a.harms.join(' / ')}`]},{title:'风险预评估',lines:a.risks.map((r:any)=>`${r.label}：${r.value} — ${r.note}`)},{title:'现场证据',lines:evidence.map(e=>`${e.id} · ${Math.floor(e.at/60)}:${String(e.at%60).padStart(2,'0')}  ${e.text}`)}];
 const received=team.filter(id=>opinions[id]?.context===context);
 for(const id of received){const o=opinions[id],b=departmentBrief(id,item,o);blocks.push({title:o.department,lines:[b.need,...b.actions.map((x:string)=>`• ${x}`)]});}
 const summary=meetingSummary(item,team,opinions,context);if(summary.length)blocks.push({title:'会议纪要',lines:[...summary.flatMap((g:any)=>g.items.map((x:string)=>`${g.title} · ${x}`)),`待核实：${item.known}`]});
 const tasks=executionTasks(item);blocks.push({title:'执行计划',lines:launchDays.map((d,i)=>`${d.day} · ${d.title} · ${d.owner}\n${tasks[i]}`)});
 blocks.push({title:'Policy basis',lines:[...c.topics.map((t:any)=>t.term),LMG_URL,VIRTUAL_URL]});
 return exportPdf(`${item.id}-Policy-Atlas.pdf`,item.title,`${item.city} · ${item.id} · 研判简报`,blocks);
}
export function exportPolicyPdf(brief:string,events:any[]){return exportPdf('Policy-Atlas-政策简报.pdf','政策简报',`${events.length} 条政策事件 · 当前筛选范围`,[{title:'本期重点',lines:[brief]},...events.map(e=>({title:`${e.priority} · ${e.region} · ${e.title}`,lines:[e.fact,`事件 ${e.eventDate} · 核对 ${e.checkedAt}`,...(e.sources||[]).map((s:any)=>`${s.publisher||s.title||'来源'} · ${s.url}`)]}))]);}

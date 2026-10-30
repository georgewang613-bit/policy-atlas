import {organizationNames} from '../../lib/organizations';

export function textPoints(text:string){
 return text.split(/[。；]+(?![”’」』])/).map(s=>s.trim()).filter(Boolean);
}
export default function TextPoints({text,items,className=''}:{text?:string;items?:string[];className?:string}){
 const points=[...new Set((items?organizationNames(items.join('\u0000')).split('\u0000'):textPoints(organizationNames(text||''))).filter(Boolean))];
 return <ul className={`text-points ${className}`}>{points.map((point,i)=><li key={i}>{point.replace(/[。；]$/,'')}。</li>)}</ul>;
}

import captions from '../data/timeline-captions.json';
import type {TimelineNode} from './policy-timeline';
const saved=captions as Record<string,{label:string;detail:string}>;
export function timelineCaption(id:string,node:TimelineNode){
 const entry=saved[`${id}|${node.date===null?'None':node.date}|${node.kind}`];
 // Only reuse an editorial caption while the underlying evidence text still matches.
 if(entry?.detail===node.detail)return entry.label;
 if(node.kind==='conditional')return '后续安排待定';
 if(!['此前进展','本次进展'].includes(node.label))return node.label;
 const first=node.detail.split(/[。；，：]/)[0];
 return first.length>14?`${first.slice(0,14)}…`:first;
}

import {launchDays} from '../../data/policy-owner.mjs';
import {executionTasks} from '../../data/case-briefing.mjs';
export default function ExecutionTimeline({item}:any){const tasks=executionTasks(item);return <section className="execution-timeline"><h2>执行计划</h2><ol>{launchDays.map((d,i)=><li key={d.day}><span className="timeline-day">{d.day}</span><h3>{d.title}</h3><p>{tasks[i]}</p><small>{d.owner}</small></li>)}</ol></section>}

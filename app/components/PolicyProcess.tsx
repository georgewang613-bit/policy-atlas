import type {PolicyEvent} from '../../lib/atlas-schema';
import {stageKey,legalStages} from '../../lib/policy-process';
import {policyTimeline} from '../../lib/policy-timeline';
export function PolicyStageSummary({event:e}:{event:PolicyEvent}){const {framework}=policyTimeline(e);const stage=legalStages.find(s=>s.id===stageKey(e))!;return <section className="stage-summary"><h3>当前准备</h3><dl><div><dt>当前阶段</dt><dd>{stage.name} · {stage.meaning}</dd></div><div><dt>直播场景</dt><dd className="tags">{e.scenarios.map(s=><span key={s}>{s}</span>)}</dd></div><div><dt>准备事项</dt><dd>{e.action}</dd></div><div><dt>执行安排</dt><dd>{framework.gate}</dd></div><div><dt>后续进展</dt><dd>{framework.next}</dd></div></dl></section>}

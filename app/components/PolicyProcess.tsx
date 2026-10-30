import type {PolicyEvent} from '../../lib/atlas-schema';
import {stageKey,legalStages} from '../../lib/policy-process';
import {policyTimeline} from '../../lib/policy-timeline';
export function PolicyStageSummary({event:e}:{event:PolicyEvent}){const {framework}=policyTimeline(e);const stage=legalStages.find(s=>s.id===stageKey(e))!;return <section className="stage-summary"><h3>现在怎么做</h3><dl><div><dt>当前阶段</dt><dd>{stage.name} · {stage.meaning}</dd></div><div><dt>直播场景</dt><dd className="tags">{e.scenarios.map(s=><span key={s}>{s}</span>)}</dd></div><div><dt>现在准备什么</dt><dd>{e.action}</dd></div><div><dt>什么时候开始执行</dt><dd>{framework.gate}</dd></div><div><dt>接下来关注什么</dt><dd>{framework.next}</dd></div></dl></section>}

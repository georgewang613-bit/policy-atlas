import {useId, useState} from 'react';
import {alertLevels, alertScenarios, replayLiveAlert} from '../../data/live-alerts.mjs';
import '../live-alerts.css';

type RuleId = keyof typeof alertScenarios;
type Position = {stage: number; alternate: boolean};
const stages = ['开场', '出现线索', '补充证据'];
const clock = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export default function LiveEarlyWarning({ruleId}: {ruleId: RuleId}) {
  const [positions, setPositions] = useState<Partial<Record<RuleId, Position>>>({});
  const {stage, alternate} = positions[ruleId] ?? {stage: 1, alternate: false};
  const select = (next: Position) => setPositions(previous => ({...previous, [ruleId]: next}));
  const titleId = useId();
  const scenario = alertScenarios[ruleId];
  const times = [scenario.opening.at, scenario.cue.at, scenario.corroboration.at];
  const {evidence, level, advice} = replayLiveAlert(ruleId, times[stage], alternate);

  return <section className="live-alert-replay" aria-labelledby={titleId}>
    <div className="live-alert-heading">
      <h2 id={titleId}>预警推演</h2>
      <span>模拟直播回放</span>
    </div>
    <h3 className="live-alert-question">{scenario.title}</h3>
    <div className="live-alert-stages" role="group" aria-label="选择回放时点">
      {stages.map((name, index) =>
        <button key={name} type="button" aria-pressed={stage === index} onClick={() => select({stage: index, alternate})}>
          <time>{clock(times[index])}</time><span>{name}</span>
        </button>
      )}
    </div>
    {stage === 2 && <div className="live-alert-branches" role="group" aria-label="比较同一时点的两份复核材料">
      <span>复核材料</span>
      <button type="button" aria-pressed={!alternate} onClick={() => select({stage, alternate: false})}>材料 A</button>
      <button type="button" aria-pressed={alternate} onClick={() => select({stage, alternate: true})}>材料 B</button>
    </div>}
    <div className="live-alert-body">
      <ol aria-label="截至此刻的证据" className="live-alert-evidence">
        {evidence.map(observation =>
          <li key={observation.at}>
            <div><time>{clock(observation.at)}</time><span>{observation.source}</span></div>
            <p>{observation.text}</p>
          </li>
        )}
      </ol>
      <div className="live-alert-advice" data-level={level} aria-live="polite" aria-atomic="true">
        <strong>{alertLevels[level]}</strong>
        <p>{advice}</p>
      </div>
    </div>
  </section>;
}

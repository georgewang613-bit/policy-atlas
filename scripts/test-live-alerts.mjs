import assert from 'node:assert/strict';
import {alertScenarios, assessLiveAlert, replayLiveAlert} from '../data/live-alerts.mjs';

for (const [id, scenario] of Object.entries(alertScenarios)) {
  const {opening, cue, corroboration, clarification} = scenario;
  assert.ok(opening.at < cue.at && cue.at < corroboration.at);
  assert.equal(corroboration.at, clarification.at);

  for (const at of [opening.at, cue.at - 1, cue.at, corroboration.at - 1]) {
    const snapshot = replayLiveAlert(id, at);
    assert.deepEqual(snapshot, replayLiveAlert(id, at, true), id + ' leaked a future branch');
    assert.ok(snapshot.evidence.every(item => item.at <= at));
    assert.equal(snapshot.level, at >= cue.at ? 'check' : 'observe');
  }

  const escalated = replayLiveAlert(id, corroboration.at);
  const cleared = replayLiveAlert(id, clarification.at, true);
  assert.equal(escalated.level, 'escalate');
  assert.equal(cleared.level, 'clear');
  assert.ok(!escalated.evidence.includes(clarification) && !cleared.evidence.includes(corroboration));
  assert.equal(assessLiveAlert(scenario, [cue, cue]), 'check');
  assert.equal(assessLiveAlert(scenario, [corroboration]), 'observe');
}
console.log('Verified LIVE warning timelines, corroboration, counterevidence and rewind across four policy areas.');

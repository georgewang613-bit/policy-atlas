import assert from 'node:assert/strict';
import {incidents,caseEvidence} from '../data/live-demo.mjs';
import {evidenceDossier,executionMissions} from '../data/case-exercises.mjs';
for(const item of incidents)for(const variant of [false,true])for(const at of [0,item.at,600]){
 const evidence=caseEvidence(item,variant,at),rows=evidenceDossier(item,evidence,variant,at);
 assert(rows.length);
 for(const row of rows){
  assert(row.harm&&row.source&&row.checks.length,`${item.id}: rule without harm, source or criteria`);
  for(const check of row.checks){
   assert(check.records.every(e=>e.at<=at&&evidence.some(v=>v.id===e.id&&v.text===e.text)),'Evidence must match the active replay and variant');
   if(!check.records.length)assert.equal(check.status,'缺少证据');
  }
 }
 assert.equal(executionMissions(item).length,5);
}
const la=incidents[0];
const bait=evidenceDossier(la,caseEvidence(la,true,600),true,600).find(r=>r.topic==='bait');
assert(bait.assessment.includes('不能据此排除'));
assert.equal(bait.checks[0].status,'线索支持','Unreceived Gift must not erase a conditional request');
assert.equal(bait.checks[1].status,'缺少证据');
console.log('8 cases: replay cutoff, baseline / variant evidence mapping and execution coverage passed.');

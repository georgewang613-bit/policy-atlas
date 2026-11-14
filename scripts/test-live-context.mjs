import assert from 'node:assert/strict';
import {incidents,streams,caseEvidence} from '../data/live-demo.mjs';
import {liveContext,policyContext} from '../data/live-context.mjs';
for(const item of [...incidents,...streams])for(const at of [0,24,180,600]){
 const c=liveContext(item,false,at);
 assert(c.events.every(e=>e.at<=at));
 assert.equal(c.giftCount,c.events.reduce((s,e)=>s+e.quantity,0));
 assert.equal(c.coinsUsed,c.events.reduce((s,e)=>s+e.quantity*e.coins,0));
 const initial=liveContext(item,false,0);
 assert.equal(c.diamonds,initial.diamonds,'Gift events must not convert to historical Diamonds');
 assert.equal(c.rewards,initial.rewards,'Gift totals must not grant Rewards eligibility');
 if(!item.evidence){assert.equal(c.diamonds,'未提供');assert.equal(c.rewards,'未评估');}
 assert(c.creator&&c.topics.length&&c.location);
}
const la=incidents[0],base=liveContext(la,false,180),changed=liveContext(la,true,180);
assert.equal(base.coinsUsed-changed.coinsUsed,100);
assert(!changed.events.some(e=>e.id==='G2'));
assert(caseEvidence(la,true,180).find(e=>e.id==='E2').text.includes('尚未'));
assert(policyContext(incidents[2],false,180).topics.some(x=>x.term==='Creator responsibility for LIVE sessions'));
assert(incidents.every(i=>!/[\u4e00-\u9fff]/.test(i.city)));
console.log('128 LIVE details: replay cutoff, Gift totals, Coins, historical Diamonds / unconfirmed Rewards, variant consistency and policy mapping passed.');

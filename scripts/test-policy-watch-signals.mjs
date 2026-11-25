import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {policyWatchSignals, shanghaiDay} from '../data/policy-watch-signals.mjs';

const {events} = JSON.parse(readFileSync(new URL('../data/seed.json', import.meta.url), 'utf8'));
const today = '2026-11-25';
assert.equal(shanghaiDay(new Date('2026-11-24T15:59:59Z')), '2026-11-24');
assert.equal(shanghaiDay(new Date('2026-11-24T16:00:00Z')), today);
for (const id of ['age', 'gifts', 'fraud', 'safety']) {
  const items = policyWatchSignals(events, id, today);
  assert.ok(items.length <= 2);
  for (const item of items) {
    assert.ok(item.source.url.startsWith('https://') && item.region && item.relevance && item.action);
    assert.ok(!item.futureDate || item.futureDate >= today);
  }
}
// Fixtures freeze event dates and wording so daily policy research can change the real records.
const example = {
  id: 'future-impersonation-consultation', title: '平台广告冒名征询', region: '测试地区',
  fact: '监管机构就平台付费广告中的冒名诈骗征求意见。', stage: '征询草案',
  topics: ['欺诈与商业行为'], scenarios: ['直播付费推广'], history: [], checkedAt: '2026-11-20',
  eventDate: '2026-11-19', deadline: '2026-11-30', effectiveDate: null, deadlineType: '公众意见截止',
  action: '核对广告主授权。', impact: '涉及付费推广。', source: 'https://example.org/source',
  evidence: [{url: 'https://example.org/source', publisher: '研究样例'}]
};
const read = (values = {}, date = today) => policyWatchSignals([{...example, ...values}], 'fraud', date);
assert.equal(read({}, '2026-11-30')[0].dateLabel, '公众意见截止');
assert.equal(read({}, '2026-12-01').length, 0);
const upcomingStart = read({stage: '已通过待生效', deadline: '2026-11-12', effectiveDate: '2027-01-01'});
assert.equal(upcomingStart[0].dateLabel, '开始执行');
assert.equal(upcomingStart[0].futureDate, '2027-01-01');
assert.equal(read({stage: '已撤回', deadline: '2027-01-01'}).length, 0);
assert.equal(read({stage: '诉讼事件'}).length, 0);
assert.equal(read({topics: ['隐私与数据']}).length, 0);
assert.equal(read({fact: '一般隐私要求。', title: '隐私研究'}).length, 0);
assert.equal(read({scenarios: ['隐私设置']}).length, 0);
assert.equal(read({evidence: []}).length, 0);
assert.equal(read({}, '2026-11-18').length, 0);
assert.equal(read({deadline: null}, '2026-12-19').length, 1);
assert.equal(read({deadline: null}, '2026-12-20').length, 0);
console.log('Verified policy alert scope, source evidence, legal stages, expiry and Shanghai date boundaries.');

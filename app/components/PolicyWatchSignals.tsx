import {useEffect, useState} from 'react';
import seed from '../../data/seed.json';
import type {LivePolicyRuleId} from '../../data/live-policy-rules';
import {policyWatchSignals, shanghaiDay} from '../../data/policy-watch-signals.mjs';

export default function PolicyWatchSignals({ruleId}: {ruleId: LivePolicyRuleId}) {
  const [today, setToday] = useState(() => shanghaiDay());
  useEffect(() => {
    const updateDate = () => setToday(shanghaiDay());
    const midnight = Date.parse(today + 'T00:00:00+08:00') + 86_400_000;
    const timer = window.setTimeout(updateDate, Math.max(0, midnight - Date.now() + 50));
    document.addEventListener('visibilitychange', updateDate);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', updateDate);
    };
  }, [today]);
  const items = policyWatchSignals(seed.events, ruleId, today);
  return <section className="live-policy-precedent" aria-label="地区政策预警">
    <div className="policy-section-head">
      <h2>地区政策预警</h2><small>上海日期 <time dateTime={today}>{today}</time></small>
    </div>
    {items.length ? <div className="live-history-grid">{items.map(item =>
      <article className="live-history-item" key={item.id}>
        <p className="history-meta"><span>{item.region}</span>
          <span><time dateTime={item.progressDate}>{item.progressDate}</time> 记录 · {item.stage}</span>
        </p>
        <h3>{item.title}</h3>
        {item.futureDate && <p><strong>{item.dateLabel} <time dateTime={item.futureDate}>{item.futureDate}</time></strong></p>}
        <p>{item.relevance}</p>
        <dl className="policy-reading"><div><dt>现在可准备</dt><dd>{item.action}</dd></div></dl>
        <div className="history-links">
          <a href={item.source.url} target="_blank" rel="noreferrer">{item.source.title}</a>
          {item.progressSource !== item.source.url &&
            <a href={item.progressSource} target="_blank" rel="noreferrer">议程进展来源</a>}
          <span>库内核对 <time dateTime={item.checkedAt}>{item.checkedAt}</time></span>
        </div>
      </article>
    )}</div> : <p>当前政策库中，这项风险暂无仍开放的期限或近 30 天的提案进展。</p>}
  </section>;
}

import {useEffect, useState, type MouseEvent} from 'react';
import {Gift, IdentificationCard, Scales, ShieldWarning, WarningCircle} from '@phosphor-icons/react';
import {livePolicyRules, liveRulesReviewedAt} from '../../data/live-policy-rules';
import {livePolicyHistory} from '../../data/live-policy-history';
import LiveEarlyWarning from './LiveEarlyWarning';
import PolicyWatchSignals from './PolicyWatchSignals';
import MonetizationPolicy from './MonetizationPolicy';
import '../live-policy.css';

const topics = [
  {id: 'gifts', label: '礼物诱导', icon: Gift},
  {id: 'age', label: '年龄资格', icon: IdentificationCard},
  {id: 'fraud', label: '欺诈与募捐', icon: ShieldWarning},
  {id: 'safety', label: '人身安全', icon: WarningCircle},
] as const;

type TopicId = typeof topics[number]['id'];
const sections = [{id: 'monetization', label: '变现逻辑', icon: Scales}, ...topics] as const;
type SectionId = typeof sections[number]['id'];
type HistoryCase = typeof livePolicyHistory[number];

const ruleUrl = (id: SectionId) => `?page=live&rule=${id}`;
const readTopic = () => sections.find(t => t.id === new URLSearchParams(location.search).get('rule'))?.id || 'monetization';
const incidentTopics: Record<string, TopicId> = {
  'LA-1042': 'gifts', 'HOU-2077': 'fraud', 'MIA-4088': 'safety', 'SEA-7033': 'gifts',
};

export function IncidentPolicyLink({id}: {id: string}) {
  const topic = topics.find(t => t.id === incidentTopics[id]);
  return topic ? <a className="policy-inline-link" href={ruleUrl(topic.id)}>{topic.label}的判断依据</a> : null;
}

function CaseStudy({item, linkRule = false}: {item: HistoryCase; linkRule?: boolean}) {
  const topic = topics.find(t => t.id === item.ruleId)!;
  return <article className="live-history-item" id={linkRule ? item.id : undefined}>
    <p className="history-meta"><time dateTime={item.date}>{item.date}</time><span>{item.scope}</span></p>
    <h3>{item.title}</h3>
    <p>{item.fact}</p>
    <details>
      <summary>用这起事件推演预警</summary>
      <dl className="policy-reading">
        <div><dt>可能的早期信号</dt><dd>{item.signal}</dd></div>
        <div><dt>建议先做什么</dt><dd>{item.action}</dd></div>
        <div><dt>证据边界</dt><dd>{item.limit}</dd></div>
      </dl>
    </details>
    <div className="history-links"><a href={item.source.url} target="_blank" rel="noreferrer">{item.source.title}</a>
      {'contextSource' in item && <a href={item.contextSource.url} target="_blank" rel="noreferrer">{item.contextSource.title}</a>}
      {linkRule && <a href={ruleUrl(topic.id)}>推演「{topic.label}」</a>}
    </div>
  </article>;
}

export function HistoricalCases() {
  return <section className="live-history-archive" aria-labelledby="historical-cases-heading">
    <h2 id="historical-cases-heading">历史案例</h2>
    <div className="live-history-grid">{[...livePolicyHistory].sort((a,b) => b.date.localeCompare(a.date)).map(item =>
      <CaseStudy key={item.id} item={item} linkRule/>)}</div>
  </section>;
}

export default function LivePolicy() {
  const [topic, setTopic] = useState<SectionId>(readTopic);
  useEffect(() => {
    const restore = () => setTopic(readTopic());
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  function selectTopic(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (id !== topic) {
      history.pushState({}, '', ruleUrl(id));
      setTopic(id);
    }
  }
  return <main className="content-page live-policy-page">
    <div className="content-heading"><h1>TikTok LIVE 政策</h1></div>
    <nav className="live-topic-nav" aria-label="LIVE 政策主题">{sections.map(({id, label, icon: Icon}) =>
      <a key={id} href={ruleUrl(id)} onClick={e => selectTopic(e, id)} aria-current={topic === id ? 'page' : undefined}>
        <Icon size={20} aria-hidden="true"/>{label}
      </a>)}</nav>
    {topic === 'monetization' ? <MonetizationPolicy/> : <RiskPolicy key={topic} topic={topic}/>}
  </main>;
}

function RiskPolicy({topic}: {topic: TopicId}) {
  const rule = livePolicyRules.find(r => r.id === topic)!;
  const precedents = livePolicyHistory.filter(c => c.ruleId === topic);
  return <>
    <div className="live-policy-spread">
      <section className="live-rule" aria-labelledby="live-rule-title">
        <h2 id="live-rule-title">{rule.title}</h2>
        <p className="live-rule-text">{rule.rule}</p>
        <dl className="policy-reading">
          <div><dt>潜在伤害</dt><dd>{rule.harm}</dd></div>
          <div><dt>何时预警</dt><dd>{rule.signal}</dd></div>
          <div><dt>优先核实</dt><dd>{rule.verify}</dd></div>
        </dl>
        <details className="rule-disclosure"><summary>如何处置、恢复和复盘</summary>
          <dl className="policy-reading"><div><dt>建议处置</dt><dd>{rule.action}</dd></div>
          <div><dt>何时调整</dt><dd>{rule.release}</dd></div>
          <div><dt>如何检验</dt><dd>{rule.review}</dd></div></dl>
        </details>
        <details className="rule-disclosure"><summary>官方依据与适用范围</summary>
          <p>{rule.scope}</p><small>资料核对 <time dateTime={liveRulesReviewedAt}>{liveRulesReviewedAt}</time></small>
          <ul>{rule.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ul>
        </details>
      </section>
      <LiveEarlyWarning ruleId={topic}/>
    </div>
    <PolicyWatchSignals ruleId={topic}/>
    {precedents.length > 0 && <section className="live-policy-precedent" aria-label="相关历史案例">
      <div className="policy-section-head"><h2>相关历史案例</h2><a href="?page=cases">查看全部案例</a></div>
      {precedents.map(item => <CaseStudy key={item.id} item={item}/>)}
    </section>}
  </>;
}

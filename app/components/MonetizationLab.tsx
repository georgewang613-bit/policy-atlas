import {useId, useState} from 'react';
import {LMG_URL} from '../../data/live-context.mjs';
import '../monetization-lab.css';

const situations = [
  {
    id: 'teaching', choice: '现场答疑',
    evidence: '有人问“为什么我的书页总是歪？”主播暂停示范片，拿起自己的手账，从旁边再演示一次怎样对齐。',
    content: '保留教学。画面和原音都能对上观众的问题。',
    monetization: '观众可以自由送礼，主播也确实在现场教学。就本场表现，未见限制礼物功能的理由。',
    encourage: '用特写展示手上动作，再按观众的问题换角度示范。',
    review: '若后续出现催礼或危险动作，按新片段单独复核。'
  },
  {
    id: 'loop', choice: '无人应答',
    evidence: '同一个问题连续出现。核对整场回放，只有标明“示范回放”的片段反复播放，聊天区一直自动回复“谢谢支持”。',
    content: '示范片已标明来源，教学本身可以保留。',
    monetization: '整场缺少主播的实质参与，应复核本场变现资格。标明回放解决了观众对素材来源的疑问，仍需判断有无真实互动。',
    encourage: '保留清楚的回放标识，由主播现场讲解难点、回应提问。',
    review: '若有漏录的现场讲解或答疑，补齐完整记录后重判。'
  },
  {
    id: 'pressure', choice: '点名催礼',
    evidence: '观众说“我不想送礼”。主播停下答疑，连续点名，要求这位观众送出指定礼物才肯继续。原音确认主播是在对本人说话。',
    content: '可以保留手艺教学。另查点名过程中有无持续羞辱或威胁，再判断骚扰条款是否适用。',
    monetization: '观众已拒绝，主播仍用停课施压索礼。建议限制本场礼物功能，记录触发判断的原话。',
    encourage: '继续回答问题，让观众自己决定是否支持这堂课。',
    review: '若完整原音显示主播在引用这段话提醒观众提防索礼，撤回施压判断。'
  },
  {
    id: 'danger', choice: '现场出现险情',
    evidence: '工作区意外起火。连续画面和原音显示，主播鼓动身旁的助手靠近火源接受挑战，助手正要照做。',
    content: '现场人员面临迫近危险。建议立即升级安全处置并中止这场正在鼓动危险行为的直播。',
    monetization: '危险挑战也触及变现准则。先保护现场人员，随后记录本场变现处置，无须等待有人送礼。',
    encourage: '停下拍摄，先让人离开危险区域。事后可以用安全的素材讲解避险。',
    review: '复核连续原声与画面。若证实主播在劝阻他人，应撤回针对主播鼓动挑战的判断。'
  }
] as const;

export default function MonetizationLab() {
  const [selected, setSelected] = useState(0);
  const groupId = useId();
  const example = situations[selected];
  return <section className="monetization-lab" id="live-monetization-lab" aria-labelledby={groupId + '-title'}>
    <h2 id={groupId + '-title'}>同一间直播间</h2>
    <p className="monetization-intro">一位成年主播教大家装订手账。直播间开着礼物功能，示范片标明了“回放”。选一种现场情况，看看应当保留什么、何时需要介入。</p>
    <fieldset className="monetization-switch">
      <legend>选择模拟情境</legend>
      {situations.map((item, index) => <label key={item.id}>
        <input type="radio" name={groupId} checked={selected === index} onChange={() => setSelected(index)}/>
        <span>{item.choice}</span>
      </label>)}
    </fieldset>
    <div aria-live="polite" aria-atomic="true">
      <p className="monetization-evidence"><strong>现场证据</strong>{example.evidence}</p>
      <dl className="monetization-decisions">
        <div><dt>内容如何处理</dt><dd>{example.content}</dd></div>
        <div><dt>本场能否变现</dt><dd>{example.monetization}</dd></div>
        <div><dt>值得鼓励的做法</dt><dd>{example.encourage}</dd></div>
        <div><dt>何时重新判断</dt><dd>{example.review}</dd></div>
      </dl>
    </div>
    <div className="monetization-sources">
      <a href="https://ag.ny.gov/sites/default/files/social-media-policy-report/2026-q1q2-tiktok-inc-policy-1.pdf#page=82" target="_blank" rel="noreferrer">美国社区准则 · LIVE</a>
      <a href={LMG_URL} target="_blank" rel="noreferrer">LIVE 变现准则</a>
      <a href="https://lf16-live-backstage.tiktokcdn.com/obj/ies-hotsoon-draft-sg/webcast-union-platform-i18n/3f1a6596-7db7-4b75-82a9-7f36dd9e7563.html?d=1791105066852" target="_blank" rel="noreferrer">创作者网络政策 · 第 2.3 节</a>
    </div>
  </section>;
}

import {useState} from 'react';
import {practiceCases,studyDate,studySources,transferCases} from '../../data/lab-study';
import {classificationMetrics,differenceInDifferences} from '../../lib/lab-metrics';
import '../policy-practice.css';
import {StudyOverview,ImplementationGuide,MonthReview} from './ImplementationStudy';

function Evidence({ids}:{ids:string[]}) {return <span className="practice-cites">{ids.map(id=><a key={id} href={'#lab-source-'+id} aria-label={'查看来源 '+id} onClick={()=>{const target=document.getElementById('lab-source-'+id) as HTMLDetailsElement|null;if(target)target.open=true;}}>{id}</a>)}</span>;}
const format=(value:number|null)=>value===null?'无分母':(value*100).toFixed(1)+'%';

function BoundaryPractice(){
 const [current,setCurrent]=useState(0),[answers,setAnswers]=useState<Record<string,number>>({});
 const item=practiceCases[current], answer=answers[item.id];
 return <>
  <section className="practice-section"><h2>先定义，再判断</h2>
   <p>本练习把“利用义务感索礼”写成三个需要核对的要件。它是候选规则设计，最新官方条款仍需核验。<Evidence ids={['S2','S8']}/></p>
   <ol className="practice-reasoning"><li><strong>谁在索礼</strong><span>主播自己表达，或有证据表明其认可、放大了他人的要求。区分主播、嘉宾、观众。</span></li><li><strong>压力从哪里来</strong><span>把送礼与偿还恩惠、证明忠诚，或不送礼将被贬低等后果相连。</span></li><li><strong>语境是否支持</strong><span>核对原音、手势和前后回应，排除感谢、引用、制止等解释；送礼成功不是本练习的必要条件。</span></li></ol>
   <p className="practice-note">一笔礼物不能证明自愿，也不能证明施压。高额打赏、重复请求和观众拒绝可以帮助定位风险，不能单独代替要件。</p>
  </section>
  <section className="practice-section"><div className="practice-heading"><h2>换一个事实，结论会变吗？</h2><span>{current+1} / {practiceCases.length}</span></div>
   <div className="practice-case-nav" aria-label="选择案例">{practiceCases.map((c,i)=><button key={c.id} aria-pressed={current===i} onClick={()=>setCurrent(i)}>{i+1}. {c.title}</button>)}</div>
   <article className="practice-scenario" key={item.id}><h3>{item.title}</h3><p className="practice-quote">{item.scene}</p><fieldset><legend>仅依据上述事实，你会怎样判断？</legend>{item.options.map((option,i)=><button key={option} aria-pressed={answer===i} onClick={()=>setAnswers({...answers,[item.id]:i})}>{option}</button>)}</fieldset>
    {answer!==undefined&&<div className="practice-feedback" role="status"><h4>{answer===item.answer?'与参考判断一致':'再看缺少的证据'}</h4><p><strong>参考判断：</strong>{item.options[item.answer]}</p><dl><div><dt>证据</dt><dd>{item.evidence}</dd></div><div><dt>边界</dt><dd>{item.boundary}</dd></div><div><dt>处置建议</dt><dd>{item.action}</dd></div><div><dt>追问</dt><dd>{item.followup}</dd></div></dl></div>}
   </article>
  </section>
  <section className="practice-section"><h2>证据强度和处罚强度分开考虑</h2><div className="practice-grid">
   <article><h3>不确定</h3><p>补充前后语境和发言人证据。对本条不作确定违规结论；如果有即时安全风险，使用对应保护措施。</p></article>
   <article><h3>已确认，较轻</h3><p>根据适用规则考虑提示或警告，说明哪段行为越界。警告也是有影响的决定，不能免于质量检查。</p></article>
   <article><h3>已确认，严重或反复</h3><p>考虑相关变现功能限制；严重、持续或永久限制应有更充分证据、人工复核和可用申诉。不能只因模型分数高就加重处罚。</p></article>
  </div><p className="practice-note">以上为项目建议，不代表 TikTok 固定处罚梯度。通知应说明事实、规则、受影响功能和申诉办法。<Evidence ids={['S1','S5','S8']}/></p></section>
  <details className="practice-fold"><summary>AI 怎样帮忙，哪些决定需要谨慎？</summary><div><p>AI 可以对齐转写、弹幕和画面，指出原文时间点及可能缺失的语境。审核员要能回到原始片段核查；模型生成的解释本身不是证据。</p><p>特别测试：否定词漏转、引用被当成认可、多人声音归错、方言和手势遗漏。置信度要在各语言的独立样本上校准，不能直接拿同一分数作全球处罚门槛。</p><p>经验证、低歧义的行为才考虑有限自动处置；语境不清、严重或永久限制以及申诉优先人工复核。影子评估只记录新系统判断，既有安全处置照常进行。<Evidence ids={['S1','S5']}/></p></div></details>
 </>;
}

function MetricSandbox(){
 const [counts,setCounts]=useState(['80','20','20','880']);
 const valid=counts.every(v=>/^\d+$/.test(v)&&Number.isSafeInteger(Number(v))&&Number(v)<=1000000);
 const metrics=valid?classificationMetrics(...counts.map(Number) as [number,number,number,number]):null;
 const labels=['判违规且确实违规 · TP','判违规但实际合规 · FP','未判违规但实际违规 · FN','未判违规且确实合规 · TN'];
 return <section className="practice-section"><h2>指标不能混用</h2><p>输入同一批独立复核样本的四种结果。这里所有数字都是教学示例，单位为互动片段；没有后台数据，也不是上线标准。抽样若过度覆盖疑似违规，需按抽样概率加权后才可估计总体。</p>
  <div className="practice-inputs">{counts.map((v,i)=><label key={labels[i]}>{labels[i]}<input type="number" inputMode="numeric" min="0" max="1000000" step="1" value={v} onChange={e=>setCounts(counts.map((n,j)=>i===j?e.target.value:n))}/></label>)}</div>
  <div className="practice-metrics" aria-live="polite">{metrics?<>
   <div><span>Precision · 判得准吗</span><strong>{format(metrics.precision)}</strong><small>TP ÷ (TP + FP)</small></div>
   <div><span>Recall · 漏了多少</span><strong>{format(metrics.recall)}</strong><small>TP ÷ (TP + FN)</small></div>
   <div><span>FPR · 合规样本误报率</span><strong>{format(metrics.fpr)}</strong><small>FP ÷ (FP + TN)</small></div>
   <div><span>处置样本中的错误占比</span><strong>{format(metrics.falseDiscovery)}</strong><small>FP ÷ (TP + FP) = 1 − Precision</small></div>
  </>:<p role="alert">请为每一项输入 0 至 1,000,000 的整数。</p>}</div>
  <p className="practice-note">分母为零显示“无分母”，不当作满分。默认例子中，处置样本错误占比是 20%，FPR 约为 2.2%；不能都叫“误判率”。<Evidence ids={['S3']}/></p>
  <button className="practice-reset" onClick={()=>setCounts(['80','20','20','880'])}>恢复示例</button>
 </section>;
}

function Evaluation(){return <>
 <MonthReview/>
 <section className="practice-section"><h2>先固定你要评估的政策</h2><p>“义务感施压”与“欺骗性索礼”可以同时出现，但不是同一类事实。上线前固定规则版本、适用地区、评估单位和严重性分类；否则标签变了，看起来的下降可能只是口径变化。</p>
 <div className="practice-grid"><article><h3>安全结果</h3><p>相关违规曝光是否减少？是否更早阻断？严重个案有没有被平均值掩盖？</p></article><article><h3>创作者损害</h3><p>合规主播被错误限制了多少、持续多久？错误能否在直播结束前纠正？</p></article><article><h3>持续可行</h3><p>高峰时段是否积压？问题是否转移到其他语言、账号或互动形式？</p></article></div><p><Evidence ids={['S1']}/></p></section>
 <MetricSandbox/>
 <section className="practice-section"><h2>每个指标都要说清分母</h2><div className="practice-table-wrap" tabIndex={0} role="region" aria-label="政策效果指标表"><table><thead><tr><th>问题</th><th>建议指标</th><th>最容易误读的地方</th></tr></thead><tbody>
 <tr><td>观众实际看到了多少风险？</td><td>违规片段的观看分钟 ÷ 同范围全部 LIVE 观看分钟；同时报告绝对值。</td><td>先标注违规时间区间，再累计该区间观看分钟；不要把整场直播全部计为违规。与 YouTube VVR 不可直接比较。</td></tr>
 <tr><td>动作来得够快吗？</td><td>从可识别违规起点到措施实际生效的 P50 / P90；另外记录仍未处置的事件。</td><td>只测“模型发出标记后”会漏掉发现延迟；只统计已处置样本会隐藏长期漏判。</td></tr>
 <tr><td>哪些创作者被误伤？</td><td>合规样本误报率、错误限制总时长、直播结束前恢复比例。</td><td>收入变化受流量和表演影响；不把估算损失直接当成全部由政策导致。</td></tr>
 <tr><td>申诉机制能纠错吗？</td><td>改判数 ÷ 已完成复核的同批申诉数，另报待处理量与时长。</td><td>申诉者不是随机样本，改判也可能源于新证据或政策更新；改判率不等于总体误判率。</td></tr>
 <tr><td>执行能否持续？</td><td>各语言的抽样质量、每小时待审量、队列 P90、单位复核耗时。</td><td>处理量高不表示判断准；自动化占比也不是 Precision 或 Recall。</td></tr>
 </tbody></table></div><p className="practice-note">观看分钟、时长与队列指标均为项目设计。YouTube 的 VVR 明确不包含直播；TikTok 的 94.1% 自动化处置占比也不能证明本规则有效。<Evidence ids={['S4','S7']}/></p></section>
 <section className="practice-section"><h2>怎样知道下降来自政策？</h2><p>例如：试点组风险暴露率从 12% 降至 8%，对照组从 10% 降至 7%。试点组下降 4 个百分点，其中 3 个百分点也发生在对照组；双重差分估计为 <strong>{differenceInDifferences(12,8,10,7)} 个百分点</strong>。这是教学演算，不能仅凭这四个数证明因果。</p><ol className="practice-reasoning"><li><strong>先验证对照是否可信</strong><span>比较上线前多期趋势、语言、内容构成和季节性；检查同期是否调整推荐、礼物活动或审核人手，以及两组是否相互影响。</span></li><li><strong>再决定观察窗口</strong><span>“前后各四周”只是起点。窗口取决于样本量、基础发生率、周内波动和预期效果；同时报告置信区间和不能排除的解释。</span></li><li><strong>保护措施不为实验停掉</strong><span>不能为了留出对照延迟法定或必要安全保护。可比较合规前提下的实施方式；无可信对照时，报告趋势和贡献证据，不夸大归因。</span></li></ol><p><Evidence ids={['S6']}/></p></section>
 <details className="practice-fold"><summary>如何抽样，才能发现没被系统标记的问题？</summary><div><p>保留两套样本：从全部符合范围的 LIVE 互动中随机抽样，用于估计暴露和漏判；另外对稀有语言、边界表达和申诉集中加抽，用于诊断。不要直接把加抽后的比例当总体比例。</p><p>审核员尽量不知道原处置结论，独立标注后由另一位评审解决分歧。分开记录规则不清、事实缺失与单纯判错。留出未参与修正的验证样本，复播时只提供当时能获得的证据，避免事后信息泄漏。</p><p>按语言、场景、自动或人工处置分组，同时报告样本量和不确定区间；低频组样本不够就继续收集，不能因为暂时没有错误样本宣布“零误判”。</p></div></details>
 <details className="practice-fold"><summary>风险下降但误伤仍高：怎样安排下一步？</summary><div><ol><li>先修复已确认的错误限制，并检查未申诉的相似案例。</li><li>复原证据链：是转写丢了否定词、发言人识别错误、规则把普通感谢算成压力，还是正确决定被执行错了？</li><li>针对根因修改：转写错改识别；边界不清改例子；处罚过重改措施；恢复慢改执行环节。</li><li>先限制问题场景的自动处置范围并维持人工保护，再用独立样本和高峰时段试点验证。上线门槛需根据基线、错误成本和承载能力预先确定，不凭空写“准确率 95%”。</li></ol></div></details>
 </>;}

export default function PolicyPractice(){
 const sections=['研究概览','执行指引','首月评估','场景迁移'];
 const [section,setSection]=useState(sections[0]);
 return <div className="policy-practice">
  <section className="practice-intro"><span className="practice-kicker">实施研究 · 2026-11-08</span><h2>让判断一致，让调整有据</h2><p>以义务感索礼为例，展示规则边界、审核分歧和上线后的取舍。案例与演算均为独立研究设计。</p></section>
  <nav className="practice-nav" aria-label="案例研究栏目">{sections.map(s=><button key={s} aria-pressed={section===s} onClick={()=>setSection(s)}>{s}</button>)}</nav>
  <div className="practice-content" key={section}>
   {section==='研究概览'&&<StudyOverview/>}
   {section==='执行指引'&&<><ImplementationGuide/><BoundaryPractice/></>}
   {section==='首月评估'&&<Evaluation/>}
   {section==='场景迁移'&&<section className="practice-section"><h2>同一套方法，换四种场景</h2><p>先找伤害机制，再找成立要件、反例与验证方法。以下均为虚构情景；不推断任何真实平台、主播或用户已违规。</p><div className="transfer-grid">{transferCases.map(c=><article key={c.title}><h3>{c.title}</h3><p className="practice-quote">{c.question}</p><dl><div><dt>判断原则</dt><dd>{c.principle}</dd></div><div><dt>需要证据</dt><dd>{c.evidence}</dd></div><div><dt>处理建议</dt><dd>{c.response}</dd></div><div><dt>效果检查</dt><dd>{c.measure}</dd></div></dl></article>)}</div></section>}
  </div>
  <section className="practice-sources" aria-label="案例依据"><h2>依据和边界</h2><p className="practice-source-warning">最新 LIVE Monetization Guidelines 正文尚未取得；本页不把案例细化边界当作已核验的官方条款。公开事实、方法借鉴和项目建议按下列说明使用。</p>{studySources.map(s=><details id={'lab-source-'+s.id} className="practice-fold" key={s.id}><summary>{s.id} · {s.title}<span>{s.status}</span></summary><div><p>{s.note}</p><a href={s.url} target="_blank" rel="noreferrer">{s.publisher} · 查看原文 ↗</a><p className="practice-muted">{s.status==='已核对'?'核对':'尝试读取'}：{studyDate}</p></div></details>)}</section>
 </div>;
}

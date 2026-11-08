import {useState} from 'react';

export function StudyOverview(){return <>
 <section className="practice-section"><h2>减少施压索礼，保留自愿支持</h2><p>政策能否落地，取决于不同审核员能否凭同一组事实得出稳定结论；上线后，还要确认风险下降没有以大量误限合规主播为代价。本研究用同一风险贯穿规则设计和首月评估。</p><div className="practice-grid"><article><h3>明确边界</h3><p>把“义务感施压”拆成行为人、礼物关联和语境证据，给出三个应处理、两个不应处理的案例。</p></article><article><h3>校准判断</h3><p>区分事实理解不同、规则理解不同和措施选择不同，用原始片段与成对反例找出分歧。</p></article><article><h3>决定如何调整</h3><p>同时看违规曝光、合规主播受损和审核承载能力，说明保留什么、收窄什么，以及何时重新扩大。</p></article></div><p className="practice-note">独立研究样例 · 2026-11-08 更新。案例、数字和实施方案均为项目设计，不是 TikTok 内部规则、真实业务结果或招聘评分标准。公开来源的核对日期单独保留。</p></section>
 <section className="practice-section"><h2>为什么选这个风险？</h2><p>索礼本身不一定有害，但把礼物变成人情债或忠诚检验，会让本来可以拒绝的付费带上压力。难点不在识别“礼物”这个词，而在理解谁在说话、主播是否认可，以及观众拒绝之后发生了什么。</p><ol className="practice-reasoning"><li><strong>短片段容易改变含义</strong><span>截掉后半句，制止可能被当成认可；只保留转写，手势、指向和发言人可能丢失。</span></li><li><strong>同一句话可能承担不同功能</strong><span>“给点面子”可能是玩笑，也可能是针对个人的付费压力。需要本地语境，不能仅凭翻译或国籍判断。</span></li><li><strong>判断成立不等于措施相同</strong><span>严重性、持续行为和重复违规影响处置；没有实际收到礼物，也不自动排除风险行为。</span></li></ol></section>
 <section className="practice-section"><h2>怎样使用这份研究</h2><p>先看“执行指引”的五例对照，再用边界练习检查结论是否随关键事实改变；最后在“首月评估”中查看如何从信号走到根因和建议。“场景迁移”将同一方法用于 AI 身份、PK 和跨语言表达。</p><p className="practice-note">最新 LIVE Monetization Guidelines 正文仍未取得，细化规则暂按候选方案呈现；正式使用前需对照有效版本确认适用范围和处置权限。</p></section>
 </>;}

const examples=[
 ['应处理','恩惠换礼物','“我为你加唱了一首，你欠我一朵玫瑰。”','主播明确把过去的恩惠转成礼物义务。','去掉偿还要求，只表达感谢，结论可能改变。'],
 ['应处理','忠诚检验','主播指向礼物图标：“不送就不是真粉丝，我会把你列在假粉名单里。”','礼物与忠诚、公开贬低相连。','仅欢迎自愿支持、不附带负面后果，不满足本条。'],
 ['应处理','认可他人施压','弹幕催小林“还人情”，主播回应：“说得对，我帮过你，今天该刷了。”','主播明确认可并继续向特定观众索礼。','若回应改成制止，不将弹幕直接归责给主播。'],
 ['不按本条处理','自愿感谢','“谢谢大家的礼物，不方便也没关系。”随后正常继续表演。','没有人情债、忠诚检验或不送礼的负面后果。','后续出现持续点名施压时，重新评估新增事实。'],
 ['不按本条处理','引用后制止','主播读出催礼弹幕后立即说：“别逼小林，不送也欢迎。”','完整回应表明反对施压，不能只截取朗读部分。','若主播改成认可，行为归属和判断随之改变。'],
];
export function ImplementationGuide(){const [endorses,setEndorses]=useState(false);return <>
 <section className="practice-section"><h2>五个案例，检验同一条边界</h2><p>候选规则：主播直接或明确认可他人，将送礼与偿还恩惠、证明忠诚或拒绝后的贬低相联系，并有完整语境支持这一解释。收到礼物不是必要条件；“不按本条处理”也不代表其他规则全部合规。</p><div className="practice-table-wrap" role="region" aria-label="三个应处理与两个不应处理案例" tabIndex={0}><table><thead><tr><th>参考结论</th><th>场景</th><th>决定性证据</th><th>改变结论的事实</th></tr></thead><tbody>{examples.map(([decision,title,scene,evidence,counter])=><tr key={title}><td>{decision}<br/>{title}</td><td>{scene}</td><td>{evidence}</td><td>{counter}</td></tr>)}</tbody></table></div><p className="practice-note">“应处理”指在本候选规则下进入有依据的比例处置，不等于一律封禁或永久限制。以下交互仅使用虚构场景。</p></section>
 <section className="practice-section"><h2>只改一句回应</h2><p>共同事实：观众发弹幕，要求小林为主播过去的帮助送礼。主播读出了弹幕。</p><div className="practice-case-nav"><button aria-pressed={!endorses} onClick={()=>setEndorses(false)}>主播制止</button><button aria-pressed={endorses} onClick={()=>setEndorses(true)}>主播认可</button></div><p className="practice-quote">{endorses?'“说得对，我帮过你，今天该刷了。”':'“别逼小林，不送也欢迎。”'}</p><dl aria-live="polite"><div><dt>判断</dt><dd>{endorses?'明确认可并继续施压，支持本条成立。':'有明确制止证据，不按本条认定主播施压。'}</dd></div><div><dt>现在做什么</dt><dd>{endorses?'保留弹幕、原音和回应时间点；依已确认规则选择相关变现措施，通知理由并提供纠错途径。':'不因礼物关键词限制主播；观众弹幕如涉及骚扰，按对应规则独立核查。'}</dd></div><div><dt>仍要核查什么</dt><dd>发言人是否准确、前后是否有相反行为、片段是否完整。以上结论不覆盖未提供的其他事实。</dd></div></dl></section>
 <section className="practice-section"><h2>分歧发生在哪里？</h2><div className="practice-grid"><article><h3>事实不一致</h3><p>一人只看转写，另一人听到否定。让两人查看同一份完整原音、弹幕和发言人记录，再独立判断。</p></article><article><h3>规则理解不同</h3><p>都看到相同事实，却对“认可”或“玩笑”理解不同。记录争议要件，用本地成对案例补充边界并统一规则版本。</p></article><article><h3>措施尺度不同</h3><p>都认定成立，却一人警告、一人封禁。单独检查严重性和措施权限，不用加重处罚掩盖证据不足。</p></article></div><p>校准时记录同一批案例的要件判断、最终结论及理由；按语言和场景看分歧。高一致率仍可能是共同判错，需与独立裁定比较，并在未用于培训的新样本上复测。</p></section>
 </>;}

export function MonthReview(){return <>
 <section className="practice-section"><h2>上线一个月：先给决策结论</h2><p className="practice-quote">模拟读数：风险暴露下降，但独立复核确认合规主播的错误限制时间增加，问题集中在某语言的“引用后否定”片段。建议保留已验证的保护，暂停扩大该场景的自动处置，先恢复误限，再验证修正。</p><p>这是演示如何决策的假设，不是真实效果。四周足以形成一次阶段判断，不保证样本充分，也不代表已经识别长期影响或政策因果效果。</p><div className="practice-grid"><article><h3>成功</h3><p>目标风险的暴露和严重伤害减少；合规创作者误限与恢复时间在预设容忍范围内；各语言和高峰时段仍能执行。</p></article><article><h3>失败或需要修正</h3><p>只增加处置量，风险未降；总体改善掩盖某语言误伤；或处置正确但限制过重、恢复过慢。</p></article><article><h3>尚不能判断</h3><p>样本太少、数据缺失、口径变化或缺乏可信比较。报告不确定性，继续有针对性的观察，不把不显著当作没有影响。</p></article></div></section>
 <section className="practice-section"><h2>从信号查到根因</h2><div className="practice-table-wrap" role="region" aria-label="根因分析证据表" tabIndex={0}><table><thead><tr><th>观察信号</th><th>待验证解释</th><th>如何区分</th><th>对应修正</th></tr></thead><tbody>
 <tr><td>引用后制止被误判</td><td>转写漏否定；或规则将引用等同认可</td><td>同一案例分别用原音与转写复审；保留当时可得语境，比较要件判断</td><td>前者修识别或上下文窗口；后者修边界指引，分别验证</td></tr>
 <tr><td>违规结论正确，限制仍过重</td><td>处置映射或重复违规记录有误</td><td>对照适用版本、严重性、历史与实际执行日志</td><td>修措施映射，恢复错误限制；不把这类错误只记成分类 FP</td></tr>
 <tr><td>改判后仍无法收礼</td><td>恢复链路延迟或失败</td><td>比较改判、恢复指令、功能实际恢复时间</td><td>修恢复执行并测尾部时长；培训审核员无法解决此问题</td></tr>
 <tr><td>某语言队列积压</td><td>流量激增、重复标记或能力不足</td><td>分时段比入队量、处理量和单例耗时；访谈审核员核对困难片段</td><td>按已确认瓶颈调整覆盖或去重，复测高峰容量和漏判</td></tr>
 </tbody></table></div><p>质性证据包括审核分歧记录、创作者对通知的理解、申诉原话与完整片段。用它们提出和解释假设，再用独立抽样确认范围；不能用几个投诉代表所有创作者。</p></section>
 <section className="practice-section"><h2>风险下降，误伤也高：怎样取舍？</h2><ol className="practice-reasoning"><li><strong>立即纠错</strong><span>恢复已确认误限的功能，主动抽查未申诉的相似案例。保留严重风险保护，不以等待完整评估为由拖延纠错。</span></li><li><strong>收窄问题场景</strong><span>暂缓有问题的语言或表达类型的自动处置扩张，将疑难案例转人工。若队列无法承载，明确缩小试点范围；不承诺所有案例都能立即人工复核。</span></li><li><strong>按根因验证</strong><span>在独立、未参与修正的样本上检查曝光、Recall、错误限制时长和队列尾部。先约定基线、错误成本和可接受区间，不事后挑一个好看的指标。</span></li><li><strong>再决定扩大、维持或回退</strong><span>只有问题分组的伤害和误伤指标均满足预设标准、容量可承受，才逐步扩大；若仍不足则维持有限范围或回退问题改动，同时继续原有必要保护。</span></li></ol><p className="practice-note">给管理层的是“结论、证据强度、取舍和复查条件”；给执行团队的是“哪些案例改变处理、为什么、用哪个版本”。两者共享同一事实和口径。</p></section>
 </>;}

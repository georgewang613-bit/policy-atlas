export default function PolicyLab(){
 return <section className="lab lab-page" aria-label="政策实验室">
  <section className="baseline lab-baseline">
   <h2>AI 主播打赏</h2>
   <p>TikTok 要求年满 18 岁才能开播或赠礼，LIVE 规则已涵盖骗取、施压索要礼物。充值币（Coins）、礼物（Gifts）和创作者奖励分别评估，重点检查是否说明AI身份、用户是否自愿、是否诱导打赏。</p>
   <div className="source-meta"><a href="https://www.tiktok.com/community-guidelines/en/accounts-features" target="_blank" rel="noreferrer">TikTok 功能规则 ↗</a><time>核验 2026-10-26</time></div>
  </section>
  <div className="content-grid lab-cards">
   <article className="content-card"><h2>规则建议</h2>
    <p>让用户了解真实情况后自己选择，减少冒充真人和以关系施压，保留虚拟角色表演及自愿打赏的空间。</p>
    <p>容易被误认为真人的AI互动主播，应一直清楚地标明AI身份。禁止以虚假真人身份、虚假紧急处境索取礼物，或把停止伤害自己及他人作为付费条件。</p>
    <p>普通打赏提示、明确标注的角色表演和无威胁的自愿支持，不应只因情感表达而受罚。</p>
   </article>
   <article className="content-card"><h2>处置示例</h2>
    <div className="case case-allow"><h3>允许</h3><p>“我是 AI 角色，喜欢表演可以自愿送礼。”身份清楚，无威胁、虚假承诺。</p></div>
    <div className="case case-limit"><h3>限制收入功能并纠正</h3><p>冒充真人，承诺付费后建立真实私人关系。记录话术、展示的身份和礼物要求，按严重程度处理。</p></div>
    <div className="case case-escalate"><h3>转交安全团队</h3><p>以自伤威胁索取打赏：停止相关收入功能，交由安全团队处理。单纯求助不按诈骗处理。</p></div>
   </article>
   <article className="content-card"><h2>地区差异</h2><p>统一规则明确哪些伤害必须防止，再补充各地要求，例如欧盟AI身份告知、加州陪伴聊天机器人的定义和当地年龄门槛。法律没有明确规定的行为，也可以根据风险证据提出平台规则。</p></article>
   <article className="content-card"><h2>试行办法</h2><p>让审核员独立判断多语言样本，评审时互不知晓对方结论；比较判断是否一致、误判多少、申诉后改判多少，以及用户受到的实际伤害。先观察判断结果，不实际处罚，再小范围试行。</p></article>
   <article className="content-card"><h2>打赏抽奖</h2>
    <p>“送指定礼物才可抽现金奖”：核对付费参与、是否随机获奖、奖品性质、地区和年龄。</p>
    <p>明显欺骗或赌博风险转交专项审核，保留常规 PK 排名和自愿送礼。区分“送礼就赢”的虚假承诺和“不送就伤害自己”的安全事件，保留视频及交易证据，允许申诉补充免费参与等事实。</p>
    <details className="card-details"><summary>验证办法</summary><p>政策团队说明规则，法务核对当地要求，产品团队测试操作流程，运营人员独立评审样本；比较各语言的误判、申诉改判和实际伤害。</p></details>
   </article>
   <article className="content-card"><h2>多人连麦</h2>
    <p>嘉宾出现地区限制内容、误导推销或仇恨时，按嘉宾行为、主播知情程度、处置能力和传播范围划分责任。</p>
    <p>记录内容和当地语境，按严重程度移出嘉宾、限制可见范围、结束直播或对账号采取进一步措施。统一的安全要求和各地限制分别记录，教育、新闻引用、讽刺等情况结合前后内容判断。</p>
    <details className="card-details"><summary>验证办法</summary><p>当地专家复核测试样本，测试嘉宾移除、主持人提示和申诉理由是否易懂。</p></details>
   </article>
  </div>
 </section>;
}

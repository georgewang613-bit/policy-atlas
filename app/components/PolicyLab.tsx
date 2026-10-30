import TextPoints from './TextPoints';

export default function PolicyLab(){
 return <section className="lab-page" aria-label="政策实验室">
  <section className="lab-baseline">
   <h2>AI 主播打赏</h2>
   <TextPoints items={[
    'TikTok 要求年满 18 岁才能开播或赠礼，LIVE 规则已涵盖骗取、施压索要礼物',
    '充值币（Coins）、礼物（Gifts）和创作者奖励分别评估，重点检查 AI 身份是否清楚、用户是否自愿、是否存在诱导打赏',
   ]}/>
   <div className="source-meta"><a href="https://www.tiktok.com/community-guidelines/en/accounts-features" target="_blank" rel="noreferrer">TikTok 功能规则 ↗</a><time>核对 2026-10-26</time></div>
  </section>
  <div className="lab-cards">
   <article className="lab-card"><h2>建议明确身份和打赏条件</h2>
    <TextPoints items={[
     '容易被误认为真人的 AI 互动主播，应持续、清楚地标明 AI 身份，让用户了解情况后自己选择',
     '禁止冒充真人、虚构紧急处境索取礼物，或把停止伤害自己及他人作为付费条件',
     '普通打赏提示、标明身份的角色表演和无威胁的自愿支持，不应只因情感表达而受罚',
    ]}/>
   </article>
   <article className="lab-card lab-decisions"><h2>按行为选择处置方式</h2>
    <section className="lab-decision decision-allow"><h3>自愿送礼可以保留</h3><TextPoints items={['“我是 AI 角色，喜欢表演可以自愿送礼。”身份清楚，无威胁、虚假承诺']}/></section>
    <section className="lab-decision decision-limit"><h3>冒充真人需要纠正</h3><TextPoints items={['冒充真人，承诺付费后建立真实私人关系：记录话术、展示的身份和礼物要求，按严重程度限制收入功能并纠正']}/></section>
    <section className="lab-decision decision-escalate"><h3>自伤威胁交安全团队处理</h3><TextPoints items={['以自伤威胁索取打赏：停止相关收入功能，交由安全团队处理', '单纯求助不按诈骗处理']}/></section>
   </article>
   <article className="lab-card"><h2>各地要求分别核对</h2>
    <TextPoints items={[
     '统一规则先明确需要防止的伤害，再补充各地要求',
     '分别核对欧盟的 AI 身份告知、加州陪伴聊天机器人的定义，以及当地年龄门槛',
     '法律尚无明确规定时，也可以根据风险证据提出平台规则',
    ]}/>
   </article>
   <article className="lab-card"><h2>先观察结果，再小范围试行</h2>
    <ol className="text-points lab-steps">
     <li>让审核员独立判断多语言样本，评审时互不知晓对方结论。</li>
     <li>比较判断是否一致、误判数量、申诉改判数量，以及用户受到的实际伤害。</li>
     <li>先记录判断结果，不实际处罚，再小范围试行。</li>
    </ol>
   </article>
   <article className="lab-card"><h2>打赏抽奖需要专项检查</h2>
    <TextPoints items={[
     '“送指定礼物才可抽现金奖”：核对是否付费参与、随机获奖、奖品性质、地区和年龄',
     '明显欺骗或赌博风险转交专项审核，保留常规 PK 排名和自愿送礼',
     '区分“送礼就赢”的虚假承诺和“不送就伤害自己”的安全事件，分别处理',
     '保留视频及交易证据，允许用户申诉并补充免费参与等事实',
    ]}/>
    <details className="lab-checks"><summary>检查办法</summary><TextPoints items={[
     '政策团队说明规则，法务核对当地要求，产品团队测试操作流程，运营人员独立评审样本',
     '比较各语言的误判、申诉改判和实际伤害',
    ]}/></details>
   </article>
   <article className="lab-card"><h2>多人连麦按各自行为处理</h2>
    <TextPoints items={[
     '嘉宾出现地区限制内容、误导推销或仇恨时，按嘉宾行为、主播知情程度、处置能力和传播范围划分责任',
     '记录内容和当地语境，按严重程度移出嘉宾、限制可见范围、结束直播，或进一步处理账号',
     '统一安全要求和各地限制分别记录，教育、新闻引用、讽刺等情况结合前后内容判断',
    ]}/>
    <details className="lab-checks"><summary>检查办法</summary><TextPoints items={[
     '当地专家复核测试样本',
     '测试嘉宾移除、主持人提示和申诉理由是否易懂',
    ]}/></details>
   </article>
  </div>
 </section>;
}

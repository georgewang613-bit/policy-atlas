import type {ReactNode} from 'react';
import {LMG_URL} from '../../data/live-context.mjs';
import MonetizationLab from './MonetizationLab';
import '../monetization-policy.css';

const sources = {
  kontan: 'https://internasional.kontan.co.id/news/tiktok-tetapkan-standar-lebih-tinggi-untuk-monetisasi-live-seperti-apa',
  warta: 'https://wartaekonomi.co.id/read635230/tiktok-perketat-monetisasi-live-kreator-tak-lagi-otomatis-dapat-cuan',
  community: 'https://ag.ny.gov/sites/default/files/social-media-policy-report/2026-q1q2-tiktok-inc-policy-1.pdf#page=82',
  features: 'https://www.tiktok.com/live/creators/en-US/live-feature-guidelines',
  onboarding: 'https://newsroom.tiktok.com/tiktoklive?lang=en-ZA',
  festival: 'https://newsroom.tiktok.com/tiktok-live-spotlights-creators-at-community-fest-event-in-santa-monica-with-special-performance-by-tinashe?lang=en',
  network: 'https://lf16-live-backstage.tiktokcdn.com/obj/ies-hotsoon-draft-sg/webcast-union-platform-i18n/3f1a6596-7db7-4b75-82a9-7f36dd9e7563.html?d=1791105066852',
  virtualItems: 'https://t.tiktok.com/legal/page/us/virtual-items/en',
};

function Source({url, children}: {url: string; children: ReactNode}) {
  return <a href={url} target="_blank" rel="noreferrer">{children}</a>;
}

const proposals = [
  {
    title: '把新手培训放在第一次收礼之前',
    precedent: 'TikTok 在 2024 年公布了分阶段向新主播开放功能的做法，并在应用内提供违规记录和安全教学。',
    url: sources.onboarding, label: 'TikTok · 新主播入门安排',
    design: '给准备开通礼物的新主播听两段原音。一段是感谢支持，一段是观众拒绝后仍被点名催礼。让主播指出哪句话越界，再把它改成观众可以自由选择的邀请。',
    measure: '比较同地区、相近开播资历的新主播，在首次使用礼物后的 30 天内，每百场经复核成立的施压索礼有多少。同时看正常主播从申请到开通多等了多久。',
  },
  {
    title: '让一场好直播也能赢得展示机会',
    precedent: '2026 年美国 Community Fest 把 Creator Academy 培训、直播任务积分和分组表彰放进同一场活动。8 月 20 日，六个活动等级的区域优胜者在圣莫尼卡受到表彰。',
    url: sources.festival, label: 'TikTok · 美国 Community Fest 活动记录',
    design: '在手艺教学专场，观众可以免费提问，主播任选一个问题现场重做。给有清晰示范、确实回应提问的新人报名展示的机会。评选依据提前公开，礼物金额不计入评分。',
    measure: '抽查获选片段是否真正回答了观众，再看未送礼观众次周是否回来。按直播间人数分组比较，检查活动是否总在奖励已有大观众群的主播。',
  },
  {
    title: '让公会的收益和辅导质量有关',
    precedent: 'TikTok 的创作者网络政策要求公会持续培训主播。在该版条款下，成员因违反 LMG 被暂停收礼达到七天，涉事场次对应的公会任务奖金会被扣除。七天是公会奖金的计算条件。',
    url: sources.network, label: 'TikTok · 公会政策第 1.5、2.1、3.6 节',
    design: '把一次催礼片段交给运营教练。先找出观众明确拒绝的时刻，再和主播排练一次自由参与的互动。下一场抽查主播是否真的改变了做法，让辅导记录能被复核。',
    measure: '用辅导后又开播的主播做分母，看 30 天内同类行为的复发比例。一起检查申诉改判，以及公会是否通过清退新人美化成绩。',
  },
];

export default function MonetizationPolicy() {
  return <article className="monetization-policy" aria-label="LIVE 变现逻辑">
    <section className="summit-spread" aria-labelledby="summit-heading">
      <figure className="summit-quote">
        <figcaption><strong>Junjiao Bai</strong><span>时任 TikTok LIVE 平台信任与生态负责人</span></figcaption>
        <blockquote lang="en">“Monetization is a privilege, not a right.”</blockquote>
        <p>在 Bai 看来，主播投入时间做内容、经营社群。如果循环播放或催礼也能争夺同样的回报，平台就在改变哪一种投入更划算。</p>
        <div className="study-paths"><a href="#live-monetization-lab">试判一场直播</a><a href="#live-incentives">看三种激励设计</a></div>
        <p className="summit-credit"><time dateTime="2026-09-15">2026 年 9 月 15 日</time> · 曼谷 Creator Networks Global Summit</p>
        <div className="study-sources"><Source url={sources.kontan}>Kontan 现场引语</Source><Source url={sources.warta}>Warta Ekonomi 现场报道</Source></div>
      </figure>
      <div className="summit-ideas">
        <h2 id="summit-heading">Bai 怎样解释变现门槛</h2>
        <dl>
          <div><dt>安全 · 礼物会放大哪种伤害？</dt><dd>当礼物鼓励主播把危险挑战继续下去，观众的花费就改变了现场的下一步。Bai 将撤除这种经济诱因列入预防伤害的思路。</dd></div>
          <div><dt>质量 · 观众从实时互动中得到什么？</dt><dd>真实答疑、示范和回应能给观众留下价值。虚假互动和诱导送礼也会制造热闹的数据，却会挤占用心创作的人的机会。</dd></div>
          <div><dt>诚信 · 谁可能从别人的困境中获益？</dt><dd>Bai 提到冲突、悲剧和重大事件。现场报道有公共价值，还要单独判断把伤亡或当事人的处境变成收礼机会是否合适。</dd></div>
        </dl>
        <details><summary>为什么峰会上还谈到公会？</summary><p>据 Kontan 记录，Bai 把公会责任分为内容质量、财务诚信、招募合规和运营行为。公会决定招谁、教什么、用什么业绩评价主播，这些选择会影响许多直播间。</p></details>
      </div>
    </section>

    <section className="rule-layers" aria-labelledby="rule-layers-heading">
      <h2 id="rule-layers-heading">能继续播，能被推荐，能收礼？</h2>
      <div className="rule-layer-grid">
        <div><h3>内容能否继续</h3><p>社区准则（Community Guidelines）适用于所有人。先核实现场发生了什么、谁可能受伤害，再判断是否应中止直播、移除内容或限制观看年龄。</p></div>
        <div><h3>是否符合推荐资格</h3><p>社区准则另列 For You 推荐标准。一场直播可以保留，同时因施压送礼等行为失去推荐资格。能留在平台，并不意味着一定会进入推荐流。</p></div>
        <div><h3>能否使用变现功能</h3><p>LIVE Monetization Guidelines（LMG）评估礼物等经济回报会鼓励什么行为。即使没有达到下播门槛，操纵互动也可使本场失去变现资格。</p></div>
      </div>
      <details><summary>账号准入、功能资格和实际收入</summary>
        <p>开播先看当地年龄和账号条件，具体功能另有 LIVE Feature Guidelines。LMG 处理变现资格。一场 LIVE 若已不符合 For You 推荐资格，也不符合 LIVE 变现资格。反过来，收礼受限时，要另查推荐状态。</p>
        <p>即使获准收礼，实际奖励还取决于相应项目的条件。按美国虚拟物品政策，Diamonds 是评估奖励的因素之一，持有 Diamonds 不会自动产生现金报酬。</p>
        <div className="study-sources"><Source url={sources.features}>LIVE 功能指南</Source><Source url={sources.network}>公会政策第 3 节</Source><Source url={sources.virtualItems}>美国虚拟物品政策第 4 节</Source></div>
      </details>
      <div className="study-sources"><Source url={sources.community}>美国社区准则 · LIVE</Source><Source url={LMG_URL}>LIVE 变现准则</Source><Source url={sources.network}>公会政策第 2.3 节</Source></div>
    </section>

    <MonetizationLab/>

    <section className="incentive-design" id="live-incentives" aria-labelledby="incentive-heading">
      <h2 id="incentive-heading">怎样鼓励主播把下一场做得更好？</h2>
      {proposals.map((proposal, index) => <details key={proposal.title} open={index === 0}>
        <summary>{proposal.title}</summary>
        <dl className="policy-reading">
          <div><dt>已有实践</dt><dd>{proposal.precedent} <Source url={proposal.url}>{proposal.label}</Source></dd></div>
          <div><dt>我的试点设计</dt><dd>{proposal.design}</dd></div>
          <div><dt>如何验收</dt><dd>{proposal.measure}</dd></div>
        </dl>
      </details>)}
    </section>
  </article>;
}

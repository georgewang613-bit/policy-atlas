import type {Atlas} from '../../lib/atlas-schema';
import technology from '../../data/technology.json';

const flowSources=[
 {title:'TikTok 2025 更新公告',url:'https://newsroom.tiktok.com/create-discover-and-connect-on-tiktok-with-simpler-and-stronger-community-guidelines?lang=en',note:'创作者和专家意见、审核培训、通知及生效安排。'},
 {title:'Community Principles',url:'https://www.tiktok.com/community-guidelines/en/community-principles',note:'伤害、表达、人权和当地文化的权衡。'},
 {title:'Accounts and Features',url:'https://www.tiktok.com/community-guidelines/en/accounts-features',note:'LIVE 及功能规则；读取版本为 2025 年。'},
 {title:'Enforcement',url:'https://www.tiktok.com/community-guidelines/en/enforcement/',note:'自动化、人工复核和申诉；可读版本为 2024 年。'},
 {title:'TikTok 2025 DSA 风险报告',url:'https://sf16-va.tiktokcdn.com/obj/eden-va2/zayvwlY_fjulyhwzuhy%5B/ljhwZthlaukjlkulzlp/DSA/DSARiskAssessmentReport-TikTokTechnologyLimited-2025.pdf',note:'第 2、3、5 节：风险评估、利益相关方参与和剩余风险；适用于欧盟报告范围。'}
];
const priorities=[
 {id:'P0',text:'明确近期期限或重大即时伤害，立即升级。'},
 {id:'P1',text:'已适用且关联核心业务，或处于重要实施窗口，优先核对。'},
 {id:'P2',text:'适用性待评估、审议进展或准备事项。'},
 {id:'P3',text:'长期观察。'}
];
export default function Method({data}:{data:Atlas}){
 const regions=[...new Set(data.events.map(e=>e.region))];
 const reviewed=data.reviewedAt?new Date(data.reviewedAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false}):'尚未复核';
 return <section className="method" aria-label="方法与来源">
  <div className="content-grid method-cards">
   <article className="content-card"><h2>研究方法</h2>
    <p>政策事实核对政府、监管、议会和法院材料，媒体用于发现线索；按地区、法案和版本区分提案、法律效力、司法状态及实施日期。</p>
    <p>主题取自 <a href="https://www.tiktok.com/community-guidelines/en/" target="_blank" rel="noreferrer">TikTok 社区准则 ↗</a>，结合 LIVE 打赏、变现场景分类。</p>
    <p>首页默认未定案政策。事件日、抓取日、核验日分别记录，内容随项目版本更新。</p>
    <div className="source-meta"><span>复核 · 北京时间 {reviewed}</span></div>
   </article>
   <article className="content-card"><h2>行动优先级</h2>
    <dl className="priority-list">{priorities.map(p=><div key={p.id}><dt className={'badge '+p.id}>{p.id}</dt><dd>{p.text}</dd></div>)}</dl>
   </article>
  </div>
  <div className="method-folds">
   <details className="method-fold"><summary><span>阅读说明</span></summary><div className="fold-content">
    <p>阶段表示法律进度，P0–P3 表示行动优先级。实施依据、日期冲突、适用范围和排序理由见事件详情。</p>
    <p>空白地图区域暂无匹配记录。时间线按节点排列，间距不代表时长。</p>
    <p>独立 LIVE 政策研究。事实来自公开来源，规则建议为项目分析，不代表 TikTok 内部决定或法律签批。实验室案例处于设计、评估阶段。</p>
    <p>执行前复核当地法律、后续修订和司法状态。</p>
   </div></details>
   <details className="method-fold"><summary><span>覆盖范围</span><small>{data.events.length} 条 · {regions.length} 地区</small></summary><div className="fold-content">
    <p>{regions.join('、')}。</p>
    <p>地图仅作事件导航：<a href="https://github.com/johan/world.geo.json" target="_blank" rel="noreferrer">世界边界 ↗</a> · <a href="https://github.com/PublicaMundi/MappingAPI" target="_blank" rel="noreferrer">美国州界 ↗</a></p>
   </div></details>
   <details className="method-fold"><summary><span>规则版本</span></summary><div className="fold-content">
    <p>流程研究核对于 2026-10-27。可读取的社区准则为 2025 版；2026 版官方正文读取受限，版本差异待核对。</p>
    <p>LIVE Monetization Guidelines 正文待核验；Coins、Gifts、Diamonds 和创作者奖励分别适用各自条款。</p>
    <p>流程按公开材料归纳。LIVE 单项规则的审批人、固定顺序和上线周期未公开；团队分工、准备材料和推进条件为项目建议。</p>
   </div></details>
   <details className="method-fold"><summary><span>流程依据</span><small>{flowSources.length}</small></summary><div className="fold-content source-list">{flowSources.map(s=><a className="sourcerow" key={s.url} href={s.url} target="_blank" rel="noreferrer"><span>{s.title} ↗<small>{s.note}</small></span></a>)}</div></details>
   <details className="method-fold"><summary><span>技术来源</span><small>{technology.items.reduce((n,x)=>n+x.sources.length,0)}</small></summary><div className="fold-content source-list">{technology.items.flatMap(item=>item.sources.map(source=><a className="sourcerow" key={item.id+source.url} href={source.url} target="_blank" rel="noreferrer"><span>{item.title}</span><small>{source.publisher} ↗</small></a>))}</div></details>
   <details className="method-fold"><summary><span>政策来源</span><small>{data.events.length}</small></summary><div className="fold-content source-list">{data.events.map(e=><a className="sourcerow" key={e.id} href={e.source} target="_blank" rel="noreferrer"><span>{e.region} / {e.title}</span><small>{new URL(e.source).hostname} ↗</small></a>)}</div></details>
  </div>
 </section>;
}

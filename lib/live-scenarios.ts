// Keep detailed source tags in policy records; group only the browsing filter.
export const liveScenarios = ['账号与年龄', '观看与互动', '礼物与商业化', 'AI与虚拟主播', '内容安全', '数据与隐私'];
export function scenarioGroups(tags: string[]): string[] {
 return [...new Set(tags.map(tag => {
  if (/数据|个人信息|Cookie|监管信息/.test(tag)) return '数据与隐私';
  if (/AI|合成|换脸|陪伴/.test(tag)) return 'AI与虚拟主播';
  if (/礼物|变现|PK|抽奖|激励|推广|商业|带货|品牌|引流|创作者合作/.test(tag)) return '礼物与商业化';
  if (/账号|年龄|家长|主播身份/.test(tag)) return '账号与年龄';
  if (/危机|举报|申诉|受害者|选举/.test(tag)) return '内容安全';
  return '观看与互动';
 }))];
}

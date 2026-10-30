import {organizationNames} from './organizations';

// Short Chinese labels for navigation. Official identifiers remain in source records.
export function displayTitle(title:string){
 return organizationNames(title,false)
  .replace(/^Digital Duty of Care/,'平台安全责任')
  .replace(/^Digital Fairness Act/,'数字公平法案')
  .replace(/^My Feed, My Way：/,'')
  .replace(/^EU KIDS Act/,'欧盟儿童网络保护法案')
  .replace(/^Online Safety Bill/,'网络安全法案')
  .replace(/^KOSA：/,'儿童网络安全法案：')
  .replace(/^PP TUNAS：/,'儿童网络保护规定：')
  .replace(/^PDPL/,'个人数据保护法');
}

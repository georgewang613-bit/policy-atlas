// Display names only: research records, quotations and source URLs stay unchanged.
const organizations = [
 {abbr:'Ofcom',name:'英国通信管理局',aliases:['英国 Ofcom','Ofcom'],source:'https://www.ofcom.org.uk/about-ofcom/what-we-do/what-is-ofcom'},
 {abbr:'FTC',name:'美国联邦贸易委员会',aliases:['美国 FTC','Federal Trade Commission','FTC'],source:'https://www.ftc.gov/about-ftc'},
 {abbr:'DOJ',name:'美国司法部',aliases:['美国 DOJ','US Department of Justice','DOJ'],source:'https://www.justice.gov/about'},
 {abbr:'ANPD',name:'巴西国家数据保护局',aliases:['巴西 ANPD','ANPD'],source:'https://www.gov.br/anpd/pt-br'},
 {abbr:'EESC',name:'欧洲经济和社会委员会',aliases:['EESC'],source:'https://www.eesc.europa.eu/en/about'},
 {abbr:'EPRS',name:'欧洲议会研究服务处',aliases:['European Parliamentary Research Service','EPRS'],source:'https://www.europarl.europa.eu/EPRS/services/en'},
 {abbr:'FCCPC',name:'尼日利亚联邦竞争和消费者保护委员会',aliases:['尼日利亚 FCCPC','FCCPC'],source:'https://fccpc.gov.ng/about-us/the-commission/'},
 {abbr:'MCMC',name:'马来西亚通信及多媒体委员会',aliases:['马来西亚 MCMC','MCMC'],source:'https://www.mcmc.gov.my/skmmgovmy/media/General/PressRelease/MS_NEW-REGULATORY-FRAMEWORK-FOR-A-SAFER-INTERNET-FOR-CHILDREN-AND-FAMILIES.pdf'},
 {abbr:'MDDI',name:'新加坡数码发展及新闻部',aliases:['Singapore MDDI','新加坡 MDDI','MDDI'],source:'https://www.mddi.gov.sg/'},
 {abbr:'MSIT',name:'韩国科学技术信息通信部',aliases:['韩国 MSIT','MSIT'],source:'https://english.msit.go.kr/eng/contents/cont.do?mId=20&mPid=19&sCode=eng'},
 {abbr:'SDAIA',name:'沙特数据和人工智能管理局',aliases:['沙特 SDAIA','SDAIA'],source:'https://my.gov.sa/en/content/information-policy'},
 {abbr:'NDMO',name:'沙特国家数据管理办公室',aliases:['沙特 NDMO','NDMO'],source:'https://my.gov.sa/en/content/information-policy'},
 {abbr:'MinLaw',name:'新加坡律政部',aliases:['Singapore MinLaw','新加坡 MinLaw','MinLaw'],source:'https://www.mlaw.gov.sg/about-us/what-we-do/intellectual-property-policy/'},
 {abbr:'IPOS',name:'新加坡知识产权局',aliases:['Singapore IPOS','新加坡 IPOS','IPOS'],source:'https://www.mlaw.gov.sg/about-us/what-we-do/intellectual-property-policy/'},
 {abbr:'Komdigi',name:'印度尼西亚通信和数字事务部',aliases:['印尼 Komdigi','Komdigi'],source:'https://www.komdigi.go.id/'},
 {abbr:'ICO',name:'英国信息专员办公室',aliases:['英国 ICO','ICO'],source:'https://ico.org.uk/about-the-ico/'},
 {abbr:'eSafety',name:'澳大利亚网络安全专员办公室',aliases:['澳大利亚 eSafety','eSafety Commissioner','eSafety'],source:'https://www.esafety.gov.au/about-us'},
 {abbr:'OAG',name:'纽约州总检察长办公室',aliases:['New York OAG','纽约州 OAG','OAG'],source:'https://ag.ny.gov/'},
 {abbr:'GPO',name:'美国政府出版局',aliases:['U.S. Government Publishing Office','GPO'],source:'https://www.gpo.gov/who-we-are/our-agency'},
 {abbr:'SPF',name:'新加坡警察部队',aliases:['Singapore Police Force','SPF'],source:'https://www.police.gov.sg/'},
];
const escape=(text:string)=>text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/ +/g,'\\s*');
const terms=organizations.map(org=>({...org,pattern:new RegExp(`(?<![A-Za-z/])(?:${org.aliases.map(escape).join('|')})(?![A-Za-z])`,'g')}));

export function organizationNames(text:string,abbreviations=true){
 // C2PA in prose may name the standard. Only expand the organization as a source label.
 if(text==='C2PA')return '内容来源和真实性联盟'+(abbreviations?'（C2PA）':''); // https://c2pa.org/
 return terms.reduce((value,org)=>{
  let seen=false;
  return value.replace(org.pattern,(match:string,offset:number)=>{
   const prefix=value.slice(0,offset);
   if(prefix.endsWith(org.name+'（')||prefix.endsWith(org.name+'('))return match;
   const label=org.name+(abbreviations&&!seen?`（${org.abbr}）`:'');
   seen=true;
   return label;
  });
 },text);
}

export function classificationMetrics(tp:number, fp:number, fn:number, tn:number) {
 if (![tp,fp,fn,tn].every(n=>Number.isSafeInteger(n)&&n>=0)) throw new Error('Counts must be non-negative integers');
 const ratio=(n:number,d:number)=>d===0?null:n/d;
 return {precision:ratio(tp,tp+fp), recall:ratio(tp,tp+fn), fpr:ratio(fp,fp+tn), falseDiscovery:ratio(fp,tp+fp)};
}
export function differenceInDifferences(treatedBefore:number,treatedAfter:number,controlBefore:number,controlAfter:number) {
 return (treatedAfter-treatedBefore)-(controlAfter-controlBefore);
}

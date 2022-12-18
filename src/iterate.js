import { uncurry,curry_any } from './curry.js'
function __boom(args){
    let now=args.shift().map(x=>[x]),upper=[];
    args.forEach(v=>{
        v.forEach(u=>now.forEach(x=>upper.push([...x,u])));
        now=[...upper];
        upper=[];
    });
    return now;
}
function iterate(fun,...args){
    let uncurryed=(fun.curryed===true)?uncurry(fun):fun;
    let iterateList=[],result=[];
    args.forEach(v=>iterateList.push(Array.isArray(v)?v:[v]));
    __boom(iterateList).forEach(v=>result.push(uncurryed.apply(null,v)));
    return result;
}
const map=curry_any((rule,arr)=>{
    return arr.map(v=>rule(v));
});
const flatMap=curry_any((rule,arr)=>{
    return arr.reduce((x,y)=>x.concat(rule(y)),[]);
});
const foreach=curry_any((rule,arr)=>{
    arr.forEach(rule);
});
const reduce=curry_any((fun,init,arr)=>{
    return init!=undefined?arr.reduce(fun,init):arr.reduce(fun);
});
const fold=curry_any((init,fun,cnt)=>{
    while(cnt--)init=fun(init);
    return init;
});
const scan=curry_any((init,fun,cnt)=>{
    let result=[];
    while(cnt--)result.push(init=fun(init));
    return result;
});
export { iterate,map,flatMap,foreach,reduce,fold,scan };    
import { __summon } from "./summon.js"
import { uncurry } from "./curry.js";
const _={_P:1};
function bind(func,...args){
    if(func.curryed===true)func=uncurry(func);
    let pos=[],nowarg=[],cnt=0;
    args.forEach((v,i)=>{
        if(v==_)++cnt,pos.push(i);
        nowarg.push(v);
    });
    return __summon(cnt,function(){
        let a=Object.values(arguments),arg=[...nowarg];
        pos.forEach(v=>arg[v]=a.shift());
        return func.apply(this,arg);
    });
}
export { _,bind };
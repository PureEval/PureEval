import { __summon } from "./summon.js"
import { uncurry } from './curry.js'
function compose(...fun){
    if(fun.length===1)return fun[0];
    if(fun[fun.length-1].curryed===true)fun[fun.length-1]=uncurry(fun[fun.length-1]);
    return __summon(fun[fun.length-1].length,fun.reduce((a,b)=>(...args)=>a(b(...args))));
}
function pipe(...fun){
    if(fun.length==1)return fun[0];
    if(fun[0].curryed===true)fun[0]=uncurry(fun[0]);
    let f=function(){
        let result=fun.shift().apply(this,arguments);
        return fun.reduce((p,c)=>c(p),result);
    }
    return __summon(fun[0].length,f);
}
export { compose,pipe }
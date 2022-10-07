import { __summon } from "./summon.js"
/**
* 人畜无害的可爱占位符，用于 {@link bind} 和 {@link match}
*/
const _={_P:1};
/**
 * 将函数的部分参数固定，若传入的函数已被柯里化，则将会自动解开
 * @param {Function} fun - 需要逆柯里化的函数
 * @param {...Any} args - 需要传入的参数，若为固定函数则直接传入值，否则传入 {@link _}作为占位符使用
 * @example
 * let f=(a,b)=>a+b;
 * console.log(bind(f,1,_)(2));//3
 * @returns {Function} 
 */
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
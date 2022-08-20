import { curry_any } from "./curry.js";
/**
* 人畜无害的可爱占位符，用于 {@link bind}。
*/
const _={_P:1};
/**
 * 将函数的部分参数固定
 * @param {Function} fun - 需要逆柯里化的函数
 * @param {...Any} args - 需要传入的参数，若为固定函数则直接传入值，否则传入 {@link _}作为占位符使用
 * @example
 * let f=(a,b)=>a+b;
 * console.log(bind(f,1,_)(2));//3
 * @returns {Function} 
 */
function bind(func,...args){
    let arg=[],pos=[],nowarg=[];
    for(let i in args){
        if(args[i]==_){
            arg.push("a"+i);
            pos.push(i);
            nowarg.push(0);
            continue;
        }
        nowarg.push(args[i]);
    }
    return (curry_any(new Function(["Fu","Ar","_F"],arg,`let _a=Object.values(arguments).splice(3);for(let i in Ar)_F[Ar[i]]=_a.shift();return Fu.apply(this,_F);`)))(func,pos,nowarg);
}
export { _,bind };
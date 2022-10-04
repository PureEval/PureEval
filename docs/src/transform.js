import { __summon } from "./summon.js"
import { uncurry } from './curry.js'
/**
 * <pre>
 * 合成一串函数为一个新函数，从右到左执行，前一个函数的返回值作为下一个函数的参数
 * （从右到左）第一个函数可以是任意元函数，但接下来的函数必须是单元函数
 * 若传入的第一个函数被柯里化过，则将会被解柯里化
 * 注意：compose 的返回值不会被默认柯里化，但可以手动柯里化
 * 实际上该函数为反向版本的 {@link pipe}
 * </pre>
 * @param {...Function} fun - 需要合并的函数排列
 * @example
 * console.log(compose(mul(8),add(1))(1));//16
 * @returns {Function} 
 */
function compose(...fun){
    if(fun.length===1)return fun[0];
    if(fun[fun.length-1].curryed===true)fun[fun.length-1]=uncurry(fun[fun.length-1]);
    return __summon(fun[fun.length-1].length,fun.reduce((a,b)=>(...args)=>a(b(...args))));
}
/**
 * <pre>
 * 返回一个管道函数，从左到右执行函数，前一个函数的返回值作为下一个函数的参数
 * 第一个函数可以是任意元函数，但接下来的函数必须是单元函数
 * 若传入的第一个函数被柯里化过，则将会被解柯里化
 * 注意：pipe 的返回值不会被默认柯里化，但可以手动柯里化
 * 实际上该函数为反向版本的 {@link compose}。
 * </pre>
 * @param {...Function} fun 需要执行的函数排列
 * @example
 * console.log(pipe(add(1),add(114512))(1))//114514
 * @returns {Function} 
 */
function pipe(...fun){
    if(fun.length==1)return fun[0];
    if(fun[0].curryed===true)fun[0]=uncurry(fun[0]);
    let f=function(){
        let result=fun.shift().apply(this,arguments);
        return fun.reduce((p,c)=>c(p),result);
    }
    return __summon(fun[0].length,f);
}
/**
 * <pre>
 * 给出一个函数和一个参数数组，调用该函数，数组作为参数，返回值为被调用函数的返回值
 * 若传入的函数已被柯里化，则将会自动解开
 * </pre>
 * @param {fun} fun 需要调用的函数
 * @param {Array} 参数数组
 * @example
 * console.log(call(add,[1,2]));//3
 * @example
 * console.log(call(add)([1,2]));//3
 * @returns {Any} 
 */
function call(fun,args){
    return fun.apply(this,args);
}
export { compose,pipe,call }
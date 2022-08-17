/**
 * 合成一串函数为一个新函数，从右到左执行，前一个函数的返回值作为下一个函数的参数。
 * （从右到左）第一个函数可以是任意元函数，但接下来的函数必须是单元函数。
 * 特别的，pipe 返回的函数不支持被柯里化，而是强制多元。
 * 实际上该函数为反向版本的 {@link_pipe}。
 * @param {...Function} fun - 需要合并的函数排列
 * @example
 * console.log(compose(mul(8),add(1))(1));//16
 * @returns {Function} 
 */
function compose(...fun){
    if(fun.length===1)return fun[0];
    return fun.reduce((a,b)=>(...args)=>a(b(...args)))
}
export { compose }
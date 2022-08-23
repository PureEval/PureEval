/**
 * 完全柯里化一个函数，如果需要仍希望可以多元函数的方式调用，可见 {@link curry_any}。
 * @param {Function} fun - 需要柯里化的函数
 * @example
 * let f=(a,b)=>a+b;
 * console.log(curry(f)(114513,1));//完全柯里化下不允许，如需使用可见 curry_any
 * console.log(curry(f)(114513)(1));//114514
 * @returns {Function} 
 */
 function curry(fun){
    const summon=(argv,surplus)=>(surplus?arg=>summon([...argv, arg],surplus-1):fun(...argv));
    const result=summon([],fun.length);
    result.origin=fun;
    result.curryed=true;
    result.len=fun.length;
    return result;
}
/**
 * 不完全柯里化一个函数，如果需要完全柯里化，可见 {@link curry}。
 * @param {Function} fun - 需要柯里化的函数
 * @example
 * let f=(a,b)=>a+b;
 * console.log(curry_any(f)(114513,1));//114514
 * console.log(curry_any(f)(114513)(1));//114514
 * @returns {Function} 
 */
 function curry_any(fun,...argv){
    if(fun.length===argv.length)return fun.call(null,...argv);
    else{
        let result=curry_any.bind(null,...arguments);
        result.curryed=true;
        result.len=fun.length;
        result.origin=fun;
        return result;
    }
}
/**
 * 逆柯里化一个由 {@link curry} 或  {@link curry_any} 柯里化后的函数
 * @param {Function} fun - 需要逆柯里化的函数
 * @example
 * let f=curry((a,b)=>a+b);
 * console.log(uncurry(f)(114513,1));//114514
 * @returns {Function} 
 */
function uncurry(fun){
    return fun.origin;
}
export { curry,curry_any,uncurry };
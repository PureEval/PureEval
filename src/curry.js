function curry(fun,save=true){
    const summon=(args,rest)=>(rest?arg=>summon([...args, arg],rest-1):fun(...args));
    const result=summon([],fun.length);
    if(save)result.origin=fun;
    return result;
}
function curry_any(fn,...args){
    if(fn.length===args.length)return fn.call(null,...args);
    else return curry_any.bind(null,...arguments);
}
function uncurry(fun){
    return fun.origin;
}
export { curry,curry_any,uncurry };
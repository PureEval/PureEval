function curry(fun,save=true){
    const summon=(argv,surplus)=>(surplus?arg=>summon([...argv, arg],surplus-1):fun(...argv));
    const result=summon([],fun.length);
    if(save)result.origin=fun;
    return result;
}
function curry_any(fun,...argv){
    if(fun.length===argv.length)return fun.call(null,...argv);
    else return curry_any.bind(null,...arguments);
}
function uncurry(fun){
    return fun.origin;
}
export { curry,curry_any,uncurry };
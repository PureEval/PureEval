function compose(...fun){
    if(fun.length===1)return fun[0];
    return fun.reduce((a, b)=>(...args)=>a(b(...args)))
}
export { compose }
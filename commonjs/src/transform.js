function compose(...fun){
    if(fun.length===1)return fun[0];
    return fun.reduce((a,b)=>(...args)=>a(b(...args)))
}
function pipe(...fun){
    let args=fun;
    return function(){
        let result=args.shift().apply(this,arguments);
        return args.reduce((p,c)=>c(p),result);
    }
}
export { compose,pipe }
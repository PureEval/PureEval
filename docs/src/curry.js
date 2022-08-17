/**
 * 完全柯里化一个函数，如果需要仍希望可以多元函数的方式调用，可见 {@link curry_any}
 * @param {Function} fun - 需要柯里化的函数
 * @param {Boolean} save=true - 是否保留原函数，不保留则无法对该函数使用 {@link uncurry} 方法
 * @example
 * let f=(a,b)=>a+b;
 * console.log(curry(f)(114513,1));//完全柯里化下不允许，如需使用可见 curry_any
 * console.log(curry(f)(114513)(1));//114514
 * @returns {Function} 
 */
function curry(fun,save=true){
    let args="",i=0,s=fun.toString(),result,flag=0;
    if(s.substring(0,8)=='function'){
        while(s[i]!='(')++i;
        for(++i;s[i]!='{';++i)args+=s[i];
    }else{
        while(!(('a'<=s[i]&&s[i]<='z')||('A'<=s[i]&&s[i]<='Z')))++i;
        for(;s[i]!='>';++i)args+=s[i];
        while(++i){
            if(s[i]=='{')break;
            if(s[i]!='{'&&s[i]!=' '){
                flag=1;
                break;
            }
        }
    }
    args=args.replace(/[^,|^\[a-zA-Z0-9\]]/g,'').split(',');
    if(flag==0)result=new Function(args[args.length-1],s.substring(i+1,s.length-1));
    else result=new Function(args[args.length-1],`return ${s.substring(i,s.length)}`);
    for(let j=args.length-2;j>=0;--j)result=new Function(args[j],`return ${result.toString()}`);
    if(save)result.origin=fun;
    return result;
}
/**
 * 不完全柯里化一个函数，如果需要完全柯里化，可见 {@link curry}
 * @param {Function} fun - 需要柯里化的函数
 * @param {Boolean} save=true - 是否保留原函数，不保留则无法对该函数使用 {@link uncurry} 方法
 * @example
 * let f=(a,b)=>a+b;
 * console.log(curry_any(f)(114513,1));//114514
 * console.log(curry_any(f)(114513)(1));//114514
 * @returns {Function} 
 */
function curry_any(fun,save=true){
    let args="",i=0,s=fun.toString(),result,flag=0,head="";
    if(s.substring(0,8)=='function'){
        while(s[i]!='(')++i;
        for(++i;s[i]!='{';++i)args+=s[i];
    }else{
        while(!(('a'<=s[i]&&s[i]<='z')||('A'<=s[i]&&s[i]<='Z')))++i;
        for(;s[i]!='>';++i)args+=s[i];
        while(++i){
            if(s[i]=='{')break;
            if(s[i]!='{'&&s[i]!=' '){
                flag=1;
                break;
            }
        }
    }
    args=args.replace(/[^,|^\[a-zA-Z0-9\]]/g,'').split(',');
    args.forEach(v=>head+=`${v}=${v}[0];`);
    if(flag==0)result=new Function(`...${args[args.length-1]}`,head+s.substring(i+1,s.length-1));
    else result=new Function(`...${args[args.length-1]}`,`${head}return ${s.substring(i,s.length)}`);
    for(let j=args.length-2;j>=0;--j)result=new Function(`...${args[j]}`,`let u=${result.toString()},i,t=${args[j]};if(t.length>1)for(i=1;i<t.length;++i)u=u(t[i]);return u;`);
    if(save)result.origin=fun;
    return result;
}
/**
 * 逆柯里化一个函数，要求该函数被 {@link curry} 或 {@link curry_any} 柯里化时 save 参数为 true
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
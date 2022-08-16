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
    for(let j=args.length-2;j>=0;--j)result=new Function(`...${args[j]}`,`let u=${result.toString()},i;if(${args[j]}.length>1)for(i=1;i<${args[j]}.length;++i)u=u(${args[j]}[i]);return u;`);
    if(save)result.origin=fun;
    return result;
}
function uncurry(fun){
    return fun.origin;
}
export { curry,curry_any,uncurry };
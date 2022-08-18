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
    for(let j=args.length-2;j>=0;--j)result=new Function(`...${args[j]}`,`let u=${result.toString()},i,_t=${args[j]};if(_t.length>1)for(i=1;i<_t.length;++i)u=u(_t[i]);return u;`);
    if(save)result.origin=fun;
    return result;
}
function uncurry(fun){
    return fun.origin;
}
const filter=curry_any((arr,rule)=>{
    return arr.filter(v=>{
        return rule(v);
    });
},0);
const reject=curry_any((arr,rule)=>{
    return arr.filter(v=>{
        return !rule(v);
    });
},0);
const shied=curry_any((v,arr)=>{
    if(!Array.isArray(v))v=[v];
    return arr.filter(val=>{
        return !v.includes(val);
    });
},0);
const choose=curry_any((v,arr)=>{
    if(!Array.isArray(v))v=[v];
    return arr.filter(val=>{
        return v.includes(val);
    });
},0)
function __iterate(fun,args){
    if(args.length==1){
        if(Array.isArray(args[0]))args[0].forEach(v=>fun(v));
        else fun(args[0]);
        return;
    }
    if(Array.isArray(args[0])){
        let list=args[0];
        args.shift();
        list.forEach(v=>__iterate(fun(v),args));
    }else{
        let temp=args[0];
        args.shift();
        __iterate(fun(temp),args);
    }
}
function iterate(fun,...args){
    let curryed=curry(fun,0);
    __iterate(curryed,args);
}
const map=curry_any((arr,rule)=>{
    return arr.map(v=>rule(v));
});
const foreach=curry_any((arr,rule)=>{
    arr.forEach(rule);
});
const reduce=curry_any((arr,fun,init)=>{
    return init!=undefined?arr.reduce(fun,init):arr.reduce(fun);
});
function pipe(...fun){
    let args=fun;
    return function(){
        let result=args.shift().apply(this,arguments);
        return args.reduce((p,c)=>c(p),result);
    }
}
const add=curry_any((a,b)=>a+b,0);
const minus=curry_any((a,b)=>a-b,0);
const mul=curry_any((a,b)=>a*b,0);
const div=curry_any((a,b)=>a/b,0);
const mod=curry_any((a,b)=>a%b,0);
const rema=curry_any((a,b)=>(a%b+b)%b,0);
const power=curry_any((a,b)=>Math.pow(a,b),0);
const either=curry_any((a,b)=>a||b,0);
const both=curry_any((a,b)=>a&&b,0);
const gt=curry_any((a,b)=>a>b,0);
const gte=curry_any((a,b)=>a>=b,0);
const lt=curry_any((a,b)=>a<b,0);
const lte=curry_any((a,b)=>a<=b,0);
const negate=a=>-a;
const upper=(a,b)=>a<b?-1:a>b?1:0;
const under=(a,b)=>a>b?-1:a<b?1:0;
const sort=curry_any((arr,rule)=>{
    if(rule!=undefined)return arr.sort(rule);
    else return arr.sort();
},0);
function median(arr){
    let w=2-arr.length%2,x=(arr.length-w)>>1;
    return average(Array.prototype.slice.call(arr,0).sort((a,b)=>a<b?-1:a>b?1:0).slice(x,x+w));
}
function sum(arr){
    return arr.reduce((x,y)=>x+y);
}
function average(arr){
    return sum(arr)/arr.length;
}
const range=curry_any((start,end)=>{
    if(typeof start==='number'&&typeof end==='number')
        return new Array(end-start+1).fill(start).map((v,i)=>start+i);
    else if(typeof start==='string'&&typeof end==='string'){
        let l=start.charCodeAt(),r=end.charCodeAt();
        return new Array(r-l+1).fill(start).map((v,i)=>String.fromCharCode(l+i));
    }
},0);
function compose(...fun){
    if(fun.length===1)return fun[0];
    return fun.reduce((a,b)=>(...args)=>a(b(...args)))
}
module.exports={curry,curry_any,uncurry,filter,reject,shied,choose,iterate,map,foreach,reduce,pipe,add,minus,mul,div,mod,rema,power,either,both,gt,gte,lt,lte,upper,under,sort,sum,negate,average,median,range,compose};
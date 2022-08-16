import {curry} from './curry.js'
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
    let curryed=curry(fun);
    __iterate(curryed,args);
}
function map(arr,rule){
    return arr.map(v=>rule(v));
}
function foreach(arr,v){
    arr.forEach(v);
}
function reduce(arr,fun,init){
    return init!=undefined?arr.reduce(fun,init):arr.reduce(fun);
}
export { iterate,map,foreach,reduce };
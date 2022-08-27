import { curry, curry_any } from './curry.js'
const either=curry_any((a,b)=>a||b);
const both=curry_any((a,b)=>a&&b);
const gt=curry_any((a,b)=>a>b);
const gte=curry_any((a,b)=>a>=b);
const lt=curry_any((a,b)=>a<b);
const lte=curry_any((a,b)=>a<=b);
const equal=curry_any((a,b)=>a==b);
const when=curry_any((a,b)=>{
    return function(obj){
        if(a(obj))return b();
    }
});
const unless=curry_any((a,b)=>{
    return function(obj){
        if(!a(obj))return b();
    }
});
const ifElse=curry_any((a,b,c)=>{
    return function(obj){
        if(a(obj))return b();
        else return c();
    }
});
const when_v=curry_any((a,b)=>{
    return function(obj){
        if(a(obj))return b(obj);
    }
});
const unless_v=curry_any((a,b)=>{
    return function(obj){
        if(!a(obj))return b(obj);
    }
});
const ifElse_v=curry_any((a,b,c)=>{
    return function(obj){
        if(a(obj))return b(obj);
        else return c(obj);
    }
});
export { either,both,gt,gte,lt,lte,equal,when,unless,ifElse,when_v,unless_v,ifElse_v }
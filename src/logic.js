import { curry_any } from './curry.js'
import { reduce } from './iterate.js';
const either=curry_any((a,b)=>a||b);
const both=curry_any((a,b)=>a&&b);
const id=v=>v;
const gt=curry_any((a,b)=>a>b);
const gte=curry_any((a,b)=>a>=b);
const lt=curry_any((a,b)=>a<b);
const lte=curry_any((a,b)=>a<=b);
const equal=curry_any((a,b)=>a==b);
const arr_equal=curry_any((a,b)=>{
    return a.length===b.length?true:reduce((p,c,i)=>{
        if(p==false||c!=b[i])return false;
        else return true;
    },true)(a);
});
const common=v=>v;
const always=v=>()=>v;
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
export { either,both,id,gt,gte,lt,lte,equal,arr_equal,common,always,when,unless,ifElse,when_v,unless_v,ifElse_v }
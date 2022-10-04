import { curry_any } from './curry.js'
const add=curry_any((a,b)=>a+b);
const minus=curry_any((a,b)=>a-b);
const mul=curry_any((a,b)=>a*b);
const div=curry_any((a,b)=>a/b);
const mod=curry_any((a,b)=>a%b);
const rema=curry_any((a,b)=>(a%b+b)%b);
const power=curry_any((a,b)=>Math.pow(a,b));
const negate=a=>-a;
const upper=(a,b)=>a<b?-1:a>b?1:0;
const under=(a,b)=>a>b?-1:a<b?1:0;
const sort=curry_any((arr,rule)=>{
    if(rule!=undefined)return arr.sort(rule);
    else return arr.sort();
});
function median(arr){
    let w=2-(arr.length&1),x=(arr.length-w)>>1;
    return average(Array.prototype.slice.call(arr,0).sort((a,b)=>a<b?-1:a>b?1:0).slice(x,x+w));
}
function sum(arr){
    return arr.reduce((x,y)=>x+y);
}
function max(arr){
    return arr.reduce((x,y)=>x>y?x:y);
}
function min(arr){
    return arr.reduce((x,y)=>x<y?x:y);
}
function average(arr){
    return sum(arr)/arr.length;
}
export { add,minus,mul,div,mod,rema,power,sort,upper,under,sum,negate,average,median,max,min };
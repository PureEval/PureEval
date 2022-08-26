import { curry, curry_any } from './curry.js'
const either=curry_any((a,b)=>a||b);
const both=curry_any((a,b)=>a&&b);
const gt=curry_any((a,b)=>a>b);
const gte=curry_any((a,b)=>a>=b);
const lt=curry_any((a,b)=>a<b);
const lte=curry_any((a,b)=>a<=b);
const equal=curry_any((a,b)=>a==b);
const when=curry_any((a,b)=>{if(a)b();});
const whennot=curry_any((a,b)=>{if(!a)b();});
export { either,both,gt,gte,lt,lte,equal,when,whennot }
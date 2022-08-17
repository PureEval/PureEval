import { curry_any } from "./curry.js";
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
export { filter,reject,shied,choose };
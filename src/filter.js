function filter(arr,rule){
    return arr.filter(v=>{
        return rule(v);
    });
}
function shied(v,arr){
    if(!Array.isArray(v))v=[v];
    return arr.filter(val=>{
        return !v.includes(val);
    });
}
function choose(v,arr){
    if(!Array.isArray(v))v=[v];
    return arr.filter(val=>{
        return v.includes(val);
    });
}
export { filter,shied,choose };
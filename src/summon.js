function __summon(total,fn){
    let result;
    eval(`result=function(${Array(total).fill(0).map((v,i)=>"a"+i).toString()}){fn.apply(this,arguments)}`);
    return result;
}
export { __summon };
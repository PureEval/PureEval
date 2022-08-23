import { curry } from './curry.js'
function __deepClone(obj){
    let _obj=JSON.stringify(obj),
    objClone=JSON.parse(_obj);
    return objClone;
}
function __iterate(fun,args){
    let u=__deepClone(args);
    if(u.length==1){
        if(Array.isArray(u[0]))u[0].forEach(v=>fun(v));
        else fun(u[0]);
        return;
    }
    if(Array.isArray(u[0]))u.shift().forEach(v=>__iterate(fun(v),u));
    else __iterate(fun(u.shift()),u);
}
/**
 * 对函数进行迭代
 * @param {Function} fun - 被迭代的函数
 * @param {...Any} args - 给予函数的参数，可以是序列或值，若为序列则将会依序迭代，多个序列之间会发生组合
 * @example
 * let f=(a,b)=>{process.stdout.write(a+b+' ')};
 * iterate(f,range(1,5),range(2,3));//3 4 4 5 5 6 6 7 7 8
 * @returns {void} 
 */
function iterate(fun,...args){
    let curryed=curry((fun.curryed===true)?uncurry(fun):fun);
    __iterate(curryed,args);
}
/**
 * 对函数每一位进行处理，并返回处理后的新序列
 * @param {Array} arr - 被处理的序列
 * @param {Function} rule - 用以处理的单元函数，一个参数代表元素
 * @example
 * let arr=[1,2,3,4,5];
 * console.log(map(arr,v=>v+1);//[ 2, 3, 4, 5, 6 ]
 * @example
 * let arr=[1,2,3,4,5];
 * console.log(map(arr)(v=>v+1));//[ 2, 3, 4, 5, 6 ]
 * @returns {Array} 
 */
 function map(arr,rule){
    return arr.map(v=>rule(v));
}
/**
 * 遍历列表的每一位，并做出操作
 * @param {Array} arr - 被遍历的序列
 * @param {Function} rule - 用以处理的单元函数，一个参数代表元素
 * @example
 * let arr=[1,2,3,4,5];
 * foreach(arr,v=>process.stdout.write(v+' '));//1 2 3 4 5
 * @example
 * let arr=[1,2,3,4,5];
 * foreach(arr)(v=>process.stdout.write(v+' '));//1 2 3 4 5
 * @returns {void} 
 */
function foreach(arr,v){
    arr.forEach(v);
}
/**
 * 遍历序列的每一位带入函数，并将每次执行后的函数结果向下传递
 * @param {Array} arr - 被遍历的序列
 * @param {Function} func - 用以处理的双元函数，第一个参数代表累计值，第二个参数代表当前元素的值
 * @param {Any} init 运算的初值值
 * @example
 * let arr=[1,2,3,4,5];
 * console.log(reduce(arr,(p,c)=>{p+v},0))//15
 * @example
 * let arr=[1,2,3,4,5];
 * console.log(reduce(arr)((p,c)=>p+c)(0))//15
 * @returns {any} 
 */
function reduce(arr,fun,init){
    return init!=undefined?arr.reduce(fun,init):arr.reduce(fun);
}
export { iterate,map,foreach,reduce };
import { curry} from './curry.js'
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
    let curryed=curry(fun,0);
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
/**
 * 返回一个管道函数，从左到右执行函数，前一个函数的返回值作为下一个函数的参数。
 * 第一个函数可以是任意元函数，但接下来的函数必须是单元函数。
 * 特别的，pipe 返回的函数不支持被柯里化，而是强制多元。
 * 实际上该函数为反向版本的 {@link_compose}。
 * @param {...Function} fun 需要执行的函数排列
 * @example
 * console.log(pipe(add(1),add(114512))(1))//114514
 * @returns {Function} 
 */
function pipe(...fun){
    let args=fun;
    return function(){
        let result=args.shift().apply(this,arguments);
        return args.reduce((p,c)=>c(p),result);
    }
}
export { iterate,map,foreach,reduce,pipe };
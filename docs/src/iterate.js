import { curry } from './curry.js'
function __boom(args){
    let now=args.shift().map(x=>[x]),upper=[];
    args.forEach(v=>{
        v.forEach(u=>now.forEach(x=>upper.push([...x,u])));
        now=[...upper];
        upper=[];
    });
    return now;
}
/**
 * 对函数进行迭代，返回值为函数迭代流程中产生的全部结果数组
 * @param {Function} fun - 被迭代的函数
 * @param {...Any} args - 给予函数的参数，可以是序列或值，若为序列则将会依序迭代，多个序列之间会发生组合
 * @example
 * let f=(a,b)=>[a,b];
 * iterate(f,range(1,5),range(2,3));//[[ 1, 2 ], [ 2, 2 ],[ 3, 2 ], [ 4, 2 ],[ 5, 2 ], [ 1, 3 ],[ 2, 3 ], [ 3, 3 ],[ 4, 3 ], [ 5, 3 ]]
 * @returns {Array} 
 */
function iterate(fun,...args){
    let uncurryed=(fun.curryed===true)?uncurry(fun):fun;
    let iterateList=[],result=[];
    args.forEach(v=>iterateList.push(Array.isArray(v)?v:[v]));
    __boom(iterateList).forEach(v=>result.push(uncurryed.apply(null,v)));
    return result;
}
/**
 * 对数组每一位进行处理，并返回处理后的新序列
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
 * 对数组的每一位做出处理，操作的返回值需为数组，最终结果将会把所有返回值数组拼接起来形成一个数组
 * @param {Array} arr - 被遍历的序列
 * @param {Function} rule - 用以处理的单元函数，一个参数代表元素，需要返回值为数组
 * @example
 * let arr=[1,2,3,4,5];
 * flatMap(arr,v=>[v,1]);//[ 1, 1, 2, 1, 3, 1, 4, 1, 5, 1 ]
 * @example
 * let arr=[1,2,3,4,5];
 * flatMap(arr)(v=>[v,1]);//[ 1, 1, 2, 1, 3, 1, 4, 1, 5, 1 ]
 * @returns {Array} 
 */
function flatMap(arr,rule){
    return arr.reduce((x,y)=>x.concat(rule(y)),[]);
};
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
 * 将初始值作为某单元函数的第一个参数，接下来将该函数的返回值作为参数迭代指定次，返回最终结果
 * @param {Any} init - 第一次发生迭代时传入的参数
 * @param {Function} fun - 用以迭代的单元函数
 * @param {Number} init 迭代的次数
 * @example
 * fold(1,add(1),5);//6
 * @example
 * fold(1)(add(1))(5);//6
 * @returns {any} 
 */
function fold(init,fun,cnt){
    while(cnt--)init=fun(init);
    return init;
};
/**
 * 将初始值作为某单元函数的第一个参数，接下来将该函数的返回值作为参数迭代指定次，返回每次执行的结果数组
 * @param {Any} init - 第一次发生迭代时传入的参数
 * @param {Function} fun - 用以迭代的单元函数
 * @param {Number} init 迭代的次数
 * @example
 * scan(1,add(1),5);//[ 2, 3, 4, 5, 6 ]
 * @example
 * scan(1)(add(1))(5);//[ 2, 3, 4, 5, 6 ]
 * @returns {Array} 
 */
function scan(init,fun,cnt){
    let result=[];
    while(cnt--)result.push(init=fun(init));
    return result;
};
export { iterate,map,flatMap,foreach,reduce,fold,scan };
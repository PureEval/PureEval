/**
 * 求 a+b 的值
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(add(114513,1));//114514
 * @example
 * console.log(add(114513)(1));//114514
 * @returns {Number} 
 */
const add=(a,b)=>a+b;
/**
 * 求 a-b 的值
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(add(114515,1));//114514
 * @example
 * console.log(add(114515)(1));//114514
 * @returns {Number} 
 */
const minus=(a,b)=>a-b;
/**
 * 求 a*b 的值
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(mul(114514,1));//114514
 * @example
 * console.log(mul(114514)(1));//114514
 * @returns {Number} 
 */
const mul=(a,b)=>a*b;
/**
 * 求 a/b 的值
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(div(114514,1));//114514
 * @example
 * console.log(div(114514)(1));//114514
 * @returns {Number} 
 */
const div=(a,b)=>a/b;
/**
 * 求 a%b 的值(与 {@link_rema} 不同的是，此处为取余运算)
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(mod(114514,1));//0
 * @example
 * console.log(mod(114514)(1));//0
 * @returns {Number} 
 */
const mod=(a,b)=>a%b;
/**
 * 求 a mod b 的值(与 {@link_mod} 不同的是，此处为取模运算)
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(rema(114513,1));//114514
 * @example
 * console.log(rema(114513)(1));//114514
 * @returns {Number} 
 */
const rema=(a,b)=>(a%b+b)%b;
/**
 * 求 a^b 的值
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(power(2,4));//16
 * @example
 * console.log(power(2)(4));//166
 * @returns {Number} 
 */
const power=(a,b)=>Math.pow(a,b);
/**
 * 求 a||b 的值
 * @param {Boolean} a
 * @param {Boolean} b
 * @example
 * console.log(either(1,0));//true
 * @example
 * console.log(either(1)(0));//true
 * @returns {Boolean} 
 */
const either=(a,b)=>a||b;
/**
 * 求 a&&b 的值
 * @param {Boolean} a
 * @param {Boolean} b
 * @example
 * console.log(both(1,1));//true
 * @example
 * console.log(both(1)(1));//true
 * @returns {Boolean} 
 */
const both=(a,b)=>a&&b;
/**
 * 判断 a<b 是否成立
 * @param {Boolean} a
 * @param {Boolean} b
 * @example
 * console.log(gt(1,2));//true
 * @example
 * console.log(gt(1)(2));//true
 * @returns {Boolean} 
 */
const gt=(a,b)=>a>b;
/**
 * 判断 a<=b 是否成立
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(gte(1,2));//true
 * @example
 * console.log(gte(1)(2));//true
 * @returns {Boolean} 
 */
const gte=(a,b)=>a>=b;
/**
 * 判断 a>b 是否成立
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(lt(2,1));//true
 * @example
 * console.log(lt(2)(1));//true
 * @returns {Boolean} 
 */
const lt=(a,b)=>a<b;
/**
 * 判断 a>=b 是否成立
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(gt(2,1));//true
 * @example
 * console.log(gt(2)(1));//true
 * @returns {Boolean} 
 */
const lte=(a,b)=>a<=b;
/**
 * 计算 -a 的值
 * @param {Number} a
 * @example
 * console.log(negate(4));//-4
 * @returns {Number} 
 */
const negate=a=>-a;
/**
 * 返回一个适用于 {@link_sort} 的升序比较器
 * @example
 * console.log(P.sort([3,2,1],P.upper));//[ 1, 2, 3 ]
 * @returns {Function} 
 */
const upper=(a,b)=>a<b?-1:a>b?1:0;
/**
 * 返回一个适用于 {@link_sort} 的降序比较器
 * @example
 * console.log(P.sort([1,2,3],P.under));//[ 3, 2, 1 ]
 * @returns {Function} 
 */
const under=(a,b)=>a>b?-1:a<b?1:0;
/**
 * 对序列根据 rule 函数的规则进行排序
 * @param {Array} arr - 需要排序的序列
 * @param {Function} rule - 比较器函数
 * @example
 * console.log(P.sort([1,2,3],P.under));//[ 3, 2, 1 ]
 * @returns {Array} 
 */
const sort=(arr,rule)=>{
    if(rule!=undefined)return arr.sort(rule);
    else return arr.sort();
};
/**
 * 求出序列的中位数
 * @param {Array} arr - 求中位数的序列
 * @example
 * console.log(median([1,2,3,4,5,6]));//3.5
 * @returns {Number} 
 */
function median(arr){
    let w=2-arr.length%2,x=(arr.length-w)>>1;
    return average(Array.prototype.slice.call(arr,0).sort((a,b)=>a<b?-1:a>b?1:0).slice(x,x+w));
}
/**
 * 求出序列的总和
 * @param {Array} arr - 需要求和的序列
 * @example
 * console.log(sum([1,2,3,4,5,6]));//21
 * @returns {Number} 
 */
function sum(arr){
    return arr.reduce((x,y)=>x+y);
}
/**
 * 求出序列的平均值
 * @param {Array} arr - 需要求平均值的序列
 * @example
 * console.log(average([1,2,3,4,5,6]));//3.5
 * @returns {Number} 
 */
function average(arr){
    return sum(arr)/arr.length;
}
/**
 * 求出序列中的元素最大值
 * @param {Array} arr - 需要求最大值的序列
 * @example
 * console.log(average([1,2,3,4,5,6]));//6
 * @returns {Number} 
 */
function max(arr){
    return arr.sort()[arr.length-1];
}
/**
 * 求出序列中的元素最小值
 * @param {Array} arr - 需要求最小值的序列
 * @example
 * console.log(average([1,2,3,4,5,6]));//1
 * @returns {Number} 
 */
function min(arr){
    return arr.sort()[0];
}
export { add,minus,mul,div,mod,rema,power,either,both,gt,gte,lt,lte,upper,under,sort,sum,negate,average,median,max,min };
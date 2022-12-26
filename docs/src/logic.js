import { curry } from './curry.js'
/**
* 求 a || b 的值
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
 * 求 a &&  b 的值
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
 * 判断 a < b 是否成立
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
 * 判断 a <= b 是否成立
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
 * 判断 a > b 是否成立
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
 * 判断 a >= b 是否成立
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(lte(2,1));//true
 * @example
 * console.log(lte(2)(1));//true
 * @returns {Boolean} 
 */
const lte=(a,b)=>a<=b;
/**
 * 判断 a == b 是否成立
 * @param {Number} a
 * @param {Number} b
 * @example
 * console.log(equal(2,1));//false
 * @example
 * console.log(equal(2)(1));//false
 * @returns {Boolean} 
 */
const equal=(a,b)=>a==b;
/**
 * <pre>
 * 返回一个传入一个参数的判断函数，当该函数为 true 时则执行 b 函数，要注意到 b 函数不会接收参数
 * 如果希望 b 函数接收参数，请见 {@link when_v}
 * @param {Number} a
 * @param {Number} b
 * @example
 * when(v=>v>5,()=>console.log(114514))(6);//114514
 * @example
 * when(v=>v>5)(()=>console.log(114514))(6);//114514
 * @returns {Function} 
 * </pre>
 */
const when=(a,b)=>{
    return function(obj){
        if(a(obj))return b();
    }
};
/**
 * <pre>
 * 返回一个传入一个参数的判断函数，当该函数为 false 时则执行 b 函数，要注意到 b 函数不会接收参数
 * 如果希望 b 函数接收参数，请见 {@link unless_v}
 * </pre>
 * @param {Number} a
 * @param {Number} b
 * @example
 * unless(v=>v>5,()=>console.log(114514))(4);//114514
 * unless(v=>v>5,v=>console.log(v))(4);//4
 * @example
 * unless(v=>v>5)(()=>console.log(114514))(4);//114514
 * @returns {Function} 
 */
const unless=(a,b)=>{
    return function(obj){
        if(!a(obj))return b();
    }
};
/**
 * <pre>
 * 返回一个传入一个参数的判断函数，当该函数为 true 时则执行 b 函数，为 false 时执行 c 函数，要注意到 b,c 函数不会接收参数
 * 如果希望 b,c 函数接收参数，请见 {@link ifElse_v}
 * </pre>
 * @param {Number} a
 * @param {Number} b
 * @example
 * ifElse(v=>v>5,()=>console.log("Yes"),()=>console.log("No"))(6);//Yes
 * @example
 * ifElse(v=>v>5)(()=>console.log("Yes"))(()=>console.log("No"))(6);//Yes
 * @returns {Function} 
 */
const ifElse=(a,b,c)=>{
    return function(obj){
        if(a(obj))return b();
        else return c();
    }
};
/**
 * <pre>
 * 返回一个传入一个参数的判断函数，当该函数为 true 时则执行 b 函数，要注意到 b 函数将会接收参数
 * 如果希望 b 函数不接收参数，请见 {@link when}
 * </pre>
 * @param {Number} a
 * @param {Number} b
 * @example
 * when(v=>v>5,v=>console.log(v))(6);//6
 * @example
 * when(v=>v>5)(v=>console.log(v))(6);//6
 * @returns {Function} 
 */
const when_v=(a,b)=>{
    return function(obj){
        if(a(obj))return b(obj);
    }
};
/**
 * <pre>
 * 返回一个传入一个参数的判断函数，当该函数为 false 时则执行 b 函数，要注意到 b 函数将会接收参数
 * 如果希望 b 函数不接收参数，请见 {@link unless}
 * </pre>
 * @param {Number} a
 * @param {Number} b
 * @example
 * unless(v=>v>5,v=>console.log(v))(4);//4
 * @example
 * unless(v=>v>5)(v=>console.log(v))(4);//4
 * @returns {Function} 
 */
const unless_v=(a,b)=>{
    return function(obj){
        if(!a(obj))return b(obj);
    }
};
/**
 * <pre>
 * 返回一个传入一个参数的判断函数，当该函数为 true 时则执行 b 函数，为 false 时执行 c 函数，要注意到 b,c 函数将会接收参数
 * 如果希望 b,c 函数不接收参数，请见 {@link ifElse}
 * </pre>
 * @param {Number} a
 * @param {Number} b
 * @example
 * ifElse(v=>v>5,v=>console.log(v),v=>console.log(v))(6);//6
 * @example
 * ifElse(v=>v>5)(v=>console.log(v))(v=>console.log(v))(6);//6
 * @returns {Function} 
 */
const ifElse_v=(a,b,c)=>{
    return function(obj){
        if(a(obj))return b(obj);
        else return c(obj);
    }
};
export { either,both,gt,gte,lt,lte,equal,when,unless,ifElse,when_v,unless_v,ifElse_v }
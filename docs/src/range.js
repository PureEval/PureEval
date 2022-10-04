import { curry_any } from './curry.js'
/**
 * 返回一个从 start 到 end 的序列（[start,end]），支持整数和字符
 * @param {Any} start - 区间的左端点
 * @param {Any} end - 区间的右端点
 * @example
 * console.log(range(1,5));//[ 1, 2, 3, 4, 5 ]
 * console.log(range('a,'e'));//[ 'a', 'b', 'c', 'd', 'e' ]
 * @returns {Array} 
 */
const range=(start,end)=>{
    if(typeof start==='number'&&typeof end==='number')
        return new Array(end-start+1).fill(start).map((v,i)=>start+i);
    else if(typeof start==='string'&&typeof end==='string'){
        let l=start.charCodeAt(),r=end.charCodeAt();
        return new Array(r-l+1).fill(start).map((v,i)=>String.fromCharCode(l+i));
    }
};
export { range };
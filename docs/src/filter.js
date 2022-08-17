/**
 * 对序列进行筛选
 * @param {Array} arr - 被筛选的序列
 * @param {Function} rule - 筛选规则，为一个单元函数，对元素进行筛选
 * @example
 * let arr=filter([1,2,3,4,5],v=>v>3);
 * console.log(arr);//[ 4, 5 ]
 * @example
 * let arr=filter([1,2,3,4,5])(v=>v>3);
 * console.log(arr);//[ 4, 5 ]
 * @returns {Array} 
 */
function filter(arr,rule){
    return arr.filter(v=>{
        return rule(v);
    });
}
/**
 * 对序列进行反选
 * @param {Array} arr - 被反选器的序列
 * @param {Function} rule - 反选器规则，为一个单元函数，对元素进行反选
 * @example
 * let arr=reject([1,2,3,4,5],v=>v>3);
 * console.log(arr);//[ 1, 2, 3 ]
 * @example
 * let arr=reject([1,2,3,4,5])(v=>v>3);
 * console.log(arr);//[ 1, 2, 3 ]
 * @returns {Array} 
 */
function reject(arr,rule){
    return arr.filter(v=>{
        return !rule(v);
    });
}
/**
 * 屏蔽序列中的部分元素
 * @param {Any} v - 需要屏蔽的元素或序列
 * @param {Array} arr - 被屏蔽的元素或序列
 * @example
 * let arr=shied([4,5],[1,2,3,4,5]);
 * console.log(arr);//[ 1, 2, 3 ]
 * @example
 * let arr=shied(1,[1,2,3,4,5]);
 * console.log(arr);//[ 2, 3, 4, 5 ]
 * @example
 * let arr=shied(1)([1,2,3,4,5]);
 * console.log(arr);//[ 2, 3, 4, 5 ]
 * @returns {Array} 
 */
function shied(v,arr){
    if(!Array.isArray(v))v=[v];
    return arr.filter(val=>{
        return !v.includes(val);
    });
}
/**
 * 选择序列中的部分元素
 * @param {Any} v - 需要选择的元素或序列
 * @param {Array} rule - 被选择的元素或序列
 * @example
 * let arr=choose([4,5,6],[1,2,3,4,5]);
 * console.log(arr);//[ 4,5 ]
 * @example
 * let arr=choose(4,[1,2,3,4,5]);
 * console.log(arr);//[ 4 ]
 * @example
 * let arr=choose(4)([1,2,3,4,5]);
 * console.log(arr);//[ 4 ]
 * @returns {Array} 
 */
function choose(v,arr){
    if(!Array.isArray(v))v=[v];
    return arr.filter(val=>{
        return v.includes(val);
    });
}
export { filter,reject,shied,choose };
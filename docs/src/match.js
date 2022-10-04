import { _ } from './bind.js' 
/**
 * <pre>
 * 返回一个单元函数进行模式匹配，该函数将会对传入的参数做出匹配
 * 参数为若干组形如 \<value,rule\> 的匹配规则
 * 当传入匹配的值与某个匹配规则的 value 配对时，则执行对应的 rule 函数并返回该函数的结果，注意 rule 为一个单元函数，参数为 value 的值
 * 可以采用 {@link _} 作为通配符，匹配全部值
 * </pre>
 * @param {...Any} rules
 * @example
 * let result=match(
 *    1,v=>114514,
 *    2,v=>19190810,
 *    _,v=>11451419190810
 * );
 * console.log(result(5));//11451419190810
 * @example
 * const fib=match(
 *    1,v=>1,
 *    2,v=>2,
 *    _,v=>fib(v-1)+fib(v-2)
 * );
 * console.log(fib(15));//987
 * @returns {Function}
 */
 function match(...rules){
    return function(value){
        for(let i=0;i<rules.length;i+=2)
            if(value==rules[i]||rules[i]==_)
                return rules[i+1](value);
    }
}
export { match };
/* eslint-disable no-unused-vars */
function summon(total, fn) {
	let result;
	eval(`result=function(${Array(total).fill(0).map((v, i) => 'a' + i).toString()}){return fn.apply(this,arguments)}`);
	return result;
}
function summonWithName(list, fn) {
	let result;
	eval(`result=function(${list.join(',')}){return fn(${list.join(',')})}`);
	return result;
}
export { summon, summonWithName };
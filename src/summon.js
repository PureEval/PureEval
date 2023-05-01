function summonArray(total) {
	return Array(total)
		.fill()
		.map((_, i) => 'a' + i);
}

function summon(total, fn) {
	return Function(
		...summonArray(total + 1),
		'return a0.apply(this,Array.prototype.splice.call(arguments,1));'
	).bind(null, fn);
}

function summonWithName(list, fn) {
	return Function('a0', list, `return a0(${list.join(',')})`).bind(null, fn);
}

export { summon, summonWithName };

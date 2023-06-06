const summon = (total, fn) => {
	const summoner = (...args) => fn.apply(null, args);
	Reflect.defineProperty(summoner, 'length', { value: total });
	return summoner;
};

export { summon };

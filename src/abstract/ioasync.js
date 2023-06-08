const IOAsync = (effect) => ({
	map: (fn) => IOAsync(async () => await fn(await effect())),
	chain: (fn) => IOAsync(async () => await fn(await effect()).run()),
	run: async () => await effect()
});

export { IOAsync };

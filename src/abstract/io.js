const IO = (effect) => ({
	map: (fn) => IO(() => fn(effect())),
	chain: (fn) => fn(effect()),
	run: () => effect()
});

export { IO };

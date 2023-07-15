const IOAsync = (effect) => {
	let perform;
	const obj = {
		map: (fn) => IOAsync(async () => await fn(await effect(perform))),
		chain: (fn) => IOAsync(async () => await fn(await effect(perform)).run()),
		handle: (fn) => ((perform = fn), obj),
		run: async () => await effect(perform)
	};
	return obj;
};

export { IOAsync };

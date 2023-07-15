const IO = (effect) => {
	let perform;
	const obj = {
		map: (fn) => IO(() => fn(effect(perform))),
		chain: (fn) => fn(effect(perform)),
		handle: (fn) => ((perform = fn), obj),
		run: () => effect(perform)
	};
	return obj;
};

export { IO };

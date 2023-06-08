const Task = (f) => ({
	map: (fn) => Task((reject, resolve) => f(reject, (x) => resolve(fn(x)))),
	chain: (fn) => Task((reject, resolve) => this.f(reject, (x) => fn(x).f(reject, resolve))),
	fold: (reject, resolve) => f(reject, resolve)
});

export { Task };

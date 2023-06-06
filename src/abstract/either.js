/* eslint-disable no-unused-vars */
const Right = (value) => ({
	map: (f) => Right(f(value)),
	fold: (reject, resolve) => resolve(value),
	chain: (f) => (m) => m.fold(Left, f)
});

const Left = (value) => ({
	map: (f) => Left(value),
	fold: (reject, resolve) => reject(value),
	chain: (f) => Left(value)
});

export { Right, Left };

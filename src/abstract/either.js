/* eslint-disable no-unused-vars */
const Right = (value) => ({
	map: (f) => {
		try {
			return Right(f(value));
		} catch (error) {
			return Left(error);
		}
	},
	fold: (_reject, resolve) => resolve(value),
	chain: (f) => {
		try {
			return f(value);
		} catch (error) {
			return Left(error);
		}
	}
});

const Left = (value) => ({
	map: (_f) => Left(value),
	fold: (reject, _resolve) => reject(value),
	chain: (_f) => Left(value)
});

export { Right, Left };

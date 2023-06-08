/* eslint-disable no-unused-vars */
const Right = (value) => ({
	map: (f) => {
		try {
			return Right(f(value));
		} catch (error) {
			return Left(error);
		}
	},
	fold: (reject, resolve) => resolve(value),
	chain: (f) => {
		try {
			return f(value);
		} catch (error) {
			return Left(error);
		}
	}
});

const Left = (value) => ({
	map: (f) => Left(value),
	fold: (reject, resolve) => reject(value),
	chain: (f) => Left(value)
});

export { Right, Left };

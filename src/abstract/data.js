import { summon } from '../summon.js';

const Data = (...args) => {
	class DATA {
		constructor(type) {
			this.type = type;
		}
	}
	const data = { is: {}, from: (v) => v instanceof DATA };
	args.forEach((value) => {
		const functions = value.trim().split(' ');
		const functionName = functions.shift();
		if (functions.length) {
			data[functionName] = summon(functions.length, (...iargs) => {
				const result = new DATA(functionName);
				functions.forEach((item, idx) => (result[item] = iargs[idx]));
				result.args = iargs;
				return result;
			});
		} else data[functionName] = new DATA(functionName);
		data.is[functionName] = (val) => val instanceof DATA && val.type === functionName;
	});
	return data;
};

export { Data };

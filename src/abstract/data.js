import { summon } from '../summon.js';

const Data = (...args) => {
	class DATA {
		constructor(type) {
			this.type = type;
		}
	}
	const data = { is: {}, from: (v) => v instanceof DATA };
	args.forEach((value) => {
		const functions = value.trim().split(' '),
			functionName = functions.shift();
		data[functionName] = functions.length
			? summon(functions.length, (...iargs) => {
					const result = new DATA(functionName);
					functions.forEach((item, idx) => (result[item] = iargs[idx]));
					result.args = iargs;
					return result;
			  })
			: new DATA(functionName);
		data[functionName].type = functionName;
		data.is[functionName] = (val) => val instanceof DATA && val.type === functionName;
	});
	return data;
};

export { Data };

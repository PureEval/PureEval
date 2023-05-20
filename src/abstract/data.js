import { summon } from '../summon.js';

function Data(...args) {
	class DATA {
		constructor(type) {
			this.type = type;
		}
	}
	const data = { is: {}, from: (v) => v instanceof DATA };
	for (const name in args) {
		const functions = args[name].trim();
		let functionName;
		if (functions.includes(' ')) {
			const spl = functions.split(' ');
			functionName = spl.shift();
			data[functionName] = summon(spl.length, (...iargs) => {
				const result = new DATA(functionName);
				for (const idx in iargs) result[spl[idx]] = iargs[idx];
				result.args = iargs;
				return result;
			});
		} else {
			functionName = functions;
			data[functionName] = new DATA(functionName);
		}
		data.is[functionName] = (val) => val instanceof DATA && val.type === functionName;
	}
	return data;
}

export { Data };

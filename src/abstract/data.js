import { summon } from '../summon.js';

const Data = (...args) => {
	class DATA {
		constructor(type) {
			this.type = type;
		}
	}
	let show = (D) => D.type;

	const data = {
		binder: {},
		from: (v) => v instanceof DATA,
		bindShow: (f) => (show = f)
	};

	args.forEach((value) => {
		const functions = value.trim().split(' '),
			functionName = functions.shift();
		if (functions.length) {
			data[functionName] = summon(functions.length, (...iargs) => {
				const result = new DATA(functionName);
				functions.forEach((item, idx) => (result[item] = iargs[idx]));
				result.args = iargs;
				result.show = function () {
					return show(this);
				};
				return result;
			});
		} else {
			data[functionName] = new DATA(functionName);
			data[functionName]['show'] = function () {
				return show(this);
			};
		}
		data[functionName]['is'] = (val) => val instanceof DATA && val.type === functionName;
		data.binder[functionName] = data[functionName];
	});

	return data;
};

export { Data };

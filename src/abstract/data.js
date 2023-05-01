import { summonWithName } from '../summon.js';

function Data(...args) {
	class DATA {
		constructor(type) {
			this.type = type;
		}
	}
	const data = { is: {}, from: (v) => v instanceof DATA };
	for (const name in args) {
		const functions = args[name].trim();
		let fname;
		if (functions.includes(' ')) {
			const spl = functions.split(' ');
			fname = spl.shift();
			data[fname] = summonWithName(spl, (...iargs) => {
				const result = new DATA(fname);
				for (const idx in iargs) result[spl[idx]] = iargs[idx];
				result.args = iargs;
				return result;
			});
		} else {
			fname = functions;
			data[fname] = new DATA(fname);
		}
		data.is[fname] = (val) => val instanceof DATA && val.type === fname;
	}
	return data;
}

export { Data };

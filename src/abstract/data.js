import { summonWithName } from "../summon.js";

function Data(...args) {
    class DATA {
        constructor(type) {
            this.type = type;
        }
    }
    let data = { is: {}, from: v => v.constructor === DATA };
    for (let name in args) {
        let functions = args[name], fname;
        if (functions.includes(' ')) {
            let spl = functions.split(' ');
            fname = spl.shift();
            data[fname] = summonWithName(spl, (...iargs) => {
                let result = new DATA(fname);
                for (let idx in iargs) result[spl[idx]] = iargs[idx];
                result.args = iargs;
                return result;
            });
        } else {
            fname = functions;
            data[fname] = new DATA(fname);
        }
        data.is[fname] = val => val.constructor === DATA && val.type === fname;
    }
    return data;
}

export { Data };
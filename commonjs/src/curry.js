function curry(fun) {
    const summon = (argv, surplus) => (surplus ? arg => summon([...argv, arg], surplus - 1) : fun(...argv));
    const result = summon([], fun.length);
    result.origin = fun;
    result.curryed = true;
    result.len = fun.length;
    return result;
}
function curry(fun, ...argv) {
    if (fun.length === argv.length) return fun.call(null, ...argv);
    else {
        let result = curry.bind(null, ...arguments);
        result.curryed = true;
        result.len = fun.length - (arguments.length - 1);
        result.origin = fun;
        return result;
    }
}
function uncurry(fun) {
    return fun.origin;
}

export { curry, curry, uncurry };
import { curry } from '../curry.js';

const iter = xs => xs();
const seq = xs => [...xs()];

const range = curry((start, end, step) => function* () {
    do {
        yield start;
        start = step(start);
    } while (start != end);
    yield end;
});

const lazy = xs => function* () {
    for (let x of xs)
        yield x;
}

const iterate = curry((f, d) => function* () {
    for (let x = d; ; x = f(x))
        yield x;
});

const map = curry((f, xs) => function* () {
    for (let x of iter(xs))
        yield f(x);
});

const concat = xss => function* () {
    for (let xs of iter(xss))
        for (let x of iter(xs))
            yield x;
}

const take = curry((n, xs) => function* () {
    for (let x of iter(xs)) {
        if (n > 0) {
            n--;
            yield x;
        } else return;
    }
});

const drop = curry((n, xs) => function* () {
    for (let x of iter(xs)) {
        if (n > 0) {
            n--;
        } else yield x;
    }
});

const repeat = x => function* () {
    while (1)
        yield x;
}


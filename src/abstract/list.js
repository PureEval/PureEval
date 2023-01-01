const id = x => x

const seq = xs => xs()
const seq_list = xs => [...xs()]

const range = (start, end) => function* () {
    let [i, j] = !end ? [0, start] : [start, end];
    do {
        yield i
        i++;
    } while (i < j)
}

const lazy = xs => function* () {
    for (let x of xs) {
        yield x
    }
}

const iterate = f => d => function* () {
    for (let x = d;; x = f(x)) {
        yield x
    }
}



const map = f => xs => function* () {
    for (let x of seq(xs)) {
        yield f(x)
    }
}

const concat = xss => function* () {
    for (let xs of seq(xss)) {
        for (let x of seq(xs)) {
            yield x
        }
    }
}



const take = n => xs => function* () {
    for (let x of seq(xs)) {
        if (n > 0) {
            n--;
            yield x
        } else {
            return
        }
    }
}

const drop = n => xs => function* () {
    for (let x of seq(xs)) {
        if (n > 0) {
            n--
        } else {
            yield x
        }
    }
}



const repeat = x => function* () {
    while (1) {
        yield x
    }
}

const nat = range(0, Infinity)

class Functor {
    constructor(value) {
        this.value = value;
    }

    static of (v) {
        return new Functor(v)
    }

    map(f) {
        return new Functor(f(this.value));
    }
}

export {Functor}
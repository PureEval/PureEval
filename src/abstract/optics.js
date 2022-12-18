class Lens {
    constructor(getter, setter) {
        this.get = getter;
        this.set = setter;
    }

    // Modify the focused value
    map(f) {
        return new Lens(
            this.get,
            value => this.set(f(value))
        );
    }

    // Compose Lens
    compose(other) {
        return new Lens(
            () => other.get(this.get()),
            value => this.set(other.set(value))
        );
    }
}
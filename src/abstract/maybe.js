import {Monad} from './monad.js' 

class Maybe extends Monad {
    constructor(value) {
      super(value);
    }

    static lift(v){
        return new Maybe(v)
    }
  
    isNothing() {
      return this.value === null || this.value === undefined;
    }
  
    map(f) {
      if (this.isNothing()) {
        return new Maybe(null);
      }
      return new Maybe(f(this.value));
    }
  
    chain(f) {
      if (this.isNothing()) {
        return new Maybe(null);
      }
      return f(this.value);
    }
}

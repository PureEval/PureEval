class Profunctor {
    constructor(dimap, lmap, rmap) {
      this.dimap = dimap;
      this.lmap = lmap;
      this.rmap = rmap;
    }
  
    
    dimap(f, g) {
      return new Profunctor(
        (x, y) => this.dimap(f(x), g(y)),
        x => this.lmap(f(x)),
        y => this.rmap(g(y))
      );
    }
  
    lmap(f) {
      return new Profunctor(
        (x, y) => this.dimap(f(x), y),
        x => this.lmap(f(x)),
        y => this.rmap(y)
      );
    }
  
    rmap(f) {
      return new Profunctor(
        (x, y) => this.dimap(x, f(y)),
        x => this.lmap(x),
        y => this.rmap(f(y))
      );
    }
  }
  


export {Profunctor}
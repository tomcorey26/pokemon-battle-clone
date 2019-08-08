// Player class
export class Player {
  constructor(items) {
    this.healthyFighters = [];
    this.faintedFighters = [];
    this.items = items;
  }
  sendOutNextFighter() {
    let faintedFighter = this.healthyFighters.shift();
    this.faintedFighters.push(faintedFighter);
    if (this.healthyFighters[0]) {
      return this.healthyFighters[0];
    } else {
      //game over logic
    }
  }
}

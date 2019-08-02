// Player class
export class Player {
  constructor(fighters, items) {
    this.healthyFighters = fighters;
    this.faintedFighters = [];
    this.items = items;
  }
}

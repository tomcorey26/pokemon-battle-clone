//UI CLASS
//initiates animations
//displays when game is over
// if you won / lost

// GAME CLASS
//holds game state
//checks if game is over or not
//checks if pokemon has fainted
class Game {
  //array of players
  //current players turn
  //attack animation
  //state of game
  static checkForDefeat(player) {
    //if player is out of pokemon
    // diplay win if player is enemy
    //display lose if player is user
  }
  static displayResultModal(result) {
    //if result equals win show win modal
    //else show lose modal
  }
}

// Player class
class Player {
  constructor(fighters, items) {
    this.fighters = fighters;
    this.items = items;
  }
}

//POKEMON CLASS
class Fighter {
  constructor(health, type, attacks) {
    this.health = health;
    this.type = type;
    this.attacks = attacks;
    this.condition = "healthy";
  }
}

//Attack Class
class Attack {
  constructor(type, damage, inflictorProbability, pp) {
    this.type = type;
    this.damage = damage;
    this.inflictorProbability = inflictorProbability;
    this.pp = pp;
  }
}

//properties
//health
//condition(like psn/paralzed)
//type
//attacks and their damages (object) and their pp
//method use normal attack
//method use status inflicting attack
// heal (item as parameter)

//checks when to play animations

function sum(a, b) {
  return a + b;
}
module.exports = sum;

console.log("fart");

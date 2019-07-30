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
    this.healthyFighters = fighters;
    this.faintedFighters = [];
    this.items = items;
  }
}

//properties
//health
//condition(like psn/paralzed)
//type
//POKEMON CLASS
class Fighter {
  constructor(health, type, attacks) {
    this.health = health;
    this.type = type;
    this.attacks = attacks;
    this.condition = "healthy";
  }
  checkEffectiveness(moveType, enemyType) {
    //TODO add multiplier based on attacktype
    let multiplier = {
      superEffective: 1.3,
      normal: 1,
      notEffective: 0.7
    };

    if (moveType == enemyType) {
      return normal;
    } else if (moveType == "rock") {
      if (enemyType == "paper") {
        return multiplier.notEffective;
      } else {
        return multiplier.superEffective;
      }
    } else if (moveType == "scissors") {
      if (enemyType == "rock") {
        return multiplier.notEffective;
      } else {
        return multiplier.superEffective;
      }
    } else if (moveType == "paper") {
      if (enemyType == "scissors") {
        return multiplier.notEffective;
      } else {
        return multiplier.superEffective;
      }
    }
  }

  useAttack(attack, enemy) {
    //play attack animation

    //damage multiplier depending on type
    let damage = attack.damage;
    let damageMultiplier = this.checkEffectiveness(attack.type, enemy.type);
    damage *= damageMultiplier;

    //calculate hit or miss
    let randomNum = Math.random();
    if (randomNum < attack.accuracy) {
      //decrement enemy health
      enemy.health -= damage;
    } else {
      console.log("attack missed!");
    }
    //switch turn to cpu or other player
  }
}

//attacks and their damages (object) and their pp
//method use normal attack
//method use status inflicting attack
// heal (item as parameter)
//Attack Class
class Attack {
  constructor(type, damage, inflictorProbability, pp, accuracy) {
    this.type = type;
    this.damage = damage;
    this.inflictorProbability = inflictorProbability;
    this.pp = pp;
    this.accuracy = accuracy;
  }
}

let smash = new Attack("rock", 20, 0.1, 10, 0.8);
let cut = new Attack("scissors", 10, 0.1, 20, 0.9);
let smother = new Attack("paper", 40, 0.2, 5, 0.6);

let tom = new Fighter(100, "rock", [smash, cut, smother]);
let rick = new Fighter(100, "scissors", [smash, cut, smother]);

let attack = document.getElementById("attack");

attack.addEventListener("click", e => {
  e.preventDefault();
  console.log(rick);
  console.log(tom);
  tom.useAttack(tom.attacks[2], rick);
  console.log(rick.health);
});

//checks when to play animations

// function sum(a, b) {
//   return a + b;
// }
// module.exports = sum;

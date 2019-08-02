import { Attack } from "./attack.js";
import { Fighter } from "./fighter.js";
import { Player } from "./player.js";

//UI CLASS
//initiates animations
//displays when game is over
// if you won / lost

//test moves
let smash = new Attack("smash", "rock", 30, 0.1, 10, 0.8);
let pound = new Attack("pound", "rock", 50, 0.1, 5, 0.5);
let punch = new Attack("punch", "rock", 10, 0.1, 20, 1);

let cut = new Attack("cut", "scissors", 10, 0.1, 20, 0.9);
let slice = new Attack("slice", "scissors", 40, 0.2, 8, 0.7);
let slash = new Attack("slash", "scissors", 15, 0.1, 18, 1);

let smother = new Attack("smother", "paper", 40, 0.2, 5, 0.6);
let envelop = new Attack("envelop", "paper", 20, 0.3, 12, 0.9);
let contain = new Attack("contain", "paper", 30, 0.3, 15, 0.7);

// GAME CLASS
//holds game state
//checks if game is over or not
//checks if pokemon has fainted
//create pokemon method
class Game {
  constructor() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.gameState = true;
    this.roundCount = 0;
  }

  addplayer(player) {
    this.players = [...this.players, player];
  }

  createFighters(amount) {
    let attributes = {
      health: [100, 150, 80, 200],
      types: ["rock", "paper", "scissors"],
      rockAttacks: [smash, pound, punch],
      scissorAttacks: [cut, slice, slash],
      paperAttacks: [smother, envelop, contain]
    };

    let fighters = [];

    for (let i = 0; i < amount; i++) {
      let healthIndex = getRandomInt(attributes.health.length);
      let typeIndex = getRandomInt(attributes.types.length);
      let attacks;
      if (attributes.types[typeIndex] === "rock") {
        attacks = attributes.rockAttacks;
        let randomNum = getRandomInt(attributes.scissorAttacks.length);
        attacks = [...attacks, attributes.scissorAttacks[randomNum]];
      } else if (attributes.types[typeIndex] === "paper") {
        attacks = attributes.paperAttacks;
        let randomNum = getRandomInt(attributes.rockAttacks.length);
        attacks = [...attacks, attributes.rockAttacks[randomNum]];
      } else {
        attacks = attributes.scissorAttacks;
        let randomNum = getRandomInt(attributes.paperAttacks.length);
        attacks = [...attacks, attributes.paperAttacks[randomNum]];
      }
      let fighter = new Fighter(
        attributes.health[healthIndex],
        attributes.types[typeIndex],
        attacks
      );
      //push new fighter to fighters array
      fighters.push(fighter);
    }

    //randomly select one value from each array
    //create new fighter object with values
    //return
    return fighters;
  }

  //gives both players random pokemon
  //parameter is amount wanted
  distributeFighters(amount) {
    this.player.forEach(index => {
      //create fighters array

      //add to
      this.player[index].healthyFighters.push();
    });
  }

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let game = new Game();

let tom = new Fighter(100, "rock", [smash, cut, smother]);
let rick = new Fighter(100, "scissors", [smash, cut, smother]);

game.addplayer(tom);
game.addplayer(rick);

let figherArr = game.createFighters(6);
console.log(figherArr);
//game generate pokemon
//game distribute

//ATTACK BUTTON
let attack = document.getElementById("enemy-attack");

attack.addEventListener("click", e => {
  e.preventDefault();
  console.log(rick);
  console.log(tom);
  tom.useAttack(tom.attacks[2], rick);
  console.log(rick.health);
});

//queryselector all loop that checks
//if each of the attacks has been chosen
//for disabling of button

//checks when to play animations

// function sum(a, b) {
//   return a + b;
// }
// module.exports = sum;

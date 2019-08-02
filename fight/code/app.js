import { Attack } from "./attack.js";
import { Fighter } from "./fighter.js";
import { Player } from "./player.js";

//UI CLASS
//initiates animations
//displays when game is over
// if you won / lost

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

  createFighter() {
    let attributes = {
      health: [],
      types: [],
      attacks: []
    };
    //randomly select one value from each array
    //create new fighter object with values
    //return
  }

  //gives both players 6 random pokemon
  distributeFighters() {}

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

let game = new Game();

let smash = new Attack("rock", 20, 0.1, 10, 0.8);
let cut = new Attack("scissors", 10, 0.1, 20, 0.9);
let smother = new Attack("paper", 40, 0.2, 5, 0.6);

let tom = new Fighter(100, "rock", [smash, cut, smother]);
let rick = new Fighter(100, "scissors", [smash, cut, smother]);

game.addplayer(tom);
game.addplayer(rick);
//game generate pokemon
//game distribute

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

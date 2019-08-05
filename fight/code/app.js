import { Attack } from "./attack.js";
import { Fighter } from "./fighter.js";
import { Player } from "./player.js";
import { UI } from "./ui.js";

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
let topMoves = document.getElementById("enemy-moves");
class Game {
  constructor() {
    this.players = [];
    this.gameState = true;
    this.currentMoves = {
      player1: "",
      player2: ""
    };
    this.roundCount = 0;
  }
  startGame(player1, player2) {
    game.addplayer(player1);
    game.addplayer(player2);

    game.distributeFighters(6);
    UI.populateMoves(player1.healthyFighters[0], player2.healthyFighters[0]);
  }

  handleMoveSelect(e) {
    let id = e.target.id;
    let move = e.target.textContent;

    //check wether player 1 or player 2 move
    //load to current moves
    if (id.includes("enemy") === true) {
      game.currentMoves.player1 = move;
    } else {
      game.currentMoves.player2 = move;
    }

    let moveContainer = e.target.parentNode;
    let children = moveContainer.childNodes;

    //disable buttons
    for (let i = 2; i < children.length; i++) {
      children[i].className = "nes-btn is-disabled";
    }
    children[1].innerHTML += " Move Selected!";

    //check if both players have moves selected
    if (game.currentMoves.player1 && game.currentMoves.player2) {
      //if they do run fight begin method
      console.log("both moves selected");
    }
  }

  playRound() {
    //this method will do the attacks
    //write to dialouge
    //play animations
    //clear current moves
    //increment round count
    //check if fighter has fainted
    //undisable buttons
  }

  addplayer(player) {
    this.players = [...this.players, player];
  }

  createFighters(amount) {
    let attributes = {
      speed: [1, 2, 3, 4, 5],
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
      let speedIndex = getRandomInt(attributes.speed.length);

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
        attacks,
        attributes.speed[speedIndex]
      );
      //push new fighter to fighters array
      fighters.push(fighter);
    }

    return fighters;
  }

  //gives both players random pokemon
  //parameter is amount wanted
  distributeFighters(amount) {
    for (let i = 0; i < 2; i++) {
      //create fighters array
      let fighters = this.createFighters(amount);
      //add to
      this.players[i].healthyFighters = fighters;
    }
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

let tom = new Player([]);
let rob = new Player([]);

game.startGame(tom, rob);

console.log(game);

let moves = document.querySelectorAll(".nes-btn");
moves.forEach(move => {
  move.addEventListener("click", game.handleMoveSelect);
});
//queryselector all loop that checks
//if each of the attacks has been chosen
//for disabling of button

//checks when to play animations

// function sum(a, b) {
//   return a + b;
// }
// module.exports = sum;

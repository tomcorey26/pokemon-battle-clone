import { Attack } from "./attack.js";
import { Fighter } from "./fighter.js";
import { Player } from "./player.js";
import { UI } from "./ui.js";

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

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

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
    this.currentFighters = {
      player1: "",
      player2: ""
    };
    this.roundCount = 0;
    this.handleMoveSelect = this.handleMoveSelect.bind(this);
  }
  startGame(player1, player2) {
    this.addplayer(player1);
    this.addplayer(player2);

    this.distributeFighters(2);

    this.currentFighters.player1 = player1.healthyFighters[0];
    this.currentFighters.player2 = player2.healthyFighters[0];
    UI.populateMoves(player1.healthyFighters[0], player2.healthyFighters[0]);
    UI.addFighterPictures();
  }

  handleMoveSelect(e) {
    let id = e.target.id;
    let move = e.target.textContent;

    //check wether player 1 or player 2 move
    //load to current moves
    if (id.includes("enemy") === true) {
      this.currentMoves.player1 = move;
    } else {
      this.currentMoves.player2 = move;
    }

    let moveContainer = e.target.parentNode;
    let children = moveContainer.childNodes;

    //TODO make UI method for this part
    //disable buttons
    for (let i = 2; i < children.length; i++) {
      children[i].className = "nes-btn is-disabled";
    }
    children[1].innerHTML = "Move Selected!";

    //check if both players have moves selected
    if (this.currentMoves.player1 && this.currentMoves.player2) {
      //if they do run fight begin method
      console.log("both moves selected");
      this.playRound();
    }
  }

  handleFaint(half) {
    let topImg = document.getElementById("top-picture");
    let bottomImg = document.getElementById("bottom-picture");
    let nextFighter;
    if (half === "top") {
      nextFighter = this.players[0].sendOutNextFighter();
      if (!nextFighter) {
        console.log("game over");
      }
      UI.addFighterPicture(topImg);
      UI.adjustHealth("top", 1, 1);
      this.currentFighters.player1 = nextFighter;
    } else {
      nextFighter = this.players[1].sendOutNextFighter();
      if (!nextFighter) {
        console.log("game over");
      }
      UI.addFighterPicture(bottomImg);
      UI.adjustHealth("bottom", 1, 1);
      this.currentFighters.player2 = nextFighter;
    }

    return nextFighter;
  }

  playRound() {
    //set to variarbles for easy reference
    let fighter1 = this.currentFighters.player1;
    let fighter2 = this.currentFighters.player2;
    let attack1;
    let attack2;

    fighter1.attacks.forEach(attack => {
      if (attack.name.includes(this.currentMoves.player1)) {
        attack1 = attack;
      }
    });

    fighter2.attacks.forEach(attack => {
      if (attack.name.includes(this.currentMoves.player2)) {
        attack2 = attack;
      }
    });

    let isfainted = false;
    if (fighter1.speed > fighter2.speed) {
      //display text in box
      //do fighter one attack
      fighter1.useAttack(attack1, fighter2);
      UI.adjustHealth("bottom", fighter2.health, fighter2.baseHealth);

      if (fighter2.health <= 0) {
        fighter2 = this.handleFaint("bottom");
        isfainted = true;
      }

      //if fighter 2 dead return
      //if alive use attack
      if (!isfainted) {
        fighter2.useAttack(attack2, fighter1);
        UI.adjustHealth("top", fighter1.health, fighter1.baseHealth);
      }

      if (fighter1.health <= 0) {
        fighter1 = this.handleFaint("top");
      }
      //its supereffective /not effective
      //check for fainted
    } else {
      fighter2.useAttack(attack2, fighter1);
      UI.adjustHealth("top", fighter1.health, fighter1.baseHealth);

      if (fighter1.health <= 0) {
        fighter1 = this.handleFaint("top");
      }

      //do fighter one attack
      if (!isfainted) {
        fighter1.useAttack(attack1, fighter2);
        UI.adjustHealth("bottom", fighter2.health, fighter2.baseHealth);
      }

      if (fighter2.health <= 0) {
        fighter2 = this.handleFaint("bottom");
      }
    }
    this.resetRound(fighter1, fighter2);
    //write to dialouge
    //play animations
    //increment round count
    //check if fighter has fainted
    //undisable buttons
  }

  resetRound(fighter1, fighter2) {
    let topBar = document.getElementById("enemy-moves");
    let bottomBar = document.getElementById("player-moves");
    UI.showMovesContent(topBar);
    UI.showMovesContent(bottomBar);
    //clear current moves
    this.currentMoves.player1 = "";
    this.currentMoves.player2 = "";
    UI.populateMoves(fighter1, fighter2);
    let topTitle = document.getElementById("top-title");
    let botTitle = document.getElementById("bottom-title");
    topTitle.innerHTML = "Player 1";
    botTitle.innerHTML = "Player 2";
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
        attributes.speed[speedIndex],
        "testname"
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

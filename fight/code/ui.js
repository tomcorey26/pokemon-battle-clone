//UI CLASS
//initiates animations
//displays when game is over
// if you won / lost
export class UI {
  static addFighterPictures() {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(res => {
        let picDivs = Array.from(document.querySelectorAll(".fighter-picture"));

        picDivs.forEach(div => {
          let randomNum = getRandomInt(99);
          let randomMeme = res.data.memes[randomNum].url;
          div.innerHTML = `<img src="${randomMeme}" alt="moth" />`;
        });
      })
    );
  }
  static addFighterPicture(div) {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(res => {
        let randomNum = getRandomInt(99);
        let randomMeme = res.data.memes[randomNum].url;
        div.innerHTML = `<img src="${randomMeme}" alt="moth" />`;
      })
    );
  }
  static populateMoves(fighter1, fighter2) {
    let topMoves = document.getElementById("enemy-moves");
    let bottomMoves = document.getElementById("player-moves");
    UI.populateMovesText(topMoves, fighter1);
    UI.populateMovesText(bottomMoves, fighter2);
  }

  static populateMovesText(el, fighter) {
    //start from 1 to skip over title p element
    for (let i = 1; i < el.children.length; i++) {
      let currMoveBtn = el.children[i];
      let currAttack = fighter.attacks[i - 1];

      currMoveBtn.textContent = currAttack.name;

      //color code based off move type
      if (currAttack.type === "rock") {
        currMoveBtn.className = "nes-btn is-warning";
      } else if (currAttack.type === "scissors") {
        currMoveBtn.className = "nes-btn is-error";
      } else {
        currMoveBtn.className = "nes-btn is-success";
      }
    }
  }
  static clearMovesContent(el) {
    let arr = Array.from(el.children);
    arr.forEach(child => {
      child.style.display = "none";
    });
  }
  static showMovesContent(el) {
    let arr = Array.from(el.children);
    arr.forEach(child => {
      child.style.display = "block";
    });
  }
  static adjustHealth(bar, newHealth, oldHealth) {
    let barPercentage = (newHealth / oldHealth) * 100;
    if (bar === "top") {
      let newBar = document.getElementById("topBar");
      newBar.setAttribute("value", String(barPercentage));
      UI.adjustBarColor(newBar, barPercentage);
    } else {
      let newBar = document.getElementById("bottomBar");
      newBar.setAttribute("value", String(barPercentage));
      UI.adjustBarColor(newBar, barPercentage);
    }
  }

  static adjustBarColor(bar, percentage) {
    console.log(percentage);
    if (percentage > 50) {
      bar.className = "nes-progress is-success";
    }
    if (percentage <= 50) {
      bar.className = "nes-progress is-warning";
    }
    if (percentage <= 20) {
      bar.className = "nes-progress is-error";
    }
  }
  static displayCommentary(el, user, attack, effectiveness) {
    el.innerHTML = `<h1>${user.name} used ${attack.name}</h1>`;
    el.style.display = "block";
  }

  static displayResultModal(winner) {
    let modal = document.querySelector(".modal");
    let result = document.getElementById("result");
    if (winner === "player1") {
      //show modal
      result.innerHTML = `
      <h3>Player 1 Wins!</h3>
      <button class="nes-btn" onClick="window.location.reload();">
          Play again!
      </button>
    
      `;
    } else {
      //show modal
      result.innerHTML = `
      <h3>Player 2 Wins!</h3>
      <button class="nes-btn" onClick="window.location.reload();">
          Play again!
      </button>`;
    }

    modal.style.display = "block";
  }
}

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

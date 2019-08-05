export class UI {
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
  static disableButtons() {}
}

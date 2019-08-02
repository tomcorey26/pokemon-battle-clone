//properties
//health
//condition(like psn/paralzed)
//type
//POKEMON CLASS
export class Fighter {
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

    //check for health being 0
    //check for defeat
    //switch turn to cpu or other player
  }
}

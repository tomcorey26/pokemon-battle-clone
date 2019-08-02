//attacks and their damages (object) and their pp
//method use normal attack
//method use status inflicting attack
// heal (item as parameter)
//Attack Class
export function Attack(type, damage, inflictorProbability, pp, accuracy) {
  this.type = type;
  this.damage = damage;
  this.inflictorProbability = inflictorProbability;
  this.pp = pp;
  this.accuracy = accuracy;
}

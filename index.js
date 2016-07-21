(function() {

  var db = require('./lib/db');
  var data = db().load();

  var Weapon = require('./lib/types/weapon');

  data.weapons.push(new Weapon({
    name: 'small axe',
    description: 'a small, bronze axe',
    baseDamage: 12,
    sidedDie: 12
  }));

  db().save();


}());

(function() {

  var db = require('./lib/db');
  var data = db().load();

  var Weapon = require('./lib/types/weapon');

  var alley  = data.rooms[0];
  var market = data.rooms[1];
  var jim    = data.players[0];

  market.enter(jim);
  console.log(jim.look());

  jim.move('sw', data.rooms);
  console.log(jim.look());

  db().save();


}());

(function() {

  var db = require('./lib/db');
  var data = db().load();

  var Weapon = require('./lib/types/weapon');

  var alley = data.rooms[0];
  var market = data.rooms[1];
  alley.exits.push({"s": market.id})
  market.exits.push({"n": alley.id})

  var player = data.players[0];
  alley.enter(player);

  console.log(player.look());

  player.move('s', data.rooms);

  console.log(player.look());
  //db().save();


}());

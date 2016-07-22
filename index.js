(function() {

  var db = require('./lib/db');
  var data = db().load();

  var Weapon = require('./lib/types/weapon');

  var alley  = data.rooms[0];
  var market = data.rooms[1];

  alley.exits.push({'s': market.id});
  market.exits.push({'n': alley.id});


  db().save();


}());

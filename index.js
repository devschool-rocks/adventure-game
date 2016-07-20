(function() {

  var Db = require('./lib/db');
  var data = new Db().init();

  players = data.players;

  console.log(data.rooms[0]);


}());

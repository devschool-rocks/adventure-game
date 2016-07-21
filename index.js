(function() {

  var db = require('./lib/db');
  var data = db().load();
  
  data.players[0].name = 'James';

  db().save();


}());

(function() {
  var util = require('util');
  var net = require('net')

  var Interpreter = require('./lib/interpreter');
  var Player = require('./lib/types/player');

  var db = require('./lib/db');
  var worldData = db().load();

  var minutes = function(num) {
    return num * 60000;
  };

  var connections = [];
  var port = 4200;

  var say = function(str) {
    for(var i = 0; i<connections.length; i++) {
      connections[i].write(str);
    }
  };

  var Connection = function(socket) {
    var self = this;
    this.socket = socket;
    this.player = new Player({name: "Jimmy", room: worldData.rooms[0]});

    this.send = function(data) {
      this.socket.write(data.toString());
    };

    this.socket.on('data', function(data) {
      var cmdStr = data
        .toString()
        .replace(/\r/,'')
        .replace(/\n/,'');

      var command = cmdStr.split(' ')[0];
      var args = cmdStr.split(' ').slice(1);

      self.send(
        '\n' +
        new Interpreter().eval(
          self.player,
          command,
          args,
          worldData
        )
      );
    });

    this.socket.on('end', function() {
      var i = connections.indexOf(connection);
      if (i != -1) {
        connections.splice(i, 1);
      }
    });

    return this;
  };

  var handler = function(socket) {
    var connection = new Connection(socket);
    connections.push(connection);
    connection.send('Welcome to the game server!\n');

  };


  var server = net.createServer(handler);
  server.listen(port);

  util.log('Setting autosave to 2 minutes');
  clearInterval(minutes(2));
  saveint = setInterval(db().save, minutes(2));


}());

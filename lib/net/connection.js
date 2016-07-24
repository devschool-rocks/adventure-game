var Connection = function(socket, worldData) {
  var Player = require('../types/player');
  var GameInterpreter = require('../interpreters/game');

  var self = this;
  this.socket = socket;
  this.player = new Player({name: "No one", room: worldData.rooms[0]});
  this.player.connection = self;
  this.player.interpreter = new GameInterpreter;

  this.send = function(data) {
    this.socket.write(data.toString());
  };

  this.socket.on('data', function(data) {
    var cmdStr = data
      .toString()
      .replace(/\r/,'')
      .replace(/\n/,'');

    var command = cmdStr.split(' ')[0];
    var args = cmdStr.split(' ').slice(1).join(' ');

    self.send(
        '\n' +
        self.player.interpreter.eval(
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

module.exports = Connection;

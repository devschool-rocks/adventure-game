var Connection = function(socket, worldData) {
  var Player = require('../types/player');
  var Interpreter = require('../interpreter');

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

module.exports = Connection;

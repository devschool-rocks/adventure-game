module.exports = function() {
  var glob = require('glob-fs');
  var fs = require('fs');
  var Player = require('./types/player');
  var Room = require('./types/room');

  this.loadPlayersIntoRooms = function() {
    var self = this;
    this.players.forEach(function(player) {
      var index = self.rooms.map(function(room) {
        return room.id;
      }).indexOf(player.room);

      if(self.rooms[index]) {
        player.room = self.rooms[index];
        self.rooms[index].players.push(player);
      }
    });
  };

  this.loadResource = function(path, object) {
    return glob().readdirSync("./data/"+path+"/*.json", {})
      .map(function(file) {
        attrs = JSON.parse(fs.readFileSync(file, 'utf8'));
        return new object(attrs);
      });
  };

  this.saveResource = function(path, object) {
  };

  this.load = function() {
    this.rooms   = this.loadResource('rooms', Room);
    this.players = this.loadResource('players', Player);

    this.loadPlayersIntoRooms();

    return {
      rooms: this.rooms,
      players: this.players
    };
  };

  this.save = function() {
    this.saveResource('player', players);
    this.saveResource('room',   rooms);

    this.players.forEach(function(player) {
      var json = JSON.stringify(player);
      fs.writeFileSync(player.filename(), json);
    });
  };

  return this;
};

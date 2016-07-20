module.exports = function() {
  var glob = require('glob-fs');
  var Player = require('./types/player');
  var Room = require('./types/room');

  this.players = [];
  this.rooms = [];

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

  this.load = function(path, object) {
    return glob().readdirSync("./data/"+path+"/*.js", {})
      .map(function(file) {
        var obj = new object(require("../"+file));
        return obj;
      });
  }


  this.init = function() {
    this.rooms   = this.load('rooms', Room);
    this.players = this.load('players', Player);

    this.loadPlayersIntoRooms();

    return {
      rooms:   this.rooms,
      players: this.players
    };
  };

  return this.init();

};

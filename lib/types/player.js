var Player = function(options) {
  this.id   = options.id;
  this.name = options.name;
  this.room = options.room;

  this.toString = function() {
    return this.name;
  };

  this.filename = function() {
    return;
  };

  this.move = function(direction, rooms) {
    if (!this.room) {
      return;
    }

    if (!this.room.hasExit(direction)) {
      return;
    }

    var roomId = this.room.exits.map(function(exit) {
      var key = Object.keys(exit)[0];
      return exit[key];
    })[0];

    var destination = rooms.filter(function(room) {
      return roomId === room.id;
    })[0];

    return destination.enter(this);
  };

  this.look = function() {
    var self = this;
    return [
      this.room.name,
      "---",
      this.room.description,
      '',
      this.room.players.filter(function(player) {
        return self !== player;
      }).join('\n'),
      '',
      ''
    ].join('\n');
  };

  return this;
};

module.exports = Player;

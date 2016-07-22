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
    var self = this;
    if (!this.room) {
      return;
    }

    if (!this.room.hasExit(direction)) {
      return;
    }

    var targetExit = this.room.exits.filter(function(exit) {
      var key = Object.keys(exit)[0];
      return key === direction;
    })[0];

    var destination = rooms.filter(function(room) {
      return targetExit[direction] === room.id;
    })[0];

    destination.enter(this);
  };

  var divider = function(str, ch) {
    return str
      .split('')
      .map(function(s) { return ch; })
      .join('') + ch;
  };

  this.look = function() {
    var self = this;
    return [
      this.room.name,
      divider(this.room.name, "-"),
      this.room.description,
      '',
      'Exits: ' +
      this.room.exits.map(function(exit) {
        return Object.keys(exit);
      }).join(", "),
      '',
      this.room.players.filter(function(player) {
        return self !== player;
      }).join('\n'),
      '',
    ].join('\n');
  };

  return this;
};

module.exports = Player;

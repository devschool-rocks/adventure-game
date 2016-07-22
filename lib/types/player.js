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

  this.n = function(direction, data) {
    return this.move('n', data);
  };

  this.e = function(direction, data) {
    return this.move('e', data);
  };

  this.s = function(direction, data) {
    return this.move('s', data);
  };

  this.e = function(direction, data) {
    return this.move('e', data);
  };

  this.ne = function(direction, data) {
    return this.move('ne', data);
  };

  this.se = function(direction, data) {
    return this.move('se', data);
  };

  this.nw = function(direction, data) {
    return this.move('nw', data);
  };

  this.sw = function(direction, data) {
    return this.move('sw', data);
  };
  this.move = function(direction, data) {
    var self = this;
    if (!this.room) {
      return 'Possibly a bug? You have no room currently.';
    }

    if (!this.room.hasExit(direction)) {
      return 'You can\'t go that way!';
    }

    var targetExit = this.room.exits.filter(function(exit) {
      var key = Object.keys(exit)[0];
      return key === direction;
    })[0];

    if (!targetExit) {
      return 'You can\'t go that way!';
    }

    var destination = data.rooms.filter(function(room) {
      return targetExit[direction] === room.id;
    })[0];

    if (!destination) {
      return 'Destination room not found!';
    }

    destination.enter(this);

    return this.look();
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

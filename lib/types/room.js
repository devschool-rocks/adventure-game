var Room = function(options) {
  this.id          = options.id;
  this.name        = options.name;
  this.description = options.description;

  this.players     = [];
  this.exits       = options.exits || [];

  this.toString = function() {
    return this.name;
  };

  this.hasExit = function(direction) {
    return this.exits.filter(function(exit) {
      return Object.keys(exit)[0] === direction;
    })[0];
  };

  this.enter = function(player) {
    if (player.room) {
      this.exit(player);
    }
    this.players.push(player);
    player.room = this;
  };

  this.exit = function(player) {
    var perspective = player.room;
    var index = perspective.players.indexOf(player);
    if (index < 0) {
      return;
    }
    perspective.players.splice(index, 1);
  };

  return this;
};

module.exports = Room;

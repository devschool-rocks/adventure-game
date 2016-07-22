var movementCmds = function(player) {

  player.u = function(direction, data) {
    return player.move('u', data);
  };

  player.d = function(direction, data) {
    return player.move('d', data);
  };

  player.n = function(direction, data) {
    return player.move('n', data);
  };

  player.e = function(direction, data) {
    return player.move('e', data);
  };

  player.s = function(direction, data) {
    return player.move('s', data);
  };

  player.w = function(direction, data) {
    return player.move('w', data);
  };

  player.ne = function(direction, data) {
    return player.move('ne', data);
  };

  player.se = function(direction, data) {
    return player.move('se', data);
  };

  player.nw = function(direction, data) {
    return player.move('nw', data);
  };

  player.sw = function(direction, data) {
    return player.move('sw', data);
  };

  player.move = function(direction, data) {
    if (!player.room) {
      return 'Possibly a bug? You have no room currently.';
    }

    if (!player.room.hasExit(direction)) {
      return 'You can\'t go that way!';
    }

    var targetExit = player.room.exits.filter(function(exit) {
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

    destination.enter(player);

    return player.look();
  };

};

module.exports = movementCmds;

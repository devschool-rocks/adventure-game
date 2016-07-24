var lookingCmds = function(player) {
  var divider = function(str, ch) {
    return str
      .split('')
      .map(function(s) { return ch; })
      .join('') + ch;
  };

  player.look = function() {
    return [
      player.room.name,
      divider(player.room.name, "-"),
      player.room.description,
      '',
      'Exits: ' +
      player.room.exits.map(function(exit) {
        return Object.keys(exit);
      }).join(", "),
      '',
      player.room.players.filter(function(plr) {
        return player !== plr;
      }).join('\n'),
      '',
    ].join('\n');
  };

};

module.exports = lookingCmds;

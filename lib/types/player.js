module.exports = function(options) {
  this.id   = options.id;
  this.name = options.name;
  this.room = options.room;

  this.toString = function() {
    return this.name;
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

  this.filename = function() {
    return [
      "./data/players/",
      this.id,
      "-",
      this.name.toLowerCase(),
      ".json"
    ].join('');
  };

  return this;
};

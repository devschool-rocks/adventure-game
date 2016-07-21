module.exports = function(options) {
  this.id   = options.id;
  this.name = options.name;
  this.room = options.room;

  this.toString = function() {
    return this.name;
  };

  this.filename = function() {
    return 
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

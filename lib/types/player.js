var Player = function(options) {
  require('../commands/admin')(this);
  require('../commands/buying')(this);
  require('../commands/looking')(this);
  require('../commands/movement')(this);

  this.id   = options.id;
  this.name = options.name;
  this.room = options.room;

  this.flags = options.flags || [];
  this.items = options.items || [];

  this.toString = function() {
    return this.name;
  };

  this.filename = function() {
    return;
  };

  this.send = function(msg) {
    this.connection.send(msg);
  };

  return this;
};

module.exports = Player;

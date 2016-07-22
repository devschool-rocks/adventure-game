var Interpreter = function() {
  this.commands = ['look'];

  this.eval = function(player, cmd, args) {
    if (this.commands.indexOf(cmd) == -1) {
      return;
    }
    return player[cmd](args);
  };

  return this;
};

module.exports = Interpreter;

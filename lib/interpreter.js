var Interpreter = function() {
  this.commands = 'look n e w s ne nw se sw'.split(' ');

  this.eval = function(player, cmd, args, data) {
    if (this.commands.indexOf(cmd) == -1) {
      return;
    }
    return player[cmd](args, data);
  };

  return this;
};

module.exports = Interpreter;

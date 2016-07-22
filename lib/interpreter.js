var Interpreter = function() {
  this.commands = 'look u d n e w s ne nw se sw will'.split(' ');

  this.eval = function(player, cmd, args, data) {
    if (this.commands.indexOf(cmd) == -1) {
      return 'huh?\n';
    }
    return player[cmd](args, data) + '\n';
  };

  return this;
};

module.exports = Interpreter;

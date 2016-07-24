var OlcInterpreter = function() {
  this.commands = 'look rename description exits quit'.split(' ');

  this.eval = function(player, cmd, args, data) {
    if (this.commands.indexOf(cmd) == -1) {
      return 'huh?\n';
    }
    return player[cmd](args, data) + '\n';
  };

  return this;
};

module.exports = OlcInterpreter;

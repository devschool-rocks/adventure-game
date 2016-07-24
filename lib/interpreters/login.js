var LoginInterpreter = function() {
  this.commands = 'create login quit'.split(' ');

  this.eval = function(player, cmd, args, data) {
    if (this.commands.indexOf(cmd) == -1) {
      return 'huh?\n';
    }
    return player[cmd](args, data) + '\n';
  };

  return this;
};

module.exports = LoginInterpreter;

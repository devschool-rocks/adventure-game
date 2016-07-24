var olcCmds = function(player) {
  var Room = require('../types/room');
  var OlcInterpreter = require('../interpreters/olc');

  var strings = require('../strings');
  var capitalize = strings().capitalize;
  
  var attrsFromArgs = function(string) {
    if (string[0] !== '{' &&
        string[string.length] !== '}') {
      return [{}, 'should be like this {name: "an alley", description: "The sunlight barely penetrates here and the walls are covered in some dark residue, long since dried.."}'];
    }

    return [eval(string), ''];
  };

  player.create = function(args, data) {
    var target = args.split(' ')[0];
    var args = args.split(' ').slice(1).join(' ');

    var klass = eval(capitalize(target));
    var attrs = attrsFromArgs(args);
    if(attrs[1].length > 0) {
      return attrs[1];
    }
    var obj = new klass(eval(attrs[0]));
    player.olcObject = obj;

    player.interpreter = new OlcInterpreter;

    if (klass === Room) {
      obj.enter(player);
    }

    return [
      obj.name,
      'created'
    ].join(' ');
  };

};

module.exports = olcCmds;

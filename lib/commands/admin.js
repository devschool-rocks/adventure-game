var Item = require('../types/item');

var adminCmds = function(player) {
  player.create = function(type, name) {
    if (!this.flags.includes('admin')) {
      return 'Nope, not gonna do that.';
    }
    if (type === 'item') {
      var item = new Item({name: name});
      player.items.push(item);
      return [
        'Item: ',
        item.name,
        'created.'
      ].join(' ');
    }
  };
};

module.exports = adminCmds;

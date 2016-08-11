var buyingCmds = function(player) {
  player.list = function() {
    if (!player.room.isShop()) {
      return 'You are not in a shop.';
    }

    return "Oh Yeah!";
  };
};

module.exports = buyingCmds;

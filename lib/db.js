module.exports = function() {
  var glob = require('glob-fs');
  var fs = require('fs');
  var Player = require('./types/player');
  var Room = require('./types/room');

  this.loadPlayersIntoRooms = function() {
    var self = this;

    this.players.forEach(function(player) {
      var index = self.rooms.map(function(room) {
        return room.id;
      }).indexOf(player.room);

      if(self.rooms[index]) {
        player.room = self.rooms[index];
        self.rooms[index].players.push(player);
      }
    });
  };

  this.loadResource = function(path, object) {
    return glob().readdirSync("./data/"+path+"/*.json", {})
      .map(function(file) {
        attrs = JSON.parse(fs.readFileSync(file, 'utf8'));
        return new object(attrs);
      });
  };

  this.filename = function(path, item) {
    var hyphenate = function(string) {
      return string.replace(/ /g, '-');
    };

    var pad = function(num) {
      var zeros = "00000";
      return zeros.substring(0, zeros.length - num.length) + num;
    };

    return [
      "./data/" + path + "/",
      pad(item.id),
      ".json"
    ].join('');
  };

  this.saveResource = function(path, collection) {
    var writeData = function(path, item) {
      var json = JSON.stringify(item);
      var file = this.filename(path, item);
      fs.writeFileSync(file, json);
    };

    collection.forEach(function(item) {
      writeData(path, item);
    });
  };

  this.dbTypes = function() {
    return glob()
      .readdirSync("./data/*", {})
      .map(function(dir) {
        return dir.split('data/')[1]
      });
  };

  var asObj = function(str) {
    return eval(str.charAt(0).toUpperCase() + str.slice(1, str.length-1));
  };

  this.load = function() {
    this.dbTypes().forEach(function(type) {
      this[type] = this.loadResource(type, asObj(type));
    });

    this.loadPlayersIntoRooms();

    return {
      rooms: this.rooms,
      players: this.players
    };
  };

  this.save = function() {
    this.dbTypes().forEach(function(type) {
      this.saveResource(type, this[type]);
    });

  };

  return this;
};

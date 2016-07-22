var Server = function(port) {
  var self       = this;
  var util = require('util');
  var net = require('net');

  var db         = require('../db');
  var worldData  = db().load();
  var Connection = require('./connection');

  self.connections = [];
  self.port = port || 4200;

  var minutes = function(num) {
    return num * 60000;
  };

  var handler = function(socket) {
    var connection = new Connection(socket, worldData);
    connections.push(connection);
    connection.send('Welcome to the game server!\n');
  };

  self.telnet = net.createServer(handler);
  self.telnet.listen(self.port);

  util.log('Setting autosave to 2 minutes');
  clearInterval(minutes(2));
  var save = function() {
    db().save;
    util.log("Saving.");
  };
  saveint = setInterval(save, minutes(2));

  return self;
};

module.exports = Server;

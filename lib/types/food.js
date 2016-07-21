var Food = function(options) {
  this.id          = options.id;
  this.name        = options.name;
  this.description = options.description;

  this.toString = function() {
    return this.name;
  };

  return this;
};

module.exports = Food;


var listeners = [];

var state;

var _width, _height, _id;

exports.start = function () {
  _id = requestAnimationFrame(exports.start);
  exports.step();
};

exports.stop = function () {
  cancelAnimationFrame(_id);
};


exports.init = function (width, height, shouldUpdate) {
  _width = width;
  _height = height;
  state = [];

  for (var x = 0; x < height; ++x) {
    var cells = [];
    for (var y = 0; y < width; ++y) {
      var alive = Math.random() > 0.7;
      cells.push(alive);
    }
    state.push(cells);
  }

  if (shouldUpdate) changed();
};


exports.clear = function (width, height) {
  _width = width;
  _height = height;
  state = [];

  for (var x = 0; x < height; ++x) {
    var cells = [];
    for (var y = 0; y < width; ++y) {
      cells.push(false);
    }
    state.push(cells);
  }

  changed();
};


exports.step = function () {
  var newState = [];
  for (var x = 0; x < _height; ++x) {
    var row = [];
    for (var y = 0; y < _width; ++y) {
      row.push(nextStep(x, y));
    }
    newState.push(row);
  }
  state = newState;
  changed();
};

exports.setCell = function (x, y, alive) {
  state[x][y] = alive;
  changed();
}

exports.getState = function () {
  return state;
};

exports.onChange = function (cb) {
  listeners.push(cb);
};

function changed() {
  listeners.forEach(function (cb) {
    cb();
  });
}

function nextStep(x, y) {
  var numAlive = 0;
  for (var xOffset = -1; xOffset <= 1; ++xOffset) {
    for (var yOffset = -1; yOffset <= 1; ++yOffset) {
      if (xOffset === 0 && yOffset === 0) continue;
      var _x = x + xOffset;
      if (_x < 0) _x = _height - 1;
      if (_x >= _height) _x = 0;
      var _y = y + yOffset;
      if (_y < 0) _y = _width - 1;
      if (_y >= _width) _y = 0;
      numAlive += state[_x][_y] ? 1 : 0;
    }
  }

  if (!state[x][y]) return numAlive === 3;
  if (numAlive < 2) return false;
  if (numAlive < 4) return true;
  return false;
}


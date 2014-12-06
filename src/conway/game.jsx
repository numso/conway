/**
 * @jsx React.DOM
 */

var React = require('react');
var Row = require('./row');
var Cell = require('./cell');
var GameState = require('./game-state');

var Game = React.createClass({

  getInitialState: function() {
    return {
      cells: GameState.getState(),
      paintValue: true
    };
  },

  setPaintValue: function (val) {
    this.setState({
      paintValue: val
    });
  },

  componentDidMount: function() {
    GameState.onChange(function () {
      this.setState({
        cells: GameState.getState()
      });
    }.bind(this));
  },

  render: function() {
    var state = this.state.cells;

    var rows = [];
    for (var x = 0; x < state.length; ++x) {
      var cells = [];
      for (var y = 0; y < state[x].length; ++y) {
        var alive = state[x][y];
        cells.push(<Cell x={x} y={y} alive={alive} paintValue={this.state.paintValue} setPaintValue={this.setPaintValue} setCell={GameState.setCell}/>);
      }
      var row = (
        <Row>
          {cells}
        </Row>
      )
      rows.push(row);
    }

    return (
      <div className="grid">
        {rows}
      </div>
    );
  }

});

module.exports = Game;

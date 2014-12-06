/**
 * @jsx React.DOM
 */

var React = require('react');
var Row = require('./row');
var Cell = require('./cell');
var GameState = require('./game-state');

var patterns = require('./patterns');

var Pattern = React.createClass({

  getDefaultProps: function() {
    return {
      patternID: 0,
      onClick: function () {}
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      cells: patterns[nextProps.patternID]
    });
  },

  getInitialState: function() {
    return {
      cells: patterns[this.props.patternID]
    };
  },

  onClick: function () {
    this.props.onClick(this.props.patternID);
  },

  render: function() {
    var state = this.state.cells;

    var rows = [];
    for (var x = 0; x < state.length; ++x) {
      var cells = [];
      for (var y = 0; y < state[x].length; ++y) {
        var alive = state[x][y];
        cells.push(<Cell x={x} y={y} alive={alive}/>);
      }
      var row = (
        <Row>
          {cells}
        </Row>
      )
      rows.push(row);
    }

    return (
      <div className="grid" style={{ marginBottom: 20 }} onClick={this.onClick}>
        {rows}
      </div>
    );
  }

});

module.exports = Pattern;

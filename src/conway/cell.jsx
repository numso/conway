/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var GameState = require('./game-state');

var Cell = React.createClass({

  getDefaultProps: function() {
    return {
      alive: false,
      x: 0,
      y: 0,
      paintValue: true,
      setPaintValue: function () {}
    };
  },

  onMouseDown: function (e) {
    if (e.nativeEvent.which !== 1) return;
    this.props.setPaintValue(!this.props.alive);
    GameState.setCell(
      this.props.x,
      this.props.y,
      !this.props.alive
    );
  },

  onMouseOver: function (e) {
    if (e.nativeEvent.which !== 1) return;
    GameState.setCell(
      this.props.x,
      this.props.y,
      this.props.paintValue
    );
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      cell: true,
      alive: this.props.alive
    });

    // var color = this.props.alive ? '#'+Math.floor(Math.random()*16777215).toString(16) : 'white';

    return (
      <span onMouseOver={this.onMouseOver} onMouseDown={this.onMouseDown} className={classes}></span>
    );
  }

});

module.exports = Cell;

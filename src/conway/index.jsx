/**
 * @jsx React.DOM
 */

var React = require('react');
var Grid = require('./grid');
var GameState = require('./game-state');

var WIDTH = 70;
var HEIGHT = 40;

GameState.init(WIDTH, HEIGHT);

var App = React.createClass({

  getInitialState: function() {
    return {
      running: false
    };
  },

  onStart: function () {
    var fn = this.state.running ? 'stop' : 'start';
    GameState[fn]();
    this.setState({
      running: !this.state.running
    });
  },

  onStep: function () {
    GameState.step();
  },

  randomize: function () {
    GameState.init(WIDTH, HEIGHT, true);
  },

  clear: function () {
    GameState.clear(WIDTH, HEIGHT);
  },

  render: function() {
    return (
      <div style={{width: 1200}}>
        <div>Conway's Game of Life</div>
        <Grid width={WIDTH} height={HEIGHT}/>
        <div>
          <button onClick={this.onStart}>
            {this.state.running ? 'Stop' : 'Start'} Simulation
          </button>
          <button onClick={this.onStep}>Step</button>
          <button onClick={this.randomize}>Randomize</button>
          <button onClick={this.clear}>Clear</button>
        </div>
      </div>
    );
  }

});

module.exports = App;

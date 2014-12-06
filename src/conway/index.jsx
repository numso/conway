/**
 * @jsx React.DOM
 */

var React = window.React = require('react');
var _ = require('lodash');
var Game = require('./game');
var GameState = require('./game-state');
var Pattern = require('./pattern');

var _patterns = require('./patterns');
var patternLength = require('./patterns').length;

var WIDTH = 50;
var HEIGHT = 40;

GameState.init(WIDTH, HEIGHT);

function randomID() {
  return Math.floor(Math.random() * patternLength);
}

var App = React.createClass({

  getInitialState: function() {
    return {
      running: false,
      curPattern: randomID()
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

  clickedPattern: function (i) {
    this.setState({
      curPattern: i
    });
  },

  copyPattern: function (i) {
    var patternToCopy = _patterns[i];
    GameState.pastePattern(patternToCopy);
  },

  render: function() {
    var patterns = _.map(_.range(patternLength), function (i) {
      return <Pattern patternID={i} onClick={this.clickedPattern}/>
    }.bind(this));

    return (
      <div style={{width: 1420}}>
        <div>Conway's Game of Life</div>
        <div style={{ display: 'inline-block' }}>

          <Game/>

          <div>
            <button onClick={this.onStart}>{this.state.running ? 'Stop' : 'Start'} Simulation</button>
            <button onClick={this.onStep}>Step</button>
            <button onClick={this.randomize}>Randomize</button>
            <button onClick={this.clear}>Clear</button>
          </div>

        </div>
        <div style={{ display: 'inline-block', paddingLeft: 20, verticalAlign: 'top', width: 597 }}>

          <h3>Clipboard</h3>
          <Pattern patternID={this.state.curPattern} onClick={this.copyPattern}/>

          <div style={{borderBottom: '3 solid', width: '100%', marginBottom: 20}}/>

          <h3>Saved Patterns</h3>
          <div className="pattern-holder">{patterns}</div>

        </div>
      </div>
    );
  }

});

module.exports = App;


/** @jsx React.DOM */
var React = require('react')

var {Link} = require('react-router');
// var Link = require('react-router').Link;



var Hello = React.createClass({
  render: function() {
    return <div>
      <h1>Main</h1>
      <ul>
        <li><a href="#/hello/world">Hello World</a></li>
        <li><a href="#/colors">Colors</a></li>
        <li><Link to="conway">Conway's Game of Life</Link></li>
      </ul>
    </div>
  },
})

module.exports = Hello

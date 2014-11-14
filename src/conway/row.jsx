/**
 * @jsx React.DOM
 */

var React = require('react');

var Row = React.createClass({

  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Row;

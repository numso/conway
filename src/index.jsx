/** @jsx React.DOM */

var React = require('react')
var {Routes, Route, Redirect, NotFoundRoute} = require('react-router')
var Hello = require('./example/hello')
var Main = require('./example/main')
var Colors = require('./example/colors')

var routes = <Routes>
  <Route name="hello" path="/hello/:name" handler={Hello}/>
  <Route name="index" path="/" handler={Main}/>
  <Route name="colors" path="/colors" handler={Colors}/>
</Routes>

React.render(routes, document.getElementById('main'));

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require("../components/Home");
var About = require('../components/About');
var PhotosContainer = require('../components/PhotosContainer');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/about' component={About} />
    </Route>
  </Router>
);

module.exports = routes;

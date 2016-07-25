var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Nav = require('./Nav');
var PaginationLinks = require('./PaginationLinks');
var Movies = require('./Movies');
var MainContainer = require('./MainContainer')

var App = React.createClass({
  getInitialState: function(){
    return ({
      movies: {}
    })
  },

  componentWillMount: function(){
    this.getMoviesFromServer();
  },

  getMoviesFromServer: function(pageNumber){
    var page = pageNumber ? pageNumber : 1
    var currURL = "http://localhost:3000/movies?page=" + page
    $.ajax({
      url: currURL,
      dataType: "json",
      contentType: 'application/json',
      method: "get"
    }).done(function(data){
      this.setState({
        movies: data.movies,
        current_page: data.current_page,
        total_pages: data.total_pages,
        total_entries: data.total_entries
      })
    }.bind(this))
  },

  handlePaginationClick: function(pageNumber){
    this.getMoviesFromServer(pageNumber)
  },

  render: function(){
    return(
      <div>
        <Nav/>
        <MainContainer movies={this.state.movies}
                       current_page={this.state.current_page}
                       total_pages={this.state.total_pages}
                       total_entries={this.state.total_entries}
                       handlePaginationClick={this.handlePaginationClick}/>
      </div>
    )
  }
});

module.exports = App;

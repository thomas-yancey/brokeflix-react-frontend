var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Nav = require('./Nav');
var PaginationLinks = require('./PaginationLinks');
var Movies = require('./Movies');
var MainContainer = require('./MainContainer');
var FilterContainer = require('./FilterContainer');

var App = React.createClass({
  getInitialState: function(){
    return ({
      movies: {},
      current_page: 1,
      total_pages: 1,
      total_entries: 0,
      startYear: 1900,
      endYear: 2016,
      actor: "",
      director: "",
      genre: "",
      rating: "metascore",
      allSources: [],
      selectedSources: []
    })
  },

  componentWillMount: function(){
    this.getMoviesFromServer();
    this.getDistinctSourcesFromServer();
  },

  getMoviesFromServer: function(){
    var params = {
      page: this.state.current_page,
      start_year: this.state.startYear,
      end_year: this.state.endYear,
      actor: this.state.actor,
      director: this.state.director,
      review_field: this.state.rating,
      allSources: [],
      selectedSources: []
    };
    var currURL = "http://localhost:3000/movies?" + $.param(params)
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

  getDistinctSourcesFromServer: function(){
    var currURL = "http://localhost:3000/sources"
    $.ajax({
      url: currURL,
      dataType: "json",
      contentType: 'application/json',
      method: "get"
    }).done(function(data){
      var sources = data.map(function(source){
        return source.display_name
      });
      this.setState({
        allSources: sources,
        selectedSources: sources
      })
    }.bind(this))
  },

  handleSelectedSources: function(sources){
    this.setState({
      selectedSources: sources
    })
  },

  handlePaginationClick: function(pageNumber){
    this.setState({
      current_page: pageNumber
    },this.getMoviesFromServer);
  },

  handleStartYearChange: function(value){
    this.setState({
      startYear: value
    },this.getMoviesFromServer);
  },

  handleEndYearChange: function(value){
    this.setState({
      endYear: value
    },this.getMoviesFromServer);
  },

  handleRatingChange: function(value){
    this.setState({
      rating: value
    },this.getMoviesFromServer);
  },

  render: function(){
    return(
      <div>
        <Nav/>
        <div className="ui stackable very relaxed aligned grid container">
          <div className="three wide column">
          <FilterContainer
          startYear={this.state.startYear}
          endYear={this.state.endYear}
          selectedSources={this.state.selectedSources}
          allSources={this.state.allSources}
          handleStartYearChange={this.handleStartYearChange}
          handleEndYearChange={this.handleEndYearChange}
          handleRatingChange={this.handleRatingChange}
          handleSelectedSources={this.handleSelectedSources}
          />
          </div>
          <div className="thirteen wide column">
          <MainContainer movies={this.state.movies}
                         current_page={this.state.current_page}
                         total_pages={this.state.total_pages}
                         total_entries={this.state.total_entries}
                         handlePaginationClick={this.handlePaginationClick}/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = App;

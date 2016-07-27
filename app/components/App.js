var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Nav = require('./Nav');
var PaginationLinks = require('./PaginationLinks');
var Movies = require('./Movies');
var MainContainer = require('./MainContainer');
var FilterContainer = require('./FilterContainer');
var YearFilter = require('./YearFilter');

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

  componentDidMount: function(){
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
      allSources: this.state.allSources,
      selectedSources: this.state.selectedSources
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
    }.bind(this),this.getMoviesFromServer)
  },

  selectedSourcesContains: function(value){
    for (var i = 0; i < this.state.selectedSources.length; i++){
      if (this.state.selectedSources[i] === value){
        return true;
      }
    }
    return false;
  },

  removeUncheckedSource: function(source){
    return this.state.selectedSources.filter(function(curr_source){
      return source !== curr_source
    }.bind(this));
  },

  handleSourceChange: function(source){
    newSelectedSources = this.state.selectedSources
    if (this.selectedSourcesContains(source)){
      newSelectedSources = this.removeUncheckedSource(source)
    } else {
      newSelectedSources.push(source)
    };
    this.setState({
      selectedSources: newSelectedSources,
      current_page: 1
    },this.getMoviesFromServer)
  },

  handlePaginationClick: function(pageNumber){
    if (!(pageNumber > this.state.total_pages) && !(pageNumber < 1)){
      this.setState({
        current_page: pageNumber
      },this.getMoviesFromServer);
    }
    window.scrollTo(0, 0);
  },

  handleStartYearChange: function(value){
    this.setState({
      startYear: value,
      current_page: 1
    },this.getMoviesFromServer);
  },

  handleEndYearChange: function(value){
    this.setState({
      endYear: value,
      current_page: 1
    },this.checkYearLength);
  },

  checkYearLength: function(){
    if (this.state.endYear.length === 4 && this.state.startYear.length === 4){
      this.getMoviesFromServer()
    }
  },

  handleRatingChange: function(value){
    this.setState({
      rating: value,
      current_page: 1
    },this.getMoviesFromServer);
  },

  onChange: function(component, values) {
    console.log(values);
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
          ratingOrder={this.state.rating}
          handleStartYearChange={this.handleStartYearChange}
          handleEndYearChange={this.handleEndYearChange}
          handleRatingChange={this.handleRatingChange}
          handleSourceChange={this.handleSourceChange}
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

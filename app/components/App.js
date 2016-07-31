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
var Rcslider = require('rc-slider');
var _ = require('lodash');
var $ = require('jquery');

var App = React.createClass({
  getInitialState: function(){
    return ({
      movies: {},
      current_page: 1,
      total_pages: 1,
      total_entries: 0,
      startYear: "1900",
      endYear: "2016",
      actor: "",
      director: "",
      genre: "",
      rating: "metascore",
      allSources: [],
      selectedSources: [],
      titleSearch: "",
      mobile: true,
      itemView: true,
      gridLength: 4
    })
  },

  componentWillMount: function(){
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener('scroll', this.handleScroll);
    this.debounceGetMoviesFromServer = _.debounce(this.getMoviesFromServer,500);
    this.debounceInfiniteScroll = _.debounce(this.infininiteScrollFromServer,500);
  },

  componentDidMount: function(){
    this.InitialGetSourcesAndMovies();
    this.updateDimensions();
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
      selectedSources: this.state.selectedSources,
      title_search: this.state.titleSearch
    };
    var currURL = "http://brokeflix.herokuapp,com/movies?" + $.param(params)
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

  infininiteScrollFromServer: function(){
    var params = {
      page: this.state.current_page + 1,
      start_year: this.state.startYear,
      end_year: this.state.endYear,
      actor: this.state.actor,
      director: this.state.director,
      review_field: this.state.rating,
      allSources: this.state.allSources,
      selectedSources: this.state.selectedSources,
      title_search: this.state.titleSearch
    };
    var currURL = "http://brokeflix.herokuapp,com/movies?" + $.param(params)
    $.ajax({
      url: currURL,
      dataType: "json",
      contentType: 'application/json',
      method: "get"
    }).done(function(data){
      this.setState({
        movies: this.state.movies.concat(data.movies),
        current_page: data.current_page,
        total_pages: data.total_pages,
        total_entries: data.total_entries
      })
    }.bind(this))
  },

  InitialGetSourcesAndMovies: function(){
    var currURL = "http://brokeflix.herokuapp,com/sources"
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

  handleScroll: function(){
    $(window).scroll(function() {
     if($(window).scrollTop() + $(window).height() == $(document).height()) {
         this.debounceInfiniteScroll();
       }
    }.bind(this));
  },

  updateDimensions: function(){
    this.handleChangeToMobile();
    this.handleGridLengthChange();
  },

  handleChangeToMobile: function(){
    if ($(window).width() < 800) {
      this.setState({
        mobile: true,
        itemView: true
      })
    };
    if ($(window).width() >= 800) {
      this.setState({
        mobile: false,
        itemView: false
      })
    };
  },

  handleGridLengthChange: function(){
    if ($(window).width() >= 1200) {
      this.setState({
        gridLength: 4
      })
    };
    if ($(window).width() <= 1200) {
      this.setState({
        gridLength: 3
      })
    };
    if ($(window).width() <= 991) {
      this.setState({
        gridLength: 2
      })
    };
  },

  handleViewChange: function(){
    this.setState({
      itemView: !this.state.itemView
    });
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

  handleTitleSearchChange: function(search){
    this.setState({
      titleSearch: search,
      current_page: 1
    },this.debounceGetMoviesFromServer)
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
    },this.debounceGetMoviesFromServer)
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
    });
  },

  handleEndYearChange: function(value){
    this.setState({
      endYear: value,
      current_page: 1
    },this.debounceGetMoviesFromServer);
  },

  handleRatingChange: function(value){
    this.setState({
      rating: value,
      current_page: 1
    },this.getMoviesFromServer);
  },

  render: function(){
    var wideMenuStyle = {'position': 'fixed',
                         'overflow-y': 'scroll',
                         'width': '250px',
                         'height': '100%',
                         'left': '0',
                         'padding-left': '20px',
                         'margin-bottom': '50px'};
    var smallMenuStyle = {'position': 'fixed',
                          'overflow-y': 'scroll',
                          'width': '220px',
                          'left': '0',
                          'padding-left': '20px',
                          'padding-bottom': '150px',
                          'height': '100%'};
    var mobileMenuStyle = {};
    menuStyle = "";

    if (this.state.gridLength > 3){
      menuStyle = wideMenuStyle;
    } else if (this.state.mobile){
      menuStyle = mobileMenuStyle;
    } else {
      menuStyle = smallMenuStyle;
    };

    return(
      <div>
        <Nav/>
        <div className="ui stackable very relaxed aligned grid container">
          <div className={this.state.mobile ? "row" : "three wide column"}>
            <div className="filter-container" style={menuStyle}>
              <FilterContainer
                startYear={this.state.startYear}
                endYear={this.state.endYear}
                titleSearch={this.state.titleSearch}
                ratingOrder={this.state.rating}
                mobile={this.state.mobile}
                allSources={this.state.allSources}
                selectedSources={this.state.selectedSources}
                handleSourceChange={this.handleSourceChange}
                handleRatingChange={this.handleRatingChange}
                handleTitleSearchChange={this.handleTitleSearchChange}
                handleStartYearChange={this.handleStartYearChange}
                handleEndYearChange={this.handleEndYearChange}
                getMoviesFromServer={this.getMoviesFromServer}
              />
            </div>
          </div>
          <div className={this.state.mobile ? "row" : "thirteen wide right floated column"}>
            <MainContainer movies={this.state.movies}
               current_page={this.state.current_page}
               total_pages={this.state.total_pages}
               total_entries={this.state.total_entries}
               handlePaginationClick={this.handlePaginationClick}
               itemView={this.state.itemView}
               mobile={this.state.mobile}
               handleViewChange={this.handleViewChange}
               gridLength={this.state.gridLength}
             />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = App;

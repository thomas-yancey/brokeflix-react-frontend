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
var ScrollTopButton = require('./ScrollTopButton');
var _ = require('lodash');
var $ = require('jquery');
var DEV = "http://localhost:3000"
var PRODUCTION = "https://brokeflix.herokuapp.com"

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
      mobile: false,
      itemView: false,
      gridLength: 4,
      loading: false,
      scrollTopVisible: false,
      loading: true
    })
  },

  componentDidMount: function(){
    window.addEventListener("resize", this.updateDimensions);
    this.debounceScrollTopVisible = _.debounce(this.scrollTopVisible,100);
    if (this.props.mobile){
      window.addEventListener('scroll', this.debounceScrollTopVisible);
    }
    window.addEventListener('scroll', this.handleScroll);
    this.InitialGetSourcesAndMovies();
    this.updateDimensions();
    this.debounceInfiniteScroll = _.debounce(this.infininiteScrollFromServer,1000);
    this.debounceGetMoviesFromServer = _.debounce(this.getMoviesFromServer,200);
  },

  searchParams: function(){
    return {
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
  },

  InitialGetSourcesAndMovies: function(){
    var currURL = PRODUCTION + "/sources"
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
      });
    }.bind(this),this.getMoviesFromServer)
  },

  getMoviesFromServer: function(){
    this.setState({
      loading: true,
      actor: "",
      director: ""
    });
    var params = this.searchParams();
    var currURL = PRODUCTION + "/movies?" + $.param(params)
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
        total_entries: data.total_entries,
        loading: false
      })
    }.bind(this))
  },

  infininiteScrollFromServer: function(){
    if (this.state.current_page == this.state.total_pages){
      return;
    }
    this.setState({
      loading: true,
      current_page: this.state.current_page + 1
    });
    var params = this.searchParams();
    var currURL = PRODUCTION + "/movies?" + $.param(params)
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
        total_entries: data.total_entries,
        loading: false
      })
    }.bind(this))
  },

  getActorOrDirectorMoviesFromServer: function(){
    this.resetStateForSearch();

    var params = this.searchParams();
    var currURL = PRODUCTION + "/movies?" + $.param(params)
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
        total_entries: data.total_entries,
        loading: false
      })
    }.bind(this))
  },

  resetStateForSearch: function(){
    this.setState({
      current_page: 1,
      total_pages: 1,
      total_entries: 0,
      startYear: "1900",
      endYear: "2016",
      genre: "",
      selectedSources: this.state.allSources,
      titleSearch: "",
    })
  },

  personSearch: function(person,search){
    if (search === "actor"){
      this.setState({
        actor: person
      }, this.getActorOrDirectorMoviesFromServer)
    } else {
      this.setState({
        director: person
      },this.getActorOrDirectorMoviesFromServer)
    }
  },

  handleScroll: function(){
    // debounce scroll if at the bottom
    this.infiniteScrollCall();
    this.debounceScrollTopVisible();
  },

  infiniteScrollCall: function(){
    $(window).scroll(function() {
     if($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
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

  handleScrollTop: function(){
    $('html,body').scrollTop(0);
    this.setState({
      scrollTopVisible: false
    });
  },

  scrollTopVisible: function(){
    var height = $(window).scrollTop();
    if (height > 430){
      this.setState({
        scrollTopVisible: true
      })
    } else if (height < 430){
      this.setState({
        scrollTopVisible: false
      })
    };
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
                         'overflowY': 'scroll',
                         'width': '250px',
                         'height': '100%',
                         'left': '0',
                         'paddingLeft': '20px',
                         'marginBottom': '50px'};
    var smallMenuStyle = {'position': 'fixed',
                          'overflowY': 'scroll',
                          'width': '190px',
                          'left': '0',
                          'paddingLeft': '20px',
                          'paddingBottom': '150px',
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
               rating={this.state.rating}
               current_page={this.state.current_page}
               total_pages={this.state.total_pages}
               total_entries={this.state.total_entries}
               handlePaginationClick={this.handlePaginationClick}
               itemView={this.state.itemView}
               mobile={this.state.mobile}
               handleViewChange={this.handleViewChange}
               gridLength={this.state.gridLength}
               scrollTopVisible={this.state.scrollTopVisible}
               handleScrollTop={this.handleScrollTop}
               personSearch={this.personSearch}
             />
          </div>
          <div className={this.props.mobile ? null : "three wide column" }>
          </div>
          <div className={this.mobile ? "row" : "right floating thirteen wide column"}>
            <img className="ui centered image" src="./horizontal_loading.gif"
              style={this.state.loading ?
                {'margin': '0 auto',
                'marginBottom': '60px'} :
                {'display': 'none'}
              }
            />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = App;

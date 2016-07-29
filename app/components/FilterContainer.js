var React = require('react');
var YearFilter = require('./YearFilter')
var RatingFilter = require('./RatingFilter')
var SourceFilter = require('./SourceFilter')
var TitleSearch = require('./TitleSearch')

var FilterContainer = React.createClass({
  render: function(){
    return (
      <div className={this.props.mobile ? "filter-container-mobile" : "filter-container" }
        style={{'min-width': '140px', 'padding-top': '30px'}}
      >
      <h2>Filters</h2>
        <YearFilter
          startYear={this.props.startYear}
          endYear={this.props.endYear}
          handleStartYearChange={this.props.handleStartYearChange}
          handleEndYearChange={this.props.handleEndYearChange}
        />
        <TitleSearch
          titleSearch={this.props.titleSearch}
          handleTitleSearchChange={this.props.handleTitleSearchChange}
          getMoviesFromServer={this.props.getMoviesFromServer}
          mobile={this.props.mobile}
        />
        <RatingFilter
          handleRatingChange={this.props.handleRatingChange}
          ratingOrder={this.props.ratingOrder}
          mobile={this.props.mobile}
        />
        <SourceFilter
          allSources={this.props.allSources}
          selectedSources={this.props.selectedSources}
          handleSourceChange={this.props.handleSourceChange}
        />
      </div>
    )
  }
});

module.exports = FilterContainer;

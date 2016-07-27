var React = require('react');
var YearFilter = require('./YearFilter')
var RatingFilter = require('./RatingFilter')
var SourceFilter = require('./SourceFilter')
var TitleSearch = require('./TitleSearch')

var FilterContainer = React.createClass({
  render: function(){
    return (
      <div className="filter-container">
      <h2>Filters</h2>
        <TitleSearch
          titleSearch={this.props.titleSearch}
          handleTitleSearchChange={this.props.handleTitleSearchChange}
          getMoviesFromServer={this.props.getMoviesFromServer}
        />
        <YearFilter
          startYear={this.props.startYear}
          endYear={this.props.endYear}
          handleStartYearChange={this.props.handleStartYearChange}
          handleEndYearChange={this.props.handleEndYearChange}
        />
        <RatingFilter
          handleRatingChange={this.props.handleRatingChange}
          ratingOrder={this.props.ratingOrder}
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

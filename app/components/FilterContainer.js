var React = require('react');
var YearFilter = require('./YearFilter')
var RatingFilter = require('./RatingFilter')
var SourceFilter = require('./SourceFilter')

var FilterContainer = React.createClass({
  render: function(){
    return (
      <div className="filter-container">
      <h3>Filters</h3>
        <YearFilter
          startYear={this.props.startYear}
          endYear={this.props.endYear}
          handleStartYearChange={this.props.handleStartYearChange}
          handleEndYearChange={this.props.handleEndYearChange}
        />
        <RatingFilter handleRatingChange={this.props.handleRatingChange}/>
        <SourceFilter
          allSources={this.props.allSources}
          selectedSources={this.props.selectedSources}
          handleSelectedSources={this.props.handleSelectedSources}
        />
      </div>
    )
  }
});

module.exports = FilterContainer;

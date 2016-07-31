var React = require('react');
var YearFilter = require('./YearFilter')
var RatingFilter = require('./RatingFilter')
var SourceFilter = require('./SourceFilter')
var TitleSearch = require('./TitleSearch')

var FilterContainer = React.createClass({
  render: function(){
    return (
      <div className={this.props.mobile ?
        "filter-container-mobile" :
        "filter-container"
        }
        style={{'minWidth': '140px', 'paddingTop': '30px'}}
      >
        <h4 className="ui horizontal divider header">
          year range
        </h4>
        <YearFilter
          startYear={this.props.startYear}
          endYear={this.props.endYear}
          handleStartYearChange={this.props.handleStartYearChange}
          handleEndYearChange={this.props.handleEndYearChange}
        />
        <h4 className="ui horizontal divider header">
          search
        </h4>
        <TitleSearch
          titleSearch={this.props.titleSearch}
          handleTitleSearchChange={this.props.handleTitleSearchChange}
          getMoviesFromServer={this.props.getMoviesFromServer}
          mobile={this.props.mobile}
        />
        <h4 className="ui horizontal divider header">
          streaming source
        </h4>
        <SourceFilter
          allSources={this.props.allSources}
          selectedSources={this.props.selectedSources}
          handleSourceChange={this.props.handleSourceChange}
        />
        <h4 className="ui horizontal divider header">
          Sorted By
        </h4>
        <RatingFilter
          handleRatingChange={this.props.handleRatingChange}
          ratingOrder={this.props.ratingOrder}
          mobile={this.props.mobile}
        />
      </div>
    )
  }
});

module.exports = FilterContainer;

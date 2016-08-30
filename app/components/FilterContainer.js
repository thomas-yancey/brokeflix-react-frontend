const React = require('react');
const YearFilter = require('./YearFilter')
const RatingFilter = require('./RatingFilter')
const SourceFilter = require('./SourceFilter')
const Search = require('./Search')

const FilterContainer = (props) => (
  <div className={props.mobile ?
    "filter-container-mobile" :
    "filter-container"
    }
    style={{'minWidth': '140px', 'paddingTop': '30px'}}
  >
    <h4 className="ui horizontal divider header">
      year range
    </h4>
    <YearFilter
      startYear={props.startYear}
      endYear={props.endYear}
      handleStartYearChange={props.handleStartYearChange}
      handleEndYearChange={props.handleEndYearChange}
    />
    <h4 className="ui horizontal divider header">
      search
    </h4>
    <Search
      titleSearch={props.titleSearch}
      handleTitleSearchChange={props.handleTitleSearchChange}
      getMoviesFromServer={props.getMoviesFromServer}
      mobile={props.mobile}
    />
    <h4 className="ui horizontal divider header">
      streaming source
    </h4>
    <SourceFilter
      allSources={props.allSources}
      selectedSources={props.selectedSources}
      handleSourceChange={props.handleSourceChange}
    />
    <h4 className="ui horizontal divider header">
      Sorted By
    </h4>
    <RatingFilter
      handleRatingChange={props.handleRatingChange}
      ratingOrder={props.ratingOrder}
      mobile={props.mobile}
    />
  </div>
)

module.exports = FilterContainer;

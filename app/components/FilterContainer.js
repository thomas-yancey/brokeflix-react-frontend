var React = require('react');
var YearFilter = require('./YearFilter')

var FilterContainer = React.createClass({
  render: function(){
    return (
      <div>
        <YearFilter
          startYear={this.props.startYear}
          endYear={this.props.endYear}
          handleStartYearChange={this.props.handleStartYearChange}
          handleEndYearChange={this.props.handleEndYearChange}
        />
      </div>
    )
  }
});

module.exports = FilterContainer;

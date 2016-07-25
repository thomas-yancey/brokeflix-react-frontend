var React = require('react')

var YearFilter = React.createClass({
  getDefaultProps: function(){
    return {
      startYear: 1900,
      endYear: 2016
    }
  },

  onStartYearChange: function(e){
    this.props.handleStartYearChange(e.target.value)
  },

  onEndYearChange: function(e){
    this.props.handleEndYearChange(e.target.value)
  },

  render: function(){
    return (
      <div>
        <div className="ui input">
          <input type="text"
            placeholder="start year"
            value={this.props.startYear}
            onChange={this.onStartYearChange}
            />
        </div>
        <div className="ui input">
          <input type="text"
           placeholder="end year"
           value={this.props.endYear}
           onChange={this.onEndYearChange}
           />
        </div>
      </div>
    )
  }
})

module.exports = YearFilter;
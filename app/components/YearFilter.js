var React = require('react')
var Rcslider = require('rc-slider')

var YearFilter = React.createClass({
  getDefaultProps: function(){
    return {
      startYear: 1900,
      endYear: 2016
    }
  },

  onYearChange: function(e){
    this.props.handleStartYearChange(e[0])
    this.props.handleEndYearChange(e[1])
  },

  render: function(){
    return (
      <div className="year-range-container" >
        <h4>Year Range</h4>
          <Rcslider
            range={true}
            allowCross={false}
            min={1900}
            max={2016}
            defaultValue={[1900,2016]}
            value={[this.props.startYear,this.props.endYear]}
            onChange={this.onYearChange}
          />
      </div>
    )
  }
})

module.exports = YearFilter;

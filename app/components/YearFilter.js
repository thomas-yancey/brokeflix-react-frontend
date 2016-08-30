const React = require('react')
const Rcslider = require('rc-slider')

const YearFilter = React.createClass({
  getDefaultProps () {
    return {
      startYear: 1900,
      endYear: 2016
    }
  },

  onYearChange (e) {
    this.props.handleStartYearChange(e[0])
    this.props.handleEndYearChange(e[1])
  },

  render () {
    return (
      <div className="year-range-container" style={{'width': '80%', 'margin': '0 auto'}}>
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

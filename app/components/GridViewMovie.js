var React = require('react');
var MovieInfo = require('./MovieInfo');
var ToolTip = require('react-portal-tooltip');

var GridViewMovie = React.createClass({
  getInitialState: function(){
    return ({
      hover: false
    })
  },

  handleMouseEnter: function(){
    this.setState({
      hover: true
    })
  },

  handleMouseLeave: function(){
    this.setState({
      hover: false
    })
  },

  render: function(){
    return (
        <div className="ui rounded image" style={{'padding': '5px'}}>
          <div
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <img src={this.props.movie.poster}
              className={this.state.hover ? "entered-poster" : ""}
              />
            <div className={this.state.hover ? "tooltip-active" : "tooltip"}>
              <div className="ui segment">
                <MovieInfo movie={this.props.movie}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
})

module.exports = GridViewMovie;

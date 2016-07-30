var React = require('react');
var MovieInfo = require('./MovieInfo');
var ToolTip = require('react-portal-tooltip');
var TrailerModal = require('./TrailerModal');

var GridViewMovie = React.createClass({

  getInitialState: function(){
    return ({
      hover: false,
      clicked: false,
      visibleTrailer: false
    })
  },

  onClickOutside: function(evt){
    this.setState({
      visibleTrailer: false
    })
  },

  viewTrailer: function(){
    this.setState({
      visibleTrailer: true
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

  handleMovieClick: function(){
    this.setState({
      clicked: true
    })
  },

  rightOrLeftToolTipStyle: function(){
    if (this.props.rightMost){
      return "tooltip-active-right"
    } else {
      return "tooltip-active-left"
    }
  },

  isbottomLevelToolTip: function(idx){
    if (this.props.movieCount < 5){
      return false
    };
    var positionLast = this.props.movieCount - (this.props.itemIdx)
    if (positionLast < (this.props.gridLength + 1)){
      if (this.props.movieCount % this.props.gridLength === 0){
        return true
      } else if ((this.props.movieCount - 1) % this.props.gridLength === 0 && positionLast === 1){
        return true
      } else if (this.props.movieCount % 2 === 0 && positionLast < 3){
        return true
      } else if ((this.props.movieCount - 3) % this.props.gridLength === 0 && positionLast < 4){
        return true
      };
      return false
    };
    return false
  },

  render: function(){
    var toolTipStyle = this.rightOrLeftToolTipStyle();
    if (this.isbottomLevelToolTip()){
      toolTipStyle = "tooltip-active-up"
    };
    var showingTrailer = "";
    if (this.state.visibleTrailer){
      showingTrailer = (
        <TrailerModal
          youtubeKey={this.props.movie.trailer}
          onClickOutside={this.onClickOutside}
        />
      )
    };
    return (
        <div className="ui rounded image" style={{'width': '200px','padding': '5px'}}>
          <div
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleMovieClick}
          >
            <img src={this.props.movie.poster}
              className={this.state.hover ? "entered-poster" : ""}
              />
            <div className={this.state.hover ? toolTipStyle : "tooltip"}>
              <div className="ui segment">
                <MovieInfo movie={this.props.movie}
                  closeModal={this.closeModal}
                  viewTrailer={this.viewTrailer}
                  visibleTrailer={this.state.visibleTrailer}
                />
              </div>
            </div>
          </div>
          {showingTrailer}
        </div>
    )
  }
})

module.exports = GridViewMovie;

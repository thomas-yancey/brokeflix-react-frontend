const React = require('react');
const MovieInfo = require('./MovieInfo');
const ToolTip = require('react-portal-tooltip');
const TrailerModal = require('./TrailerModal');

const GridViewMovie = React.createClass({

  getInitialState () {
    return ({
      hover: false,
      clicked: false,
      visibleTrailer: false
    })
  },

  onClickOutside (evt) {
    this.setState({
      visibleTrailer: false
    })
  },

  viewTrailer () {
    this.setState({
      visibleTrailer: true
    })
  },

  handleMouseEnter () {
    this.setState({
      hover: true
    })
  },

  handleMouseLeave () {
    this.setState({
      hover: false
    })
  },

  handleMovieClick () {
    this.setState({
      clicked: true
    })
  },

  rightOrLeftToolTipStyle () {
    if (this.props.rightMost){
      return "tooltip-active-right"
    } else {
      return "tooltip-active-left"
    }
  },

  isbottomLevelToolTip (idx) {
    if (this.props.movieCount < 5){
      return false
    };
    let positionLast = this.props.movieCount - (this.props.itemIdx)
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

  render () {

    let toolTipStyle = this.rightOrLeftToolTipStyle();
    if (this.isbottomLevelToolTip()){
      toolTipStyle = "tooltip-active-up"
    };

    let showingTrailer = "";
    if (this.state.visibleTrailer){
      showingTrailer = (
        <TrailerModal
          youtubeKey={this.props.movie.trailer}
          onClickOutside={this.onClickOutside}
        />
      )
    };

    let ratingBySource = "";
    if (this.props.rating === "metascore"){
      ratingBySource = this.props.movie.metascore
    } else {
      ratingBySource = this.props.movie.tomato_meter
    };

    return (
      <div className="ui rounded image" style={{'width': '200px','padding': '5px'}}>
        <div onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleMovieClick}
        >
          <div className="grid-poster">
            <img src={this.props.movie.poster}
              className={this.state.hover ? "entered-poster" : ""}
            />
            <div className="ui image"
              style={{'display': 'inline',
                  'position': 'relative',
                  'bottom': '270px',
                  'left': '190px',
                  'height': '0px',
                }}
              >
              <a className="ui red right ribbon label">
                {ratingBySource}
              </a>
            </div>
          </div>
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

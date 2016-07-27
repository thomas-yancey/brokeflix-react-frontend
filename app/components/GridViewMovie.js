var React = require('react');
var MovieInfo = require('./MovieInfo');
var ToolTip = require('react-portal-tooltip');
var TrailerModal = require('./TrailerModal');

var GridViewMovie = React.createClass({

  getInitialState: function(){
    return ({
      hover: false,
      visibleTrailer: false
    })
  },

  onClickOutside: function(evt){
    debugger
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

  render: function(){

    var showingTrailer = "";
    if (this.state.visibleTrailer){
      showingTrailer = (<TrailerModal
                          youtubeKey={this.props.movie.trailer}
                          onClickOutside={this.onClickOutside}
                        />)
    };

    console.log(showingTrailer)

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

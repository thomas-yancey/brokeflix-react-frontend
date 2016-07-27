var React = require('react');
var MovieInfo = require('./MovieInfo');
var TrailerModal = require('./TrailerModal');

var ItemViewMovie = React.createClass({
  getInitialState: function(){
    return ({
      hover: false,
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

  render: function(){

    var showingTrailer = "";
    if (this.state.visibleTrailer){
      showingTrailer = (<TrailerModal
                          youtubeKey={this.props.movie.trailer}
                          onClickOutside={this.onClickOutside}
                        />)
    };

    return (
      <div className="item">
        <div className="ui rounded image">
          <img src={this.props.movie.poster}/>
        </div>
        <MovieInfo movie={this.props.movie}
          onClickOutside={this.onClickOutside}
          viewTrailer={this.viewTrailer}
          visibleTrailer={this.state.visibleTrailer}
        />
        {showingTrailer}
      </div>
    )
  }
})

module.exports = ItemViewMovie;

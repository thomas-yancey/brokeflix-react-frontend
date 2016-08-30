const React = require('react');
const MovieInfo = require('./MovieInfo');
const TrailerModal = require('./TrailerModal');

const ItemViewMovie = React.createClass({
  getInitialState () {
    return ({
      hover: false,
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

  render () {

    let showingTrailer;
    if (this.state.visibleTrailer){
      showingTrailer = (
        <TrailerModal
        youtubeKey={this.props.movie.trailer}
        onClickOutside={this.onClickOutside}
        />
      )
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
          mobile={this.props.mobile}
          personSearch={this.props.personSearch}
        />
        {showingTrailer}
      </div>
    )
  }
})

module.exports = ItemViewMovie;

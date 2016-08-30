const React = require('react');
const TrailerModal = require('./TrailerModal');
const RatingContainer = require('./RatingContainer');
const Source = require('./Source');

const MovieInfo = React.createClass({

  onClickViewTrailer (e) {
    e.preventDefault();
    this.props.viewTrailer();
  },

  onCloseModal () {
    this.props.closeModal();
  },

  render () {

    let sources = this.props.movie.sources.map((source, idx) => {
      return (<Source key={idx + source + 1} source={source} idx={idx}/>)
    });

    let hasTrailer;
    if (this.props.movie.trailer){
      hasTrailer = (
        <div className="ui red button"
          onClick={this.onClickViewTrailer}
          href={this.props.movie.trailer}
          style={{'display': 'inline'}}
        >
          View Trailer
        </div>
      )
    };

    return (
      <div className="left aligned content"
        style={this.props.mobile ? {'paddingLeft': '20px', 'paddingRight': '20px'} : null}
      >
        <h2>
          {this.props.movie.title}
        </h2>
        <p>{this.props.movie.overview}</p>
        <p>Critic Consensus: {this.props.movie.tomato_consensus}</p>
        <div className="item">
          <div className="header">
            <RatingContainer
              tomato_meter={this.props.movie.tomato_meter}
              metascore={this.props.movie.metascore}
              hasTrailer={hasTrailer}
            />
          </div>
        </div>
        <div className="sourceInfo">
          <h3>places to watch</h3>
          <div className="ui horizontal list">
            {sources}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = MovieInfo;

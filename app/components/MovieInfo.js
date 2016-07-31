var React = require('react');
var TrailerModal = require('./TrailerModal');
var RatingContainer = require('./RatingContainer');
var Source = require('./Source');

var MovieInfo = React.createClass({
  hasTrailer: function(){
    if (this.props.movie.trailer){
      return (
            <div className="ui red button"
              onClick={this.onClickViewTrailer}
              href={this.props.movie.trailer}
              style={{'display': 'inline'}}
            >
              View Trailer
            </div>
        )
    };
  },

  onClickViewTrailer: function(e){
    e.preventDefault();
    this.props.viewTrailer();
  },

  onCloseModal: function(){
    this.props.closeModal();
  },

  render: function(){
    var sources = this.props.movie.sources.map(function(source, idx){
      return (<Source source={source} idx={idx}/>)
    });

    var hasTrailer = this.hasTrailer();

    return (
      <div className="middle center aligned content"
        style={this.props.mobile ? {'padding-left': '20px', 'padding-right': '20px'} : null}
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

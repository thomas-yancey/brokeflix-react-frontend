var React = require('react');
var TrailerModal = require('./TrailerModal');

var MovieInfo = React.createClass({
  hasTrailer: function(){
    if (this.props.movie.trailer){
      return (
          <p>
            <a onClick={this.onClickViewTrailer} href={this.props.movie.trailer}>
              View Trailer
            </a>
          </p>
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
    var sources = this.props.movie.sources.map(function(source){
      return (
          <div className="item"><a href={source.link}>{source.display_name}</a></div>
      )
    });

    var hasTrailer = this.hasTrailer();

    return (
      <div className="middle center aligned content">
        <h2>
          {this.props.movie.title}
        </h2>
        <p>{this.props.movie.overview}</p>
        <p>Critic Consensus: {this.props.movie.tomato_consensus}</p>
        <div className="ui horizontal list">
          <div className="item">metascore: {this.props.movie.metascore}</div>
          <div className="item">tomatometer: {this.props.movie.tomato_meter}</div>
        </div>
        {hasTrailer}
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

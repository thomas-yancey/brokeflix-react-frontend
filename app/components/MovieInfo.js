var React = require('react');

var MovieInfo = React.createClass({
  render: function(){
    var sources = this.props.movie.sources.map(function(source){
      return (
          <p><a href={source.link}>{source.display_name}</a></p>
      )
    });
    return (
      <div className="middle aligned content">
        <div className="header">
          {this.props.movie.title}
        </div>
        <p>{this.props.movie.overview}</p>
        <p>Critic Consensus: {this.props.movie.tomato_consensus}</p>
        <p>metascore: {this.props.movie.metascore}</p>
        <p>tomatometer: {this.props.movie.tomato_meter}</p>
        <p><a href={this.props.movie.trailer}>View Trailer</a></p>
        <div className="sourceInfo">
          <h3>places to watch</h3>
          {sources}
        </div>
      </div>
    )
  }
})

module.exports = MovieInfo;

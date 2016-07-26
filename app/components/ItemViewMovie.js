var React = require('react')
var MovieInfo = require('./MovieInfo')

var ItemViewMovie = React.createClass({
  render: function(){
    return (
      <div className="item">
        <div className="ui rounded image">
          <img src={this.props.movie.poster}/>
        </div>
        <MovieInfo movie={this.props.movie}/>
      </div>
    )
  }
})

module.exports = ItemViewMovie;

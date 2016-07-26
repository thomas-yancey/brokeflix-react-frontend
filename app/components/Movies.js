var React = require('react')
var Movie = require('./Movie')
var ItemViewMovie = require('./ItemViewMovie')
var GridViewMovie = require('./GridViewMovie')

var Movies = React.createClass({

  collect_movies: function(){
    if (this.props.movies.length > 0){
      return this.props.movies.map(function(currMovie){
        if (this.props.itemView){
          return (<ItemViewMovie movie={currMovie} itemView={this.props.itemView}/>)
        } else {
          return (<GridViewMovie movie={currMovie} itemView={this.props.itemView}/>)
        }
      }.bind(this))
    }
  },

  render: function(){
    var movies = this.collect_movies();
    return (
        <div className="ui divided items">
          {movies}
        </div>
    )
  }
});

module.exports = Movies;

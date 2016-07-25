var React = require('react')
var Movie = require('./Movie')

var Movies = React.createClass({
  collect_movies: function(){
    if (this.props.movies.length > 0){
      return this.props.movies.map(function(currMovie){
        return (<Movie movie={currMovie}/>)
      })
    }
  },

  render: function(){
    var movies = this.collect_movies();
    return (
      <div>
        {movies}
      </div>
    )
  }
});

module.exports = Movies;

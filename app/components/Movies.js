var React = require('react')
var ItemViewMovie = require('./ItemViewMovie')
var GridViewMovie = require('./GridViewMovie')

var Movies = React.createClass({

  collect_movies: function(){
    if (this.props.movies.length > 0){
      return this.props.movies.map(function(currMovie, idx){
        if (this.props.itemView){
          return (
            <ItemViewMovie key={currMovie + idx + 'itemview'}
              movie={currMovie}
              itemView={this.props.itemView}
              mobile={this.props.mobile}
            />
          )
        } else {
          return (
            <GridViewMovie key={currMovie + idx + 'gridview'}
              itemView={this.props.itemView}
              itemIdx={idx}
              movieCount={this.props.movies.length}
              movie={currMovie}
              rating={this.props.rating}
              rightMost={((idx + 1) % this.props.gridLength === 0)}
              gridLength={this.props.gridLength}
              rating={this.props.rating}
            />
          )
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

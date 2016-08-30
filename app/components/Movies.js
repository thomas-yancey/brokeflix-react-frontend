const React = require('react')
const ItemViewMovie = require('./ItemViewMovie')
const GridViewMovie = require('./GridViewMovie')

const Movies = (props) => {

  let movies;
  if (props.movies.length > 0){
    movies = props.movies.map((currMovie, idx) => {
      if (props.itemView){
        return (
          <ItemViewMovie key={currMovie + idx + 'itemview'}
            movie={currMovie}
            itemView={props.itemView}
            mobile={props.mobile}
            personSearch={props.personSearch}
          />
        )
      } else {
        return (
          <GridViewMovie key={currMovie + idx + 'gridview'}
            itemView={props.itemView}
            itemIdx={idx}
            movieCount={props.movies.length}
            movie={currMovie}
            rating={props.rating}
            rightMost={((idx + 1) % props.gridLength === 0)}
            gridLength={props.gridLength}
            rating={props.rating}
            personSearch={props.personSearch}
          />
        )
      }
    })
  }

  return (
      <div className="ui divided items">
        {movies}
      </div>
  )
}


module.exports = Movies;

var React = require('react')

var ItemViewMovie = React.createClass({
  render: function(){
    return (
      <div className="item">
        <div className="ui rounded image">
          <img src={this.props.movie.poster}/>
        </div>
        <div className="middle aligned content">
          <div className="header">
            {this.props.movie.title}
          </div>
          <p>{this.props.movie.overview}</p>
          <p>{this.props.movie.metascore}</p>
          <p>{this.props.movie.tomato_meter}</p>
        </div>
      </div>
    )
  }
})

module.exports = ItemViewMovie;

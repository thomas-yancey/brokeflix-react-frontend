var React = require('react')
var GridViewMovie = require('./GridViewMovie')
var ItemViewMovie = require('./ItemViewMovie')

var Movie = React.createClass({

  render(){
    var renderedMovie = "";
    if (this.props.itemView){
      console.log(this.closeModal);
      renderedMovie = (<ItemViewMovie movie={this.props.movie}
                          closeModal={this.closeModal}
                          viewTrailer={this.viewTrailer}
                          visibleTrailer={this.state.visibleTrailer}
                        />);
    } else {
      renderedMovie = (<GridViewMovie movie={this.props.movie}
                         closeModal={this.closeModal}
                         viewTrailer={this.viewTrailer}
                         visibleTrailer={this.state.visibleTrailer}
                       />);
    }

    return (
      <div className="item">
        <div className="ui rounded image">
          <img src={this.props.movie.poster}/>
        </div>
        <div className="middle aligned content">
          <div className="header">
            {this.props.movie.title}
          </div>
          <div className="meta">
            {this.props.movie.overview}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Movie;

var React = require('react')

var Movie = React.createClass({
  render(){
    return (
        <div className="ui rounded image">
          <img src={this.props.movie.poster}/>
        </div>
    )
  }
});

module.exports = Movie;

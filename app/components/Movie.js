var React = require('react')

var Movie = React.createClass({

  render(){
    var renderedMovie = "";
    if (this.props.itemView){
      renderedMovie = (<ItemViewMovie movie={this.props.movie}/>);
    } else {
      renderedMovie = (<GridViewMovie handleMouseEnter={this.handleMouseEnter}
                     handleMouseLeave={this.handleMouseLeave}
                     hover={this.state.hover}
                     movie={this.props.movie}
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

var GridViewMovie = React.createClass({
  getInitialState: function(){
    return ({
      hover: false
    })
  },

  handleMouseEnter: function(){
    this.setState({
      hover: true
    })
    console.log('in')
  },

  handleMouseLeave: function(){
    this.setState({
      hover: false
    })
  },

  render: function(){
    return (
      <div className="ui rounded image"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        >
        <div className={this.state.hover ? "entered-poster" : ""}>
          <img src={this.props.movie.poster}/>
        </div>
      </div>
    )
  }
})

var ItemViewMovie = React.createClass({
  render: function(){
    return (
      <div>
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

var PopUpInfo = React.createClass({
  render: function(){
    return(<div>ya</div>)
  }
})

module.exports = Movie;

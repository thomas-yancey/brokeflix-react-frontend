var React = require('react');

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

module.exports = GridViewMovie;

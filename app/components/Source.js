var React = require('react');

var Source = React.createClass({

  styleSelector: function(){
    debugger
    if (this.props.source.display_name === "Viewster"){
      return "mini ui yellow button";
    } else if (this.props.source.display_name === "Shout! Factory TV"){
      return "mini ui orange button";
    } else if (this.props.source.display_name === "Watch Disney Channel"){
      return "mini ui purple button";
    } else if (this.props.source.display_name === "Popcornflix"){
      return "mini ui teal button";
    } else if (this.props.source.display_name === "Hulu"){
      return "mini ui blue button";
    } else if (this.props.source.display_name === "Tubi TV"){
      return "mini ui green button";
    } else if (this.props.source.display_name === "Xfinity"){
      return "mini ui brown button";
    } else if (this.props.source.display_name === "Lifetime"){
      return "mini ui violet button";
    } else if (this.props.source.display_name === "SnagFilms"){
      return "mini ui grey button";
    } else if (this.props.source.display_name === "Crackle"){
      return "mini ui olive button";
    } else if (this.props.source.display_name === "Break.com"){
      return "mini ui azure button";
    } else
     return "mini ui button"
  },

  render: function(){
    return (
      <a href={this.props.source.link}>
        <button key={this.props.source + "-item-" + this.props.idx}
        className={this.styleSelector()}
        >
          {this.props.source.display_name}
        </button>
      </a>
    )
  }
})

module.exports = Source;

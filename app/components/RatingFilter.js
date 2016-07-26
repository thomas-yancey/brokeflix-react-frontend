var React = require('react');

var RatingFilter = React.createClass({
  handleMetaCriticClick: function(e){
    this.props.handleRatingChange("metascore")
  },

  handleTomatoClick: function(e){
    this.props.handleRatingChange("tomato_meter")
  },

  render: function(){
    return (
      <div className="rating-filter-container">
        <h4>rating agency</h4>
        <p onClick={this.handleMetaCriticClick}>Metacritic</p>
        <p onClick={this.handleTomatoClick}>TomatoMeter</p>
      </div>
    )
  }
})

module.exports = RatingFilter;

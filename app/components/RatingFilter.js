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
      <div className="rating-container">
        <h4>sorted by rating</h4>
        <div className="ui vertical buttons">
          <button className={this.props.ratingOrder === "metascore" ? "ui active button" : "ui button"} onClick={this.handleMetaCriticClick}>Metacritic</button>
          <button className={this.props.ratingOrder === "tomato_meter" ? "ui active button" : "ui button"} onClick={this.handleTomatoClick}>TomatoMeter</button>
        </div>
      </div>
    )
  }
})

module.exports = RatingFilter;

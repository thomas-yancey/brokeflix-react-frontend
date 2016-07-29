var React = require('react');

var RatingContainer = React.createClass({
  render: function(){
    return(
      <div className="ui horizontal list">
        <div className="item">
           {this.props.hasTrailer}
        </div>
        <div className="item">
          <img src="../../metacritic.svg.png"
            style={{'width': 30, 'height': 30,'display': 'inline'}}
          />
          <b>{this.props.metascore}</b>
        </div>
        <div className="item" style={{'display': 'inline'}}>
            <img src="../../rotten_tomatoes.png"
              style={{'width': 47, 'height': 41,'display': 'inline'}}
            />
            <b>{this.props.tomato_meter}</b>
         </div>
      </div>
    )
  }
});

module.exports = RatingContainer;

const React = require('react');

const RatingContainer = (props) => (
  <div className="ui horizontal list">
    <div className="item">
       {props.hasTrailer}
    </div>
    <div className="item">
      <img src="./metacritic.svg.png"
        style={{'width': 30, 'height': 30,'display': 'inline'}}
      />
      <b>{props.metascore}</b>
    </div>
    <div className="item" style={{'display': 'inline'}}>
        <img src="./rotten_tomatoes.png"
          style={{'width': 47, 'height': 41,'display': 'inline'}}
        />
        <b>{props.tomato_meter}</b>
     </div>
  </div>
)

module.exports = RatingContainer;

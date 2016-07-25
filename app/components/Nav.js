var React = require('react')

var Nav = React.createClass({
  render: function(){
    return(
    <div className="ui fixed inverted main menu">
      <div className="ui container">
        <div className="item">BrokeFlix</div>
      </div>
    </div>
    )
  }
});

module.exports = Nav;

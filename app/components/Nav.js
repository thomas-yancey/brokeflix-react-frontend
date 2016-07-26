var React = require('react')

var Nav = React.createClass({
  render: function(){
    return(
    <div className="ui inverted fixed main menu">
      <div className="ui container nav-menu">
        <div className="item">BrokeFlix</div>
      </div>
    </div>
    )
  }
});

module.exports = Nav;

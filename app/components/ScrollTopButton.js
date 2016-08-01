var React = require('react');
var $ = require('jquery');

var ScrollTopButton = React.createClass({
  onScrollTop: function(){
    this.props.handleScrollTop();
  },

  render: function(){
    return (
        <div className="ui image"
          style={this.props.scrollTopVisible ?
            {'position': 'fixed',
              'right': '0',
              'top': '0',
              'margin-top': '70px',
              'margin-right': '40px'} :
            {'display': 'none'}
          }
          onClick={this.onScrollTop}
        >
        <img src="./scroll_top.png"
          style={{'width': '50px', 'height': 'auto'}}
        />
      </div>
    )
  }
});

module.exports = ScrollTopButton;

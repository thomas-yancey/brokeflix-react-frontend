const React = require('react');
const $ = require('jquery');

const ScrollTopButton = React.createClass({
  onScrollTop (){
    this.props.handleScrollTop();
  },

  render () {
    return (
        <div className="ui image"
          style={this.props.scrollTopVisible ?
            {'position': 'fixed',
              'right': '0',
              'top': '0',
              'marginTop': '70px',
              'marginRight': '10px'} :
            {'display': 'none'}
          }
          onClick={this.onScrollTop}
        >
        <img src="./scroll_top.png"
          style={{'width': '50px',
          'height': 'auto'}}
        />
      </div>
    )
  }
});

module.exports = ScrollTopButton;

var React = require('react');
var onClickOutside = require('react-onclickoutside');

var TrailerModal = onClickOutside(React.createClass({

  handleClickOutside: function(evt) {
    this.props.onClickOutside(evt);
  },

  render(){
    var youtubeURL = "http://www.youtube.com/embed/" + this.props.youtubeKey + "?autoplay=1";
    return (
      <div className="ui active modal">
        <div className='embed-container'>
          <iframe src={youtubeURL}
            frameborder='0'
            allowfullscreen>
          </iframe>
        </div>
      </div>
    )
  }
}));

module.exports = TrailerModal;

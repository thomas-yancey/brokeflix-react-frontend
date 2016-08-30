const React = require('react');
const onClickOutside = require('react-onclickoutside');

const TrailerModal = onClickOutside(React.createClass({

  handleClickOutside (evt) {
    this.props.onClickOutside(evt);
  },

  render () {
    let youtubeURL = "https://www.youtube.com/embed/" + this.props.youtubeKey + "?autoplay=1";
    return (
      <div className="ui active modal">
        <div className='embed-container'>
          <iframe src={youtubeURL}
            frameBorder='0'
            allowFullScreen>
          </iframe>
        </div>
      </div>
    )
  }
}));

module.exports = TrailerModal;

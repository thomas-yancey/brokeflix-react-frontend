const React = require('react');

const Search = React.createClass({

  getDefaultProps () {
    titleSearch: "";
  },

  onTextChange (e) {
    this.props.handleTitleSearchChange(e.target.value)
  },

  onSearchClick () {
    this.props.getMoviesFromServer();
  },

  render () {
    return (
      <div className="title-search-container">
        <div className={this.props.mobile ? "ui fluid input" : "ui fluid input" }>
          <input type="text"
            placeholder="title, actor or director"
            onChange={this.onTextChange}
            value={this.props.titleSearch}
          />
        </div>
      </div>
    )
  }
});

module.exports = Search;

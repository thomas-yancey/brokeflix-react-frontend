const React = require('react')
// Not currently in use, going with infininiteScroll
const PaginationLinks = React.createClass({
  handleClick (pageNumber){
    this.props.handlePaginationClick(pageNumber);
  },

  createLinkArray () {
    let counter = this.props.current_page;
    let linkArray = [];

    if (counter > 1){
      counter -= 1
    };

    for (var i=counter; i < counter + 4; i++){
      if (i > this.props.total_pages){
        break;
      }
      linkArray.push(i);
    };
    return linkArray;
  },

  render () {
    this.createLinkArray();
    let linkArray = this.createLinkArray();
    let paginationLinks = linkArray.map(function(pageNumber, idx){
      return (
        <a key={pageNumber, idx}
          className={pageNumber === this.props.current_page ? "active item" : "item"}
          onClick={this.handleClick.bind(null,pageNumber)}>{pageNumber}
        </a>
      )}.bind(this))
    paginationLinks.unshift(<a key={"first"} className="item" onClick={this.handleClick.bind(null,1)}>1st</a>)
    paginationLinks.push(<a key={"last"} className="item" onClick={this.handleClick.bind(null,this.props.total_pages)}>{this.props.total_pages}</a>)
    return (
      <div className="ui pagination menu">
        {paginationLinks}
      </div>
    )
  }
});

module.exports = PaginationLinks;

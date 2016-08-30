const React = require('react');
const SelectedSource = require('./SelectedSource');
const NotSelectedSource = require('./NotSelectedSource');
const onClickOutside = require('react-onclickoutside');

const SourceFilter = React.createClass({
  getInitialState () {
    return ({
      menuVisible: false
    })
  },

  onMenuToggle () {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  },

  createSources () {
    this.getInitialState
    return this.props.allSources.map((source) => {
      return(
        <SourceCheckbox
          key={source + this.props.selectedSources}
          source={source}
          selectedSources={this.props.selectedSources}
          handleSourceChange={this.props.handleSourceChange}
        />
      )
    })
  },

  selectedSourcesDoesNotInclude (value) {
    for (var i=0; i < this.props.selectedSources.length; i++){
      if (this.props.selectedSources[i] === value){
        return false;
      };
    };
    return true;
  },

  render () {
    let openStyle = "ui fluid dropdown selection multiple active visible"
    let closedStyle = "ui fluid dropdown selection multiple"
    let selectedSources = this.props.selectedSources.map((source, idx) => {
      return (
        <SelectedSource source={source}
          key={idx + source + "selected"}
          handleSourceChange={this.props.handleSourceChange}
        />
      )
    })

    var notSelectedSources = this.props.allSources.filter(this.selectedSourcesDoesNotInclude)
    var notSelectedSources = notSelectedSources.map((source,idx) => {
      return (
        <NotSelectedSource key={idx + source + "not"} source={source}
          handleSourceChange={this.props.handleSourceChange}
          onMenuToggle={this.onMenuToggle}
        />
      )
    });

    return (
      <div className="source-filter">
        <div
          className={this.state.menuVisible ? openStyle : closedStyle }
          tabIndex="0"
        >
          <i className="dropdown icon" onClick={this.onMenuToggle}></i>
          <div className="selected-items">
            {selectedSources}
          </div>
          <div className={this.state.menuVisible ?
            "menu transition visible" :
            "menu transition hidden"}
          >
            {notSelectedSources}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = SourceFilter;

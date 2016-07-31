var React = require('react');
var SelectedSource = require('./SelectedSource');
var NotSelectedSource = require('./NotSelectedSource');
var onClickOutside = require('react-onclickoutside');

var SourceFilter = React.createClass({
  getInitialState: function(){
    return ({
      menuVisible: false
    })
  },

  onMenuToggle: function(){
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  },

  createSources: function(){
    this.getInitialState
    return this.props.allSources.map(function(source){
      return(
        <SourceCheckbox
          key={source + this.props.selectedSources}
          source={source}
          selectedSources={this.props.selectedSources}
          handleSourceChange={this.props.handleSourceChange}
        />
      )
    }.bind(this))
  },

  selectedSourcesDoesNotInclude: function(value){
    for (var i=0; i < this.props.selectedSources.length; i++){
      if (this.props.selectedSources[i] === value){
        return false;
      };
    };
    return true;
  },

  render: function(){
    var openStyle = "ui fluid dropdown selection multiple active visible"
    var closedStyle = "ui fluid dropdown selection multiple"
    var selectedSources = this.props.selectedSources.map(function(source, idx){
      return (
        <SelectedSource source={source}
          key={idx + source + "selected"}
          handleSourceChange={this.props.handleSourceChange}
        />
      )
    }.bind(this))

    var notSelectedSources = this.props.allSources.filter(this.selectedSourcesDoesNotInclude)
    var notSelectedSources = notSelectedSources.map(function(source,idx){
      return (
        <NotSelectedSource key={idx + source + "not"} source={source}
          handleSourceChange={this.props.handleSourceChange}
          onMenuToggle={this.onMenuToggle}
        />
      )
    }.bind(this));

    return(
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

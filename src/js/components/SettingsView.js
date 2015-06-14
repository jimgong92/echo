var React = require('React');

var mui = require('material-ui');

var EchoStore = require('../stores/EchoStore');
//TODO: Add to EchoSettings when ready
// whisperRadius: EchoStore.getWhisperRadius(),
function getEchoSettings(){
  return {
    listenRadius: EchoStore.getListenRadius()
  };
}
var EchoActions = require('../actions/EchoActions');

var SettingsView = React.createClass({
  getInitialState: function(){
    return getEchoSettings();
  },
  _onChange: function(e){
    EchoActions.updateListenRadius(e.target.value);
    this.setState(getEchoSettings);
  },
  _onSave: function(e){
    EchoActions.saveListenRadius();
  },
  render: function(){
    return (
      <div id="settings-view">
        <label htmlFor="listen-radius">Listen Radius:</label><br />
        <input type="range" name="listen-radius" 
          value={this.state.listenRadius} 
          min={2} max={500} 
          step={1} 
          onChange={this._onChange}
          onBlur={this._onSave} />
        <span>{this.state.listenRadius + ' mi'}</span>
      </div>
    )
  }
});

module.exports = SettingsView;
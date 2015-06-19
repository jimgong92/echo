var React = require('React');

var mui = require('material-ui');

var EchoStore = require('../stores/EchoStore');
function getEchoSettings(){
  return {
    listenRadius: EchoStore.getListenRadius(),
    whisperRadius: EchoStore.getWhisperRadius()
  };
}
var EchoActions = require('../actions/EchoActions');

var SettingsView = React.createClass({
  getInitialState: function(){
    return getEchoSettings();
  },
  _onListenChange: function(e){
    EchoActions.saveListenRadius(e.target.value);
    this.setState(getEchoSettings());
  },
  _onListenUpdate: function(e){
    EchoActions.updateListenRadius();
  },
  _onWhisperChange: function(e){
    EchoActions.saveWhisperRadius(e.target.value);
    this.setState(getEchoSettings())
  },
  render: function(){
    return (
      <section id="settings-view">
        <label htmlFor="listen-radius">Listen Radius:</label><br />
        <input type="range" name="listen-radius" 
          value={this.state.listenRadius} 
          min={1} max={500} 
          step={1} 
          onChange={this._onListenChange}
          onBlur={this._onListenUpdate} />
        <span>{this.state.listenRadius + ' mi'}</span>

        <br />

        <label htmlFor="whisper-radius">Whisper Radius:</label><br />
        <input type="range" name="whisper-radius" 
          value={this.state.whisperRadius} 
          min={1} max={500} 
          step={1} 
          onChange={this._onWhisperChange} />
        <span>{this.state.whisperRadius + ' mi'}</span>
      </section>
    )
  }
});

module.exports = SettingsView;
var React = require('react');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var TextInput = require('./TextInput');
var EchoActions = require('../actions/EchoActions');
var EchoStore = require('../stores/EchoStore');

var PostView = React.createClass({
  _onSave: function(value, whispered){
    console.log(whispered);
    EchoActions.postEcho(value);
  },
  _onBroadcast: function(){
    var value = this.refs['echo-input'].state.value;
    this._onSave(value);
  },
  _onWhisper: function(){
    var value = this.refs['echo-input'].state.value;
    
  },
  render: function(){
    return (
      <div>
        <TextInput 
          type="text"
          id='echo-input'
          placeholder="What do you want to share?"
          onSave={this._onSave}
          ref='echo-input'/>
        <div id="broadcast-button" className="post-button">
          <RaisedButton label="Broadcast" primary={true} onClick={this._onBroadcast}/>
        </div>
        <div id="whisper-button" className="post-button">
          <RaisedButton label="Whisper" primary={true} onClick={this._onWhisper}/>
        </div>


      </div>
    );
  }
});

module.exports = PostView;
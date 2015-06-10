var React = require('react');

var mui = require('material-ui');

var TextInput = require('./TextInput');
var EchoActions = require('../actions/EchoActions');
var EchoStore = require('../stores/EchoStore');

var PostView = React.createClass({
  _onSave: function(value){
    EchoActions.postEcho(value);
  },
  render: function(){
    return (
      <div>
        <TextInput 
          id='echo-input'
          placeholder="What do you want to share?"
          onSave={this._onSave}/>
      </div>
    );
  }
});

module.exports = PostView;
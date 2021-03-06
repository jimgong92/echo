var React = require('react');

var mui = require('material-ui');

var EchoStore = require('../stores/EchoStore');
var getEchoState = function(){
  return {
    allEchos: EchoStore.getEchos() || []
  };
}
var FeedView = React.createClass({
  getInitialState: function(){
    return getEchoState();
  },
  componentDidMount: function(){
    EchoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    EchoStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState(getEchoState());
  },
  render: function(){
    var echos = this.state.allEchos.map(function(echo, index){
      return <li key={index} className="echo-entry">{echo.id + ': ' + echo.text}</li>
    });
    return (
      <ul>
        {echos}
      </ul>
    );
  }
});

module.exports = FeedView;
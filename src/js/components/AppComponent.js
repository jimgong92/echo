var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

/** 
 * Material UI Components
 */
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

/** 
 * Component Dependencies
 */
var NavBar = require('./NavBar');

var EchoStore = require('../stores/EchoStore');

var AppComponent = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){
    EchoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    EchoStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    // this.setState(getUserState());
  },
  render: function(){
    return (
      <div>
        <NavBar />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = AppComponent;
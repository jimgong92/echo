var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

/** 
 * Material UI Setup and Components
 */
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var FlatButton = mui.FlatButton;

/** 
 * Component Dependencies
 */
var NavBar = require('./NavBar');

var AppComponent = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
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
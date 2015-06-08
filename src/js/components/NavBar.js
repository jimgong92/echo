var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var EchoStore = require('../stores/EchoStore');
var EchoActions = require('../actions/EchoActions');

/**
 * Material UI components
 */
var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var FlatButton = mui.FlatButton;

//TODO: Put in Toolbar
// <ToolbarGroup key={1} float="right">
//   <Link to="analytics">
//     <FlatButton
//       secondary={true}
//       label="Analytics" />
//   </Link>
//   <Link to="settings">
//     <FlatButton
//       secondary={true}
//       label="Settings" />
//   </Link>
// </ToolbarGroup>

var NavBar = React.createClass({
  render: function(){
    return (
      <Toolbar id="nav-bar">
        <ToolbarGroup key={0} float="left">
          <Link to="home">
            <FlatButton
              id="home-button" 
              primary={true}
              label="Echo"/>
          </Link>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

module.exports = NavBar;
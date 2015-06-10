var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var EchoStore = require('../stores/EchoStore');
var EchoActions = require('../actions/EchoActions');

/**
 * Material UI components
 */
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

//TODO: Put in Toolbar
// <ToolbarGroup key={1} float="right">
  // <Link to="analytics">
  //   <FlatButton
  //     secondary={true}
  //     label="Analytics" />
  // </Link>
  // <Link to="settings">
  //   <FlatButton
  //     secondary={true}
  //     label="Settings" />
  // </Link>
// </ToolbarGroup>

var NavBar = React.createClass({
  render: function(){
    return (
      <div id='nav-bar'>
        <Link to="home">
          <FlatButton
            secondary={true}
            label="Home" />
        </Link>
      </div>
    );
  }
});

module.exports = NavBar;
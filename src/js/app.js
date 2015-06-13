var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

/**
 * Needed for onTouchTap events in Material-UI
 */
require("react-tap-event-plugin")();

/**
 * Required Components
 */ 
var App = require('./components/AppComponent');
var EchoView = require('./components/EchoView');
var SettingsView = require('./components/SettingsView');

//TODO: Uncomment when ready
// var AnalyticsView = require('./components/AnalyticsView');

//TODO: Put in routes 
// <Route name="analytics" path="analytics" handler={AnalyticsView} />

var routes = (
  <Route name="home" path="/" handler={App}>
    <DefaultRoute handler={EchoView} />
    <Route name="settings" path="settings" handler={SettingsView} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler){
  React.render(<Handler />, document.getElementById('app'));
});
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
 * Startup mapbox
 */
require('mapbox.js'); //auto-attaches to window.L
L.mapbox.accessToken = 'pk.eyJ1IjoiamltbXl0b25pYyIsImEiOiJlYzQwMjUyYTdkMDdmYzRlMDAwNGNlNTM4OWRkOGQxYyJ9.WfXFPfUSGRuq6B5x9rYjIg';


/**
 * Required Components
 */ 
var App = require('./components/AppComponent');
var EchoView = require('./components/EchoView');
var AnalyticsView = require('./components/AnalyticsView');
var SettingsView = require('./components/SettingsView');

//TODO: Put in routes 

var routes = (
  <Route name="home" path="/" handler={App}>
    <DefaultRoute handler={EchoView} />
    <Route name="analytics" path="analytics" handler={AnalyticsView} />
    <Route name="settings" path="settings" handler={SettingsView} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler){
  React.render(<Handler />, document.getElementById('app'));
});
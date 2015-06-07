var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

/**
 * Required Components
 */ 
var App = require('./components/AppComponent');


var routes = (
  <Route name="home" path="/" handler={App}>
    <Route name="analysis" path="analytics" handler={AnalyticsView} />
    <Route name="settings" path="settings" handler={SettingsView} />
    <DefaultRoute name="echo" handler={EchoView} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler){
  React.render(<Handler />, document.getElementById('app'));
});
var React = require('React');

var EchoStore = require('../stores/EchoStore');
var EchoActions = require('../actions/EchoActions');

require('mapbox.js'); //auto-attaches to window.L
var mb = L.mapbox;
mb.accessToken = 'pk.eyJ1IjoiamltbXl0b25pYyIsImEiOiJlYzQwMjUyYTdkMDdmYzRlMDAwNGNlNTM4OWRkOGQxYyJ9.WfXFPfUSGRuq6B5x9rYjIg';

var AnalyticsView = React.createClass({
  componentDidMount: function(){
    var map = mb.map('map', 'mapbox.streets', {attributionControl: false}).setView([37.7768, -122.4897], 13);
  },
  render: function(){
    return (
      <section id="analytics-view">
        <div id="map"></div>
      </section>
    )
  }
});

module.exports = AnalyticsView;
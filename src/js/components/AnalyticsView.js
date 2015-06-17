var React = require('React');

var EchoStore = require('../stores/EchoStore');
var EchoActions = require('../actions/EchoActions');
function getEchoSettings(){
  var coords = EchoStore.getUserCoord();
  return {
    userLon: coords.lon,
    userLat: coords.lat
  };
}

require('mapbox.js'); //auto-attaches to window.L
L.mapbox.accessToken = 'pk.eyJ1IjoiamltbXl0b25pYyIsImEiOiJlYzQwMjUyYTdkMDdmYzRlMDAwNGNlNTM4OWRkOGQxYyJ9.WfXFPfUSGRuq6B5x9rYjIg';

var AnalyticsView = React.createClass({
  getInitialState: function(){
    return getEchoSettings();
  },
  componentDidMount: function(){
    var map = L.mapbox.map('map', 'mapbox.dark', {attributionControl: false}).setView([37.7768, -122.4897], 13);
    var userMarker = new L.Marker(new L.LatLng(this.state.userLat, this.state.userLon));
    map.addLayer(userMarker);
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
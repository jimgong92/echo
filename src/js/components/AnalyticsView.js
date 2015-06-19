var React = require('React');

var EchoStore = require('../stores/EchoStore');
var EchoActions = require('../actions/EchoActions');
function getEchoState(){
  var coords = EchoStore.getUserCoordinates();
  var echos = EchoStore.getEchoCoordinates();
  var markers = EchoStore.getCoordinateMarkers();
  return {
    userLon: coords.lon,
    userLat: coords.lat,
    echos: echos,
    markers: markers
  };
}


var AnalyticsView = React.createClass({
  getInitialState: function(){
    return getEchoState();
  },
  componentDidMount: function(){
    EchoStore.addChangeListener(this._onChange);
    var map = L.mapbox.map('map', 'mapbox.dark', {attributionControl: false}).setView([37.7768, -122.4897], 13);
    for (var i = 0; i < this.state.markers.length; i++){
      map.addLayer(this.state.markers[i]);
    }
  },
  componentWillUnmount: function(){
    EchoStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState(getEchoState());
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
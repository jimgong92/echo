var React = require('React');

var EchoStore = require('../stores/EchoStore');
var EchoActions = require('../actions/EchoActions');
function getEchoState(){
  var coords = EchoStore.getUserCoordinates();
  var echos = EchoStore.getEchoCoordinates();
  return {
    userLon: coords.lon,
    userLat: coords.lat,
    echos: echos,
    markers: []
  };
}

require('mapbox.js'); //auto-attaches to window.L
L.mapbox.accessToken = 'pk.eyJ1IjoiamltbXl0b25pYyIsImEiOiJlYzQwMjUyYTdkMDdmYzRlMDAwNGNlNTM4OWRkOGQxYyJ9.WfXFPfUSGRuq6B5x9rYjIg';

var AnalyticsView = React.createClass({
  getInitialState: function(){
    return getEchoState();
  },
  componentWillMount: function(){
    console.log(this.state.echos.length);
    // var userMarker = new L.Marker(new L.LatLng(this.state.userLat, this.state.userLon));
    // var markers = [userMarker];
    // for (var i = 0; i < this.state.echos.length; i++){
    //   var echo = this.state.echos[i];
    //   var echoMarker = new L.Marker(new L.LatLng(echo.lat, echo.lon));
    //   markers.push(echoMarker);
    // }
    // this.setState({markers: this.state.markers.concat(markers)});
  },
  componentDidMount: function(){
    EchoStore.addChangeListener(this._onChange);

    var map = L.mapbox.map('map', 'mapbox.dark', {attributionControl: false}).setView([37.7768, -122.4897], 13);
    for (var i = 0; i < this.state.markers.length; i++){
      // console.log(this.state.markers[i]);
      // map.addLayer(this.state.markers[i]);
    }
  },
  componentWillUnmount: function(){
    EchoStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState(getEchoState());
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
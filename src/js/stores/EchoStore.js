var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EchoConstants = require('../constants/EchoConstants');

var utils = require('../utils');

var CHANGE_EVENT = 'change';

var _echos = [];
var _listenRadius = 100;
var _whisperRadius = 5;
var _userLon = 0, _userLat = 0; //Default coordinates of Point(0 0), where the "listen pin" is located 

function getAll(){
  $.ajax({
    url: window.location.origin + '/api/echo',
    type: 'GET',
    success: function(data){
      _echos = data.results;
      EchoStore.emitChange();
    },
    error: function(err){
      console.error("Error retrieving all echos");
      console.error(err);
    }
  });
};
function getEchosInRadius(){
  var rQuery = 'radius=' + _listenRadius;
  var xyQuery= 'lon=' + _userLon + '&lat=' + _userLat;
  $.ajax({
    url: window.location.origin + '/api/echo?' + xyQuery + '&' + rQuery,
    type: 'GET',
    success: function(data){
      _echos = data.results;
      EchoStore.emitChange();
    },
    error: function(err){
      console.error("Error retrieving echos by radius");
      console.error(err);
    }
  })
}
(function init(){
  utils.getLocation(function(coordinates){
    _userLon = coordinates.lon;
    _userLat = coordinates.lat;

    getEchosInRadius(); //TODO: Change to getEchosInRadius eventually as default init
  });
})();

var EchoStore = assign({}, EventEmitter.prototype, {
  
  postEcho: function(text, isWhispered){
    utils.getLocation(function(coordinates){
      var echoObj = {
        text: text,
        lat: coordinates.lat,
        lon: coordinates.lon,
        wRadius: isWhispered ? _whisperRadius : -1
      };
      console.log(echoObj);
      $.ajax({
        url: window.location.origin + '/api/echo',
        type: 'POST',
        data: JSON.stringify(echoObj),
        contentType: 'application/json',
        success: function(data){
          console.log(data);
          EchoStore.emitChange();
        },
        error: function(err){
          console.error("Error creating echo");
          console.log(err);
        }
      });
    });
  },
  getEchos: function(){
    console.log(_echos);
    return _echos;
  },
  getEchoCoordinates: function(){
    var res = [];
    for (var i = 0; i < _echos.length; i++){
      var echo = _echos[i];
      res.push({lon: echo.lon, lat: echo.lat});
    }
    return res;
  },
  getAllEchos: function(){
    //TODO: Retrieve all echos from database
  },
  getUserCoordinates: function(){
    return {
      lon: _userLon,
      lat: _userLat
    };
  },
  getCoordinateMarkers: function(){
    var markers = [new L.Marker(new L.LatLng(_userLat, _userLon))];
    for (var i = 0; i < _echos.length; i++){
      var echo = _echos[i];
      var echoMarker = new L.Marker(new L.LatLng(echo.lat, echo.lon));
      markers.push(echoMarker);
    }
    return markers;
  },
  getListenRadius: function(){
    return _listenRadius;
  },
  getWhisperRadius: function(){
    return _whisperRadius;
  },
  saveListenRadius: function(radius){
    _listenRadius = radius;
  },
  updateListenRadius: function(){
    getEchosInRadius();
  },
  saveWhisperRadius: function(radius){
    _whisperRadius = radius;
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

/**
 * Register callback to handle all updates
 */
AppDispatcher.register(function(action){
  switch(action.actionType){
    case EchoConstants.POST_ECHO:
      EchoStore.postEcho(action.text, action.isWhispered);
      break;
    case EchoConstants.GET_ALL_ECHOS:
      EchoStore.getAllEchos();
      break;
    case EchoConstants.SAVE_LISTEN_RADIUS:
      EchoStore.saveListenRadius(action.radius);
      break;
    case EchoConstants.UPDATE_LISTEN_RADIUS:
      EchoStore.updateListenRadius();
      break;
    case EchoConstants.SAVE_WHISPER_RADIUS:
      EchoStore.saveWhisperRadius(action.radius);
      break;
    default: 
      //no op
  }
});

module.exports = EchoStore;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EchoConstants = require('../constants/EchoConstants');

var utils = require('../utils');

var CHANGE_EVENT = 'change';

var _echos = [];
var _listenRadius = 50;
var _listenLon = 0, _listenLat = 0; //Default coordinates of Point(0 0), where the "listen pin" is located 

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
  var xyQuery= 'lon=' + _listenLon + '&lat=' + _listenLat;
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
    _listenLon = coordinates.lon;
    _listenLat = coordinates.lat;

    getAll(); //TODO: Change to getEchosInRadius eventually as default init
  });
})();

var EchoStore = assign({}, EventEmitter.prototype, {
  
  postEcho: function(text){
    utils.getLocation(function(coordinates){
      var echoObj = {
        text: text,
        lat: coordinates.lat,
        lon: coordinates.lon
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
  getAllEchos: function(){
    //TODO: Retrieve all echos from database
  },
  getListenRadius: function(){
    return _listenRadius;
  },
  updateListenRadius: function(radius){
    _listenRadius = radius;
    getEchosInRadius();
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
      EchoStore.postEcho(action.text);
      break;
    case EchoConstants.GET_ALL_ECHOS:
      EchoStore.getAllEchos();
      break;
    case EchoConstants.UPDATE_LISTEN_RADIUS:
      EchoStore.updateListenRadius(action.radius);
      break;
    default: 
      //no op
  }
});

module.exports = EchoStore;
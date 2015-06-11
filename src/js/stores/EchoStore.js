var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EchoConstants = require('../constants/EchoConstants');

var CHANGE_EVENT = 'change';

var echos = [];

(function init(){
  $.ajax({
    url: window.location.origin + '/api/echo/all',
    type: 'GET',
    success: function(data){
      echos = data.results;
      EchoStore.emitChange();
    },
    error: function(err){
      console.error("Error retrieving echos");
      console.log(err);
    }
  });
})();

var EchoStore = assign({}, EventEmitter.prototype, {
  
  postEcho: function(text){
    console.log(text);
    console.log('postEcho in Echo Store');
    $.ajax({
      url: window.location.origin + '/api/echo',
      type: 'POST',
      data: JSON.stringify({
        text: text
      }),
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
  },
  getAllEchos: function(){
    console.log('getAllEchos in Echo Store');
    console.log(echos);
    return echos;
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
    default: 
      //no op
  }
});

module.exports = EchoStore;
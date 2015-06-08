var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EchoConstants = require('../constants/EchoConstants');

var CHANGE_EVENT = 'change';

var EchoStore = assign({}, EventEmitter.prototype, {
  
  postEcho: function(text){
    console.log(text);
    console.log('postEcho in Echo Store');
  },
  getAllEchos: function(){
    console.log('getAllEchos in Echo Store');
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
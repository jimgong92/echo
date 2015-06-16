var AppDispatcher = require('../dispatcher/AppDispatcher');
var EchoConstants = require('../constants/EchoConstants');

var EchoActions = {
  postEcho: function(text, isWhispered){
    AppDispatcher.dispatch({
      actionType: EchoConstants.POST_ECHO,
      text: text,
      isWhispered: isWhispered
    });
  },
  getAllEchos: function(){
    AppDispatcher.dispatch({
      actionType: EchoConstants.GET_ALL_ECHOS
    });
  },
  saveListenRadius: function(r){
    AppDispatcher.dispatch({
      actionType: EchoConstants.SAVE_LISTEN_RADIUS,
      radius: r
    });
  },
  updateListenRadius: function(){
    AppDispatcher.dispatch({
      actionType: EchoConstants.UPDATE_LISTEN_RADIUS
    });
  },
  saveWhisperRadius: function(r){
    AppDispatcher.dispatch({
      actionType: EchoConstants.SAVE_WHISPER_RADIUS,
      radius: r
    });
  }
};

module.exports = EchoActions;
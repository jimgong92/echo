var AppDispatcher = require('../dispatcher/AppDispatcher');
var EchoConstants = require('../constants/EchoConstants');

var EchoActions = {
  postEcho: function(text){
    AppDispatcher.dispatch({
      actionType: EchoConstants.POST_ECHO,
      text: text
    });
  },
  getAllEchos: function(){
    AppDispatcher.dispatch({
      actionType: EchoConstants.GET_ALL_ECHOS
    });
  }
};

module.exports = EchoActions;
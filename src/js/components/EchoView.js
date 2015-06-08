var React = require('react');

/** 
 * Material UI Components
 */
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;

/**
 * Required Components
 */
var FeedView = require('./FeedView');
var PostView = require('./PostView');

var EchoView = React.createClass({
  render: function(){
    return (
      <Tabs>
        <Tab label="Feed" >
          <FeedView />
        </Tab>
        <Tab label="Add Echo" >
          <PostView />
        </Tab>
      </Tabs>
    );
  }
});

module.exports = EchoView;
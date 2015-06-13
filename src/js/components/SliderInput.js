var React = require('react');
var ReactPropTypes = React.PropTypes;

var SliderInput = React.createClass({
  _onChange: function(e){
    this.setState({
      value: e.target.value
    });
  },
  render: function(){
    return (

    );
  }
});

module.exports = SliderInput;
var React = require('react');
var ReactPropTypes = React.PropTypes;

/**
 * Allow for keyboard submit
 */
var ENTER_KEY_CODE = 13;

var TextInput = React.createClass({
  propTypes: {
    type: ReactPropTypes.string,
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },
  getInitialState: function(){
    return {
      value: this.props.value || ''
    };
  },
  _save: function(){
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },
  _onChange: function(e){
    this.setState({
      value: e.target.value
    });
  },
  _onKeyDown: function(e){
    if (e.keyCode === ENTER_KEY_CODE){
      this._save();
    }
  },
  render: function(){
    return (
      <input
        type={this.props.type}
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true} />
    );
  }
});

module.exports = TextInput;
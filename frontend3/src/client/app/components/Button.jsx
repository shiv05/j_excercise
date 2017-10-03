import React from 'react';
import {render} from 'react-dom';

//Component that contains default css styling to make other buttons.
//The onlcick method has to be passed as a callback prop
//The css components can be optionally passed as props

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.buttonTitle = props.buttonTitle;
    this.onClick = props.onClick;
    this.style = {
      color: props.color,
      fontSize: props.fontSize, 
      backgroundColor: props.backgroundColor,
      textAlign: props.textAlign,
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      borderWidth: props.borderWidth,
      borderColor: props.borderColor,
      float: props.float,
      width: props.width,
      height: props.height
    };
  }

  render() {
    return (
      <button type="button" onClick={this.onClick} style={this.style}> {this.buttonTitle}</button>
    );
  }
}

Button.defaultProps = {
  color: 'blue',
  fontSize: 15, 
  backgroundColor: 'white',
  textAlign: 'center',
  marginLeft: 3,
  marginRight: 3,
  marginTop: 3,
  marginBottom: 3,
  borderWidth: 2,
  borderColor: 'blue'
};
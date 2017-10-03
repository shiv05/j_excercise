import React from 'react';
import {render} from 'react-dom';


//Basic class for rendering text with CSS formatting
export class Text extends React.Component {
  constructor(props) {
    super(props);
    this.textTitle = props.textTitle;
    this.style = {
      color: props.color,
      fontSize: props.fontSize, 
      backgroundColor: props.backgroundColor,
      textAlign: props.textAlign,
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      float: props.float,
      fontWeight: props.fontWeight
    };
  }

  render() {
    return (
    	<div style = {this.style}>
    		{this.textTitle}
    	</div>
    );
  }
}

Text.defaultProps = {
	fontSize: 15,
	textAlign: 'center',
	marginLeft: 3,
	marginRight: 3,
	marginTop: 3,
	marginBottom: 3,
};
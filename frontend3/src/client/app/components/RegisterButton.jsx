import React from 'react';
import {render} from 'react-dom';
import {Button} from './Button.jsx'

// The navigation bar button for registartion
export class RegisterButton extends React.Component{
	constructor(props){
		super(props);
		this.onClick = props.onClick;
	}

	render(){
		return(
			<Button buttonTitle = "REGISTER"
				float = "right"
				width = "20%"
				onClick = {this.onClick}/>
		);
	}

}


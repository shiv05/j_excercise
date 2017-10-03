import React from 'react';
import {render} from 'react-dom';
import {Button} from './Button.jsx'


//The navigation bar button for login
export class LoginButton extends React.Component{
	constructor(props){
		super(props);
		this.onClick = props.onClick
	}

	render(){
		return(
			<Button buttonTitle = "LOGIN"
				float = "right"
				width = "20%"
				onClick = {this.onClick}/>
		);
	}

}
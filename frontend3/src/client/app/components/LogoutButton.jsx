import React from 'react';
import {render} from 'react-dom';
import {Button} from './Button.jsx'


//Logout button on the navigation bar
export class LogoutButton extends React.Component{
	constructor(props){
		super(props);
		this.onClick = props.onClick;
	}

	render(){
		return(
			<Button buttonTitle = "LOGOUT"
				float = "right"
				width = "20%"
				onClick = {this.onClick}/>
		);
	}

}
import React from 'react';
import {render} from 'react-dom';

import {LogoutButton} from './LogoutButton.jsx'
import {LoginButton} from './LoginButton.jsx'
import {RegisterButton} from './RegisterButton.jsx'
import {Text} from './Text.jsx'


// Naviagation bar : contains the buttons login, register and logout.
// The callbacks for these button actions need to be passed as props
// The Navigation Bar also uses the state isLogged in from its parent component Home to do conditional rendering
export class NavigationBar extends React.Component{
	constructor(props){
		super(props);

		this.logoutButtonCallback = props.logoutButtonCallback;
		this.loginButtonCallback = props.loginButtonCallback;
		this.registerButtonCallback = props.registerButtonCallback;

		this.divstyle = {
			borderStyle: "solid",
			borderColor: "#D3D3D3",
			borderWidth: "0 0 1.5 0",
			margin: 0,
			overflow: "hidden",
			backgroundColor: "white"
		}
		

		this.navigationText = <Text textTitle = "Navigation Bar"
						float = "left"
						width = "40%"
						fontWeight = "bold"
						fontSize = "20"/>;
	}

	render(){
		if(this.props.isLoggedIn){
			console.log("here1");
			console.log(this.logoutButtonCallback);
			return(
				<div style = {this.divstyle}>
					{this.navigationText}
					<LogoutButton onClick = {this.logoutButtonCallback}/>
				</div>
			);
		}else{
			console.log("here2");
			return(
				<div style = {this.divstyle}>
					{this.navigationText}
					<RegisterButton onClick = {this.registerButtonCallback}/>
					<LoginButton onClick = {this.loginButtonCallback}/> 
				</div>
			);
		}
		
	}
}
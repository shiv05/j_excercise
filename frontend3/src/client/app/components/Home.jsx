import React, { Component } from 'react';
import { render } from 'react-dom';

import {NavigationBar} from './NavigationBar.jsx'
import {LoginPage} from './LoginPage.jsx'
import {RegisterPage} from './RegisterPage.jsx'
import {Text} from './Text.jsx'
import {LoggedInPage} from './LoggedInPage.jsx'


//This is the main component. All the other components are rednered through here based on the state.
//state will have registered users. normally you would use backend rest calls for this
//state.page is used to keep track of the current page in the absence of routing
//I have not maintained the uniqueness of user. The password and user combined will be unique though

export class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn: false,
			page: "register",
			credentials: [{user: "admin", pass:"admin"}]
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.gotoLogin = this.gotoLogin.bind(this);
		this.gotoRegister = this.gotoRegister.bind(this);
		this.handleRegistration = this.handleRegistration.bind(this);
		this.homeStyle = {
			backgroundColor: "#F5F5F5",
			width: "100%",
			height: "100%",
		}
	}


	handleLogin(user, pass){
		var index;
		var flag = 0;
		const credentials = this.state.credentials;
		for(index = 0; index < credentials.length; index++){
			if(credentials[index].user === user && credentials[index].pass == pass){
				flag = 1;
				break;
			}
		}
		if(flag == 0){
			this.setState({page: "loginUnsuccessful"})
		}else{
			this.setState({isLoggedIn: !this.state.isLoggedIn});
		}
	}

	handleLogout(){
		this.setState({isLoggedIn: !this.state.isLoggedIn});
	}

	handleRegistration(user, pass){
		var credentials = this.state.credentials;
		console.log(credentials);
		var index;
		var flag = 0;
		//check if same registration is already present
		for(index = 0; index < credentials.length; index++){
			if(credentials[index].user === user && credentials[index].pass == pass){
				flag = 1;
			}
		}
		//add new registration if it was not present
		if(flag == 0){
			//this.setState((state) => ({credentials: state.credentials.concat({user: user, pass: pass})}));
			credentials.push({user: user, pass: pass});
			console.log("new creds");
			console.log(credentials);
			this.setState({credentials: credentials});
		}
		this.setState({page: "registered"});
		console.log(this.state.credentials);
	}

	gotoLogin(){
		this.setState({page: "login"});
	}

	gotoRegister(){
		this.setState({page: "register"});
	}

	//conditional rendering done based on this.state.page in the absence of routing
	render(){
		if(this.state.isLoggedIn){
			return(
				<div style={this.homeStyle}>
					<NavigationBar isLoggedIn={true}
						logoutButtonCallback={this.handleLogout} 
						loginButtonCallback={this.gotoLogin}
						registerButtonCallback={this.gotoRegister}/>
					<LoggedInPage credentials={this.state.credentials} />
				</div>
			);
		}else{
			if(this.state.page == "login" ){
				return(
					<div style={this.homeStyle}>
						<NavigationBar isLoggedIn = {false} 
							logoutButtonCallback={this.handleLogout} 
							loginButtonCallback={this.gotoLogin}
							registerButtonCallback={this.gotoRegister}/>
						<LoginPage handleLogin={this.handleLogin} />
					</div>
				);
			}else if(this.state.page == "registered"){
				return(
					<div style={this.homeStyle}>
						<NavigationBar isLoggedIn = {false} 
							logoutButtonCallback={this.handleLogout} 
							loginButtonCallback={this.gotoLogin}
							registerButtonCallback={this.gotoRegister}/>
						<Text textTitle = "Successfully Registered! You can now login"
							fontWeight = "bold"
							fontSize = "30"
							marginTop = "40"/>
					</div>
				);
			}else if(this.state.page == "loginUnsuccessful"){
				return(
					<div style={this.homeStyle}>
						<NavigationBar isLoggedIn = {false} 
							logoutButtonCallback={this.handleLogout} 
							loginButtonCallback={this.gotoLogin}
							registerButtonCallback={this.gotoRegister}/>
						<Text textTitle = "Login Unsuccessful. Try again or register"
							fontWeight = "bold"
							fontSize = "30"
							marginTop = "40"/>
					</div>
				);
			}else{
				return(
					<div style={this.homeStyle}>
						<NavigationBar isLoggedIn = {false} 
							logoutButtonCallback={this.handleLogout} 
							loginButtonCallback={this.gotoLogin}
							registerButtonCallback={this.gotoRegister}/>
						<RegisterPage handleRegistration={this.handleRegistration}/>
					</div>
				);
			}
		}
	}
}
import React from 'react';
import {render} from 'react-dom';

import {LoginRegisterForm} from './LoginRegisterForm.jsx'

// The component to display below the navigation bar when user goes to the register page
// Displays the registartion form
// The function to do the actaul registration has to be passed as a prop to this
export class RegisterPage extends React.Component{
	constructor(props){
		super(props);
		this.handleRegistration = props.handleRegistration;
	}

	render(){
		return <LoginRegisterForm type="Register"
							onSubmit={this.handleRegistration} />
	}
}
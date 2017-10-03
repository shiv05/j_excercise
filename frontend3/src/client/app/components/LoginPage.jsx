import React from 'react';
import {render} from 'react-dom';

import {LoginRegisterForm} from './LoginRegisterForm.jsx'

// Component to be display the login form
// The function to do the actual login has to be passed as a prop to this
export class LoginPage extends React.Component{
	constructor(props){
		super(props);
		this.handleLogin = props.handleLogin;
	}

	render(){
		return <LoginRegisterForm type="Login"
							onSubmit={this.handleLogin} />
	}
}
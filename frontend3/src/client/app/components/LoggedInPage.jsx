import React from 'react';
import {render} from 'react-dom';

import {Text} from './Text.jsx'


//Component for hidden passwords and making them show on double click
class PasswordComponent extends React.Component {
	constructor(props){
		super(props);
		this.pass = props.pass;
		this.mykey = props.mykey;
		this.state = {
			value: "***************"
		};

		this.onDblClick = this.onDblClick.bind(this);
	}

	onDblClick(){
		this.setState({value: this.pass});
	}

	render(){
		return(
			<td onDoubleClick={this.onDblClick}
				key = {this.mykey}>
				{this.state.value}
			</td>
		);
	}
}

//Component to display below the navigation bar once a user is logged in
export class LoggedInPage extends React.Component{
	constructor(props){
		super(props);
		this.credentials = props.credentials;
	}

	render() {
		var layout = this.credentials.map(({user, pass}, index)=>
				<tr key = {user+"_"+pass}>
					<td key={"user"+index}>
						{user}
					</td>
					<PasswordComponent pass={pass}
						mykey={"pass"+index} />
				</tr>
		);
		return(
			<table>
			<tbody>
				<tr>
					<th>
						Username
					</th>
					<th>
						Password
					</th>
				</tr>
				<tr>
					<th>
						Double click passwords to view
					</th>
				</tr>
				{layout}
			</tbody>
			</table>
		);
	}
}
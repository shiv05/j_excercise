import React from 'react';
import {render} from 'react-dom';


// The Basic form component for registration or login. This is being used since the format of the registration and login is same.
// The onSubmit callback has to be passed as a prop.
export class LoginRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Username",
      password: "Password"
    };

    this.type = props.type;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



    this.formStyle = {
      margin: "35%",
      textAlign: "center",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#D3D3D3",
      width: "30%",
      backgroundColor: "white",
      marginTop: 150,
      fontSize: 15,
    }

    this.blockStyle = {
      padding: 10,
      textAlign: "left",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#D3D3D3",
      color: "gray"
    }

    this.inputStyle = {
      borderWidth: 0,
      border: "none",
      fontSize: "25",
      width: "100%",
      color: "lightgray"
    }

    this.submitStyle = {
      margin: 20,
      padding: 5,
      fontSize: 15,
      backgroundColor: "blue",
      color: "white",
      width: "40%"
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.state.userName, this.state.password);
  }

  render() {
    return (
      <form style = {this.formStyle} onSubmit={this.onSubmit}>
        <div>
          <h2>{this.type}</h2>
        </div>
        <div style={this.blockStyle}>
          <div>
            Username
          </div>
          <div>
            <input style={this.inputStyle}
              name="userName"
              type="text"
              value={this.state.userName}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div style={this.blockStyle}>
          <div>
            Password
          </div>
          <div>
            <input style={this.inputStyle}
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div>
          <input style={this.submitStyle} type="submit" value={this.type} />
        </div>
      </form>
    );
  }
}
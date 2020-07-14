import React, { Component } from "react";
import ProductContext from "../Context/ProductContext";
import LoginForm from "../Components/LoginForm/LoginForm";

export default class LoginPage extends Component {
  static contextType = ProductContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };
  state = {
    error: null,
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props
    console.log("login success");

    const destination = (location.state || {}).from || '/'
    history.push(destination)
  };

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>

        {this.state.error && <p className="error">{this.state.error}</p>}

        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </div>
    );
  }
}

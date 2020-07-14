import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import TokenService from "../../Services/token-service";

export default class LoginNav extends Component {
  static contextType = ProductContext;

  /* clear token on logout */
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  /* if logged in - change to logout */
  renderLogoutLink = () => {
    return (
      <>
        <li>
          <NavLink to="/" onClick={this.handleLogoutClick}>
            Logout
          </NavLink>
        </li>
      </>
    );
  };

  /* if not logged in - change to register/login */
  renderLoginLink = () => {
    return (
      <>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/registration">Register</NavLink>
        </li>
      </>
    );
  };

  render() {
    return (
      <>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </>
    );
  }
}

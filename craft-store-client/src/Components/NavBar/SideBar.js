import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginNav from "../NavBar/LoginNav";

class SideBar extends Component {
  handleClick = (value) => {
    this.props.setCategoryValue(value);
    this.props.history.push("/products");
  };

  render() {
    return (
      <header className="SideBar">
        <span className="SideBar__header">Categories</span>
        <ul className="SideBar__categories">
          <li onClick={() => this.handleClick("")}>All</li>
          <li onClick={() => this.handleClick("stained")}>Stained</li>
          <li onClick={() => this.handleClick("fused")}>Fused</li>
        </ul>
        <ul className="SideBar__login">
          <LoginNav />
        </ul>
      </header>
    );
  }
}

export default withRouter(SideBar);

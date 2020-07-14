import React, { Component } from "react";
import Context from "../../Context/Context";
import { withRouter } from 'react-router-dom';

class SideBar extends Component {
  static contextType = Context;



  handleClick = value => {
    this.context.setCategoryValue(value);    
    this.props.history.push('/products');
  };

  render() {
    return (
      <header className="SideBar">
        <ul className="SideBar__categories">
          Categories
          <li onClick={() => this.handleClick("")}>All</li>
          <li onClick={() => this.handleClick("stained")}>Stained glass</li>
          <li onClick={() => this.handleClick("fused")}>Fused glass</li>
        </ul>
      </header>
    );
  }
}

export default withRouter(SideBar);

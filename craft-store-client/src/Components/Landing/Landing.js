import React, { Component } from "react";

export default class Landing extends Component {
  handleClick = value => {
    this.props.setCategoryValue(value);    
    this.props.history.push('/products');
  };

  render() {
    return (
      <div className="Landing">
        <div className="Landing__product" onClick={() => this.handleClick("stained")}>
          <h2>Stained Glass</h2>
          <p>
            Check out our beautiful selection of stained glass. Each piece is
            handmade and beautifully crafted
          </p>
        </div>
        <div className="Landing__product" onClick={() => this.handleClick("fused")}>
          <h2>Fused Glass</h2>
          <p>
            Check out our beautiful selection of fused glass. Each piece is
            kiln fired to exquisite perfection
          </p>
        </div>
      </div>
    );
  }
}

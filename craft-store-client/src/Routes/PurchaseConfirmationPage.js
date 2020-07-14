import React, { Component } from "react";
import Context from '../Context/ProductContext';

export default class Checkout extends Component {
  static contextType = Context;

  render() {
    return(
      <div>Purchase Successful</div>
    )
  }
}
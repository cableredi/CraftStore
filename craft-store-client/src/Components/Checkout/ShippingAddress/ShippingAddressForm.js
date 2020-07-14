import React, { Component } from "react";
import ValidateError from "../../ValidateError/ValidateError";

const Required = () => <span className="required">*</span>;

export default class ShippingAddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
      address1: {
        value: "",
        touched: false,
      },
      address2: {
        value: "",
        touched: false,
      },
      city: {
        value: "",
        touched: false,
      },
      shippingState: {
        value: "",
        touched: false,
      },
      zip: {
        value: "",
        touched: false,
      },
    };
  }

  /* Update Form State */
  updateShippingName(name) {
    this.setState({
      name: {
        value: name,
        touched: true,
      },
    });
  }

  updateShippingAddress1(address1) {
    this.setState({
      address1: {
        value: address1,
        touched: true,
      },
    });
  }

  updateShippingAddress2(address2) {
    this.setState({
      address2: {
        value: address2,
        touched: true,
      },
    });
  }

  updateShippingCity(city) {
    this.setState({
      city: {
        value: city,
        touched: true,
      },
    });
  }

  updateShippingState(shippingState) {
    this.setState({
      shippingState: {
        value: shippingState,
        touched: true,
      },
    });
  }

  updateShippingZip(zip) {
    this.setState({
      zip: {
        value: zip,
        touched: true,
      },
    });
  }

  /* Handle form Cancel button */
  handleClickCancel = () => {
    this.props.history.push("/products");
  };

  /* Validate form required fields */
  validateShippingName() {
    const name = this.state.name.value.trim();

    if (name.length === 0) {
      return { error: true, message: "Name is Required" };
    }

    return { error: false, message: "" };
  }

  validateShippingAddress1() {
    const address1 = this.state.address1.value.trim();

    if (address1.length === 0) {
      return { error: true, message: "Address1 is Required" };
    }

    return { error: false, message: "" };
  }

  validateShippingCity() {
    const city = this.state.city.value.trim();

    if (city.length === 0) {
      return { error: true, message: "City is Required" };
    }

    return { error: false, message: "" };
  }

  validateShippingState() {
    const shippingState = this.state.shippingState.value.trim();

    if (shippingState.length === 0) {
      return { error: true, message: "State is Required" };
    }

    return { error: false, message: "" };
  }

  validateShippingZip() {
    const zip = this.state.zip.value.trim();

    if (zip.length === 0) {
      return { error: true, message: "Zip is Required" };
    }

    return { error: false, message: "" };
  }

  /*********************/
  /*      render       */
  /*********************/
  render() {
    let addressButtonDisabled = true;

    const ShippingAddress1Error = this.validateShippingAddress1();
    const ShippingNameError = this.validateShippingName();
    const ShippingCityError = this.validateShippingCity();
    const ShippingStateError = this.validateShippingState();
    const ShippingZipError = this.validateShippingZip();

    if (
      !ShippingNameError.error &&
      !ShippingAddress1Error.error &&
      !ShippingCityError.error &&
      !ShippingStateError.error &&
      !ShippingZipError.error
    ) {
      addressButtonDisabled = false;
    }

    return (
      <form className="ShippingAddress__form" onSubmit={this.props.onSubmit}>
        <div className="required">* Required Fields</div>

        <ul className="Form-items">
          <li>
            <label htmlFor="name">
              Name <Required />
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="123 Main Street"
              value={this.state.name.value}
              maxLength="40"
              onChange={(e) => this.updateShippingName(e.target.value)}
              required
            />
          </li>
          <li>
            {this.state.name.touched && (
              <ValidateError message={ShippingNameError.message} />
            )}
          </li>

          <li>
            <label htmlFor="address1">
              Address1 <Required />
            </label>
            <input
              type="text"
              name="address1"
              id="address1"
              placeholder="123 Main Street"
              value={this.state.address1.value}
              maxLength="40"
              onChange={(e) => this.updateShippingAddress1(e.target.value)}
              required
            />
          </li>
          <li>
            {this.state.address1.touched && (
              <ValidateError message={ShippingAddress1Error.message} />
            )}
          </li>

          <li>
            <label htmlFor="address2">Address2 </label>
            <input
              type="text"
              name="address2"
              id="address2"
              placeholder="Address2"
              value={this.state.address2.value}
              onChange={(e) => this.updateShippingAddress2(e.target.value)}
            />
          </li>

          <li>
            <label htmlFor="city">
              City <Required />
            </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Your City"
              value={this.state.city.value}
              onChange={(e) => this.updateShippingCity(e.target.value)}
              required
            />
          </li>
          <li>
            {this.state.city.touched && (
              <ValidateError message={ShippingCityError.message} />
            )}
          </li>

          <li>
            <label htmlFor="shippingState">
              State <Required />
            </label>
            <input
              type="text"
              name="shippingState"
              id="shippingState"
              placeholder="Your State"
              value={this.state.shippingState.value}
              onChange={(e) => this.updateShippingState(e.target.value)}
              required
            />
          </li>
          <li>
            {this.state.shippingState.touched && (
              <ValidateError message={ShippingStateError.message} />
            )}
          </li>

          <li>
            <label htmlFor="zip">
              Zip <Required />
            </label>
            <input
              type="text"
              name="zip"
              id="zip"
              placeholder="12345"
              value={this.state.zip.value}
              onChange={(e) => this.updateShippingZip(e.target.value)}
              required
            />
          </li>
          <li>
            {this.state.zip.touched && (
              <ValidateError message={ShippingZipError.message} />
            )}
          </li>

          <li className='Form__button'>
            <button type="submit" disabled={addressButtonDisabled}>
              Save
            </button>
          </li>
        </ul>
      </form>
    );
  }
}

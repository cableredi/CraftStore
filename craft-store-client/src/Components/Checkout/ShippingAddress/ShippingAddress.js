import React, { Component } from "react";
import TriggerAddressModal from "./TriggerAddressModal";
import ShippingAddressModal from "./ShippingAddressModal";
import UsersApiService from '../../../Services/users-api-service';

export default class ShippingAddress extends Component {
  state = {
    isShown: false,
    shippingName: "",
    shippingAddress1: "",
    shippingAddress2: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingAddresses: [],
  };

  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };

  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };

  setShippingAddresses = (addresses) => {
    this.setState({
      shippingAddresses: addresses
    })
  }

  componentDidMount() {
    UsersApiService.getAll()
      .then(this.setShippingAddresses)
      .catch(this.setError);
  }

  handleShippingAddressSubmit = (e) => {
    e.preventDefault(e);

    this.setState(
      {
        shippingName: e.target.name.value,
        shippingAddress1: e.target.address1.value,
        shippingAddress2: e.target.address2.value,
        shippingCity: e.target.city.value,
        shippingState: e.target.shippingState.value,
        shippingZip: e.target.zip.value,
      },
      () => {
        this.props.addressConfirmed();
      }
    );

    this.closeModal();
  };

  render() {
    return (
      <React.Fragment>
        <h2>Ship To:</h2>
        <div className="ShippingAddress">
          <div className="ShippingAddress__selected">
            <div>
              <span className="ShippingAddress__header">Name: </span>
              {this.state.shippingName}
            </div>
            <div>
              <span className="ShippingAddress__header">Address1: </span>
              {this.state.shippingAddress1}
            </div>
            <div>
              <span className="ShippingAddress__header">Address2: </span>
              {this.state.shippingAddress2}
            </div>
            <div>
              <span className="ShippingAddress__header">City: </span>
              {this.state.shippingCity}
            </div>
            <div>
              <span className="ShippingAddress__header">State: </span>
              {this.state.shippingState}
            </div>
            <div>
              <span className="ShippingAddress__header">Zip: </span>
              {this.state.shippingZip}
            </div>
          </div>
          <div className="ShippingAddress_choices">
            <TriggerAddressModal
              showModal={this.showModal}
              buttonRef={(n) => (this.TriggerButton = n)}
            />
            {this.state.isShown ? (
              <ShippingAddressModal
                onSubmit={this.handleShippingAddressSubmit}
                modalRef={(n) => (this.modal = n)}
                buttonRef={(n) => (this.closeButton = n)}
                closeModal={this.closeModal}
                onKeyDown={this.onKeyDown}
                onClickOutside={this.onClickOutside}
              />
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

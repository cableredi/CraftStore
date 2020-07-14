import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import config from "../../config";
import ProductContext from '../../Context/ProductContext';

const CLIENT = {
  sandbox: config.REACT_APP_PAYPAL_ID,
  production: "your client id",
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;

class PaypalButton extends React.Component {
  static contextType = ProductContext;
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  /*
  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }
  */

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Craft Store",
          amount: {
            currency_code: "USD",
            value: this.props.total,
          },
        },
      ],
    });

    /*
    createOrder: function(data, actions) {
                return fetch('/demo/checkout/api/paypal/order/create/', {
                    method: 'post'
                }).then(function(res) {
                    return res.json();
                }).then(function(data) {
                    return data.orderID;
                });
            },
            */
  };

  onApprove = (data, actions) => {
    actions.order.capture().then((details) => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
      this.context.emptyCart();
      this.props.history.push("/purchaseconfirmation");
    });

    /*
    onApprove: function(data, actions) {
                return fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
                    method: 'post'
                }).then(function(res) {
                    return res.json();
                }).then(function(details) {
                    // Show a success message to the buyer
                    alert('Transaction completed by ' + details.payer.name.given_name + '!');
                });
            }
            */
  };

  onCancel = (data, actions) => {
    console.log("Payment Cancelled: ", data);

    this.setState({ showButtons: false, paid: false });
    this.context.setError('Payment Cancelled');
    this.props.history.push("/cart");
  };

  onError = (error) => {
    console.log("Paypal error occurred: ", error);

    this.setState({ showButtons: false, paid: false });
    this.context.setError('Payment Error: ' + error);
    this.props.history.push("/cart");
  };

  render() {
    const { showButtons, paid } = this.state;

    return (
      <div className="Checkout__payPal-button">
        <h2>Checkout:</h2>
        {showButtons && (
          <PayPalButton
            createOrder={(data, actions) => this.createOrder(data, actions)}
            onApprove={(data, actions) => this.onApprove(data, actions)}
            onCancel={(data, actions) => this.onCancel(data, actions)}
            onError={(error) => this.onError(error)}
          />
        )}

        {paid && (
          <div className="Checkout__payPal-button">
            <h2>
              Congrats! you just paid for that picture. Work a little harder and
              you'll be able to afford the car itself{" "}
              <span role="img" aria-label="emoji">
                {" "}
                😉
              </span>
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(PaypalButton);

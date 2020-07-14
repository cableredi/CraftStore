import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import Landing from "../Landing/Landing";
import NotFound from "../NotFound/NotFound";
import Cart from "../Cart/Cart";
import ProductsListPage from "../../Routes/ProductsListPage";
import ProductDetailPage from "../../Routes/ProductDetailPage";
import LoginPage from "../../Routes/LoginPage";
import RegistrationPage from "../../Routes/RegistrationPage";
import CheckoutPage from "../../Routes/CheckoutPage";
import PurchaseConfirmation from '../../Routes/PurchaseConfirmationPage';

import TokenService from "../../Services/token-service";
import IdleService from "../../Services/idle-service";
import AuthApiService from "../../Services/auth-api-service";

import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      categoryValue: "",
    };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  /* Set Search Value */
  setSearchValue = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  /* Set Category Value */
  setCategoryValue = (value) => {
    this.setState({
      categoryValue: value,
    });
  };

  /* set function to logout when user goes idle */
  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
    }
  }

  /* Component Will Unmount - Stop listeners when app unmounts */
  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  /* remove token from localStorage */
  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();

    this.forceUpdate();
  };

  /* Render */
  render() {
    return (
      <React.Fragment>
        <NavBar
          setSearchValue={this.setSearchValue}
          setCategoryValue={this.setCategoryValue}
        />

        <div className="sectionSpacer"></div>

        <main className="App__main">
          {this.state.hasError && (
            <p className="red">
              There was an error! Oh no!{console.log("error", this.state.error)}
            </p>
          )}
          <Switch>
            <PublicOnlyRoute
              exact
              path="/"
              component={(routeProps) => (
                <Landing
                  setCategoryValue={this.setCategoryValue}
                  {...routeProps}
                />
              )}
            />

            <PublicOnlyRoute
              exact
              path="/products"
              component={(routeProps) => (
                <ProductsListPage
                  searchValue={this.state.searchValue}
                  categoryValue={this.state.categoryValue}
                  {...routeProps}
                />
              )}
            />

            <PublicOnlyRoute
              exact
              path="/products/:product_id"
              component={(routeProps) => <ProductDetailPage {...routeProps} />}
            />

            <PublicOnlyRoute path={"/login"} component={LoginPage} />

            <PublicOnlyRoute
              path={"/registration"}
              component={RegistrationPage}
            />

            <PublicOnlyRoute exact path="/cart" component={Cart} />

            <PrivateRoute
              path={"/checkout"}
              component={(routeProps) => <CheckoutPage {...routeProps} />}
            />

            <PrivateRoute
              path={"/purchaseconfirmation"}
              component={(routeProps) => <PurchaseConfirmation {...routeProps} />}
            />

            <Route component={NotFound} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

import React, { useState, useContext, useEffect } from "react";
import { Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Routes/LandingPage";
import ProductsListPage from "./Routes/ProductsListPage";
import { GlobalContext } from "./Context/GlobalContext";
import ProductsApiService from "./Services/products-api-service";
import CartPage from './Routes/CartPage';
import PublicOnlyRoute from './Components/Utils/PublicOnlyRoute';
import PrivateRoute from './Components/Utils/PrivateRoute';

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const { setProducts, setError, error } = useContext(GlobalContext);

  useEffect(() => {
    ProductsApiService.getAll().then(setProducts).catch(setError);
  }, []);

  return (
    <>
      <Navbar
        setSearchValue={setSearchValue}
        setCategoryValue={setCategoryValue}
      />

      <div className="sectionSpacer"></div>

      <main className="App__main">
        {error && <p className="error">There was an error: {error}</p>}
        <Switch>
          <PublicOnlyRoute
            exact
            path="/"
            component={() => (
              <LandingPage setCategoryValue={setCategoryValue} />
            )}
          />

          <PublicOnlyRoute
            exact
            path="/products"
            component={() => (
              <ProductsListPage
                searchValue={searchValue}
                categoryValue={categoryValue}
              />
            )}
          />

          <PublicOnlyRoute exact path="/cart" component={CartPage} />
        </Switch>
      </main>
    </>
  );
}

import config from '../config';
import TokenService from './token-service';

const ProductsApiService = {
  getAll() {
    return fetch(config.API_ENDPOINT_PRODUCTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `basic ${config.API_KEY}`
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
};

export default ProductsApiService;
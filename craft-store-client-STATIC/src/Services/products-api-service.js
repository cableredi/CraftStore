//import config from '../config';
import products from '../store';

const ProductsApiService = {
  getAll() {
    return Promise.resolve({
      ok: true,
      status: 200,
      json() {
        return {
          products: products
        }
      }
    })
  },
};

export default ProductsApiService;
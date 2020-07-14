const ProductsService = {
  getAllProducts(knex) {
    return knex
      .select('*')
      .from('products')
      .orderBy('product_name', 'asc')
  },
  getById(knex, id) {
    return knex
      .select('*')
      .from('products')
      .where('products.product_id', id)
      .first()
  },
};

module.exports = ProductsService;
function makeProductsArray() {
  return [
    {
      "product_id": 1,
      "product_name": "Item 1",
      "price": "60.99",
      "image": "/Images/coming-soon.png",
      "category": "stained",
      "available_quantity": "2",
      "description": "description 1",
      "measurements": "measurements 2",
      "how_made": "how made 1",
      "care_instructions": "care instructions 1",
    },
    {
      "product_id": 2,
      "product_name": "Item 2",
      "price": "10.99",
      "image": "/Images/coming-soon.png",
      "category": "fused",
      "available_quantity": "2",
      "description": "description 2",
      "measurements": "measurements 2",
      "how_made": "how made 2",
      "care_instructions": "care instructions 2",
    },
  ]
};

function makeExpectedProduct() {
  return {
    "product_id": 1,
    "product_name": "Item 1",
    "price": "60.99",
    "image": "/Images/coming-soon.png",
    "category": "stained",
    "available_quantity": "2",
    "description": "description 1",
    "measurements": "measurements 2",
    "how_made": "how made 1",
    "care_instructions": "care instructions 1",
  }
}

module.exports = {
  makeProductsArray,
  makeExpectedProduct,
}
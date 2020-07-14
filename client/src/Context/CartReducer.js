export default (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      return [...state, action.payload];

    case "UPDATE_CART":
      const updatedCart = action.payload;

      return state.map((item) =>
        item.id !== updatedCart.id ? item : updatedCart
      );

    case "REMOVE_CART":
      return state.filter((item) => item.id !== action.payload);

    case "EMPTY_CART":
      return action.payload;

    default:
      return state;
  }
};

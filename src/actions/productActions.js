export const addProduct = (productData) => {
    return {
      type: 'ADD_PRODUCT',
      payload: productData
    };
  };
  export const updateProduct = (productId, updatedProduct) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: {
            productId,
            updatedProduct
        }
    };
};
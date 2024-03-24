const initialState = {
    products: [
      { id: 1, name: 'Product 1', price: 10.99, count: 5, email: "tr@sd.com", country: 'Россия', delivery: 'empty', city: ['Москва'] },
      { id: 2, name: 'Product 2', price: 9.99, count: 10, email: "tsadr@sd.com", country: 'США', delivery: 'empty', city: ['Лос-Анджелес'] },
      { id: 3, name: 'Product 3', price: 29.99, count: 7, email: "tadsadadr@sd.com", country: 'Япония', delivery: 'empty', city: ['Осака'] },
    ]
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return {
          ...state,
          products: [...state.products, action.payload]
        };
      case 'DELETE_PRODUCT':
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload)
        };
      case 'UPDATE_PRODUCT':
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.payload.id ? { ...product, ...action.payload.updatedFields } : product
          )
        };
      default:
        return state;
    }
  };
  
  export default productReducer;

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import ProductTable from './components/ProductTable';



const store = createStore(rootReducer);

const App = () => {
  
  return (
    <Provider store={store}>
      <div className="App">
        <ProductTable />
      </div>
    </Provider>
  );
};

export default App;
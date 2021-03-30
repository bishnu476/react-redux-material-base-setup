import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/configureStore';

import App from './App';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App title={title}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);

module.hot.accept();

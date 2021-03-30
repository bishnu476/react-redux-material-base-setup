import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from '../modules/reducers';
import storage from 'redux-persist/lib/storage';
import fetchMiddleware from '../middleware/fetchMiddleware';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  timeout: 0,
  key: 'root',
  version: 1,
  storage
};

// #region configure logger middleware
const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

// #region createStore : enhancer
const enhancer = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    fetchMiddleware,
    loggerMiddleware
  )
);

const persistedReducer = persistReducer(persistConfig, reducer);

const initStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    console.log('its here server');
    return createStore(reducer, undefined, enhancer);

  } else {
    console.log('its here client');
    const store = createStore(persistedReducer, enhancer);
    persistStore(store);
    return store;
  }
};


// #endregion

export const store = initStore();


import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../modules/reducers';
import fetchMiddleware from '../middleware/fetchMiddleware';


// #region createStore : enhancer
const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    fetchMiddleware
  )
);

export const store = createStore(reducer, enhancer);

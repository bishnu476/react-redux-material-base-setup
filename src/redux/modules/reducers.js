// @flow

import { combineReducers } from 'redux';
import userAuth from './userAuth';
import testData from './test';

export const reducers = {
  userAuth,
  testData
};
const appReducer = combineReducers({
  ...reducers,
});
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }
  else if (action.type === 'persist/REHYDRATE') {
    console.log("state REHYDRATE ", state);
    console.log("action.payload REHYDRATE ", action.payload);
    if (action.payload) {
      const nextState = {
        ...action.payload, // use state from local browser
      };
      if(state.testData && state.testData.agentSelect){
        state.testData.agentSelect = {
          ...nextState.testData.agentSelect,
          ...state.testData.agentSelect
        }
      }
      if(state.testData && state.testData.agentFormSubmitted){
        state.testData.agentFormSubmitted = {
          ...nextState.testData.agentFormSubmitted,
          ...state.testData.agentFormSubmitted
        }
      }
      /*if (state.hallInfo && state.hallInfo.hallData) {
        nextState.hallInfo.hallData = {
          ...nextState.hallInfo.hallData,
          ...state.hallInfo.hallData
        }
      }
      if (state.openData && state.openData.openSingleMcqData) {
        nextState.openData = {
          ...nextState.openData,
          ...state.openData,
        }

      }*/
      console.log('nextstate persist/REHYDRATE', nextState);
      return nextState
    }
    return state;
  }

  return appReducer(state, action);
};
export default rootReducer;

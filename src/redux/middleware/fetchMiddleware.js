// @flow

// #region imports
import axios from 'axios';
// #endregion

// #region constants
export const FETCH_MOCK = 'FETCH_MOCK';
export const FETCH = 'FETCH';
// #endregion

//
// FETCH_MOCK mode
// in any action just add fetch object like:
// {
//  fetch: {
//    type: 'FETCH_MOCK',
//    actionTypes: {
//      request: 'TYPE_FOR_REQUEST',
//      success: 'TYPE_FOR_RECEIVED',
//      fail: 'TYPE_FOR_ERROR',
//    },
//    mockResult: any
//  }
// }
//

// FETCH mode
// in any action just add fetch object like:
// {
//  fetch: {
//    type: 'FETCH',
//    actionTypes: {
//      request: 'TYPE_FOR_REQUEST',
//      success: 'TYPE_FOR_RECEIVED',
//      fail: 'TYPE_FOR_ERROR',
//    },
//    url: 'an url',
//    method: 'get',  // lower case, one of 'get', 'post'...
//    headers: {}     // OPTIONAL CONTENT like: data: { someprop: 'value ...}
//    options: {}     // OPTIONAL CONTENT like: Authorization: 'Bearer _A_TOKEN_'
//  }
// }

const fetchMiddleware = (store ) => (next) =>(action)=> {
  console.log("first action",action);
  if (!action.fetch) {
    return next(action);
  }

  if (
      !action.fetch.type ||
      !action.fetch.type === FETCH_MOCK ||
      !action.fetch.type === FETCH
  ) {
    return next(action);
  }

  if (!action.fetch.actionTypes) {
    return next(action);
  }

  /**
   * fetch mock
   * @type {[type]}
   */
  if (action.fetch.type === FETCH_MOCK) {
    if (!action.fetch.mockResult) {
      throw new Error(
          'Fetch middleware require a mockResult payload when type is "FETCH_MOCK"',
      );
    }

    const {
      actionTypes: { request, success },
      mockResult,
    } = action.fetch;

    // request
    store.dispatch({ type: request });

    // received successful for mock
    return Promise.resolve(
        store.dispatch({
          type: success,
          payload: {
            status: 200,
            data: mockResult,
          },
        }),
    );
  }

  if (action.fetch.type === FETCH) {

    console.log("here action",action.fetch.headers)
    const {
      actionTypes: { request, success, fail },
      url,
      method,
      options,
    } = action.fetch;

    var {headers} = action.fetch;
      console.log("here action",headers)
    if(headers === undefined || headers['Content-Type'] === undefined){
        headers={
            'Content-Type': 'application/json',
        ...headers,
        }
    }

    // request
    store.dispatch({ type: request });

    // fetch server (success or fail)
    // returns a Promise
    return axios
        .request({
          method,
          url,
          headers,
          ...options,
        })
        .then(response => store.dispatch({ type: success, payload: response.data,status:response.status }))
        .catch(err => {
            console.log("error in API call",err);
          store.dispatch({ type: fail, error: err.response.data,status: err.response.status });
          return Promise.reject({data:err.response.data,status:err.response.status});
        });
  }
  return next(action);
};

export default fetchMiddleware;

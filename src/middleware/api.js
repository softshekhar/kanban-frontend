import axios from 'axios';

const API_BASE_URL = window.ENV.API_URL;//TODO
const BEARER = 'Bearer ';
const BEARER_TOKEN = localStorage.getItem("react-token");

export const CALL_API = 'CALL_API';

function makeCall({ endpoint, method = 'GET', body }) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = `${BEARER}${BEARER_TOKEN}`;

  const params = {
    method: method,
    url,
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      'Access-Control-Allow-Origin': '*',
    },
  };

  return axios(params).then(resp => resp).catch(err => err);
}

const apiMiddleware = store => next => action => {
  const callApi = action[CALL_API];
  if (typeof callApi === 'undefined') {
    return next(action);
  }

  const [requestStartedType, successType, failureType] = callApi.types;

  next({ type: requestStartedType });

  return makeCall({
    method: callApi.method,
    body: callApi.body,
    endpoint: callApi.endpoint,
  }).then(
    response =>
      next({
        type: successType,
        payload: response.data,
      }),
    error =>
      next({
        type: failureType,
        error: error.message,
      })
  );
};

export default apiMiddleware;

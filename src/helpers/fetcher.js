import {config} from '../config';
const apiUrl = config.apiUrl;

export function authHeader() {
  // return authorization header with jwt token
  // let user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (token) {
    return {Authorization: `Bearer ${token}`};
  }

  return {};
}

export function doFetch(url, requestOptions) {

  let fullUrl = encodeURI(`${apiUrl}/${url}`);

  return fetch(fullUrl, requestOptions)
    .then(handleResponse);
}

export function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.json());
    //  throw response.json();
  }

  return response.json();
}

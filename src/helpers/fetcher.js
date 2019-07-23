import {config} from '../config';

const apiUrl = `${config.apiUrl}/api/v1`;

export function authHeader() {
  // return authorization header with jwt token
  // let user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (token) {
    return {Authorization: `Bearer ${token}`};
  }

  return {};
}

export function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
        //  throw response.json();
    }

    return response.json();
}

export const doFetch = (url, options) => {
  options = options || {};

  const fullUrl = encodeURI(`${apiUrl}/${url}`);
  const requestOptions = {};
  let headers = {'Content-Type': 'application/json'};
  let {method, auth, body} = options;

  if (!method) {
    method = 'GET';
  }
  requestOptions.method = method;

  if (auth) {
    headers = {
        ...authHeader(),
        ...headers,
    };
  }
  requestOptions.headers = headers;

  if (body) {
    body = JSON.stringify(body);
    requestOptions.body = body;
  }

  return fetch(fullUrl, requestOptions)
    .then(handleResponse);
}

export const doSearch = (url, queryParams, searchPrefix, options) => {
  let params = [];
  let query = '';

  if (queryParams) {
    const {page, sort, filters, perPage} = queryParams;

    if (filters) {
      _.forEach(filters, (value, key) => {
        params.push(`${searchPrefix}[${key}]=${value}`)
      });
    }

    !!perPage && params.push(`per-page=${perPage}`);
    !!page && params.push(`page=${page}`);
    !!sort && params.push(`sort=${sort}`);

    if (params.length > 0) {
      query = params.join('&');
    }

    if (query) {
      query = `?${query}`;
    }
  }

  return doFetch(`${url}${query}`, options);
}

export const doUpload = (url, options) => {
  options = options || {};

  const fullUrl = encodeURI(`${apiUrl}/${url}`);
  const requestOptions = {};
  const method = 'POST';
  let headers = {};
  let {auth, body} = options;

  if (auth) {
    headers = {
      ...authHeader(),
    };
  }
  requestOptions.headers = headers;
  requestOptions.method = method;

  if (body) {
    requestOptions.body = body;
  }

  return fetch(fullUrl, requestOptions)
    .then(handleResponse);
}

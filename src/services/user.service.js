import {authHeader, doFetch, handleResponse} from '../helpers';
import {config} from '../config';

var jwt = require('jsonwebtoken');
var _ = require('lodash');

const apiUrl = config.apiUrl;

export const userService = {
  isLoggedin,
  getCurrentFromStorage,
  register,
  login,
  logout,
  getAll,
  get: getById,
  getCurrent,
  updateCurrent,
  updateCurrentPhoto,
  removeCurrentPhoto,
  update,
  changePassword,
  delete: _delete
};

function isLoggedin() {
  const token = localStorage.getItem('token');

  if (token) {
    var decodedJwt = jwt.decode(token);

    if (decodedJwt) {
      var expiration_time = decodedJwt.exp;

      if (expiration_time) {
        var current_time = Date.now() / 1000;

        if (expiration_time > current_time) {
          return true;
        }
      } else {
        return true;
      }
    }
  }

  return false;
}

function getCurrentFromStorage() {
  let user = localStorage.getItem('user');

  if (user) {
    user = JSON.parse(user);
    return user;
  }

  return null;
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrl}/users/signup`, requestOptions)
    .then(handleResponse)
    .catch(err => {
      console.log('err', err)
      throw err;
    });
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  };

  return fetch(`${apiUrl}/users/login`, requestOptions)
    .then(handleResponse)
    .then(response => {
      const {data} = response;

      // login successful if there's a jwt token in the response
      if (data && data.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', data.token);
      }

      return response;
    })
    .catch(err => {
      console.log('err:', err)
      throw err;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
}

function getAll(queryParams) {
  let params = [];
  let query = '';

  if (queryParams) {
    const {page, sortField, filters, perPage} = queryParams;

    if (filters) {
      _.forEach(filters, (value, key) => {
        params.push(`UserSearch[${key}]=${value}`)
      });
    }

    !!perPage && params.push(`per-page=${perPage}`);
    !!page && params.push(`page=${page}`);
    !!sortField && params.push(`sort=${sortField}`);

    if (params.length > 0) {
      query = params.join('&');
    }

    if (query) {
      query = `?${query}`;
    }
  }

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  let url = `users${query}`;
  return doFetch(url, requestOptions);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions)
    .then(handleResponse);
}

function getCurrent() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrl}/users/current`, requestOptions)
    .then(handleResponse);
}

function updateCurrent(user) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrl}/users/current`, requestOptions)
    .then(handleResponse);
}

function updateCurrentPhoto(formData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader()
    },
    body: formData
  };

  return fetch(`${apiUrl}/users/photo`, requestOptions)
    .then(handleResponse);
}

function removeCurrentPhoto() {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${apiUrl}/users/photo`, requestOptions)
    .then(handleResponse);
}

function update(id, user) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions)
    .then(handleResponse);
}

function changePassword(data) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return fetch(`${apiUrl}/users/password`, requestOptions)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch('/users/' + id, requestOptions).then(handleResponse);
}



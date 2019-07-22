import {doFetch, doSearch, doUpload} from '../helpers';

var jwt = require('jsonwebtoken');
var _ = require('lodash');

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
  return doFetch('users/signup', {
    method: 'POST',
    auth: false,
    body: user,
  });
}

function login(username, password) {
  return doFetch('users/login', {
    method: 'POST',
    auth: false,
    body: {username, password},
  })
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
    // console.log('err:', err)
    throw err;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

function getAll(queryParams) {
  return doSearch('users', queryParams, 'UserSearch', {
    auth: true,
  });
}

function getById(id) {
  return doFetch(`users/${id}`, {auth: true});
}

function getCurrent() {
  return doFetch('users/current', {auth: true});
}

function updateCurrent(user) {
  return doFetch('users/current', {
    method: 'PUT',
    auth: true,
    body: user,
  });
}

function updateCurrentPhoto(formData) {
  return doUpload('users/photo', {
    auth: true,
    body: formData,
  });
}

function removeCurrentPhoto() {
  return doFetch('users/photo', {
    method: 'PUT',
    auth: true,
  });
}

function update(id, user) {
  return doFetch(`users/${id}`, {
    method: 'PUT',
    auth: true,
    body: user,
  });
}

function changePassword(data) {
  return doFetch('users/password', {
    method: 'PUT',
    auth: true,
    body: data,
  });
}

// todo: not tested
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return doFetch(`users/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}

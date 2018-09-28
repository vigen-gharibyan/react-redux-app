import { authHeader } from '../helpers';
import {config} from '../config';
var jwt = require('jsonwebtoken');
const apiUrl = config.apiUrl;

export const userService = {
    register,
    login,
    logout,
    isLoggedin,
    getAll,
    get: getById,
    getCurrent,
    updateCurrent,
    update,
    delete: _delete
};

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
        body: JSON.stringify({ username, password })
    };

    return fetch(apiUrl + '/users/login', requestOptions)
        .then(handleResponse)
        .then(response => {
            const { data } = response;

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

function isLoggedin() {
    const token = localStorage.getItem('token');

    if (token) {
        var decodedJwt = jwt.decode(token);
        
		if(decodedJwt) {
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

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users`, requestOptions)
        .then(handleResponse);
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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
    //  throw response.json();
    }

    return response.json();
}

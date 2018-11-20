import {userConstants} from '../_constants';
import {userService} from '../services';
import {alertActions, validationActions} from './';
import {history} from '../helpers';

export const userActions = {
  register,
  login,
  logout,
  getAll,
  get: getById,
  update: updateById,
  getCurrent,
  updateCurrent,
  updatePhoto,
  changePassword,
  delete: _delete
};

function register(user) {
  return dispatch => {
    dispatch(request(user));
    dispatch(alertActions.clear());

    userService.register(user)
      .then(response => {
        if (response.success) {
          dispatch(success());
          history.push('/login');
          const successMessage = "You have succesfully registered. Before login check your email to activate your account.";
          dispatch(alertActions.success(successMessage));
        }
      }, error => {
        dispatch(failure(error));
        error.then(response => {
          const {data} = response;
          if (data) {
            dispatch(failure(error));
            dispatch(validationActions.apiError(data));
          }
        });
      })
      .catch(err => {
        let error = 'Server error';
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });
  };

  function request(user) {
    return {
      type: userConstants.REGISTER_REQUEST,
      user
    };
  }

  function success(user) {
    return {
      type: userConstants.REGISTER_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: userConstants.REGISTER_FAILURE,
      error
    };
  }
}

function login(username, password) {
  return dispatch => {
    dispatch(request({username}));
    dispatch(alertActions.clear());

    userService.login(username, password)
      .then(response => {
        if (response.success) {
          dispatch(success(username));
          history.push('/');
        }
      }, error => {
        error.then(response => {
          const {data} = response;
          if (data) {
            dispatch(failure(error));
            dispatch(validationActions.apiError(data));
          }
        }, rejected => {
          console.log('rejected:', rejected)
        });
      })
      .catch(err => {
        let error = "Server error";
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });
  };

  function request(user) {
    return {
      type: userConstants.LOGIN_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error
    }
  }
}

function logout() {
  userService.logout();
  return {
    type: userConstants.LOGOUT
  };
}

function getCurrent() {
  return dispatch => {
    dispatch(request());

    userService.getCurrent()
      .then(
        response => {
          const {data} = response;

          if (response.success) {
            dispatch(success(data));
          }
        },
        error => dispatch(failure(error))
      );
  };

  function request() {
    return {
      type: userConstants.GETCURRENT_REQUEST
    };
  }

  function success(user) {
    return {
      type: userConstants.GETCURRENT_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: userConstants.GETCURRENT_FAILURE,
      error
    };
  }
}

function updateCurrent(user) {
  return dispatch => {
    dispatch(request());

    userService.updateCurrent(user)
      .then(response => {
          const {data} = response;

          if (response.success) {
            dispatch(success(data));
            dispatch(alertActions.success('Updated successfully'));
          }
        }, error => {
          dispatch(failure(error));
          error.then(response => {
            const {data} = response;
            if (data) {
              dispatch(failure(error));
              dispatch(validationActions.apiError(data));
            }
          });
        })
        .catch(err => {
          let error = 'Server error';
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        });
  };

  function request() {
    return {
      type: userConstants.UPDATECURRENT_REQUEST
    };
  }

  function success(user) {
    return {
      type: userConstants.UPDATECURRENT_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: userConstants.UPDATECURRENT_FAILURE,
      error
    };
  }
}

function updatePhoto(formData) {
  return dispatch => {
    dispatch(request());

    userService.updatePhoto(formData)
      .then(response => {
          const {data} = response;

          if (response.success) {
            dispatch(success(data));
            dispatch(alertActions.success('Updated successfully'));
          }
        }, error => {
          dispatch(failure(error));
          error.then(response => {
            const {data} = response;
            if (data) {
              dispatch(failure(error));
              dispatch(validationActions.apiError(data));
            }
          });
        })
        .catch(err => {
          let error = 'Server error';
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        });
  };

  function request() {
    return {
      type: userConstants.UPDATEPHOTO_REQUEST
    };
  }

  function success(user) {
    return {
      type: userConstants.UPDATEPHOTO_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: userConstants.UPDATEPHOTO_FAILURE,
      error
    };
  }
}

function changePassword(data) {
  return dispatch => {
    dispatch(request());
    dispatch(alertActions.clear());

    userService.changePassword(data)
      .then(response => {
          const {data} = response;

          if (response.success) {
            dispatch(success(data));
            dispatch(alertActions.success('Password changed successfully'));
          }
        }, error => {
          dispatch(failure(error));
          error.then(response => {
            const {data} = response;
            if (data) {
              dispatch(failure(error));
              dispatch(validationActions.apiError(data));
            }
          });
        })
        .catch(err => {
          let error = 'Server error';
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        });
  };

  function request() {
    return {
      type: userConstants.CHANGEPASSWORD_REQUEST
    };
  }

  function success(user) {
    return {
      type: userConstants.CHANGEPASSWORD_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: userConstants.CHANGEPASSWORD_FAILURE,
      error
    };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
      .then(
        response => {
          const {data} = response;

          if (response.success) {
            dispatch(success(data));
          }
        },
        error => dispatch(failure(error))
      );
  };

  function request() {
    return {
      type: userConstants.GETALL_REQUEST
    };
  }

  function success(users) {
    return {
      type: userConstants.GETALL_SUCCESS,
      users
    };
  }

  function failure(error) {
    return {
      type: userConstants.GETALL_FAILURE,
      error
    };
  }
}

function getById(id) {
  return dispatch => {
    dispatch(request());

    userService.get(id)
      .then(
        response => {
          const {data} = response;

          if (response.success) {
            dispatch(success(data));
          }
        },
        error => dispatch(failure(error))
      );
  };

  function request() {
    return {
      type: userConstants.GETBYID_REQUEST
    };
  }

  function success(user) {
    return {
      type: userConstants.GETBYID_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: userConstants.GETBYID_FAILURE,
      error
    };
  }
}

function updateById(id, user) {
  return dispatch => {
    dispatch(request());

    userService.update(id, user)
      .then(response => {
        const {data} = response;

        if (response.success) {
          dispatch(success(data));
          dispatch(alertActions.success('Updated successfully'));
        }
      }, error => {
        dispatch(failure(error));
        error.then(response => {
          const {data} = response;
          if (data) {
            dispatch(failure(error));
            dispatch(validationActions.apiError(data));
          }
        });
      })
      .catch(err => {
        let error = 'Server error';
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });
  };

  function request() {
    return {
      type: userConstants.UPDATEBYID_REQUEST
    };
  }

  function success(user) {
    return {
      type: userConstants.UPDATEBYID_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: userConstants.UPDATEBYID_FAILURE,
      error
    };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        user => {
          dispatch(success(id));
        },
        error => {
          dispatch(failure(id, error));
        }
      );
  };

  function request(id) {
    return {
      type: userConstants.DELETE_REQUEST,
      id
    }
  }

  function success(id) {
    return {
      type: userConstants.DELETE_SUCCESS,
      id
    }
  }

  function failure(id, error) {
    return {
      type: userConstants.DELETE_FAILURE,
      id,
      error
    }
  }
}
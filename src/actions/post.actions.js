import {postConstants} from '../_constants';
import {postService} from '../services';
import {alertActions, validationActions} from './';

export const postActions = {
  getAll,
  get: getById,
  update: updateById,
  delete: _delete
};

function getAll(params) {
  return dispatch => {
    dispatch(request());

    postService.getAll(params)
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
      type: postConstants.GETALL_REQUEST
    };
  }

  function success(posts) {
    return {
      type: postConstants.GETALL_SUCCESS,
      posts,
    };
  }

  function failure(error) {
    return {
      type: postConstants.GETALL_FAILURE,
      error
    };
  }
}

function getById(id) {
  return dispatch => {
    dispatch(request());

    postService.get(id)
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
      type: postConstants.GET_REQUEST
    };
  }

  function success(post) {
    return {
      type: postConstants.GET_SUCCESS,
      post
    };
  }

  function failure(error) {
    return {
      type: postConstants.GET_FAILURE,
      error
    };
  }
}

function updateById(id, user) {
  return dispatch => {
    dispatch(request());

    postService.update(id, user)
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
      type: postConstants.UPDATE_REQUEST
    };
  }

  function success(post) {
    return {
      type: postConstants.UPDATE_SUCCESS,
      post
    };
  }

  function failure(error) {
    return {
      type: postConstants.UPDATE_FAILURE,
      error
    };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    postService.delete(id)
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
      type: postConstants.DELETE_REQUEST,
      id
    }
  }

  function success(id) {
    return {
      type: postConstants.DELETE_SUCCESS,
      id
    }
  }

  function failure(id, error) {
    return {
      type: postConstants.DELETE_FAILURE,
      id,
      error
    }
  }
}
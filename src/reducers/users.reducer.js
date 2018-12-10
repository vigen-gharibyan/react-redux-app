import {userConstants} from '../_constants';
import {userService} from '../services';
var _ = require('lodash');

let currentUser = userService.getCurrentFromStorage();
let initialState = {currentUser};

function getState(state) {
  let newState = _.pick(state, ['currentUser']);

  return newState;
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.GETCURRENT_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        loading: true
      };
    }
    case userConstants.GETCURRENT_SUCCESS: {
      const newState = getState(state);
      const {user} = action;
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...newState,
        currentUser: user
      };
    }
    case userConstants.GETCURRENT_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case userConstants.UPDATECURRENT_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        updateCurrentLoading: true
      };
    }
    case userConstants.UPDATECURRENT_SUCCESS: {
      const newState = getState(state);
      const {user} = action;

      return {
        ...newState,
        currentUser: user,
        updatedCurrent: true
      };
    }
    case userConstants.UPDATECURRENT_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case userConstants.UPDATECURRENTPHOTO_REQUEST:
    case userConstants.REMOVECURRENTPHOTO_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        updateCurrentPhotoLoading: true
      };
    }
    case userConstants.UPDATECURRENTPHOTO_SUCCESS:
    case userConstants.REMOVECURRENTPHOTO_SUCCESS: {
      const newState = getState(state);
      const {user} = action;

      return {
        ...newState,
        currentUser: user,
        updatedCurrentPhoto: true
      };
    }
    case userConstants.UPDATECURRENTPHOTO_FAILURE:
    case userConstants.REMOVECURRENTPHOTO_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case userConstants.CHANGEPASSWORD_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        changePasswordLoading: true
      };
    }
    case userConstants.CHANGEPASSWORD_SUCCESS: {
      const newState = getState(state);

      return {
        ...newState,
        passwordChanged: true
      };
    }
    case userConstants.CHANGEPASSWORD_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case userConstants.GETALL_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        getAllLoading: true
      };
    }
    case userConstants.GETALL_SUCCESS: {
      const newState = getState(state);
    //const data = action.users;
      const {items, total} = action.users;

      return {
        ...newState,
        items,
        total
      };
    }
    case userConstants.GETALL_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case userConstants.GETBYID_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        loading: true
      };
    }
    case userConstants.GETBYID_SUCCESS: {
      const newState = getState(state);
      const {user} = action;

      return {
        ...newState,
        user
      };
    }
    case userConstants.GETBYID_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case userConstants.UPDATEBYID_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        updateByIdloading: true
      };
    }
    case userConstants.UPDATEBYID_SUCCESS: {
      const newState = getState(state);

      return {
        ...newState,
        updated: true
      };
    }
    case userConstants.UPDATEBYID_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case userConstants.DELETE_REQUEST: {
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? {...user, deleting: true}
            : user
        )
      };
    }
    case userConstants.DELETE_SUCCESS: {
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    }
    case userConstants.DELETE_FAILURE: {
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const {deleting, ...userCopy} = user;
            // return copy of user with 'deleteError:[error]' property
            return {...userCopy, deleteError: action.error};
          }

          return user;
        })
      };
    }
    default: {
      const newState = getState(state);

      return newState;
    }
  }
}

export default users;
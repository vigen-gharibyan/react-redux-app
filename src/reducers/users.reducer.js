import {userConstants} from '../_constants';
import {userService} from '../services';
var _ = require('lodash');

let loggedinUser = userService.getCurrentFromStorage();
let initialState = {loggedinUser};

function getState(state) {
  let newState = _.pick(state, ['loggedinUser']);

  return {...newState};
}

const users = (state = initialState, action) => {
  const newState = getState(state);

  switch (action.type) {
    case userConstants.GETCURRENT_REQUEST: {
      return {
        ...newState,
        loading: true,
      };
    }
    case userConstants.GETCURRENT_SUCCESS: {
      const {user} = action;
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...newState,
        currentUser: user,
        loggedinUser: user,
      };
    }
    case userConstants.GETCURRENT_FAILURE: {
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case userConstants.UPDATECURRENT_REQUEST: {
      return {
        ...newState,
        updateCurrentLoading: true,
      };
    }
    case userConstants.UPDATECURRENT_SUCCESS: {
      const {user} = action;

      return {
        ...newState,
        currentUser: user,
        loggedinUser: user,
        updatedCurrent: true,
      };
    }
    case userConstants.UPDATECURRENT_FAILURE: {
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case userConstants.UPDATECURRENTPHOTO_REQUEST:
    case userConstants.REMOVECURRENTPHOTO_REQUEST: {
      return {
        ...newState,
        updateCurrentPhotoLoading: true,
      };
    }
    case userConstants.UPDATECURRENTPHOTO_SUCCESS:
    case userConstants.REMOVECURRENTPHOTO_SUCCESS: {
      const {user} = action;

      return {
        ...newState,
        currentUser: user,
        loggedinUser: user,
        updatedCurrentPhoto: true,
      };
    }
    case userConstants.UPDATECURRENTPHOTO_FAILURE:
    case userConstants.REMOVECURRENTPHOTO_FAILURE: {
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case userConstants.CHANGEPASSWORD_REQUEST: {
      return {
        ...newState,
        changePasswordLoading: true,
      };
    }
    case userConstants.CHANGEPASSWORD_SUCCESS: {
      return {
        ...newState,
        passwordChanged: true,
      };
    }
    case userConstants.CHANGEPASSWORD_FAILURE: {
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case userConstants.GETALL_REQUEST: {
      return {
        ...newState,
        getAllLoading: true,
      };
    }
    case userConstants.GETALL_SUCCESS: {
      //const data = action.users;
      const {items, total} = action.users;

      return {
        ...newState,
        items,
        total,
      };
    }
    case userConstants.GETALL_FAILURE: {
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case userConstants.GETBYID_REQUEST: {
      return {
        ...newState,
        loading: true,
      };
    }
    case userConstants.GETBYID_SUCCESS: {
      const {user} = action;

      return {
        ...newState,
        user,
      };
    }
    case userConstants.GETBYID_FAILURE: {
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case userConstants.UPDATEBYID_REQUEST: {
      return {
        ...newState,
        updateByIdLoading: true,
      };
    }
    case userConstants.UPDATEBYID_SUCCESS: {
      return {
        ...newState,
        updated: true,
      };
    }
    case userConstants.UPDATEBYID_FAILURE: {
      const {error} = action;

      return {
        ...newState,
        error,
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
      return {...newState};
    }
  }
}

export default users;
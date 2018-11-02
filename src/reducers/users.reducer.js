import {userConstants} from '../_constants';

let initialState = {user: null};

const users = (state = {}, action) => {
  switch (action.type) {
    case userConstants.GETCURRENT_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case userConstants.GETCURRENT_SUCCESS: {
      const {user} = action;
      return {
        ...state,
        loading: false,
        user
      };
    }
    case userConstants.GETCURRENT_FAILURE: {
      const {error} = action;
      return {
        ...state,
        loading: false,
        error
      };
    }

    case userConstants.UPDATECURRENT_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case userConstants.UPDATECURRENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        updatedCurrent: true
      };
    }
    case userConstants.UPDATECURRENT_FAILURE: {
      const {error} = action;
      return {
        ...state,
        loading: false,
        error
      };
    }

    case userConstants.CHANGEPASSWORD_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case userConstants.CHANGEPASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        passwordChanged: true
      };
    }
    case userConstants.CHANGEPASSWORD_FAILURE: {
      const {error} = action;
      return {
        ...state,
        loading: false,
        error
      };
    }

    case userConstants.GETALL_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case userConstants.GETALL_SUCCESS: {
      const items = action.users;
      return {
        ...state,
        loading: false,
        items
      };
    }
    case userConstants.GETALL_FAILURE: {
      const {error} = action;
      return {
        ...state,
        loading: false,
        error
      };
    }

    case userConstants.GETBYID_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case userConstants.GETBYID_SUCCESS: {
      const {user} = action;
      return {
        ...state,
        loading: false,
        user
      };
    }
    case userConstants.GETBYID_FAILURE: {
      const {error} = action;
      return {
        ...state,
        loading: false,
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
      return {
        ...state,
        updatedCurrent: false,
        passwordChanged: false
      };
    }
  }
}

export default users;
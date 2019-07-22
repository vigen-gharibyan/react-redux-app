import {postConstants} from '../_constants';
var _ = require('lodash');

let initialState = {};

function getState(state) {
  let newState = _.pick(state, ['currentUser']);

  return newState;
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case postConstants.GETALL_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        getAllLoading: true
      };
    }
    case postConstants.GETALL_SUCCESS: {
      const newState = getState(state);
      //const data = action.users;
      const {items, total} = action.posts;

      return {
        ...newState,
        items,
        total
      };
    }
    case postConstants.GETALL_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case postConstants.GETBYID_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        loading: true
      };
    }
    case postConstants.GET_SUCCESS: {
      const newState = getState(state);
      const {user} = action;

      return {
        ...newState,
        user
      };
    }
    case postConstants.GET_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case postConstants.UPDATE_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        updateByIdloading: true
      };
    }
    case postConstants.UPDATE_SUCCESS: {
      const newState = getState(state);

      return {
        ...newState,
        updated: true
      };
    }
    case postConstants.UPDATE_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error
      };
    }

    case postConstants.DELETE_REQUEST: {
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
    case postConstants.DELETE_SUCCESS: {
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    }
    case postConstants.DELETE_FAILURE: {
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

export default posts;
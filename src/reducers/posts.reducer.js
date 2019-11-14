import {postConstants} from '../_constants';
var _ = require('lodash');

let initialState = {};

function getState(state) {
  let newState = _.pick(state, []);

  return newState;
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case postConstants.GETALL_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        getAllLoading: true,
      };
    }
    case postConstants.GETALL_SUCCESS: {
      const newState = getState(state);
      const {items, total} = action.posts;

      return {
        ...newState,
        items,
        total,
      };
    }
    case postConstants.GETALL_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case postConstants.GET_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        loading: true
      };
    }
    case postConstants.GET_SUCCESS: {
      const newState = getState(state);
      const {post} = action;

      return {
        ...newState,
        post,
      };
    }
    case postConstants.GET_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case postConstants.CREATE_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        createLoading: true,
      };
    }
    case postConstants.CREATE_SUCCESS: {
      const newState = getState(state);

      return {
        ...newState,
        created: true,
      };
    }
    case postConstants.CREATE_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case postConstants.UPDATE_REQUEST: {
      const newState = getState(state);

      return {
        ...newState,
        updateLoading: true
      };
    }
    case postConstants.UPDATE_SUCCESS: {
      const newState = getState(state);

      return {
        ...newState,
        updated: true,
      };
    }
    case postConstants.UPDATE_FAILURE: {
      const newState = getState(state);
      const {error} = action;

      return {
        ...newState,
        error,
      };
    }

    case postConstants.DELETE_REQUEST: {
      // add 'deleting:true' property to post being deleted
      return {
        ...state,
        items: state.items.map(post =>
          post.id === action.id
            ? {...post, deleting: true}
            : post
        )
      };
    }
    case postConstants.DELETE_SUCCESS: {
      // remove deleted post from state
      return {
        items: state.items.filter(post => post.id !== action.id)
      };
    }
    case postConstants.DELETE_FAILURE: {
      // remove 'deleting:true' property and add 'deleteError:[error]' property to post
      return {
        ...state,
        items: state.items.map(post => {
          if (post.id === action.id) {
            // make copy of post without 'deleting:true' property
            const {deleting, ...postCopy} = post;
            // return copy of post with 'deleteError:[error]' property
            return {...postCopy, deleteError: action.error};
          }

          return post;
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
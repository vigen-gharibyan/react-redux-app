import { alertConstants } from '../_constants';

const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        color: action.color || 'success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        color: action.color || 'danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}

export default alert;

import { validationConstants } from '../_constants';

export function validation(state = {}, action) {
  switch (action.type) {
    case validationConstants.APIERROR:
      {
      	let validationErrors = {};
      	const {messages} = action;
      	messages.map(item => {
          validationErrors[item.field] = item.message;
        });

      	return validationErrors;
      }
    case validationConstants.CLEAR:
      {
        const {name} = action;
        if(name) {
          let stateCopy = {
              ...state
          };
          delete stateCopy[name];
          return stateCopy;
        }

        return {};
      }
    default:
      return state
  }
}
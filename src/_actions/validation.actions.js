import { validationConstants } from '../_constants';

export const validationActions = {
    apiError,
    clear
};

function apiError(messages) {
	return {
		type: validationConstants.APIERROR,
		messages
	};
}

function clear(name) {
    return {
    	type: validationConstants.CLEAR,
    	name: name
    };
}

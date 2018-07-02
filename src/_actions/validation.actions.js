import { validationConstants } from '../_constants';

export const validationActions = {
    apiError,
    clear
};

function apiError(messages) {

	console.log('messages:', messages)

	return {
		type: validationConstants.APIERROR,
		messages
	};
}

function clear() {
    return {
    	type: validationConstants.CLEAR
    };
}

import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return {
        type: alertConstants.SUCCESS,
        color: 'success',
        message
    };
}

function error(message) {
    return {
        type: alertConstants.ERROR,
        color: 'danger',
        message
    };
}

function clear() {
    return {
        type: alertConstants.CLEAR
    };
}

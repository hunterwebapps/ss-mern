import {
    IS_LOADING, CREATE_ERROR, INITIALIZE,
    REQUEST_START, REQUEST_SUCCESS, REQUEST_FAILED
} from './Types.actions';

export const Initialize =
    view => ({
        type: INITIALIZE,
        payload: view
    });

export const ShowError =
    error => ({
        type: CREATE_ERROR,
        payload: error
    });

export const IsLoading =
    is => ({
        type: IS_LOADING,
        payload: is
    });

export const RequestStarting =
    (apiMethod, data) => ({
        type: REQUEST_START,
        payload: {
            apiMethod,
            data
        }
    });

export const RequestSuccessful =
    data => ({
        type: REQUEST_SUCCESS,
        payload: data
    });

export const RequestFailure =
    (message, data) => ({
        type: REQUEST_FAILED,
        payload: {
            message,
            data
        }
    });
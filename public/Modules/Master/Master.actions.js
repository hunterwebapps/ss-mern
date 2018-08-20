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
    (apiMethod, apiData, actionType) => ({
        type: REQUEST_START,
        payload: {
            apiMethod,
            apiData,
            actionType
        }
    });

export const RequestSuccessful =
    (data, actionType) => ({
        type: REQUEST_SUCCESS,
        payload: {
            data,
            actionType
        }
    });

export const RequestFailure =
    data => ({
        type: REQUEST_FAILED,
        payload: data
    });
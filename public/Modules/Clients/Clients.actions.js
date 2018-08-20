import * as TYPES from './Types.actions';

export const CreateClient =
    normalizedClientData => ({
        type: TYPES.CREATE_CLIENT,
        payload: normalizedClientData
    });

export const GetClients =
    () => ({
        type: TYPES.GET_CLIENTS
    });
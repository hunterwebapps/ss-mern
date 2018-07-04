import { CREATE_CLIENT } from './Types.actions';

export const CreateClient =
    normalizedClientData => ({
        type: CREATE_CLIENT,
        payload: normalizedClientData
    });
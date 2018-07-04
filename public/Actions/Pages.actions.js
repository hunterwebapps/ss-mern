import { CREATE_PAGE } from './Types.actions';

export const CreatePage =
    normalizedPageData => ({
        type: CREATE_PAGE,
        payload: normalizedPageData
    });
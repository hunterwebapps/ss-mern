import * as TYPES from './Types.actions';

export const CreatePage =
    normalizedPageData => ({
        type: TYPES.CREATE_PAGE,
        payload: normalizedPageData
    });

export const GetPages =
    () => ({
        type: TYPES.GET_PAGES
    });
import * as TYPES from './Types.actions';

export const CreatePage =
    pageData => ({
        type: TYPES.CREATE_PAGE,
        payload: pageData
    });

export const GetPages =
    () => ({
        type: TYPES.GET_PAGES
    });
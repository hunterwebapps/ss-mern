import { CREATE_SPRINT, GET_SPRINTS, CREATE_ADDON } from './Types.actions';

export const CreateSprint =
    () => ({
        type: CREATE_SPRINT,
        payload: {}
    });

export const GetSprints =
    () => ({
        type: GET_SPRINTS,
        payload: {}
    });

export const CreateAddon =
    normalizedAddonData => ({
        type: CREATE_ADDON,
        payload: normalizedAddonData
    });
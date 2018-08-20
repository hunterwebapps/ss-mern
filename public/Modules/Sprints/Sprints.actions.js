import * as TYPES from './Types.actions';

// Sprints
export const CreateSprint =
    () => ({
        type: TYPES.CREATE_SPRINT,
        payload: {}
    });

export const GetSprints =
    () => ({
        type: TYPES.GET_SPRINTS,
        payload: {}
    });

// Addons
export const GetAddons =
    () => ({
        type: TYPES.GET_ADDONS
    });

export const CreateAddon =
    addonData => ({
        type: TYPES.CREATE_ADDON,
        payload: addonData
    });

// Service Levels
export const GetServiceLevels =
    () => ({
        type: TYPES.GET_SERVICE_LEVELS
    });

export const CreateServiceLevel =
    serviceLevelData => ({
        type: TYPES.CREATE_SERVICE_LEVEL,
        payload: serviceLevelData
    });

export const ImportCSV =
    formData => ({
        type: TYPES.IMPORT_CSV,
        payload: formData
    });
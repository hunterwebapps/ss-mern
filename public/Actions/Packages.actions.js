import * as TYPES from './Types.actions';

export const GetPackageTypes =
    () => ({
        type: TYPES.GET_PACKAGE_TYPES,
        payload: {}
    });

export const CreatePackageType =
    normalizedPackageTypeData => ({
        type: TYPES.CREATE_PACKAGE_TYPE,
        payload: normalizedPackageTypeData
    });
import { GET_PACKAGE_TYPES, CREATE_PACKAGE_TYPE } from './Types.actions';

export const GetPackageTypes =
    () => ({
        type: GET_PACKAGE_TYPES,
        payload: {}
    });

export const CreatePackageType =
    (normalizedPackageTypeData) => ({
        type: CREATE_PACKAGE_TYPE,
        payload: normalizedPackageTypeData
    })
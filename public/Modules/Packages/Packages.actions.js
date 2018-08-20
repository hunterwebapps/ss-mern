import * as TYPES from './Types.actions';

export const GetPackageTypes =
    () => ({
        type: TYPES.GET_PACKAGE_TYPES
    });

export const CreatePackageType =
    packageTypeData => ({
        type: TYPES.CREATE_PACKAGE_TYPE,
        payload: packageTypeData
    });

export const GetTrackingLogTypes =
    () => ({
        type: TYPES.GET_TRACKING_LOG_TYPES
    });

export const CreateTrackingLogType =
    trackingLogTypeData => ({
        type: TYPES.CREATE_TRACKING_LOG_TYPE,
        payload: trackingLogTypeData
    });
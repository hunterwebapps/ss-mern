import { CHECK_OPERATING_LOCATION, GET_ALL_OPERATING_LOCATIONS, CREATE_OPERATING_LOCATION, GET_OPERATING_LOCATION } from './Types.actions';

export const CheckOperatingLocation =
    (fromZip, toZip) => ({
        type: CHECK_OPERATING_LOCATION,
        payload: {}
    });

export const GetOperatingLocation =
    () => ({
        type: GET_OPERATING_LOCATION,
        payload: {}
    });

export const GetAllOperatingLocations =
    () => ({
        type: GET_ALL_OPERATING_LOCATIONS
    });

export const CreateOperatingLocation =
    normalizedLocationData => ({
            type: CREATE_OPERATING_LOCATION,
            payload: normalizedLocationData
        });
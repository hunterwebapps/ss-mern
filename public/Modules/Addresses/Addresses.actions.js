import * as TYPES from './Types.actions';

export const GetCountries =
    () => ({
        type: TYPES.GET_COUNTRIES
    });

export const GetTimezones =
    () => ({
        type: TYPES.GET_TIMEZONES
    });

export const GetAddresses =
    () => ({
        type: TYPES.GET_ADDRESSES
    });

export const CreateUserAddress =
    userAddressInfo => ({
        type: TYPES.CREATE_USER_ADDRESS,
        payload: userAddressInfo
    });
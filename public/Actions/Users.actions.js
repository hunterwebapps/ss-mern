import * as TYPES from './Types.actions';

//import { normalize } from 'normalizr';
//import { User, allUsers } from '../Schema';

export const Authenticate =
    ({ Username, Password, RememberMe }) => ({
        type: TYPES.AUTHENTICATE,
        payload: {
            Username,
            Password,
            RememberMe
        }
    });

export const Register =
    ({ Username, EmailAddress, Password, ConfirmPassword }) => ({
        type: TYPES.REGISTER_USER,
        payload: {
            Username,
            EmailAddress,
            Password,
            ConfirmPassword
        }
    });

export const Logout =
    () => ({
        type: TYPES.LOGOUT_USER
    });

export const CreateUser =
    ({ User, Driver, Customer, Password }) => ({
        type: TYPES.CREATE_USER,
        payload: {
            user: User,
            driver: Driver,
            customer: Customer,
            password: Password
        }
    });

export const CreateUserType =
    normalizedUserTypeForm => ({
        type: TYPES.CREATE_USER_TYPE,
        payload: normalizedUserTypeForm
    });

export const GetUsers =
    () => ({
        type: TYPES.GET_USERS
    });

export const GetContacts =
    () => ({
        type: TYPES.GET_CONTACT_INFO
    });
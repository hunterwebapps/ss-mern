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
    userData => ({
        type: TYPES.CREATE_USER,
        payload: userData
    });

export const UpdateUser =
    userData => ({
        type: TYPES.UPDATE_USER,
        payload: userData
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

export const GetAccounts =
    () => ({
        type: TYPES.GET_ACCOUNTS
    });

export const CreateAccount =
    accountInfo => ({
        type: TYPES.CREATE_USER_ACCOUNT,
        payload: accountInfo
    });
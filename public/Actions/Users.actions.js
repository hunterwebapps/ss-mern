import { AUTHENTICATE, CREATE_USER, REGISTER_USER, CREATE_USER_TYPE, LOGOUT_USER } from './Types.actions';

//import { normalize } from 'normalizr';
//import { User, allUsers } from '../Schema';

export const Authenticate =
    ({ Username, Password, RememberMe }) => ({
        type: AUTHENTICATE,
        payload: {
            Username,
            Password,
            RememberMe
        }
    });

export const Register =
    ({ Username, EmailAddress, Password, ConfirmPassword }) => ({
        type: REGISTER_USER,
        payload: {
            Username,
            EmailAddress,
            Password,
            ConfirmPassword
        }
    });

export const Logout =
    () => ({
        type: LOGOUT_USER
    });

export const CreateUser =
    ({ User, Driver, Customer, Password }) => ({
        type: CREATE_USER,
        payload: {
            user: User,
            driver: Driver,
            customer: Customer,
            password: Password
        }
    });

export const CreateUserType =
    normalizedUserTypeForm => ({
        type: CREATE_USER_TYPE,
        payload: normalizedUserTypeForm
    });
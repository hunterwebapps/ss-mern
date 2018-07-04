import API from '../API';
import { push } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import * as MasterActions from '../Actions/Master.actions';
import * as AddressesActions from '../Actions/Addresses.actions';
import * as UsersActions from '../Actions/Users.actions';
import * as PackagesActions from '../Actions/Packages.actions';
import * as PagesActions from '../Actions/Pages.actions';
import * as OperatingLocationsActions from '../Actions/OperatingLocation.actions';
import * as ClientsActions from '../Actions/Clients.actions';
import * as TYPES from '../Actions/Types.actions';

export function* InitializeStateSaga(action) {
    yield put(MasterActions.IsLoading(true));

    // Get anonymous user state
    yield put(AddressesActions.GetCountries());
    yield put(AddressesActions.GetTimezones());

    // Get Bearer Token, Authenticate, and return User object
    const res = yield call(API.User.Initialize);
    if (res === undefined) {
        // If token doesn't exist and request is from Manager view, redirect to login
        if (action.payload === 'Manager') {
            yield put(push('/User/Login'));
            return;
        }
    } else if (res.status === TYPES.HTTP_OK) {
        // Get basic user state
        yield put({ type: TYPES.SET_USER, payload: res.data });

        yield InitializeUser();

        // If admin/superuser get admin authorized state
        if (res.data.Administrator || res.data.Superuser) {
            yield InitializeAdministrator();
        }

        // If superuser get superuser authorized state
        if (res.data.Superuser) {
            yield InitializeSuperuser();
        }
    } else {
        yield put(MasterActions.ShowError(user));
    }

    yield put(MasterActions.IsLoading(false));
}

function* InitializeUser() {
    yield put(PackagesActions.GetPackageTypes());
}

function* InitializeAdministrator() {
    yield put(AddressesActions.GetAddresses());
    yield put(UsersActions.GetUsers());
    yield put(UsersActions.GetContacts());
    yield put(OperatingLocationsActions.GetAllOperatingLocations());
}

function* InitializeSuperuser() {
    yield put(PagesActions.GetPages());
    yield put(ClientsActions.GetClients());
}

export function* CreateErrorSaga(action) {
    const { payload } = action;
    yield console.log("Create Error Saga", action);
    let error = {
        Description: '',
        Details: []
    };

    if (payload) {
        error.Description = payload.message || "There Was an Error";
        if (payload.modelState) error.Details.concat(payload.modelState);
        if (payload.exception) error.Details.push(payload.exception);
    } else { error = payload }

    yield put({ type: TYPES.SET_ERROR, payload: error });
}
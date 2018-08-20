import API from '../../API';
import { push } from 'react-router-redux';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { IsLoading, ShowError } from './Master.actions';
import { GetAddresses, GetCountries, GetTimezones } from '../Addresses/Addresses.actions';
import { GetUsers, GetAccounts } from '../Users/Users.actions';
import { GetPackageTypes, GetTrackingLogTypes } from '../Packages/Packages.actions';
import { GetPages } from '../Pages/Pages.actions';
import { GetAllOperatingLocations } from '../OperatingLocations/OperatingLocations.actions';
import { GetClients } from '../Clients/Clients.actions';
import { GetAddons, GetServiceLevels } from '../Sprints/Sprints.actions';
import * as TYPES from './Types.actions';
import { SET_USER } from '../Users/Types.actions';
import { OK, UNAUTHORIZED } from '../../constants';

export const watchMasterSaga = [
    takeLatest(TYPES.INITIALIZE, InitializeStateSaga),
    takeLatest(TYPES.CREATE_ERROR, CreateErrorSaga)
];

export function* InitializeStateSaga(action) {
    yield put(IsLoading(true));
    
    //yield put(GetCountries());
    //yield put(GetTimezones());

    // Get Bearer Token, Authenticate, and return User object
    const res = yield call(API.User.Initialize);
    if (res.status === UNAUTHORIZED) {
        // If token doesn't exist and request is from Manager view, redirect to login
        if (action.payload === 'Manager') {
            yield put(push('/User/Login'));
            return;
        }
    } else if (res && res.status === OK) {
        // Get basic user state
        yield put({ type: SET_USER, payload: res.data });

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
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

function* InitializeUser() {
    yield put(GetPackageTypes());
    yield put(GetServiceLevels());
    yield put(GetAccounts());
}

function* InitializeAdministrator() {
    yield put(GetAddresses());
    yield put(GetUsers());
    yield put(GetAllOperatingLocations());
    yield put(GetAddons());
    yield put(GetTrackingLogTypes());
}

function* InitializeSuperuser() {
    yield put(GetPages());
    yield put(GetClients());
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
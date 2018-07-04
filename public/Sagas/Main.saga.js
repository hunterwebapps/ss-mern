import { takeLatest, takeEvery } from 'redux-saga/effects';
import {
    INITIALIZE, AUTHENTICATE, REGISTER_USER, CREATE_USER, CREATE_USER_TYPE, LOGOUT_USER,
    GET_ALL_OPERATING_LOCATIONS, CREATE_OPERATING_LOCATION,
    CREATE_PACKAGE_TYPE,
    GET_COUNTRIES,
    CREATE_CLIENT,
    CREATE_PAGE,
    CREATE_ADDON,
    CREATE_ERROR,
    REQUEST_SUCCESS,
    REQUEST_START,
    REQUEST_FAILED
} from '../Actions/Types.actions';

import { Initialize, RequestStart, RequestSuccess, RequestFailed, CreateError } from './Master.saga';
import { GetAllOperatingLocations, CreateOperatingLocation } from './OperatingLocations.saga';
import { CreatePackageType } from './Packages.saga';
import { GetCountries } from './Addresses.saga';
import { CreateClient } from './Clients.saga';
import { CreateUser, LoginSaga, LogoutSaga, RegisterSaga, CreateUserType } from './Users.saga';
import { CreatePageSaga } from './Pages.saga';
import { CreateAddonSaga } from './Sprints.saga';

export default function* mySaga() {
    // Master
    yield takeLatest(INITIALIZE, Initialize);
    yield takeLatest(CREATE_ERROR, CreateError);
    yield takeEvery(REQUEST_START, RequestStart);
    yield takeEvery(REQUEST_SUCCESS, RequestSuccess);
    yield takeEvery(REQUEST_FAILED, RequestFailed);

    // Operating Locations
    yield takeLatest(GET_ALL_OPERATING_LOCATIONS, GetAllOperatingLocations);
    yield takeLatest(CREATE_OPERATING_LOCATION, CreateOperatingLocation);

    // Packages
    yield takeLatest(CREATE_PACKAGE_TYPE, CreatePackageType);

    // Addresses
    yield takeLatest(GET_COUNTRIES, GetCountries);

    // Clients
    yield takeLatest(CREATE_CLIENT, CreateClient);

    // Users
    yield takeLatest(AUTHENTICATE, LoginSaga);
    yield takeLatest(REGISTER_USER, RegisterSaga);
    yield takeLatest(LOGOUT_USER, LogoutSaga)
    yield takeLatest(CREATE_USER, CreateUser);
    yield takeLatest(CREATE_USER_TYPE, CreateUserType);

    // Pages
    yield takeLatest(CREATE_PAGE, CreatePageSaga);

    // Addons
    yield takeLatest(CREATE_ADDON, CreateAddonSaga);
}
import { takeLatest, takeEvery } from 'redux-saga/effects';
import * as TYPES from '../Actions/Types.actions';

import * as MasterSaga from './Master.saga';
import * as OperatingLocationsSaga from './OperatingLocations.saga';
import * as PackagesSaga from './Packages.saga';
import * as AddressesSaga from './Addresses.saga';
import * as ClientsSaga from './Clients.saga';
import * as UsersSaga from './Users.saga';
import * as PagesSaga from './Pages.saga';
import * as SprintsSaga from './Sprints.saga';

export default function* mySaga() {
    // Master
    yield takeLatest(TYPES.INITIALIZE, MasterSaga.InitializeStateSaga);
    yield takeLatest(TYPES.CREATE_ERROR, MasterSaga.CreateErrorSaga);

    // Operating Locations
    yield takeLatest(TYPES.GET_ALL_OPERATING_LOCATIONS, OperatingLocationsSaga.GetAllOperatingLocationsSaga);
    yield takeLatest(TYPES.CREATE_OPERATING_LOCATION, OperatingLocationsSaga.CreateOperatingLocationSaga);

    // Packages
    yield takeLatest(TYPES.CREATE_PACKAGE_TYPE, PackagesSaga.CreatePackageTypeSaga);
    yield takeLatest(TYPES.GET_PACKAGE_TYPES, PackagesSaga.GetPackageTypesSaga);

    // Addresses
    yield takeLatest(TYPES.GET_COUNTRIES, AddressesSaga.GetCountriesSaga);
    yield takeLatest(TYPES.GET_TIMEZONES, AddressesSaga.GetTimezonesSaga);

    // Clients
    yield takeLatest(TYPES.CREATE_CLIENT, ClientsSaga.CreateClientSaga);
    yield takeLatest(TYPES.GET_CLIENTS, ClientsSaga.GetClients);

    // Users
    yield takeLatest(TYPES.AUTHENTICATE, UsersSaga.LoginSaga);
    yield takeLatest(TYPES.REGISTER_USER, UsersSaga.RegisterSaga);
    yield takeLatest(TYPES.LOGOUT_USER, UsersSaga.LogoutSaga)
    yield takeLatest(TYPES.CREATE_USER, UsersSaga.CreateUserSaga);
    yield takeLatest(TYPES.CREATE_USER_TYPE, UsersSaga.CreateUserTypeSaga);
    yield takeLatest(TYPES.GET_USERS, UsersSaga.GetUsersSaga);
    yield takeLatest(TYPES.GET_CONTACT_INFO, UsersSaga.GetContactsSaga);

    // Pages
    yield takeLatest(TYPES.CREATE_PAGE, PagesSaga.CreatePageSaga);
    yield takeLatest(TYPES.GET_PAGES, PagesSaga.GetPages);

    // Sprints
    yield takeLatest(TYPES.CREATE_ADDON, SprintsSaga.CreateAddonSaga);
}
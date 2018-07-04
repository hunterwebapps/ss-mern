import API from '../API';
import { call, put } from 'redux-saga/effects';
import {
    IsLoading, ShowError,
    RequestStarting, RequestSuccessful, RequestFailure
} from '../Actions/Master.actions';
import {
    SET_ERROR, SET_USER, SET_COUNTRIES, SET_TIMEZONES,
    ADD_USER, ADD_PAGE, ADD_CLIENT, ADD_PACKAGE_TYPE, ADD_OPERATING_LOCATION, ADD_CONTACT_INFO, ADD_ADDRESS,
    OK, CREATED, BAD_REQUEST, NOT_FOUND, ERROR
} from '../Actions/Types.actions';

export function* Initialize(action) {
    yield put(IsLoading(true));

    const { payload } = action;
    const user = yield call(API.User.Initialize);
    if (user === undefined) {
        if (payload === 'Manager') {
            window.location.href = '/User/Login';
        }
    }
    else if (user.status === 200) {
        yield put({ type: SET_USER, payload: user.data });
        const { Administrator, Superuser } = user.data;

        const countries = yield call(API.Address.GetCountries);
        if (countries.status === 200) {
            yield put({ type: SET_COUNTRIES, payload: countries.data });
        }
        else { put(ShowError(countries)); }

        const timezones = yield call(API.Address.GetTimezones);
        if (timezones.status === 200) {
            yield put({ type: SET_TIMEZONES, payload: timezones.data });
        }
        else { put(ShowError(timezones)); }

        const contactInfo = yield call(API.User.GetContactInfo);
        if (contactInfo.status === 200) {
            yield put({ type: ADD_CONTACT_INFO, payload: contactInfo.data });
        }
        else { put(ShowError(contactInfo)); }

        const addresses = yield call(API.Address.Get);
        if (addresses.status === 200) {
            yield put({ type: ADD_ADDRESS, payload: addresses.data });
        }
        else { put(ShowError(addresses)); }

        yield InitializeUser();

        if (Administrator || Superuser) {
            yield InitializeAdministrator();
        }

        if (Superuser) {
            yield InitializeSuperuser();
        }
    } else {
        yield put(ShowError(user));
    }

    yield put(IsLoading(false));
}

function* InitializeUser() {
    const packageTypes = yield call(API.PackageType.Get);
    if (packageTypes.status === 200) {
        yield put({ type: ADD_PACKAGE_TYPE, payload: packageTypes.data });
    } else {
        yield put(ShowError(packageTypes));
    }
}

function* InitializeAdministrator() {
    const users = yield call(API.User.Get);
    if (users.status === 200) {
        yield put({ type: ADD_USER, payload: users.data });
    } else {
        yield put(ShowError(users));
    }

    const pages = yield call(API.Page.Get);
    if (pages.status === 200) {
        yield put({ type: ADD_PAGE, payload: pages.data });
    } else {
        yield put(ShowError(pages));
    }

    const locations = yield call(API.OperatingLocation.Get);
    if (locations.status === 200) {
        yield put({ type: ADD_OPERATING_LOCATION, payload: locations.data });
    }
    else { yield put(ShowError(locations)); }
}

function* InitializeSuperuser() {
    const clients = yield call(API.Client.Get);
    if (clients.status === 200) {
        yield put({ type: ADD_CLIENT, payload: clients.data });
    } else {
        yield put(ShowError(clients));
    }
}

export function* RequestStart(action) {
    const { apiMethod, data } = action.payload;

    const res = yield call(apiMethod, data);

    switch (res.status) {
        case OK:
        case CREATED:
            yield put(RequestSuccessful(res.data));
            break;
        case BAD_REQUEST:
        case NOT_FOUND:
            yield put(RequestFailure(res.data));
            break;
        case ERROR:
        default:
            yield put(ShowError(res));
    }
}

export function* RequestSuccess() {
    const { data } = action.payload;
}

export function* RequestFailed(action) {
    const { message, data } = action.payload;
}

export function* CreateError(action) {
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

    yield put({ type: SET_ERROR, payload: error });
}
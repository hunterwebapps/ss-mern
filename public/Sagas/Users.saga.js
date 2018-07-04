import API from '../API';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as MasterActions from '../Actions/Master.actions';
import * as AddressesSaga from './Addresses.saga';
import * as TYPES from '../Actions/Types.actions';
import { effects } from 'redux-saga';

// Selectors
export const getCurrentUser = state => state.users.user;
export const getUsersCount = state => state.users.all.length;

export const getContactsCount = state => state.users.contacts.length;

// Sagas
export function* LoginSaga(action) {
    yield put(MasterActions.IsLoading(true));
    
    const res = yield call(API.User.Login, action.payload);
    if (res.status === TYPES.HTTP_OK) {
        // If Admin/Superuser, Redirect to Control Tower
        if (res.data.Administrator || res.data.Superuser) {
            window.location.href = "/ControlTower";
            return;
        }
        yield put({ type: TYPES.SET_USER, payload: res.data });
        yield put(push('/User/Manager'));
    } else {
        yield put(MasterActions.ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* RegisterSaga(action) {
    yield put(MasterActions.IsLoading(true));

    const res = yield call(API.User.Register, action.payload);
    if (res.status === 201) {
        yield put({ type: TYPES.SET_USER, payload: res.data });
        yield put(push('/User/Manager'));
    } else {
        yield put(ShowError(res));
    }

    yield put(MasterActions.IsLoading(false));
}

export function* LogoutSaga() {
    yield put({ type: SET_USER, payload: null });
    yield call(API.User.Logout);
}

export function* ForgotSaga(action) {
    //yield put(IsLoading(true));
    const data = yield call(API.User.Forgot, action.payload);
    //yield put(IsLoading(false));
}

export function* CreateUserSaga(action) {
    yield put(MasterActions.IsLoading(true));

    const res = yield call(API.User.Create, action.payload);
    if (res.status === TYPES.HTTP_CREATED) {
        yield put({ type: TYPES.ADD_USER, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }

    yield put(MasterActions.IsLoading(false));
}

export function* CreateUserTypeSaga(action) {
    yield put(MasterActions.IsLoading(true));

    const res = yield call(API.User.CreateType, action.payload);
    if (res.status === TYPES.HTTP_CREATED) {
        yield put({ type: TYPES.ADD_USER_TYPE, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }

    yield put(MasterActions.IsLoading(false));
}

export function* GetUsersSaga() {
    // If Users Already Loaded, Return
    const userCount = yield select(getUsersCount);
    if (userCount > 0) return;

    // API Call GetUsers
    const res = yield call(API.User.Get);
    if (res.status === TYPES.HTTP_OK) {
        yield put({ type: TYPES.ADD_USER, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }
}

export function* GetContactsSaga() {
    // If Contacts Already Loaded, Return
    const contactCount = yield select(getContactsCount);
    if (contactCount > 0) return;

    // API Call GetContacts
    const res = yield call(API.User.GetContactInfo);
    if (res.status === TYPES.HTTP_OK) {
        yield put({ type: TYPES.ADD_CONTACT_INFO, payload: res.dat });
    } else {
        yield put(MasterActions.ShowError(res));
    }
}
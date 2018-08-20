import API from '../../API';
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { IsLoading, ShowError } from '../Master/Master.actions';
import * as AddressesSaga from '../Addresses/Addresses.saga';
import * as TYPES from './Types.actions';
import { OK, CREATED } from '../../constants';
import { effects } from 'redux-saga';

// Selectors
export const getCurrentUser = state => state.users.user;
export const getUsersCount = state => state.users.all.length;

export const getAccountsCount = state => state.users.accounts.length;

// Sagas
export const watchUsersSaga = [
    takeLatest(TYPES.AUTHENTICATE, LoginSaga),
    takeLatest(TYPES.REGISTER_USER, RegisterSaga),
    takeLatest(TYPES.LOGOUT_USER, LogoutSaga),
    takeLatest(TYPES.CREATE_USER, CreateUserSaga),
    takeLatest(TYPES.UPDATE_USER, UpdateUserSaga),
    takeLatest(TYPES.CREATE_USER_TYPE, CreateUserTypeSaga),
    takeLatest(TYPES.GET_USERS, GetUsersSaga),
    takeLatest(TYPES.GET_ACCOUNTS, GetAccountsSaga),
    takeLatest(TYPES.CREATE_USER_ACCOUNT, CreateAccountSaga)
];

export function* LoginSaga(action) {
    yield put(IsLoading(true));
    const res = yield call(API.User.Login, action.payload);
    if (res && res.status === OK) {
        yield put({ type: TYPES.SET_USER, payload: res.data });
        yield put(push('/User/Manager'));
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* RegisterSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.User.Register, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.SET_USER, payload: res.data });
        yield put(push('/User/Manager'));
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* LogoutSaga() {
    yield put({ type: TYPES.SET_USER, payload: null });
    yield call(API.User.Logout);
}

export function* ForgotSaga(action) {
    //yield put(IsLoading(true));
    const data = yield call(API.User.Forgot, action.payload);
    //yield put(IsLoading(false));
}

export function* CreateUserSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.User.Create, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_USER, payload: res.data });
        yield history.back(1);
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* UpdateUserSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.User.Update, action.payload);
    if (res && res.status === OK) {
        yield put({ type: TYPES.UPDATE_USER_SUCCESS, payload: action.payload });
        yield history.back(1);
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* CreateUserTypeSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.User.CreateType, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_USER_TYPE, payload: res.data });
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* GetUsersSaga() {
    // If Users Already Loaded, Return
    const userCount = yield select(getUsersCount);
    if (userCount > 0) return;

    // API Call GetUsers
    const res = yield call(API.User.Get);
    if (res && res.status === OK) {
        yield put({ type: TYPES.ADD_USER, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}

export function* GetAccountsSaga() {
    const acctCount = select(getAccountsCount);
    if (acctCount > 0) return;

    const res = yield call(API.User.Account.Get);
    if (res && res.status === OK) {
        yield put({ type: TYPES.ADD_ACCOUNTS, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}

export function* CreateAccountSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.User.Account.Create, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_ACCOUNTS, payload: res.data });
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}
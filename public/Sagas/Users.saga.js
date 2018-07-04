import API from '../API';
import { call, put, select } from 'redux-saga/effects';
import { ShowError, IsLoading } from '../Actions/Master.actions';
import { SET_USER, ADD_USER, ADD_USER_TYPE } from '../Actions/Types.actions';
import { getCountryByID } from './Addresses.saga';

// Selectors
export const getCurrentUser = state => state.users.user;

// Sagas

export function* LoginSaga(action) {
    //yield put(IsLoading(true));
    const { payload } = action;
    const res = yield call(API.User.Login, payload);
    yield console.log("Login Saga Response", res);
    if (res.status === 200) {
        if (res.data.Administrator || res.data.Superuser) {
            window.location.href = "/ControlTower";
        }
        yield put({ type: SET_USER, payload: res.data });
    } else {
        yield ShowError(res);
    }
    //yield put(IsLoading(false));
}

export function* RegisterSaga(action) {
    console.log("Register Saga", action);
    //yield put(IsLoading(true));
    const { payload } = action;
    const res = yield call(API.User.Register, payload);
    if (res.status === 201) {
        yield console.log("Register Saga Response", res);
        yield put({ type: SET_USER, payload: res.data });
    } else {
        yield ShowError(res);
    }

    //yield put(IsLoading(false));
}

export function* LogoutSaga(action) {
    //yield put(IsLoading(true));
    yield put({
        type: SET_USER,
        payload: null
    });
    yield call(API.User.Logout);
    //yield put(IsLoading(false));
}

export function* ForgotSaga(action) {
    //yield put(IsLoading(true));
    const data = yield call(API.User.Forgot, action.payload);
    //yield put(IsLoading(false));
}

export function* CreateUser(action) {
    const { payload } = action;
    const res = yield call(API.User.Create, payload);
    if (res.data.success) {
        yield put({ type: ADD_USER, payload: res.data.user });
    } else {
        yield console.log("Create User Saga Fail", res, payload);
    }
}

export function* CreateUserType(action) {
    const { payload } = action;
    const res = yield call(API.User.CreateType, payload);
    if (res.data.success) {
        yield put({ type: ADD_USER_TYPE, payload: res.data.userType });
    } else {
        yield console.log("Create User Type Error", res);
    }
}
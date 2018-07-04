import API from '../API';
import { call, put } from 'redux-saga/effects';
//import { IsLoading } from '../Actions/Master.actions';
import { ADD_ADDON } from '../Actions/Types.actions';

export function* CreateAddonSaga(action) {
    const { payload } = action;
    const res = yield call(API.Addon.Create, payload);
    if (res.data.success) {
        yield put({ type: ADD_ADDON, payload: res.data.addon });
    } else {
        yield console.log("Create Addon Saga Fail", res);
    }
}
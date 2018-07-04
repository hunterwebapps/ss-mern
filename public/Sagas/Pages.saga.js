import API from '../API';
import { call, put } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Actions/Master.actions';
import { ADD_PAGE, CREATE_ERROR } from '../Actions/Types.actions';

export function* CreatePageSaga(action) {
    const { payload } = action;
    const res = yield call(API.Page.Create, payload);
    if (res.status === 201) {
        yield put({ type: ADD_PAGE, payload: res.data });
    } else {
        yield console.log("Create Page Saga Error", res);
        yield put({ type: CREATE_ERROR, payload: res });
    }
}
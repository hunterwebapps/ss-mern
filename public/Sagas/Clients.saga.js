import API from '../API';
import { call, put, select } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Actions/Master.actions';
import { getCountryByID } from './Addresses.saga';
import { getCurrentUser } from './Users.saga';
import { ADD_CLIENT } from '../Actions/Types.actions';

export function* CreateClient(action) {
    yield put(IsLoading(true));

    let { payload } = action;

    const res = yield call(API.Client.Create, payload);

    if (res.status === 201) {
        yield put({ type: ADD_CLIENT, payload: res.data });
    } else {
        yield console.log("Create Client Failed", res);
    }

    yield put(IsLoading(false));
}
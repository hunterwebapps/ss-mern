import API from '../API';
import { call, put, select } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Actions/Master.actions';
import { getCountryByID } from './Addresses.saga';
import { getCurrentUser } from './Users.saga';
import * as TYPES from '../Actions/Types.actions';

export const getClientCount = state => state.clients.all.length;

export function* CreateClient(action) {
    yield put(IsLoading(true));

    let { payload } = action;

    const res = yield call(API.Client.Create, payload);

    if (res.status === 201) {
        yield put({ type: TYPES.ADD_CLIENT, payload: res.data });
    } else {
        yield console.log("Create Client Failed", res);
    }

    yield put(IsLoading(false));
}

export function* GetClients() {
    // If Clients Already Loaded, Return
    const clientCount = select(getClientCount);
    if (clientCount > 0) return;

    // API Call GetClients
    const res = yield call(API.Client.Get);
    if (res.status === TYPES.HTTP_OK) {
        // If Response 200 Set Clients in State
        yield put({ type: TYPES.ADD_CLIENT, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }
}
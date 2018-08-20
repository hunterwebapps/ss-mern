import API from '../../API';
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Master/Master.actions';
import * as TYPES from './Types.actions';
import { OK, CREATED } from '../../constants';

export const getClientCount = state => state.clients.all.length;

export const watchClientsSaga = [
    takeLatest(TYPES.CREATE_CLIENT, CreateClientSaga),
    takeLatest(TYPES.GET_CLIENTS, GetClientsSaga)
];

export function* CreateClientSaga(action) {
    yield put(IsLoading(true));
    
    const res = yield call(API.Client.Create, action.payload);

    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_CLIENT, payload: res.data });
        yield history.back(1);
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* GetClientsSaga() {
    // If Clients Already Loaded, Return
    const clientCount = select(getClientCount);
    if (clientCount > 0) return;

    // API Call GetClients
    const res = yield call(API.Client.Get);
    if (res && res.status === OK) {
        // If Response 200 Set Clients in State
        yield put({ type: TYPES.ADD_CLIENT, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}
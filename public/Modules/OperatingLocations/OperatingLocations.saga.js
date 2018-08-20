import API from '../../API';
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Master/Master.actions';
import * as TYPES from './Types.actions';
import { OK, CREATED } from '../../constants';

export const getOperatingLocationsCount = state => state.operatingLocations.all.length;

export const watchOperatingLocationsSaga = [
    takeLatest(TYPES.GET_ALL_OPERATING_LOCATIONS, GetAllOperatingLocationsSaga),
    takeLatest(TYPES.CREATE_OPERATING_LOCATION, CreateOperatingLocationSaga)
];

export function* GetAllOperatingLocationsSaga(action) {
    // If Operating Locations Already Loaded, Return;
    const locationsCount = yield select(getOperatingLocationsCount);
    if (locationsCount > 0) return;

    // API Call GetOperatingLocations
    const res = yield call(API.OperatingLocation.Get);
    if (res && res.status === OK) {
        // If Response 200 Set Operating Loations in State
        yield put({ type: TYPES.ADD_OPERATING_LOCATION, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}

export function* CreateOperatingLocationSaga(action) {
    yield put(IsLoading(true));
    
    const res = yield call(API.OperatingLocation.Create, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_OPERATING_LOCATION, payload: res.data });
        yield history.back(1);
    } else {
        yield ShowError(res);
    }

    yield put(IsLoading(false));
}
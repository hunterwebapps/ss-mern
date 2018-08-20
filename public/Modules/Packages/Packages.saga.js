import API from '../../API';
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Master/Master.actions';
import * as TYPES from './Types.actions';
import { OK, CREATED } from '../../constants';

// Selectors

const getPackageTypesCount = state => state.packages.types.length;

const getTrackingLogTypesCount = state => state.packages.trackingLogTypes.length;

// Sagas

export const watchPackagesSaga = [
    takeLatest(TYPES.CREATE_PACKAGE_TYPE, CreatePackageTypeSaga),
    takeLatest(TYPES.GET_PACKAGE_TYPES, GetPackageTypesSaga),
    takeLatest(TYPES.GET_TRACKING_LOG_TYPES, GetTrackingLogTypesSaga),
    takeLatest(TYPES.CREATE_TRACKING_LOG_TYPE, CreateTrackingLogTypeSaga)
];

export function* GetPackageTypesSaga() {
    const typesCount = select(getPackageTypesCount);
    if (typesCount > 0) return;

    const res = yield call(API.Package.Type.Get);
    if (res && res.status === OK) {
        yield put({ type: TYPES.ADD_PACKAGE_TYPE, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}

export function* CreatePackageTypeSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.Package.Type.Create, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_PACKAGE_TYPE, payload: res.data });
        yield history.back(1);
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* GetTrackingLogTypesSaga() {
    const typesCount = select(getTrackingLogTypesCount);
    if (typesCount > 0) return;

    const res = yield call(API.Package.TrackingLogType.Get);
    if (res && res.status === OK) {
        yield put({ type: TYPES.ADD_TRACKING_LOG_TYPES, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}

export function* CreateTrackingLogTypeSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.Package.TrackingLogType.Create, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_TRACKING_LOG_TYPES, payload: res.data });
        yield history.back(1);
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}
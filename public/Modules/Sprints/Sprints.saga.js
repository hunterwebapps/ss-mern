import API from '../../API';
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Master/Master.actions';
import * as TYPES from './Types.actions';
import { OK, CREATED } from '../../constants';

export const getAddonsCount = state => state.sprints.addons.length;

export const getServiceLevelCount = state => state.sprints.serviceLevels.length;

export const watchSprintsSaga = [
    takeLatest(TYPES.GET_ADDONS, GetAddonsSaga),
    takeLatest(TYPES.CREATE_ADDON, CreateAddonSaga),
    takeLatest(TYPES.GET_SERVICE_LEVELS, GetServiceLevelsSaga),
    takeLatest(TYPES.CREATE_SERVICE_LEVEL, CreateServiceLevelSaga),
    takeLatest(TYPES.IMPORT_CSV, ImportCSVSaga)
];

// Sprints
export function* ImportCSVSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.Sprint.Import, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_SPRINTS, payload: res.data });
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

// Addons
export function* GetAddonsSaga() {
    const addonCount = select(getAddonsCount);
    if (addonCount > 0) return;

    const res = yield call(API.Sprint.Addon.Get);
    if (res && res.status === OK) {
        yield put({ type: TYPES.ADD_ADDON, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}

export function* CreateAddonSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.Sprint.Addon.Create, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_ADDON, payload: res.data });
        yield history.back(1);
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

// Service Levels
export function* GetServiceLevelsSaga() {
    const serviceLevelCount = select(getServiceLevelCount);
    if (serviceLevelCount > 0) return;

    const res = yield call(API.Sprint.ServiceLevel.Get);
    if (res && res.status === OK) {
        yield put({ type: TYPES.ADD_SERVICE_LEVEL, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}

export function* CreateServiceLevelSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.Sprint.ServiceLevel.Create, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_SERVICE_LEVEL, payload: res.data });
        yield history.back(1);
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}
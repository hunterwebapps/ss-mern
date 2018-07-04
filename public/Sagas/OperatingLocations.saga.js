import API from '../API';
import { call, put } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Actions/Master.actions';
import * as TYPES from '../Actions/Types.actions';

export const getOperatingLocationsCount = state => state.operatingLocations.all.length;

export function* GetAllOperatingLocationsSaga(action) {
    // If Operating Locations Already Loaded, Return;
    const locationsCount = yield select(getOperatingLocationsCount);
    if (locationsCount > 0) return;

    // API Call GetOperatingLocations
    const res = yield call(API.OperatingLocation.Get);
    if (res.status === TYPES.HTTP_OK) {
        // If Response 200 Set Operating Loations in State
        yield put({ type: TYPES.ADD_OPERATING_LOCATION, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(locations));
    }
}

export function* CreateOperatingLocationSaga(action) {
    yield put(IsLoading(true));

    const { payload } = action;
    yield console.log(payload);
    const location = yield call(API.OperatingLocation.Create, payload);

    if (location.status === 201) {
        yield put({ type: ADD_OPERATING_LOCATION, payload: location.data });
    } else {
        yield ShowError(location);
    }

    yield put(IsLoading(false));
}
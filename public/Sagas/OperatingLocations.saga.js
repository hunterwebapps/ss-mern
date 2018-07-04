import API from '../API';
import { call, put } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Actions/Master.actions';
import { SET_ALL_OPERATING_LOCATIONS, ADD_OPERATING_LOCATION } from '../Actions/Types.actions';

export function* GetAllOperatingLocations(action) {
    const locations = yield call(API.OperatingLocation.GetAll);
    yield put({ type: SET_ALL_OPERATING_LOCATIONS, payload: locations });
}

export function* CreateOperatingLocation(action) {
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
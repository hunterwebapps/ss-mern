import API from '../API';
import { call, put } from 'redux-saga/effects';
import * as MasterActions from '../Actions/Master.actions';
import * as TYPES from '../Actions/Types.actions';

export function* CreatePackageTypeSaga(action) {
    yield put(MasterActions.IsLoading(true));

    const res = yield call(API.PackageType.Create, action.payload);
    if (res.status === TYPES.HTTP_CREATED) {
        yield put({ type: TYPES.ADD_PACKAGE_TYPE, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(packageType));
    }

    yield put(MasterActions.IsLoading(false));
}

export function* GetPackageTypesSaga() {
    const res = yield call(API.PackageType.Get);
    if (res.status === TYPES.HTTP_OK) {
        yield put({ type: TYPES.ADD_PACKAGE_TYPE, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(packageTypes));
    }
}
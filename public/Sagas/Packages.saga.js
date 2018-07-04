import API from '../API';
import { call, put } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Actions/Master.actions';
import { ADD_PACKAGE_TYPE } from '../Actions/Types.actions';

export function* CreatePackageType(action) {
    const { payload } = action;
    const packageType = yield call(API.PackageType.Create, payload);
    if (packageType.status === 201) {
        yield put({ type: ADD_PACKAGE_TYPE, payload: packageType.data });
    } else {
        yield put(ShowError(packageType));
    }
    
}
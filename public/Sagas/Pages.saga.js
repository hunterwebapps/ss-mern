import API from '../API';
import { call, put } from 'redux-saga/effects';
import * as MasterActions from '../Actions/Master.actions';
import * as TYPES from '../Actions/Types.actions';

export const getPageCount = state => state.pages.all.length;

export function* CreatePageSaga(action) {
    yield put(MasterActions.IsLoading(true));

    const res = yield call(API.Page.Create, action.payload);
    if (res.status === TYPES.HTTP_CREATED) {
        yield put({ type: TYPES.ADD_PAGE, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }

    yield put(MasterActions.IsLoading(false));
}

export function* GetPages() {
    // If Pages Already Loaded, Return
    const pageCount = select(getPageCount);
    if (pageCount > 0) return;

    // API Call GetPages
    const res = yield call(API.Page.Get);
    if (res.status === TYPES.HTTP_OK) {
        // If Response 200 Set Pages in State
        yield put({ type: TYPES.ADD_PAGE, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }
}
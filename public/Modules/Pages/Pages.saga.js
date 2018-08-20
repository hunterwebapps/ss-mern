import API from '../../API';
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { IsLoading, ShowError } from '../Master/Master.actions';
import * as TYPES from './Types.actions';
import { OK, CREATED } from '../../constants';

export const getPageCount = state => state.pages.all.length;

export const watchPagesSaga = [
    takeLatest(TYPES.CREATE_PAGE, CreatePageSaga),
    takeLatest(TYPES.GET_PAGES, GetPages)
];

export function* CreatePageSaga(action) {
    yield put(IsLoading(true));

    const res = yield call(API.Page.Create, action.payload);
    if (res && res.status === CREATED) {
        yield put({ type: TYPES.ADD_PAGE, payload: res.data });
        yield history.back(1);
    } else {
        yield put(ShowError(res));
    }

    yield put(IsLoading(false));
}

export function* GetPages() {
    // If Pages Already Loaded, Return
    const pageCount = select(getPageCount);
    if (pageCount > 0) return;

    // API Call GetPages
    const res = yield call(API.Page.Get);
    if (res.status === OK) {
        // If Response 200 Set Pages in State
        yield put({ type: TYPES.ADD_PAGE, payload: res.data });
    } else {
        yield put(ShowError(res));
    }
}
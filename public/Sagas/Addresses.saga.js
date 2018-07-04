import API from '../API';
import { call, put, select } from 'redux-saga/effects';
import * as MasterActions from '../Actions/Master.actions';
import * as TYPES from '../Actions/Types.actions';

// Selectors
export const getCountryCount = state => state.addresses.countries.length;
export const getCountryByID = (state, id) => state.addresses.countries.filter(country => country.CountryID === parseInt(id))[0];

export const getTimezoneCount = state => state.addresses.timezones.length;
export const getTimezoneByID = (state, id) => state.addresses.timezones.filter(zone => zone.TimezoneID === parseInt(id))[0];

export const getAddressCount = state => state.addresses.all.length;

// Sagas
export function* GetCountriesSaga() {
    // If Countries Already Loaded, Return
    const countryCount = yield select(getCountryCount);
    if (countryCount > 0) return;

    // API Call GetCountries
    const res = yield call(API.Address.GetCountries);
    if (res.status === TYPES.HTTP_OK) {
        // If Response 200 Set Countries in State
        yield put({ type: TYPES.SET_COUNTRIES, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }
}

export function* GetTimezonesSaga() {
    // If Timezones Already Loaded, Return
    const timezoneCount = yield select(getTimezoneCount);
    if (timezoneCount > 0) return;

    // API Call GetTimezones
    const res = yield call(API.Address.GetTimezones);
    if (res.status === TYPES.HTTP_OK) {
        // If Response 200 Set Timezones in State
        yield put({ type: TYPES.SET_TIMEZONES, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }
}

export function* GetAddressesSaga() {
    // If Addresses Already Loaded, Return
    const addressCount = yield select(getAddressCount);
    if (addressCount > 0) return;

    const res = yield call(API.Address.Get);
    if (res.status === TYPES.HTTP_OK) {
        // If Response 200 Set Addresses in State
        yield put({ type: TYPES.ADD_ADDRESSES, payload: res.data });
    } else {
        yield put(MasterActions.ShowError(res));
    }
}
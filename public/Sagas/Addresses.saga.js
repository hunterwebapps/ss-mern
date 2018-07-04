import API from '../API';
import { call, put, select } from 'redux-saga/effects';
//import { IsLoading } from '../Actions/Master.actions';
import { SET_COUNTRIES } from '../Actions/Types.actions';

// Selectors
export const getCountryCount = state => state.addresses.countries.length;
export const getCountryByID = (state, id) => state.addresses.countries.filter(country => country.CountryID === parseInt(id))[0];

export const getTimezoneByID = (state, id) => state.addresses.timezones.filter(zone => zone.TimezoneID === parseInt(id))[0];

// Sagas
export function* GetCountries(action) {
    const countryCount = yield select(getCountryCount);
    if (countryCount > 0) { return; }
    let res = yield call(API.Address.GetCountries);
    if (res.data.success) {
        yield put({ type: SET_COUNTRIES, payload: res.data.countries });
    } else {
        // TODO: Handle unsuccessful
    }
}

export const NormalizeAddress = address => {
    const normalized = {
        FullName: address.fullName,
        Company: address.company,
        Address1: address.address1,
        Address2: address.address2,
        City: address.city,
        State: address.state,
        PostalCode: address.postalCode,
        Country: select(getCountryByID, address.country),
        Timezone: select(getTimezoneByID, address.timezone),
        Latitude: address.latitude,
        Longitude: address.longitude,
        PhoneNumbers: NormalizePhoneNumbers(address.phoneNumbers),
        EmailAddresses: NormalizeEmailAddresses(address.emailAddresses),
        Notes: address.notes
    };
    return normalized;
}

export const NormalizePhoneNumbers = phoneNumbers => {
    const normalized = phoneNumbers.map((number, index) => {
        const { phoneNumber, type } = number;
        if (phoneNumber && type) {
            return {
                PhoneNumber: phoneNumber,
                Type: type,
                Primary: index === 0
            }
        }
    });
    return normalized;
}

export const NormalizeEmailAddresses = emailAddresses => {
    const normalized = emailAddresses.map((email, index) => {
        const { emailAddress } = email;
        if (emailAddress) {
            return {
                EmailAddress: emailAddress,
                Primary: index === 0
            }
        }
    });
    return normalized;
}
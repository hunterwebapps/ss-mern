import { SET_USER, ADD_USER, ADD_USER_TYPE, ADD_CONTACT_INFO } from '../Actions/Types.actions';

const initialState = {
    all: [],
    current: null,
    types: [],
    groups: [],
    accounts: [],
    pickupAddresses: [],
    contacts: []
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case SET_USER:
            state = {
                ...state,
                current: payload
            };
            return state;
        case ADD_USER:
            state = {
                ...state,
                all: [
                    ...state.all,
                    ...payload
                ]
            };
            return state;
        case ADD_USER_TYPE:
            state = {
                ...state,
                types: [
                    ...state.types,
                    payload
                ]
            };
            return state;
        case ADD_CONTACT_INFO:
            state = {
                ...state,
                contacts: [
                    ...state.contacts.concat(payload)
                ]
            };
            return state;
        default:
            return state;
    }
};
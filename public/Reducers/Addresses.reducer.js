import { SET_COUNTRIES, SET_TIMEZONES, ADD_ADDRESSES } from '../Actions/Types.actions';

const initialState = {
    all: [],
    countries: [],
    timezones: []
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case SET_COUNTRIES:
            state = {
                ...state,
                countries: payload
            }
            return state;
        case SET_TIMEZONES:
            state = {
                ...state,
                timezones: payload
            };
            return state;
        case ADD_ADDRESSES:
            state = {
                ...state,
                all: [
                    ...state.all.concat(payload)
                ]
            };
            return state;
        default:
            return state;
    }
};
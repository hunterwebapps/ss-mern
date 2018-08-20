import * as TYPES from './Types.actions';

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
        case TYPES.SET_COUNTRIES:
            state = {
                ...state,
                countries: payload
            }
            return state;
        case TYPES.SET_TIMEZONES:
            state = {
                ...state,
                timezones: payload
            };
            return state;
        case TYPES.ADD_ADDRESSES:
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
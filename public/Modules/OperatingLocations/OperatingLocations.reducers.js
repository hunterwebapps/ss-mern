import { GET_OPERATING_LOCATION, SET_ALL_OPERATING_LOCATIONS, SET_OPERATING_LOCATION, ADD_OPERATING_LOCATION } from './Types.actions';

const initialState = {
    all: [],
    active: {},
    packageTypes: [],
    serviceLevels: [],
    addons: []
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case SET_OPERATING_LOCATION:
            state = {
                ...state,
                active: payload
            };
            return state;
        case SET_ALL_OPERATING_LOCATIONS:
            state = {
                ...state,
                all: payload
            };
            return state;
        case ADD_OPERATING_LOCATION:
            state = {
                ...state,
                all: [
                    ...state.all.concat(payload),
                ]
            };
            return state;
        default:
            return state;
    }
};
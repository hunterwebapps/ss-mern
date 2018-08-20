import * as TYPES from './Types.actions';

const initialState = {
    packages: [],
    types: [],
    trackingLogTypes: []
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case TYPES.GET_PACKAGE_TYPES:
            state = {
                ...state
            };
            return state;
        case TYPES.ADD_PACKAGE_TYPE:
            state = {
                ...state,
                types: [
                    ...state.types.concat(payload)
                ]
            };
            return state;
        case TYPES.ADD_TRACKING_LOG_TYPES:
            state = {
                ...state,
                trackingLogTypes: [
                    ...state.trackingLogTypes.concat(payload)
                ]
            };
            return state;
        default:
            return state;
    }
};
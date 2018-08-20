import * as TYPES from './Types.actions';


const initialState = {
    all: [],
    addons: [],
    promotions: [],
    serviceLevels: []
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case TYPES.ADD_SPRINTS:
            state = {
                ...state,
                all: [
                    ...state.all.concat(payload)
                ]
            };
            return state;
        case TYPES.ADD_ADDON:
            state = {
                ...state,
                addons: [
                    ...state.addons.concat(payload)
                ]
            };
            return state;
        case TYPES.ADD_PROMOTION:
            state = {
                ...state,
                promotions: [
                    ...state.promotions,
                    payload
                ]
            };
            return state;
        case TYPES.ADD_SERVICE_LEVEL:
            state = {
                ...state,
                serviceLevels: [
                    ...state.serviceLevels.concat(payload)
                ]
            };
            return state;
        default:
            return state;
    }
};
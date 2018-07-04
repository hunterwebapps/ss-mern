import { CREATE_SPRINT, ADD_ADDON, ADD_PROMOTION } from '../Actions/Types.actions';


const initialState = {
    addons: [],
    promotions: []
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case CREATE_SPRINT:
            state = {
                ...state
            };
            return state;
        case ADD_ADDON:
            state = {
                ...state,
                addons: [
                    ...state.addons,
                    payload
                ]
            };
            return state;
        case ADD_PROMOTION:
            state = {
                ...state,
                promotions: [
                    ...state.promotions,
                    payload
                ]
            };
            return state;
        default:
            return state;
    }
};
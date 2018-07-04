import { IS_LOADING, SET_ERROR } from '../Actions/Types.actions';

const initialState = {
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case SET_ERROR:
            state = {
                ...state,
                error: payload
            };
            return state;
        case IS_LOADING:
            state = {
                ...state,
                loading: payload
            };
            return state;
        default:
            return state;
    }
};
import { ADD_PAGE } from '../Actions/Types.actions';

const initialState = {
    all: [],
    current: {}
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case ADD_PAGE:
            const pages = payload.constructor !== Array ? [payload] : payload;
            state = {
                ...state,
                all: [
                    ...state.all,
                    ...pages
                ]
            };
            return state;
        default:
            return state;
    }
};
import { ADD_CLIENT } from '../Actions/Types.actions';

const initialState = {
    all: [],
    current: null
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case ADD_CLIENT:
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
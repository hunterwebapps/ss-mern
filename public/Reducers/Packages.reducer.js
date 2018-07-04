import { GET_PACKAGE_TYPES, ADD_PACKAGE_TYPE } from '../Actions/Types.actions';

const initialState = {
    packages: [],
    types: []
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case GET_PACKAGE_TYPES:
            state = {
                ...state
            };
            return state;
        case ADD_PACKAGE_TYPE:
            state = {
                ...state,
                types: [
                    ...state.types.concat(payload)
                ]
            };
            return state;
        default:
            return state;
    }
};
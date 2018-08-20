import * as TYPES from './Types.actions';

const initialState = {
    all: [],
    current: null,
    types: [],
    groups: [],
    accounts: []
};

export default (state = initialState, action) => {
    const { payload } = action;
    if (payload && payload.message && payload.message.join) {
        payload.message = payload.message.join('\r\n');
    }
    switch (action.type) {
        case TYPES.SET_USER:
            state = {
                ...state,
                current: payload
            };
            return state;
        case TYPES.ADD_USER:
            state = {
                ...state,
                all: [
                    ...state.all,
                    ...payload
                ]
            };
            return state;
        case TYPES.UPDATE_USER_SUCCESS:
            state = {
                ...state,
                all: state.all.map(user => {
                    if (user._id === payload._id) {
                        return payload;
                    }
                    return user;
                }),
                current: payload._id === state.current._id ? payload : state.current
            };
            return state;
        case TYPES.ADD_USER_TYPE:
            state = {
                ...state,
                types: [
                    ...state.types,
                    payload
                ]
            };
            return state;
        case TYPES.ADD_ACCOUNTS:
            state = {
                ...state,
                accounts: [
                    ...state.accounts.concat(payload)
                ]
            };
            return state;
        default:
            return state;
    }
};
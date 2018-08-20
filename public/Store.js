import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import rootReducer from './Main.reducer';
import Logger from './Middleware/Logger';
import { default as CreateSaga } from 'redux-saga';
import mySaga from './Main.saga';

import { LoadState, SaveState } from './SessionStorage';

const Saga = CreateSaga();

const middleware = [
    Logger,
    Saga
];

//const savedState = LoadState();

const Store = createStore(
    rootReducer,
    /*savedState*/{},
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

//Store.subscribe(throttle(() => {
//    SaveState(Store.getState());
//}, 1000));

Saga.run(mySaga);

export default Store;
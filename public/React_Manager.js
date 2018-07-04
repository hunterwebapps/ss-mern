import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Store';

import Master from './Components/Master.managers';

ReactDOM.render(
    <Provider store={Store}>
        <BrowserRouter>
            <Master />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
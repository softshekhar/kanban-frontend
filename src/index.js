import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from './middleware/logger';
import analytics from './middleware/analytics';
import apiMiddleware from './middleware/api';

import tasksReducer from './reducers';
import App from './App';
import './index.css';

import Keycloak from 'keycloak-js';

//keycloak init options
let initOptions = {
    url: window.ENV.AUTH_URL, // TODO
    realm: 'kanban', // TODO
    clientId: '611290b2-e6ca-4255-b93e-36cbc669db01', //TODO
    onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);



const rootReducer = (state = {}, action) => {
    return {
        tasks: tasksReducer(state.tasks, action),
    };
};

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, apiMiddleware, logger, analytics))
);


keycloak.init({onLoad: initOptions.onLoad}).success((auth) => {

    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }


    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );


    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);

    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 60000)

}).error(() => {
    console.error("Authenticated Failed");
});


if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(
            <Provider store={store}><NextApp/></Provider>,
            document.getElementById('root')
        );
    });

    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default;
        store.replaceReducer(nextRootReducer);
    });
}

registerServiceWorker();

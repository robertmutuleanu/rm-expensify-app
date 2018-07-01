import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

const store = configureStore();

const template = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (hasRendered) {
        return;
    }

    ReactDOM.render(template, document.getElementById('app'));
    hasRendered = true;
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        store.dispatch(logout());
        renderApp();
        history.push('/');
        return;
    }

    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
        renderApp();
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
    });
});
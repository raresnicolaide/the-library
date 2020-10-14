import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Putem da aliasuri cand importam.
import { BrowserRouter as Router} from 'react-router-dom';
import store from './redux/store';
// importam si componenta Provider, oferita de react-redux
import { Provider } from 'react-redux';

ReactDOM.render(
// Pentru a avea acces la Router in intreaga aplicatie, App devine copilul lui Router.
<Provider store={store}>
    <Router>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Kufam&display=swap" rel="stylesheet"></link>
        <App />
    </Router>
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

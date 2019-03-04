import React from 'react';
import { render } from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Routes from './router';

import App from './components/app';
import './index.scss';
import './demo';

render(
    <Router routes={Routes} history={browserHistory}/>, document.querySelector('#app')
);

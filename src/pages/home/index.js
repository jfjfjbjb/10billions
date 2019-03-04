import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

class Home extends React.Component {
    render() {
        return null;
    }
}
// 先跳转到登录页
browserHistory.push('/login');

export default Home;

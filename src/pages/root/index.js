import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd';
import {browserHistory} from 'react-router';
import network from "utils/network";
import "./style.scss";

const { Header, Content, Footer } = Layout;

class Root extends React.Component {
    state = {
        userInfo: {
            name: 'yinrui'
        }
    }
    constructor(props) {
        super(props);
        this.init();
    }
    init() {
        network.get({
            url: '/index'
        }).then((data) => {
            console.log(this.state);
        });
    }
    render() {
        return (
            <Layout className="root">
                <Header className="header">
                    <span className="header-title">找寻回忆</span>
                </Header>
                <Content className="content"></Content>
                {/*<Footer>Footer</Footer>*/}
            </Layout>
        );
    }
}

export default Root;

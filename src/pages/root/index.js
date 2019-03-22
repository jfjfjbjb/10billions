import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Icon} from 'antd';
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
    async init() {
        let res = await network.get({
            url: '/index'
        });
        console.log(this.state, res);
    }
    render() {
        return (
            <Layout className="root">
                <Header className="header">
                    {/* logo */}
                    <Icon type="medium" className="header-logo"/>
                    <span className="header-title">emories</span>
                    {/* 右侧功能区 */}
                    <ul className="header-tools">
                        <li className="header-user">
                            <Icon type="user" className="header-user-icon"/>
                        </li>
                    </ul>

                </Header>
                <Content className="content">
                    {this.props.children}
                </Content>
                {/*<Footer>Footer</Footer>*/}
            </Layout>
        );
    }
}

export default Root;

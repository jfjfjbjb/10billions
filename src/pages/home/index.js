import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Row, Col} from 'antd';
import {browserHistory} from 'react-router';
import network from "utils/network";
import "./style.scss";

class Home extends React.Component {
    state = {
    }
    constructor(props) {
        super(props);
        this.init();
    }
    async init() {
        // let res = await network.get({
        //     url: '/index'
        // });
        // console.log(this.state, res);
    }
    render() {
        return (
            <Row gutter={16}>
                <Col sm={12} xs={24}>
                    <Card type="home" theme="green"/>
                </Col>
                <Col sm={12} xs={24}>
                    <Card type="heart" theme="pink"/>
                </Col>
                <Col sm={12} xs={24}>
                    <Card type="eye-invisible" theme="purple"/>
                </Col>
                <Col sm={12} xs={24}>
                    <Card type="upload" theme="yellow"/>
                </Col>
            </Row>
        );
    }
}

function Card(props) {
    return (
        <div className={"entry-card entry-card-" + props.theme}>
            <Icon type={props.type}/>
        </div>
    )
}

export default Home;

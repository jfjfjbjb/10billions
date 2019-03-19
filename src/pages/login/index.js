import React from 'react';
import {LocaleProvider, Form, Icon, Input, Button, Checkbox, message, Row, Col} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
// 暂不使用moment库，比较大
// import moment from 'moment';
// import 'moment/locale/zh-cn';
import "./style.scss";
import network from "utils/network";
import {browserHistory} from 'react-router';

// moment.locale('zh-cn');

class Login extends React.Component {
    componentDidMount() {
        this.props.form.setFieldsValue({
            userName: '123'
        });
    }

    tips = (e) => {
        message.info('暂未开放，登录名、密码：123');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                network.post({
                    url: '/users/login',
                    data: values
                }).then((res) => {
                    message.success(res.message, 1);
                    // 跳转到root
                    browserHistory.push('/');
                }).catch((e) => {
                    console.log(e);
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <LocaleProvider locale={zhCN}>
                <Row className="login" type="flex" align="middle" justify="center">
                    <Col span={16}>
                        <Icon type="login" className="loginIcon"/>
                        <Form onSubmit={this.handleSubmit} className="loginForm">
                            <Form.Item>
                                {getFieldDecorator('userName', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Username"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password" placeholder="Password"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住我</Checkbox>
                                )}
                                <a onClick={(e) => this.tips(e)} className="login-form-forgot">忘记密码</a>
                                <Button type="primary" htmlType="submit" className="loginSubmit">
                                    登陆
                                </Button>
                                <a onClick={this.tips.bind(this)} style={{float: 'right'}}>立即注册</a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </LocaleProvider>
        );
    }
}

const LoginForm = Form.create({name: 'normal_login'})(Login);

export default LoginForm;

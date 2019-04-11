import React, {Component} from 'react'
import {
    Form, Input,  Select, Row, Col,  Button, AutoComplete,InputNumber
} from 'antd';
import { connect } from 'dva';
import styles from './index.less'
import ucmp from "../../assets/ucmp-logo-cloud.png";
const mapStateToProps = (state) => {
    return {
            list:state.login.list,
            captchaCode:state.login.captchaCode,
            login:state.login
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
            //向邮箱发送验证嘛
            onSend:(payload)=>dispatch({
                type: 'login/sendCaptcha',
                payload:payload
            }),
            onValidateCaptcha:(payload)=>dispatch({
                type: 'login/validateCaptcha',
                payload:payload
            }),
            onUpdatePassword:(payload)=>dispatch({
                type:'login/updatePassword',
                payload:payload
            })
    };
};
@connect(mapStateToProps,mapDispatchToProps)
class ForgetForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {captcha,email,password}=values;
                const {captchaCode,onUpdatePassword}=this.props;
                /*if (captchaCode===0)
                {
                    onUpdatePassword({email,password})
                }
                else if(captchaCode===-1)
                {
                    alert("验证码错误！")
                }*/
                onUpdatePassword({captcha,email,password})

            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    getCaptcha=()=>{

        const { getFieldValue } = this.props.form;
        console.log(getFieldValue('email'))
        this.props.onSend({email:getFieldValue('email')})

    }
    handleChange = (e) => {
        e.persist;
        console.log("111111111111")
        console.log(e)
        console.log("111111111111")
        //this.props.onValidateCaptcha({captcha: e})
    }
    componentDidUpdate = prevProps =>{
        console.log(this.props.login)
        if(prevProps.login!== this.props.login) {
            const {list} = this.props
            console.log(list)
            if (list === -1) {
                alert('邮箱不存在')
            }
            console.log(this.props.captchaCode)
            if (this.props.captchaCode===-1)
            {
                alert('验证码错误')
            }
        }

    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className={styles.main}>
                <img alt="logo"  src={ucmp}/>
                <Form {...formItemLayout} hideRequiredMark onSubmit={this.handleSubmit} >
                    <Form.Item
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Captcha"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                })(
                                    <Input
                                        //onChange={value=>this.handleChange(value)}
                                    />
                                )}
                            </Col>
                            <Col span={12}>
                                <Button onClick={this.getCaptcha}>Get captcha</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input.Password type="password" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input.Password type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(ForgetForm);

export default WrappedRegistrationForm;
import React, {Component} from 'react'
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import styles from './AdminSetting.less'
import { connect } from 'dva';
import router from 'umi/router';
const FormItem = Form.Item;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const mapStateToProps = (state) => {
    return {
        id:state.login.id,
        code:state.admin.code
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate:(payload)=>dispatch({
            type:'admin/updateAdmin',
            payload:payload
        }),
        changeCodes:(payload)=>dispatch({
            type:'login/changeCode',
            payload:payload
        })
    };
};
@connect(mapStateToProps,mapDispatchToProps)
class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidUpdate=()=> {
        console.log(this.props.code)
        if(this.props.code=='0')//此处code是更新验证的code
        {
            alert('成功修改，请重新登录')
            this.props.changeCodes({code:1});//修改code值，此处code是登陆验证的code
            router.replace('/login')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {name,password}=values;
                //const {id}=this.props
                this.props.onUpdate({name,password,id:localStorage.getItem('id')})


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
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.form}>
                <Form.Item
                    label={(
                        <span>
              姓名&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                        <Input />
                    )}
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
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;
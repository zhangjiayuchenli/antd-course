import React, {Component} from 'react'
import {
    Form, Input, Tooltip, Icon,  Select,  Button, Upload,message,DatePicker
} from 'antd';
import styles from './StudentSetting.less'
import { connect } from 'dva';

import moment from 'moment';

const { Option } = Select;

const mapStateToProps = (state) => {
    return {

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate:(payload)=>dispatch({
            type:'student/updateStu',
            payload:payload
        })
    };
};
@connect(mapStateToProps,mapDispatchToProps)
class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        studentAvatar:JSON.parse(sessionStorage.getItem('user')).studentAvatar,
    };

    

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {confirm ,...value} = values
                this.props.onUpdate(value)
            }
        });


    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('studentPassword')) {
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
        const {studentPassword,studentName,studentAddress,studentSex,
            studentPhone,studentEmail,studentBirthday}=JSON.parse(sessionStorage.getItem('user'));
        return (
            <div className={styles.baseView} >
                <div className={styles.left}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                        <Form.Item
                            label={(
                                <span>
              姓名&nbsp;
                                    <Tooltip title="What do you want others to call you?">
              </Tooltip>
            </span>
                            )}
                        >
                            {getFieldDecorator('studentName', {
                                initialValue:studentName,
                                rules: [{  message: 'Please input your nickname!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="密码"
                        >
                            {getFieldDecorator('studentPassword', {
                                initialValue:studentPassword,
                                rules: [{
                                    message: 'Please input your password!',
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
                                initialValue:studentPassword,
                                rules: [{
                                    message: 'Please confirm your password!',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input.Password type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </Form.Item>
                        <Form.Item label="Sex">
                            {getFieldDecorator('studentSex', {
                                initialValue:studentSex,
                                rules: [{  message: 'Please enter user sex' },
                                ],
                            })(<Select
                                style={{ width: '32%' }}
                                allowClear={true}
                                showSearch={true}

                            >
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator('studentAddress', {
                                initialValue:studentAddress,
                                rules: [{  message: 'Please select an owner' }],
                            })(
                                <Input placeholder="Please enter address" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="E-mail"
                        >
                            {getFieldDecorator('studentEmail', {
                                initialValue:studentEmail,
                                rules: [{
                                    type: 'email', message: 'The input is not valid E-mail!',
                                }, {
                                    message: 'Please input your E-mail!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="电话:"
                        >
                            {getFieldDecorator('studentPhone', {
                                initialValue:studentPhone,
                                rules: [{  message: 'Please input your phone number!' }],
                            })(
                                <Input  style={{ width: '100%' }} />
                            )}
                        </Form.Item>
                        <Form.Item label="Birthday">
                            {getFieldDecorator('studentBirthday', {
                                initialValue:moment(studentBirthday),
                                rules: [{ required: true, message: 'Please choose the dateTime' }],
                            })(
                                <DatePicker onChange={this.onChange} />
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.right}>

                    <img alt='avatar'
                         src={this.state.studentAvatar}
                         style={{ width: '100px', height: '100px', borderRadius: '32px' }}
                    /><br/>
                    <Upload
                        name='file'
                        action='/dev/student/uploadAvatar'
                        onChange={(info)=>{
                            if (info.file.status !== 'uploading') {
                                console.log(info.file, info.fileList);
                            }
                            if (info.file.status === 'done') {
                                this.setState({studentAvatar:info.file.response.res})
                                message.success(`${info.file.name} file uploaded successfully`);
                            } else if (info.file.status === 'error') {
                                message.error(`${info.file.name} file upload failed.`);
                            }
                        }}>
                        <Button>
                            <Icon type="upload" /> 上传头像
                        </Button>
                    </Upload>
                </div>
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;
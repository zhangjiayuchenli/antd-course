import React,{Component} from 'react'
import {
    Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon,
} from 'antd';
import StudentTable from '../Dashboard/AdminDashboard/Student'
import moment from 'moment';
import { connect } from 'dva';
const { Option } = Select;
const mapStateToProps=(state)=>{
    return {

    }

}
const mapDispatchToProps = (dispatch) => {
    return{
            /*修改学生*/
            onUpdate:(payload)=>dispatch({
                type:'student/updateStu',
                payload:payload
            }),
            /*添加学生*/
            onInsert:(payload)=>dispatch({
            type:'student/insertStu',
            payload:payload
            })

    }
};
@connect(mapStateToProps, mapDispatchToProps)
class DrawerForm extends Component {
    state = { visible: false ,record: ''};

    showDrawer = (record) => {
        this.setState({
            visible: true,
            record:record
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    onChange=(date, dateString)=> {
        console.log(date, dateString);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {id} = this.state.record;

                console.log('id:'+id)

              const {sex,name,password,address,birthday,email,phone,teacherId} = values
                if(!id)
                {
                    this.props.onInsert({id,name,password,address,
                        phone,sex,email,birthday,teacherId});
                }
                else
                {
                    this.props.onUpdate({id,name,password,address,
                        phone,sex,email,birthday,teacherId});
                }

                this.onClose()
            }

            //this.props.submitForm({username:values.userName,password:values.password});



        });
        this.props.form.resetFields();
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;

        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validatePasswordFormat=(rule, value, callback)=>{
        const form = this.props.form;
        let reg = /^.*(?=.{8,15})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/;

        if (value &&reg.test(value)  ) {
            callback();
        } else {
            callback('长度为8-15位，密码必须包含大小写字母,数字以及特殊字符');
        }

    }
    validateName=(rule,value,callback)=>{
        let reg=/^(?=.{1,8})$/;
        if (value &&value.length<9) {
            callback();
        } else {
            callback('长度不能长于8');
        }
    }
    validatePhone=(rule,value,callback)=>{
        const regxMobilePhone = /^1(3|4|5|7|8)\d{9}$/;
        const regxPhone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;

        if (value &&regxMobilePhone.test(value)&&regxPhone.test(value)) {
            callback();
        } else {
            callback('手机号码、或者固定电话');
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
    handleCurrencyChange = (currency) => {
        if (!('value' in this.props)) {
            this.setState({ currency });
        }
        this.triggerChange({ currency });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { size } = this.props;
        const {studentName,studentPassword,studentSex,
            teacherClassname,studentAddress,studentEmail,studentPhone}=this.state.record;
        return (
            <div>
                <StudentTable show={this.showDrawer}/>
                <Drawer
                    title="Create a new account"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{
                        overflow: 'auto',
                        height: 'calc(100% - 108px)',
                        paddingBottom: '108px',
                    }}
                >
                    <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Name">
                                    {getFieldDecorator('name', {
                                        initialValue:studentName,
                                        rules: [{ required: true, message: 'Please enter user name' },
                                            {validator: this.validateName,}],
                                    })(<Input placeholder="Please enter user name" />)}
                                </Form.Item>
                                <Form.Item label="Sex">
                                    {getFieldDecorator('sex', {
                                        initialValue:studentSex,
                                        rules: [{ required: true, message: 'Please enter user sex' },
                                        ],
                                    })(<Select
                                        size={size}
                                        style={{ width: '32%' }}
                                        allowClear={true}
                                        showSearch={true}

                                    >
                                        <Option value="男">男</Option>
                                        <Option value="女">女</Option>
                                    </Select>)}
                                </Form.Item>
                                <Form.Item label="Class">
                                    {getFieldDecorator('teacherId', {
                                        initialValue:teacherClassname,
                                        rules: [{ required: true, message: 'Please enter class' },
                                        ],
                                    })(<Select
                                        size={size}
                                        style={{ width: '32%' }}
                                        allowClear={true}
                                        showSearch={true}

                                    >
                                        <Option key="6" >软嵌152</Option>
                                        <Option key="7">软嵌151</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Password">
                                    {getFieldDecorator('password', {
                                        initialValue:studentPassword,
                                        rules: [{ required: true, message: 'Please enter password' },
                                            {
                                                validator: this.validateToNextPassword,
                                            },
                                            /*{    validator:this.validatePasswordFormat}*/],
                                    })(
                                        <Input.Password
                                            style={{ width: '100%' }}
                                            /*addonBefore="http://"
                                            addonAfter=".com"*/
                                            placeholder="Please enter url"
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="Confirm Password"
                                >
                                    {getFieldDecorator('confirm', {
                                        initialValue:studentPassword,
                                        rules: [{
                                            required: true, message: 'Please confirm your password!',
                                        }, {
                                            validator: this.compareToFirstPassword,
                                        }],
                                    })(
                                        <Input.Password type="password" onBlur={this.handleConfirmBlur} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Address">
                                    {getFieldDecorator('address', {
                                        initialValue:studentAddress,
                                        rules: [{ required: true, message: 'Please select an owner' }],
                                    })(
                                        <Input placeholder="Please enter address" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Phone">
                                    {getFieldDecorator('phone', {
                                        initialValue:studentPhone,
                                        rules: [{ required: true, message: 'Please choose the type' }, {
                                            validator: this.validatePhone,
                                        }],
                                    })(
                                        <Input placeholder="Please enter phone" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Email">
                                    {getFieldDecorator('email', {
                                        initialValue:studentEmail,
                                        rules: [{ required: true, message: 'Please choose the approver' }],
                                    },{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, )(
                                        <Input placeholder="Please enter email" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Birthday">
                                    {getFieldDecorator('birthday', {
                                        initialValue:moment(new Date()),
                                        rules: [{ required: true, message: 'Please choose the dateTime' }],
                                    })(
                                        <DatePicker onChange={this.onChange} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const App = Form.create()(DrawerForm);
export default App;


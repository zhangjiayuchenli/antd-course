import React, {Component,Fragment} from 'react'
import {
    Form, Icon, Input, Button, Checkbox,Radio,Carousel
} from 'antd';
import Logo from '../../components/Logo'
import { connect } from 'dva';
import router from 'umi/router';
import styles from './Login.less';
import GlobalFooter from '../../components/GlobalFooter';
const links = [
    {
        key: 'help',
        title: '帮助',
        href: '',
    },
    {
        key: 'privacy',
        title: '隐私',
        href: '',
    },
    {
        key: 'terms',
        title: '',
        href: '',
    },
];

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
    </Fragment>
);
const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        types: state.login.types

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (payload) => {
            dispatch({
                type: 'login/save',
                payload: payload
            })
        },
        validate:(payload)=>{
            dispatch(
                {
                    type: 'login/login',
                    payload: payload
                }
            )
        },
    };
};
@connect(mapStateToProps, mapDispatchToProps)
class NormalLoginForm extends Component {
    componentWillUpdate=() =>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user&&user.isLogin== false){
            alert('错误')
            localStorage.removeItem('user')
        }
    }
    handleClick=()=>{
        router.push('/forget')
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.validate({id:values.userId,password:values.password,types:values.radio});
                this.props.submitForm({id:values.userId,types:values.radio})
            }

        });


    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const user=this.props.user;
        const types=this.props.types;
        if (user&&user.code=='0'){
            router.push('/');
        }
        return (

            <div >
                <div className={styles.slick}>
                    <Carousel autoplay >
                    <div><Logo /></div>
                    <div><img
                        alt=""
                        style={{ width: '100px', height: '100px', borderRadius: '32px' }}
                        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                    /></div>
                </Carousel>
                </div>
                <div className={styles.main}>
                    <Logo />
                    <Form onSubmit={this.handleSubmit}   >
                        <Form.Item>
                            {getFieldDecorator('userId', {
                                rules: [{ required: true, message: 'Please input your userId!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item

                        >
                            {getFieldDecorator('radio',{
                                initialValue: 'teacher'
                            })(
                                <Radio.Group>
                                    <Radio value="admin">管理员</Radio>
                                    <Radio value="teacher">教师</Radio>
                                    <Radio value="stu">学生</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" onClick={this.handleClick}>忘记密码</a>&nbsp;<br/>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>&nbsp;

                            <p>PS:账号为教师工号或学生学号，初始密码为123456</p>

                        </Form.Item>
                    </Form>
                </div>
                {/*<div className={styles.footer}>
                    <GlobalFooter links={links} copyright={copyright} />
                </div>*/}
            </div>

        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;
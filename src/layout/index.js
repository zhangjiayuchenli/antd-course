import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
import React from "react";
import Logo from '../components/Logo'
//import Header from '../components/GlobalHeader'
import Header from './Header'
import styles from './index.less'
import {connect} from 'dva'
import Footer from './Footer'
const {  Sider, Content, } = Layout;
// 引入子菜单组件
const SubMenu = Menu.SubMenu;
const mapStateToProps = (state) => {
    return {
        types: state.login.types
    }
};
@connect(mapStateToProps)
export default class BasicLayout extends Component {
    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    render() {
        const {
            children,
            types,
        } = this.props;
        /*管理员模块*/
        const adminSub=(
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Helloworld</span>
                </Menu.Item>
            <SubMenu
            key="sub1"
            title={<span><Icon type="dashboard" /><span>用户列表</span></span>}
        >
            <Menu.Item key="2"><Link to="/dashboard/admin/teacher">教师列表</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/dashboard/admin/student">学生列表</Link></Menu.Item>
        </SubMenu>
                <SubMenu
                    key="sub2"
                    title={<span><Icon type="smile" /><span>消息发布</span></span>}
                >
                    <Menu.Item key="2"><Link to="/comment/admin/all">全校发布</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/comment/admin/toStu">学生发布</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/comment/admin/toTea">教师发布</Link></Menu.Item>
                </SubMenu>
            <SubMenu
        key="sub2"
        title={<span><Icon type="smile" /><span>个人中心</span></span>}
    >
            <Menu.Item key="2"><Link to="/account/center/admin">个人信息</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/account/setting/admin">修改信息</Link></Menu.Item>
            </SubMenu>
            </Menu>
        )
        const teacherSub=(
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>HelloWorld</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="dashboard" /><span>用户列表</span></span>}
                >
                    <Menu.Item key="2"><Link to="/dashboard/teacher/student">学生列表</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/dashboard/teacher/classEcharts">班级分析</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/dashboard/teacher/studentEcharts">学生个人详情分析</Link></Menu.Item>

                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={<span><Icon type="smile" /><span>个人中心</span></span>}
                >
                    <Menu.Item key="2"><Link to="/account/center/teacher">个人信息</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/account/setting/teacher">修改信息</Link></Menu.Item>
                </SubMenu>
            </Menu>
        )
        const stuSub=(
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>HelloWorld</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="dashboard" /><span>个人查询</span></span>}
                >
                    <Menu.Item key="3"><Link to="/dashboard/student/query">考试规则查询</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/dashboard/student/studentInfo">个人成绩详情分析</Link></Menu.Item>

                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={<span><Icon type="smile" /><span>个人中心</span></span>}
                >
                    <Menu.Item key="2"><Link to="/account/center/student">个人信息</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/account/setting/student">修改信息</Link></Menu.Item>
                </SubMenu>
            </Menu>
        )
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh' }} >
                    <div style={{ height: '40px', background: 'rgba(255,255,255,.2)', margin: '16px'}}
                    >
                       <Logo/>

                    </div>

                        {localStorage.getItem('types')==='admin'?adminSub:localStorage.getItem('types')==='teacher'?
                            teacherSub:localStorage.getItem('types')==='stu'?stuSub:null}
                </Sider>
                <Layout >
                    <Header style={{ padding: 0, width:'90%',}}/>

                    <Content style={{ margin: '24px 16px 0' }} className={styles.content}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {children}
                        </div>
                    </Content>
                    <Footer />
                    {/*<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>*/}
                </Layout>
            </Layout>
        )
    }
}
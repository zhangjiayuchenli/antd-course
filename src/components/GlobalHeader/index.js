import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message,Layout ,Avatar} from 'antd';
import styles from './index.less'
import router from 'umi/router';
import NoticeIcon from '../NoticeIcon';
import {connect} from 'dva'
const {Header} = Layout;
const mapStateToProps = (state) => {
    return {
        types: state.login.types,
        message:state.teacher.message,
        count:state.teacher.count
    }
};
const mapDispatchToProps=(dispatch)=>{
    return{
        changeCodes:(payload)=>dispatch({
                type:'login/changeCode',
                payload:payload
        }),
        //清理后台session
        clearSession:()=>dispatch({
            type:'login/logout'
        }),
        testMock:(payload)=>dispatch({
            type:'teacher/testMessage',
            payload:payload
        }),
        getUnReadCount:(payload)=>dispatch(
            {
                type:'teacher/getUnReadCount',
                payload:payload
            }

        )
    }

}
@connect(mapStateToProps, mapDispatchToProps)
export default class GlobalHeader extends Component{

    onClick = ({ key }) => {
        /*message.info(`Click on item ${key}`);*/
        const types=this.props.types;
        //const code='1'
        const {changeCodes,clearSession}=this.props;

        if(types=='admin')
        {
            if(key=="logout")
            {
                changeCodes({code:1});
                clearSession();
                sessionStorage.clear();
                localStorage.setItem('id','')
                localStorage.setItem('types','')
                router.replace('/login')
            }
            if(key=="userCenter")
            {
                router.push("/account/center/admin")
            }
            if(key=="userInfo")
            {
                router.replace('/account/setting/admin')
            }
        }
        if(types=='teacher')
        {
            if(key=="logout")
            {
                this.props.changeCodes({code:1});
                clearSession();
                sessionStorage.clear();
                localStorage.setItem('id','')
                localStorage.setItem('types','')
                router.replace('/login')
            }
            if(key=="userCenter")
            {
                router.push("/account/center/teacher")
            }
            if(key=="userInfo")
            {
                router.replace('/account/setting/teacher')
            }
        }
        if(types=='stu')
        {
            if(key=="logout")
            {
                this.props.changeCodes({code:1});
                clearSession();
                sessionStorage.clear();
                localStorage.setItem('id','')
                localStorage.setItem('types','')
                router.replace('/login')
            }
            if(key=="userCenter")
            {
                router.push("/account/center/student")
            }
            if(key=="userInfo")
            {
                router.replace('/account/setting/teacher')
            }
        }

    };

    menu = (
        <Menu onClick={this.onClick}>
            <Menu.Item key="userCenter"><Icon type="user" />个人中心</Menu.Item>
            <Menu.Item key="userInfo"><Icon type="setting" />修改密码</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout"><Icon type="logout" />退出登陆</Menu.Item>
        </Menu>
    );
    componentWillMount() {
        this.props.getUnReadCount({id:localStorage.getItem('id'),type:localStorage.getItem('types')})

    }

    componentDidUpdate() {
        this.props.getUnReadCount({id:localStorage.getItem('id'),type:localStorage.getItem('types')})

    }

    handleChange=(e)=>{
        if (e===true)
        {
            this.props.testMock({id:localStorage.getItem('id'),type:localStorage.getItem('types')})
        }
    }

    render() {
        const {count,onNoticeClear}=this.props
        const notice=(<NoticeIcon
            className={styles.action}
            count={count}
            onClear={onNoticeClear}
            onPopupVisibleChange={this.handleChange}
            onViewMore={() => message.info('Click on view more')}
            clearClose
        >
            <NoticeIcon.Tab
                title="通知"
                list={this.props.message}
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                showViewMore

            />
            <NoticeIcon.Tab
                title="私信"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                showViewMore
            />
        </NoticeIcon>)
        const ava=(<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  size="small" icon="user" />
        )
        return(
                <Header className={styles.fixedHeader}>
                    <div className={styles.drop}>
                        {localStorage.getItem('types')!=='a'?notice:null}
                        <Dropdown overlay={this.menu} >
                            <a className="ant-dropdown-link" href="#">
                                {
                                    localStorage.getItem('types')==='b'?
                                        <Avatar src={JSON.parse(sessionStorage.getItem('user')).teacherAvatar}size="small" icon="user" />
                                        :localStorage.getItem('types')==='a'?ava
                                        :localStorage.getItem('types')==='c'?<Avatar src={JSON.parse(sessionStorage.getItem('user')).studentAvatar}size="small" icon="user" />:null
                                }
                                <span>here</span>
                            </a>
                        </Dropdown>
                    </div>
                </Header>


        )
    }
}
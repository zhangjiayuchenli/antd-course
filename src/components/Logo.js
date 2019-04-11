import React, {Component} from 'react';
import logo from '../assets/logo.svg'
import ucmp from '../assets/ucmp-logo-cloud.png'
import styles from './logo.less'
export default class Logo extends Component{
    render() {

        return(
            <div><img alt="logo" className={styles.logo} src={ucmp}/>
                <span className={styles.title}>学生日常行为评分管理系统</span>
            </div>

        )
    }

}
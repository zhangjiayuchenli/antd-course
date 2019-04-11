import React,{Component} from 'react'
import { Tabs, Icon } from 'antd';
import Basic from './StudentEcharts'
import StudentTable from './StudentTable'
const TabPane = Tabs.TabPane;

export default class StudentInfo extends Component{
    render() {
        return(
            <Tabs defaultActiveKey="2">
                <TabPane tab={<span><Icon type="search" /> 平时成绩查询</span>} key="1">
                    <StudentTable/>
                </TabPane>
                <TabPane tab={<span><Icon type="dashboard" />成绩分析</span>} key="2">
                    <Basic/>
                </TabPane>
            </Tabs>
            )

    }

}

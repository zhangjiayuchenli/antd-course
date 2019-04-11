import React ,{Component}from 'react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Legend,
} from 'bizcharts';
import { Table, Divider ,Icon,Popconfirm,Button,Input,Select,Spin} from 'antd';
import {connect} from 'dva'
const { Option } = Select;
const mapStateToProps = (state) => {
    return {
        statisticsList:state.teacher.statisticsList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit:(payload)=>dispatch({
            type:'teacher/getStatistic',
            payload:payload
        }),
    };
};
// 数据源
const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },

]

// 定义度量
/*const cols = {
    sold: {  },
    genre: {  }
};*/
const cols = {
    numbers: {  },
    grade: {  }
};
@connect(mapStateToProps,mapDispatchToProps)
export default class StudentEcharts extends Component{

    componentWillMount() {
        this.props.onSubmit({id:localStorage.getItem('id'),year:'1'});
    }
    handleChange=(value)=>{
        this.props.onSubmit({id:localStorage.getItem('id'),year:value})
    }
    render() {
        console.log(this.props.statisticsList)
        console.log(data)
        return(
            <div>
                <Select
                    onChange={this.handleChange}
                    defaultValue='1'

                    style={{ width: '20%' }}
                    suffixIcon={<Icon type="search" />}
                    allowClear={true}
                    showSearch={true}
                >
                    <Option key="1" >第一学期</Option>
                    <Option key="2">第二学期</Option>
                </Select>
                <Chart width={600} height={400} data={this.props.statisticsList} scale={cols} forceFit >
                    <Axis name="grade" />
                    <Axis name="numbers" />
                    <Legend position="top" dy={-20} />
                    <Tooltip />
                    <Geom type="interval" position="grade*numbers" color="grade" />
                </Chart>
            </div>


        )
    }
}
import React, {Component} from 'react'
import { Table, Divider ,Icon,Popconfirm,Button,Input,Select,Spin} from 'antd';
import { connect } from 'dva';

import Highlighter from 'react-highlight-words';

const { Option } = Select;
const mapStateToProps = (state) => {
    return {
        stuList: state.teacher.stuList,
        id:state.login.id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit:(payload)=>dispatch({
            type:'teacher/getStuAndCourse',
            payload:payload
        }),
        onGetStuIdAndYear:(payload)=>dispatch({
            type:'teacher/selectStuIdAndYearByTeacherId',
            payload:payload
        }),
        onDelete:(payload)=>dispatch({
            type: 'teacher/deleteStuAndCourses',
            payload:payload
        }),

        onDeleteCheck:(payload)=>dispatch({
            type:'teacher/deleteStuAndCourseByCheck',
            payload:payload
        })


    };
};

let list = [];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys: ',selectedRowKeys, 'selectedRows: ', );
        list = selectedRowKeys
        console.log(list)
    },
    getCheckboxProps: record => ({
        disabled: record.studentName === '宁云', // Column configuration not to be checked
        name: record.studentName,
    }),

};

@connect(mapStateToProps, mapDispatchToProps)
class StudentTable extends Component{
    state = {
        searchText: '',
    };
    /*componentDidUpdate=(value)=> {
        this.props.onSubmit({id:this.props.id,year:value})
    }*/
    componentDidMount= ()=> {
        console.log("id:"+this.props.id)
        this.props.onSubmit({id:localStorage.getItem('id'),year:'1'});
        this.props.onGetStuIdAndYear({id:localStorage.getItem('id')});

    }

    handleChange=(value)=>{
        this.props.onSubmit({id:localStorage.getItem('id'),year:value})
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys, selectedKeys, confirm, clearFilters,
                         }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    render() {
        console.log(this.props.stuList)
        const {onDelete,id,} = this.props;
        const columns = [
            {
                title: 'stuId',
                dataIndex: 'stuId',
                ...this.getColumnSearchProps('stuId'),
            },
            {
                title: 'Name',
                dataIndex: 'studentName',
                ...this.getColumnSearchProps('studentName'),
                render: text => <a href="javascript:;">{text}</a>,
                sorter: (a, b) => a.studentName.length - b.studentName.length,
                sortDirections: ['descend'],
            },
            {
                title: 'physics',
                dataIndex: 'physics',
                sorter: (a, b) => a.physics - b.physics,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'math',
                dataIndex: 'math',
                sorter: (a, b) => a.math - b.math,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'english',
                dataIndex: 'english',
                sorter: (a, b) => a.english - b.english,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'chemistry',
                dataIndex: 'chemistry',
                sorter: (a, b) => a.chemistry - b.chemistry,
                sortDirections: ['chemistry', 'chemistry'],
            },
            {
                title: 'chinese',
                dataIndex: 'chinese',
                sorter: (a, b) => a.chinese - b.chinese,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'biology',
                dataIndex: 'biology',

                sorter: (a, b) => a.biology - b.biology,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Action',
                key: 'action',
                width:'7%',
                render: (text, record) => (
                    <span>

      <a href="javascript:;" onClick={this.props.show.bind(this,record)}><Icon type="edit" /></a>
      <Divider type="vertical" />
      <Popconfirm title="Are you sure？"
                  onConfirm={e=>onDelete(record)}
                  onCancel={this.cancel}
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                  <a href="#"><Icon type="delete" /></a>
      </Popconfirm>
    </span>
                )


            }];
        const {stuList=[]} = this.props
        return (
            <div>
                <Button type="primary" onClick={this.props.show}>
                    <Icon type="user-add" />添加
                </Button>&nbsp;
                <Button type="danger"
                        onClick={e=>this.props.onDeleteCheck({
                            list:list,
                            yearList:stuList.length>0?[stuList[0].schoolYear]:null,
                            teacherIdList:stuList.length>0?[stuList[0].teacherId]:null})}>
                    <Icon type="user-delete"  />删除</Button>&nbsp;
                <Select
                    onChange={this.handleChange}
                    defaultValue='1'

                    style={{ width: '20%' }}
                    allowClear={true}
                    showSearch={true}
                >
                    <Option key="1" >第一学期</Option>
                    <Option key="2">第二学期</Option>
                </Select>

                <Table rowSelection={rowSelection}
                       columns={columns}
                       dataSource={stuList} rowKey={record => record.id} scroll={{ x: 1300} }/>
            </div>
        )
    }


}
export default  StudentTable;

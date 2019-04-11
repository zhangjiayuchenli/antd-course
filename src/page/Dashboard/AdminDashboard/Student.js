// Analysis.js
import React, {Component} from 'react'
import { Table, Divider ,Icon,Popconfirm,Button,Input} from 'antd';
import { connect } from 'dva';

import Highlighter from 'react-highlight-words';


const mapStateToProps = (state) => {
    return {
        userList: state.student.userList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit:()=>dispatch({
            type:'student/getStu'
        }),
        onDelete:(payload)=>dispatch({
            type: 'student/deleteStu',
            payload:payload
        }),

        onDeleteCheck:()=>dispatch({
            type:'student/deleteStuByCheck',
            payload:list
        }),


    };
};

let list = []
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys: ',selectedRowKeys, 'selectedRows: ', selectedRows,'id:',selectedRows[0].id);
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
    componentWillMount= ()=> {
        console.log('*************')
        this.props.onSubmit();
        console.log(this.props.userList)
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
        this.props.onSearch(selectedKeys);
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    render() {

        const {onDelete} = this.props;
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                ...this.getColumnSearchProps('id'),
            },
            {
                title: 'Name',
                dataIndex: 'studentName',
                ...this.getColumnSearchProps('studentName'),
                render: text => <a href="javascript:;">{text}</a>,
                sorter: (a, b) => a.studentName.length - b.studentName.length,
                sortDirections: ['descend'],
            }, {
                title: 'Password',
                dataIndex: 'studentPassword',
            },
            {
                title: 'Class',
                dataIndex: 'teacherClassname',
            },{
                title: 'ClassTeacher',
                dataIndex: 'teacherName',
            },
            {
                title: 'Sex',
                dataIndex: 'studentSex',
            },
            {
                title: 'Address',
                dataIndex: 'studentAddress',
            },
            {
                title: 'Email',
                dataIndex: 'studentEmail',
            },
            {
                title: 'Birthday',
                dataIndex: 'studentBirthday',
            },
            {
                title: 'Phone',
                dataIndex: 'studentPhone',
            },{
                title: 'Action',
                key: 'action',
                width:'7%',
                render: (text, record) => (
                    <span>
      <a href="javascript:;" onClick={this.props.show.bind(this,record)}><Icon type="edit" /></a>
      <Divider type="vertical" />
      <Popconfirm title="Are you sure？" onConfirm={hah=>this.props.onDelete(record)}
                  onCancel={this.cancel} icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                                    <a href="#"><Icon type="delete" /></a>
                                </Popconfirm>
    </span>
                )


            }];


        return (
            <div>
                <Button type="primary" onClick={this.props.show}>
                    <Icon type="user-add" />添加
                </Button>&nbsp;
                <Button type="danger" onClick={this.props.onDeleteCheck}>
                    <Icon type="user-delete"  />删除</Button>

                <Table rowSelection={rowSelection}
                       columns={columns}
                       dataSource={this.props.userList} rowKey={record => record.id} scroll={{ x: 1300} }/>
            </div>
        )
    }


}
export default  StudentTable;
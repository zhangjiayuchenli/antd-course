import React,{Component} from 'react'
import { Modal, Form, Row, Col, Input, Button, Icon,InputNumber,Select} from 'antd';
import {connect} from 'dva'
import StudentTable from '../Dashboard/TeacherDashboard/Student'
const { Option } = Select;
const mapStateToProps=(state)=>{
    return {
        StuIdAndYearList:state.teacher.StuIdAndYearList,
        stuList: state.teacher.stuList,
        StuIdAndYearList2:state.teacher.StuIdAndYearList2
    }

}
const mapDispatchToProps = (dispatch) => {
    return{
        /*修改学生成绩*/
        onUpdate:(payload)=>dispatch({
            type:'teacher/updateStuCourse',
            payload:payload
        }),
        /*添加学生成绩*/
        onInsert:(payload)=>dispatch({
            type:'teacher/insertStuCourse',
            payload:payload
        }),
        //查询每个学生对应学生表信息(学号-学年)
        onGetStuOfYear:(payload)=>dispatch({
            type:'teacher/getStuOfYear',
            payload:payload
        }),

    }
};
@connect(mapStateToProps, mapDispatchToProps)
class StuCourseModal extends Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        record:'',
        year:'',
        teacherId:'',

    }
    handleChange = (e) => {
        const { getFieldValue } = this.props.form;
        console.log(e)
        this.props.onGetStuOfYear({studentId:e })
    }
    showModal = (record) => {
        this.setState({
            visible: true,
            record:record,
            year:this.props.stuList!=null?this.props.stuList[0].schoolYear:null,
            teacherId:this.props.stuList!=null?this.props.stuList[0].teacherId:null
        });
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleSubmit = (e) => {
        console.log(e)
        console.log(this.state.record)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {id} = this.state.record;
                const {StuIdAndYearList,StuIdAndYearList2}=this.props
                const {stuId,schoolYear} = values
                if(!id)
                {
                    //判断学号是否为本班学生学号
                    let  isStuId=StuIdAndYearList!=null?StuIdAndYearList.map(l=>l.id).some(s=>s===stuId):null
                    let  isYear=StuIdAndYearList2!=null?StuIdAndYearList2.map(l=>l.schoolYear).some(s=>s==schoolYear):null
                    if(isStuId)
                    {
                        if(isYear)
                        {
                            alert("该学年学生成绩已经存在，请重新输入")
                            console.log("该学年学生成绩已经存在，请重新输入")
                        }
                        else if(!isYear)
                        {
                            this.props.onInsert({...values});

                        }
                    }

                }
                else
                {
                    this.props.onUpdate({id,...values});
                }

                this.handleCancel()
            }

        });
        this.props.form.resetFields();
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        const { getFieldDecorator ,getFieldValue } = this.props.form;
        const {chinese,math,english,chemistry,studentName,stuId,physics,biology} = this.state.record;
        return (
            <div>
                <StudentTable show={this.showModal}/>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    confirmLoading={confirmLoading}
                >
                    <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Name">
                                {getFieldDecorator('studentName', {
                                    initialValue:studentName,
                                    rules: [{ required: true, message: 'Please enter user name' },
                                        {validator: this.validateName,}],
                                })(<Input placeholder="Please enter user name" />)}
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                           <Form.Item label="StuId">
                                {getFieldDecorator('stuId', {
                                    initialValue:stuId,
                                    rules: [{ required: true, message: 'Please enter studentId' },

                                       ],
                                })(
                                    <InputNumber
                                        style={{ width: '80%' }}
                                        placeholder="Please enter studentId"
                                        onChange={value=>this.handleChange(value)}
                                    />
                               )}
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item label="学年">
                                {getFieldDecorator('schoolYear', {
                                    rules: [{ required: true, message: 'Please enter user sex' },
                                    ],
                                })(<Select
                                    style={{ width: '100%' }}
                                    allowClear={true}
                                    showSearch={true}

                                >
                                    <Option key="1" >第一学期</Option>
                                    <Option key="2">第二学期</Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={8} >
                            <Form.Item label="Chinese">
                                {getFieldDecorator('chinese', {
                                    initialValue:chinese,
                                })(
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        placeholder="Please enter physics" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Math">
                                {getFieldDecorator('math', {
                                    initialValue:math,
                                })(
                                    <InputNumber
                                        style={{ width: '100%' }} placeholder="Please enter address" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="English">
                                {getFieldDecorator('english', {
                                    initialValue:english,

                                })(
                                    <InputNumber style={{ width: '100%' }} placeholder="Please enter phone" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Physics">
                                {getFieldDecorator('physics', {
                                    initialValue:physics,
                                }, )(
                                    <InputNumber style={{ width: '100%' }} placeholder="Please enter email" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Chemistry">
                                {getFieldDecorator('chemistry', {
                                    initialValue:chemistry,
                                })(
                                    <InputNumber style={{ width: '100%' }} placeholder="Please enter phone" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Biology">
                                {getFieldDecorator('biology', {
                                    initialValue:biology,
                                })(
                                    <InputNumber style={{ width: '100%' }} placeholder="Please enter phone" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                    <p>{ModalText}</p>

                </Modal>
            </div>
        );
    }
}
const App = Form.create()(StuCourseModal);
export default App;


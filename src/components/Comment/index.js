import React,{Component} from 'react'
import {
     Form, Button, Input,
} from 'antd';
import {connect} from 'dva'

const TextArea = Input.TextArea;

@connect(({admin}) => ({
    admin,
}))
class App extends Component {
    state = {
        ws:''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {description}=values;
                const {sendType}=this.props
                const {dispatch}=this.props;
                dispatch({
                    type:'admin/sendMessage',
                    payload:{description,sendType}
                })
            }
        });
    }
    componentWillMount() {
        let id=localStorage.getItem('id')
        const wsUrl = `ws://localhost:8080/websocket/${id}`;
        let {ws}=this.state
        if (!ws) {
            ws = new WebSocket(wsUrl);
            this.setState({
                ws
            });
            ws.onopen = function(e) {
                console.log("连接上 ws 服务端了");
            };
            let result;
            ws.onmessage = msg => {
                console.log("接收服务端发过来的消息: %o", msg);
                let msgJson = JSON.parse(msg.data);
                result += msgJson.MsgBody + "\n";
                console.log(msgJson);
                this.setState({
                    chatMessage: [...chatMessage, { ...msgJson, clickClose: true }]
                });
            };
            ws.onclose = function(e) {
                console.log("ws 连接关闭了");
                console.log(e);
            };
        }
    }

    render() {
        const {sendType}=this.props
        console.log(sendType)
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                message: 'please enter  description',
                            },
                        ],
                    })(<TextArea rows={4} placeholder="please enter description" />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        发布
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(App);
export default WrappedNormalLoginForm;
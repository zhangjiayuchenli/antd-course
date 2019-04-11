import React,{Component} from 'react'
import App from '../../components/Comment/index'
export default class SendMessageToTeacher extends Component{
    state={
        types:'teacher'
    }
    render() {
        return(
            <App
                sendType={this.state.types}
            />
        )
    }

}
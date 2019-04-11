import React,{Component} from 'react'
import App from '../../components/Comment/index'
export default class SendMessageToStu extends Component{
    state={
        types:'student'
    }
    render() {
        return(
            <App
                sendType={this.state.types}
            />
        )
    }

}
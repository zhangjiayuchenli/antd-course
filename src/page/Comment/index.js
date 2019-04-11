import React,{Component} from 'react'
import App from '../../components/Comment/index'
export default class SendMessage extends Component{
    state={
        types:'all'
    }
    render() {
        return(
            <App
                sendType={this.state.types}
            />
        )
    }

}
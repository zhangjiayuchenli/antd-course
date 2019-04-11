import React,{Component} from 'react'
import { Card ,Divider, Tag ,Upload, message, Button, Icon,} from 'antd';
export default class AvatarView extends Component{

    render() {
        return(
            <Upload
                name='file'
                action='/dev/teacher/uploadAvatar'
                onChange={(info)=>{
                    if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                    }
                    if (info.file.status === 'done') {
                        this.setState({filename:info.file.response.res})
                        message.success(`${info.file.name} file uploaded successfully`);
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                    }
                }}>
                <Button>
                    <Icon type="upload" /> 上传头像
                </Button>
            </Upload>
        )
    }

}
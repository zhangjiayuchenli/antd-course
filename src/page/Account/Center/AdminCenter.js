import { Card ,Divider, Tag ,Upload, message, Button, Icon,} from 'antd';
import React from "react";
export default () => {
    const style = {
        width: '400px',
        margin: '40px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid #e8e8e8',
    };
    const props = {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Card style={style} >
            <div>
                <Card.Meta
                    avatar={<img
                        alt=""
                        style={{ width: '100px', height: '100px', borderRadius: '32px' }}
                        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                    />}

                />
                <Tag color="magenta">管理员</Tag>
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
            </div>
            <Divider/>
            <div>
                <p>
                    管理员:<br/>
                    管理员拥有最高权限，可对教师学生进行增删改查操作
                </p>
            </div>

        </Card>
    );
}
import { Card ,Divider, Tag} from 'antd';
export default () => {
    const style = {
        width: '400px',
        margin: '40px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid #e8e8e8',
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
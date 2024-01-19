import React, { useContext, useEffect, useState } from 'react'
import { PlusCircleFilled } from '@ant-design/icons';
import { Col, Divider, Descriptions, Input, Row, Spin, Table, Button, Card, message, Space, Result, Typography } from 'antd';
import { AppContext } from '../../../Context/AppContext';
import axios from 'axios';
import FormProfile from './FormProfile';
const Profile = () => {
    const { Text } = Typography;
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState(undefined)
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const { token } = useContext(AppContext)
    const getUser = async () => {
        try {
            await axios.get('/accounts/me', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((e) => setModel(e.data))
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div style={{
            padding: '20px 100px',
        }}>
            <Card style={{ padding: 0 }} bordered
                title="Hồ sơ" extra={[
                    <Space key={`profile`}>
                        <Space.Compact>
                            <Button
                                title={'Thêm mới'}
                                type="primary"
                                icon={<PlusCircleFilled />}
                                key="add"
                            onClick={showDrawer}
                            >
                                Cập nhật
                            </Button>
                        </Space.Compact>
                    </Space>
                ]}>
                <Descriptions ize={'default'}>
                    <Descriptions.Item label={<b>Tên người dùng</b>}>
                        <Text strong>{model?.userName}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Số điện thoại</b>}>
                        <Text strong>{model?.phoneNumber}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Địa chỉ</b>}>
                        <Text strong>{model?.address}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Email</b>}>
                        <Text strong>{model?.email}</Text>
                    </Descriptions.Item>
                </Descriptions>
                {
                    open && <FormProfile model={model} getUser={getUser} onClose={onClose} open={open}/>
                }
            </Card>
        </div>
    )
}

export default Profile
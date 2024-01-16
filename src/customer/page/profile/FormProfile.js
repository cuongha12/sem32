import React, { useCallback, useContext, useEffect } from 'react'
import { Button, Space, Drawer, Form, Input, Switch, message, Select } from 'antd';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';

const FormProfile = ({ model, onClose, open }) => {
    const [form] = Form.useForm();
    const { loadAccount } = useContext(AppContext)
    const Close = useCallback(() => {
        onClose()
        form.resetFields();
    }, [form, onClose])
    const onFinish = useCallback(async (value) => {
        try {
            await axios.put("/api/AccountControllers/" + model.accountID, value).then(() => {
                loadAccount()
                message.success("Cập nhật dữ liệu thành công")
                Close()
            })
        } catch (error) {
            message.error('Cập nhật dữ liệu thất bại')
            if (model) {
                return
            }
            form.resetFields();
        }
    }, [Close, form, model])
    useEffect(() => {
        if (model) {
            form.setFieldsValue(model)
        }
    }, [model, form])
    return (
        <Drawer title="Cập nhật dữ liệu danh mục" width={'100%'} placement="right" onClose={Close} open={open}>
            <Form name="profile-form"
                form={form}
                autoComplete="off"
                layout="vertical"
                labelAlign="left"
                onFinish={onFinish}
            >
                <Form.Item
                    style={{ width: '20%' }}
                    label="Tên đăng nhập"
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: 'Tên đăng nhập không để trống',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item
                    style={{ width: '20%' }}
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Email không để trống',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Email" />
                </Form.Item>
                <Form.Item
                    style={{ width: '20%' }}
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Số điện thoại không để trống',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                    style={{ width: '20%' }}
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Địa chỉ không để trống',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item
                    style={{ width: '20%' }}
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Mật khẩu không để trống',
                        },
                    ]}
                >
                    <Input.Password allowClear placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            form='profile-form'
                        > Lưu lại</Button>
                        <Button type="default" onClick={() => {
                            onClose()
                            form.resetFields();
                        }} >Quay lại
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </Drawer>
    )
}

export default FormProfile
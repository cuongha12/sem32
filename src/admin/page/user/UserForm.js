import React, { useCallback, useContext } from 'react'
import { Button, Space, Drawer, Form, Input, Switch, message, Select } from 'antd';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';
const UserForm = ({ open, onClose, mode, model }) => {
    const [form] = Form.useForm();
    const { loadAccount } = useContext(AppContext)
    const Close = useCallback(() => {
        onClose()
        form.resetFields();
    }, [form, onClose])
    const onFinish = useCallback(async (value) => {
        try {
            if (mode === 'add') {
                await axios.post("/register", value).then(() => {
                    loadAccount()
                    message.success("Cập nhật dữ liệu thành công")
                    Close()
                })
            } else {
                await axios.put("/api/Categories/" + model.categoryID, value).then(() => {
                    loadAccount()
                    message.success("Cập nhật dữ liệu thành công")
                    Close()
                })
            }
        } catch (error) {
            message.error('Cập nhật dữ liệu thất bại')
            if (model) {
                return
            }
            form.resetFields();
        }
    }, [Close, loadAccount, form, mode, model])
    return (
        <Drawer title="Cập nhật dữ liệu danh mục" width={'100%'} placement="right" onClose={Close} open={open}>
            <Form name="account-form"
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
                    <Input  allowClear placeholder="Tên đăng nhập" />
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
                    <Input  allowClear  placeholder="Email" />
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
                    <Input  allowClear placeholder="Số điện thoại" />
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
                    <Input  allowClear placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item
                    style={{ width: '20%' }}
                    label="Chức vụ"
                    name="roleName"
                    rules={[
                        {
                            required: true,
                            message: 'Chức vụ không để trống',
                        },
                    ]}
                >
                    <Select
                        allowClear
                        placeholder="Chức vụ"
                        optionFilterProp="children"
                        options={[
                            {
                                value: 'user',
                                label: 'Người dùng',
                            },
                            {
                                value: 'admin',
                                label: 'Quản trị viên',
                            }
                        ]}
                    />
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
                    <Input.Password  allowClear placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item valuePropName="checked" name="status" label={"Trạng thái"}>
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            form='account-form'
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

export default UserForm
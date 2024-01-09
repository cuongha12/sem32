import React, { useContext } from 'react';
import { Button, Form, Input, message } from "antd";
import '../../../customer/page/login/login.css'

import { loginAdmin, loginUser } from '../../../redux/apiRequest';
import { AppContext } from '../../../Context/AppContext';

const LoginAdmin = () => {
    const [form] = Form.useForm();
    const { dispatch, navigate } = useContext(AppContext)
    const onFinish = async (values) => {
        await loginAdmin(values, dispatch, message, navigate)
    };
    return (
        <div className="layoutLoginUser">
            <div className="mainLoginUser">
                <h1 className={"titleLoginUser"}>
                    Đăng nhập tài khoản
                </h1>
                <Form name="login-admin-form"
                    form={form}
                    autoComplete="off"
                    layout="vertical"
                    labelAlign="left"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tài khoản"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Tên đăng nhập không để trống',
                            },
                        ]}
                    >
                        <Input placeholder="Tài khoản" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không để trống'
                            },
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            form='login-admin-form'
                            className={"submitLogin"}
                        >Đăng nhập</Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
}

export default LoginAdmin
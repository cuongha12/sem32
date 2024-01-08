import React from 'react'
import { Button, Form, Input } from "antd";
import './login.css'
import { NavLink } from 'react-router-dom';
const Register = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
		// loginUser(values, dispatch, navigate, Swal)
	};
  return (
    <div className="layoutLoginUser">
			<div className="mainLoginUser">
				<h1 className={"titleLoginUser"}>
					Đăng kí tài khoản
				</h1>
				<Form name="basic"
					form={form}
					autoComplete="off"
					layout="horizontal"
					labelAlign="left"
					onFinish={onFinish}
					initialValues={{
						remember: true,
						email: '',
						password: ''
					}}
				>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input placeholder="Tài khoản" />
					</Form.Item>

					<Form.Item
						label=""
						name="password"
						rules={[]}
					>
						<Input.Password placeholder="Mật khẩu" />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className={"submitLogin"}
						>Đăng nhập</Button>
					</Form.Item>

				</Form>
				<p className={'loginTitle'}>Bạn có tài khoản chưa?
					<NavLink to={'/login'}>
						Đăng nhập
					</NavLink>
				</p>
			</div>
		</div>
  )
}

export default Register
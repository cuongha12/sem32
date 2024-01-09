import React, { useCallback, useContext } from 'react'
import { Button, Form, Input, message } from "antd";
import '../login/login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AppContext } from '../../../Context/AppContext';
const Register = () => {
	const [form] = Form.useForm();
	const { navigate } = useContext(AppContext)
	const onFinish = useCallback(async (values) => {
		try {
			await axios.post('/register', values).then(() => {
				message.success('Đăng kí thành công')
				navigate('/login')
			})
		} catch (e) {
			console.log(e)
			message.error('Đăng kí thất bại')
		}
		form.resetFields({});
	}, [navigate, form])
	return (
		<div className="layoutLoginUser">
			<div className="mainLoginUser">
				<h1 className={"titleLoginUser"}>
					Đăng kí tài khoản
				</h1>
				<Form name="register-form" form={form}
					autoComplete="off"
					layout="vertical"
					labelAlign="left"
					onFinish={onFinish}

				>
					<Form.Item
						label="Tên đăng nhập"
						name="userName"
						rules={[
							{
								required: true,
								message: 'Tên đăng nhập không để trống',
							},
						]}
					>
						<Input placeholder="Tên đăng nhập" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Email không để trống'
							},
						]}
					>
						<Input placeholder="Email" />
					</Form.Item>

					<Form.Item
						label="Số điện thoại"
						name="phoneNumber"
						rules={[
							{
								required: true,
								message: 'Số điện thoại không để trống'
							},
						]}
					>
						<Input placeholder="Số điện thoại" />
					</Form.Item>

					<Form.Item
						label="Địa chỉ"
						name="address"
						rules={[
							{
								required: true,
								message: 'Địa chỉ không để trống'
							},
						]}
					>
						<Input placeholder="Địa chỉ" />
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
					<Form.Item
						label="Xác nhận mật khẩu"
						name="password2"
						dependencies={['password']}
						rules={[
							{
								required: true,
								message: 'Vui lòng không để trống'
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Mật khẩu bạn nhập không khớp!'));
								},
							}),
						]}
					>
						<Input.Password placeholder="Xác nhận mật khẩu" />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className={"submitLogin"}
							form="register-form"
						>Đăng kí</Button>
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
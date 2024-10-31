import {
    LaptopOutlined,
    UsergroupDeleteOutlined,
    UserOutlined,
    ShoppingOutlined,
    UsergroupAddOutlined, SolutionOutlined,
    LineChartOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, Space, theme, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import './css.css'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { logOutAdmin } from '../../redux/apiRequest';
const { Header, Content, Footer, Sider } = Layout;
// , LaptopOutlined, NotificationOutlined,



const HeaderAdmin = () => {
    const [loading, setLoading] = useState(true)
    const logOut = async () => {
        await logOutAdmin(dispatch, navigate)
    }
    const items = [
        {
            key: '1',
            label: (
                <NavLink style={{
                    textDecoration: 'none'
                }} to={'/admin/profile'}>
                    Hồ sơ
                </NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <span style={{
                    textDecoration: 'none'
                }} onClick={logOut}>
                    Đăng xuất
                </span>
            ),
        },
    ];

    const { user, dispatch, navigate } = useContext(AppContext)

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const location = useLocation()
    let check = []
    const items2 = [
        {
            id: 1,
            name: 'Thành viên',
            icon: UsergroupAddOutlined,
            path: '/account'
        },
        {
            id: 5,
            name: 'Danh mục',
            icon: LaptopOutlined,
            path: '/category'
        },
        {
            id: 10,
            name: 'Sản phẩm',
            icon: ShoppingOutlined,
            path: '/product'
        },
        {
            id: 11,
            name: 'Hóa đơn',
            icon: SolutionOutlined,
            path: '/order',
            status: true
        },
        {
            id: 12,
            name: 'Thống kê',
            icon: LineChartOutlined,
            path: '/chart',
            status: true
        }
    ].filter((a) => user?.roleName === "employee" ? a.status : a).map((e) => {
        return {
            key: e.id,
            name: e.name,
            path: e.path,
            icon: React.createElement(e.icon),
            label: <NavLink style={{
                textDecoration: 'none'
            }} to={e.path}>{e.name}</NavLink>,
            children: e?.children?.map((a, j) => {
                return {
                    key: a.id,
                    path: a.path,
                    label: <NavLink style={{
                        textDecoration: 'none',
                        color: '#fff'
                    }} to={a.path}>{a.name}</NavLink>,
                };
            }),
        };
    });
    items2.find((e) => {

        if (e?.path === location?.pathname) {

            return check.push(e?.key?.toString())
        } else {
            if (e?.children?.find((a) => a.path === location.pathname)) {
                e?.children?.find((a) => {
                    if (a.path === location.pathname) {
                        return check.push(a.key?.toString())
                    }
                })
            }
        }
    });


    useEffect(() => {
        if (!user) {
            navigate('/admin/login')
        }
        return () => {
            setLoading(false);
        }
    }, [user, navigate])

    return (
        <Spin spinning={loading}>
            <Layout>
                <Header className="header" >
                    <Space direction="vertical">
                        <Space wrap>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"
                            >
                                <Avatar style={{
                                    cursor: "pointer"
                                }} size="large" icon={<UserOutlined />} />
                            </Dropdown>
                            <span style={{
                                color: '#ffff'
                            }}>{user?.userName}</span>
                        </Space>
                    </Space>
                </Header>
                <Content
                    style={{

                        height: '1700px'
                    }}
                >
                    <Layout
                        style={{

                            height: '1600px',
                            // background: colorBgContainer,
                        }}
                    >
                        <Sider
                            style={{
                                // background: colorBgContainer,
                            }}
                            width={200}
                        >
                            <Menu
                                mode="inline"
                                theme="light"
                                defaultSelectedKeys={check}
                                defaultOpenKeys={check}
                                style={{
                                    height: '100%',

                                }}
                                items={items2}
                            />
                        </Sider>

                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                background: colorBgContainer,
                                height: 1000
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Spin>


    );
}

export default HeaderAdmin

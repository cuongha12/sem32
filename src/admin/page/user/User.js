import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Card, Space, Button, Badge, Table, message } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import CategoryForm from "../category/CategoryForm";
import { AppContext } from "../../../Context/AppContext";
import UserForm from './UserForm';
import axios from 'axios';
import dayjs from 'dayjs';

const User = () => {
    const { account, loadAccount } = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('')
    const [model, setModel] = useState(undefined)
    const showDrawer = () => {
        setOpen(true);
        setMode('add')
    };
    const onClose = () => {
        setOpen(false);
    };
    const getAccount = async (id) => {
        try {
            await axios.get('/accounts/' + id).then((e) => {
                setModel(e.data)
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }
    const handlerEdit = async (id) => {
        setMode('edit')
        await getAccount(id)
        setOpen(true);
    };
    const deleteAccount = useCallback(async (id) => {
        try {
            await axios.delete('/api/AccountControllers/' + id).then(() => {
                message.success("Xoá thành công")
                loadAccount()
            })
        } catch (error) {
            message.error("Xoá thất bại")
        }
    }, [loadAccount])
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'userName',
            key: 'categoryName'
        },
        {
            title: 'Chức vụ',
            dataIndex: 'roleName',
            key: 'roleName'
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (e) => (
                <Badge status={e.status ? 'success' : 'error'} text={e.status ? 'Hoạt động' : 'Khoá'} />
            )
        },
        {
            title: 'Hoạt động',
            key: 'actions',
            render: (e) => (
                <Space>
                    <Button icon={<EditFilled />}
                        onClick={() => handlerEdit(e.accountID)}
                        size={'middle'} type="primary">
                    </Button>
                    <Button icon={<DeleteFilled />}
                        onClick={() => deleteAccount(e.accountID)}
                        danger size={'middle'} type="primary" >
                    </Button>
                </Space>
            )
        },
    ];
    useEffect(() => {
        loadAccount()
    }, [loadAccount])

    return (
        <Card style={{ padding: 0 }} bordered
            title="Danh sách tài khoản" extra={[
                <Space key={`account`}>
                    <Space.Compact>
                        <Button
                            title={'Thêm mới'}
                            type="primary"
                            icon={<PlusCircleFilled />}
                            key="add"
                            onClick={showDrawer}
                        >
                            Thêm mới
                        </Button>
                    </Space.Compact>
                </Space>
            ]}>
            <Table rowKey="accountID" dataSource={account?.sort((a,b)=>dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())} pagination columns={columns} />
            {
                open && <UserForm open={open} mode={mode} model={model} onClose={onClose} />
            }
        </Card>
    );
};

export default User;
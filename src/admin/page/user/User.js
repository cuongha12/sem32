import React, { useContext, useEffect, useState } from 'react';
import { Badge, Button, Card, Space, Table } from "antd";
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import CategoryForm from "../category/CategoryForm";
import { AppContext } from "../../../Context/AppContext";

const User = () => {
    const { account,loadAccount } = useContext(AppContext)
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
                            // onClick={() => handlerEdit(e.categoryID)}
                            size={'middle'} type="primary">
                    </Button>
                    <Button icon={<DeleteFilled />}
                            // onClick={() => deleteCategory(e.categoryID)}
                            danger size={'middle'} type="primary" >
                    </Button>
                </Space>
            )
        },
    ];
    useEffect(()=>{
        loadAccount()
    },[])

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
            <Table rowKey="categoryID" dataSource={account} pagination columns={columns} />
            {
                open && <CategoryForm open={open} mode={mode} model={model} onClose={onClose} />
            }
        </Card>
    );
};

export default User;
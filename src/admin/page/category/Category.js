import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Card, Space, Button, Badge, Table, message } from 'antd';
import { EyeFilled, EditFilled, DeleteFilled, PlusCircleFilled, LockFilled } from '@ant-design/icons';
import { AppContext } from '../../../Context/AppContext';
import CategoryForm from './CategoryForm';
import axios from 'axios'
const Category = () => {
    const { category, loadCategory } = useContext(AppContext)
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
    const getCategory = async (id) => {
        try {
            await axios.get('/api/Categories/' + id).then((e) => {
                setModel(e.data)
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }
    const handlerEdit = async (id) => {
        setMode('edit')
        await getCategory(id)
        setOpen(true);
    };
    const deleteCategory = useCallback(async (id) => {
        try {
            await axios.delete('/api/Categories/' + id).then(() => {
                message.success("Xoá thành công")
                loadCategory()
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }, [loadCategory])
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'categoryName',
            key: 'categoryName'
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
                    <Button icon={<EditFilled />} onClick={() => handlerEdit(e.categoryID)} size={'middle'} type="primary">
                    </Button>
                    <Button icon={<DeleteFilled />} onClick={() => deleteCategory(e.categoryID)} danger size={'middle'} type="primary" >
                    </Button>
                </Space>
            )
        },
    ];
    useEffect(() => {
        loadCategory()
    }, [loadCategory])
    console.log(category);
    return (
        <Card style={{ padding: 0 }} bordered
            title="Dữ liệu danh mục" extra={[
                <Space key={`category`}>
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
            <Table rowKey="categoryID" dataSource={category} pagination columns={columns} />
            {
                open && <CategoryForm open={open} mode={mode} model={model} onClose={onClose} />
            }
        </Card>
    )
}

export default Category
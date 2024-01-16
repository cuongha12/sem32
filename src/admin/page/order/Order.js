import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Card, Space, Button, Badge, Table, message, Spin } from 'antd';
import { EyeFilled, EditFilled, DeleteFilled, PlusCircleFilled, LockFilled, EyeOutlined } from '@ant-design/icons';
import { AppContext } from '../../../Context/AppContext';
import axios from 'axios'
import CategoryForm from "../category/CategoryForm";
import dayjs from "dayjs";
import ModalOrder from "./ModalOrder";

const Order = () => {
    const dayTranslation = {
        Monday: 'thứ 2',
        Tuesday: 'thứ 3',
        Wednesday: 'thứ 4',
        Thursday: 'thứ 5',
        Friday: 'thứ 6',
        Saturday: 'thứ 7',
        Sunday: 'Chủ nhật',
    };

    const { order, loadOrder } = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('')
    const [model, setModel] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const showDrawer = () => {
        setOpen(true);
        setMode('add')
    };
    const onClose = () => {
        setOpen(false);
    };
    const getOrder = async (id) => {
        try {
            await axios.get('/api/Orders/' + id).then((e) => {
                setModel(e.data)
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }
    const handlerEdit = async (id) => {
        setMode('edit')
        await getOrder(id)
        setOpen(true);
    };
    const deleteCategory = useCallback(async (id) => {
        try {
            await axios.delete('/api/Orders/' + id).then(() => {
                message.success("Xoá thành công")
                loadOrder()
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }, [loadOrder])
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderID',
            key: 'orderID'
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (e) => (
                <Badge status={e.status ? 'success' : 'error'} text={e.status ? 'Đã xác nhận' : 'Chưa xác nhận'} />
            )
        },
        {
            title: 'Ngày đặt hàng',
            key: 'createAt',
            dataIndex: 'createAt',
            render: (e) => (
                <span>{dayjs(e).format(`DD [tháng] MM [năm] YYYY h:mm A`)}</span>
            )
        },
        {
            title: 'Hoạt động',
            key: 'actions',
            render: (e) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => handlerEdit(e.orderID)} size={'middle'} type="primary">
                    </Button>
                    <Button icon={<DeleteFilled />} onClick={() => deleteCategory(e.categoryID)} danger size={'middle'} type="primary" >
                    </Button>
                </Space>
            )
        },
    ];
    useEffect(() => {
        loadOrder()
        return () =>{
            setLoading(false)
        }
    }, [loadOrder])
    return (
        <Spin spinning={loading}>
            <Card style={{ padding: 0 }} bordered
                  title="Dữ đơn hàng">
                <Table rowKey="orderID" dataSource={order} pagination columns={columns} />
                {
                    open && <ModalOrder open={open} model={model} onClose={onClose} />
                }
            </Card>
        </Spin>
    );
};

export default Order;
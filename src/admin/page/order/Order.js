import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Card, Space, Button, Badge, Table, message, Spin, Popconfirm } from 'antd';
import { DeleteFilled, PoweroffOutlined, LockFilled, EyeOutlined } from '@ant-design/icons';
import { AppContext } from '../../../Context/AppContext';
import axios from 'axios'
import dayjs from "dayjs";
import ModalOrder from "./ModalOrder";
export const status = [
    {
        label: "Đặt hàng thành công",
        value: 0,
        color: "#28a745", // Màu xanh lá cây (Success),
        title: "",
    },
    {
        label: "Đang xử lý",
        value: 1,
        color: "#ffc107", // Màu vàng (Processing),
        title: "Tiếp nhận yêu cầu",
    },
    {
        label: "Đang giao hàng",
        value: 2,
        color: "#17a2b8", // Màu xanh da trời (In Transit)
        title: "Giao hàng",
    },
    {
        label: "Nhận hàng thành công",
        value: 3,
        color: "#007bff", // Màu xanh dương (Delivered)
        title: "Đã nhận hàng",

    },
    {
        label: "Đơn hàng huỷ",
        value: 4,
        color: "#dc3545", // Màu đỏ (Cancelled)
        title: "Huỷ đơn hàng",
    },
];
const Order = () => {
    const { order, loadOrder } = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('')
    const [model, setModel] = useState(undefined)
    const [loading, setLoading] = useState(true)
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
    const deleteOrder = useCallback(async (id) => {
        try {
            await axios.delete('/api/Orders/' + id).then(() => {
                message.success("Xoá thành công")
                loadOrder()
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }, [loadOrder])

    const updateOrder = async (id, index) => {
        try {
            await axios.put(`/api/Orders/UpdateOrderStatus/${id}/` + index).then(() => {
                message.success("Cập nhật thành công")
                loadOrder()
            })
        } catch (error) {
            message.error('Cập nhật lỗi')
        }
    }



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
                <Badge color={e.status ? status.find((s) => s.value === e.status)?.color : 'black'} text={e.status ? status.find((s) => s.value === e.status)?.label : (e.status === 0 ? status.find((s) => s.value === e.status)?.label : 'Không có dữ liệu')} />
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
                    {
                        e.status < 3 &&
                        <Popconfirm
                            title="Huỷ đơn hàng"
                            onConfirm={() => updateOrder(e.orderID, 4)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button icon={<DeleteFilled />} danger size={'middle'} type="primary" >
                            </Button>
                        </Popconfirm>
                    }
                    {
                        e.status !== 3 && e.status !== 4 && (
                            <Popconfirm
                                title={status.find((s) => s.value > e.status)?.title}
                                onConfirm={() => updateOrder(e.orderID, e.status + 1)}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Button icon={<PoweroffOutlined />} size={'middle'}  >
                                </Button>
                            </Popconfirm>
                        )
                    }
                </Space>
            )
        },
    ];
    useEffect(() => {
        loadOrder()
        return () => {
            setLoading(false)
        }
    }, [loadOrder])
    return (
        <Spin spinning={loading}>
            <Card style={{ padding: 0 }} bordered
                title="Dữ liệu đơn hàng">
                <Table rowKey="orderID" dataSource={order?.sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())} pagination columns={columns} />
                {
                    open && <ModalOrder open={open} model={model} onClose={onClose} />
                }
            </Card>
        </Spin>
    );
};

export default Order;
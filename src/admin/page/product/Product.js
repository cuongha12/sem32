
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Card, Space, Button, Badge, Table, message } from 'antd';
import { EyeFilled, EditFilled, DeleteFilled, PlusCircleFilled, LockFilled } from '@ant-design/icons';
import { AppContext } from '../../../Context/AppContext';
import axios from 'axios';
import ProductForm from './ProductForm';
const Product = () => {
    const { product, loadProduct } = useContext(AppContext)
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
    const deleteProduct = useCallback(async (id) => {
        try {
            await axios.delete('/api/Products/' + id).then(() => {
                message.success("Xoá thành công")
                loadProduct()
            })
        } catch (error) {
            message.error("Xoá thất bại")
        }
    }, [loadProduct])
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'productName',
            key: 'productName'
        },
        // {
        //     title: 'Ảnh',
        //     render: (e) => (
        //         <span>
        //             <img style={{
        //                 width: '100px',
        //                 height: '100px'
        //             }} src={`/uploads/${e.image}`} alt="" />
        //         </span>
        //     ),
        //     key: 'image',
        // },
        {
            title: 'Danh mục',
            dataIndex: ["category", "categoryName"],
            key: 'category'
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
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
                        onClick={() => deleteProduct(e.productID)}
                        danger size={'middle'} type="primary" >
                    </Button>
                </Space>
            )
        },
    ];
    useEffect(() => {
        loadProduct();
    }, [loadProduct])
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
            <Table rowKey="productID" dataSource={product} pagination columns={columns} />
            {
                open && <ProductForm open={open} mode={mode} model={model} onClose={onClose} />
            }
        </Card>
    )
}

export default Product
import { CloseOutlined, DeleteOutlined, DeleteFilled, MinusOutlined } from '@ant-design/icons';
import { Col, Divider, Input, Row, Spin, Table, Button, Card, message, Space, Result } from 'antd';
import clsx from 'clsx';
// import IpNumber from '../../../component/inputNumber/ipNumber';
import style from './cart.module.scss'
import { useContext, useState } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { deleteCart, deleteManyCart, updateCart } from '../../../redux/apiRequest';
function Cart() {
    const { cart, dispatch, navigate, token } = useContext(AppContext)
    const [loading, setLoading] = useState(false);
    const quantity = async (action, id) => {
        setLoading(true)
        await updateCart(id, action, dispatch, message, token, setLoading)
    }
    const deleteProduct = async (id) => {
        setLoading(true)
        await deleteCart(id, dispatch, message, setLoading, token)
    }
    const totalCart = cart.reduce((a, b) => a + (b.quantity * b.product.price), 0) || 0
    const shipping = 50000
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: ['product', 'productName'],
            key: 'product'
        },
        {
            title: 'Ảnh',
            dataIndex: ['product', 'image'],
            render: (e) => (
                <span>
                    <img style={{
                        width: '100px',
                        height: '100px'
                    }} src={`/api/ImageControllers/${e}`} alt="" />
                </span>
            ),
            key: 'product'
        },
        {
            title: 'Số lượng',
            key: 'actions',
            render: (e) => (
                <div className={clsx(style.list, 'pe-lg-3 pe-0')}>
                    <div className={style.item}>
                        <Row align='middle'>
                            <Col sm={12} span={24}>
                                <div className='d-flex align-items-center pt-sm-0 pt-2' style={{ justifyContent: "space-between" }}>
                                    <div className={style.input_number}>
                                        <span onClick={() => quantity('minus', e.cartID)}><MinusOutlined style={{ fontSize: "13px", verticalAlign: "middle" }} /></span>
                                        <input type='number' id={'ip_number' + 1} value={e.quantity} />
                                        <span onClick={() => quantity('plus', e.cartID)}>+</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        },
        {
            title: 'Giá',
            dataIndex: ['product', 'price'],
            key: 'product',
            render: (e) => (
                <span>
                    {e.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                </span>
            )
        },
        {
            key: 'delete',
            render: (e) => (
                <span>
                    <Space>
                        <Button icon={<DeleteFilled />}
                            onClick={() => deleteProduct(e.cartID)}
                            danger size={'middle'} type="primary" >
                        </Button>
                    </Space>
                </span>
            )
        },
    ];
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const start = async () => {
        setLoading(true);
        await deleteManyCart(selectedRowKeys, dispatch, message, setLoading, token, setSelectedRowKeys)
    };
    return (
        <>
            {
                cart?.length > 0 ? (<Spin spinning={loading}>
                    <div style={{ backgroundColor: "#f8f9fa", height: '80px' }}>
                        <div className={clsx(style.title)} style={{ padding: "0 1rem" }}>
                            <h2>Cart</h2>
                            <span className={style.redirect}>
                                Home
                                <span style={{ width: '5px', margin: '0 10px', height: "5px", borderRadius: "50%", backgroundColor: "#e2e2e2", display: "inline-block", verticalAlign: "middle" }}></span>
                                Cart
                            </span>
                        </div>
                    </div>
                    <div className={style.cart}>
                        <div
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            <Button type="primary" onClick={start} disabled={!hasSelected}>
                                Xoá
                            </Button>
                            <span
                                style={{
                                    marginLeft: 8,
                                }}
                            >
                                {hasSelected ? `${selectedRowKeys.length} sản phẩm` : ''}
                            </span>
                        </div>
                        <Row gutter={[32, 16]}>
                            <Col lg={16} span={24}>

                                <Card>
                                    <Table pagination={false} rowKey={"cartID"} rowSelection={rowSelection} columns={columns} dataSource={cart} />
                                </Card>

                            </Col>

                            <Col lg={8} span={24}>
                                <div className={clsx(style.total, 'mt-lg-0 mt-5')}>
                                    <h5>Cart totals</h5>
                                    <div className='d-flex justify-content-between'>
                                        <span style={{ textTransform: "uppercase" }}>SUBTOTAL</span>
                                        <b>{totalCart.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}</b>

                                    </div>
                                    {
                                        totalCart > 100000 && <div style={{ backgroundColor: '#f8f9fa', padding: ' 8px', marginBottom: '8px' }}>
                                            <div className='d-flex justify-content-between'>
                                                <span>Shipping</span><b></b>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <span>Flat rate:</span><b>{shipping}</b>
                                            </div>
                                            <div className=''>
                                                <span>Shiping to </span><b>NY</b>
                                            </div>
                                            <div className=''>
                                                <span>Change Address</span><b></b>
                                            </div>
                                        </div>
                                    }
                                    <div className='d-flex justify-content-between'>
                                        <span style={{ textTransform: "uppercase" }}>TOTAL</span>
                                        <b>{(totalCart > 100000 ? totalCart - shipping : totalCart).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}</b>

                                    </div>
                                    <a name="" id="" className={clsx(style.btn_checkout, 'btn')} href="#" role="button">Process To Checkout</a>
                                </div>
                            </Col>
                        </Row>

                    </div>


                </Spin>) : (
                    <Result
                        title="Giỏ hàng trống"
                        extra={[
                            <Button onClick={()=>navigate("/shop")} type="primary" key="console">
                                Tiếp tục mua hàng
                            </Button>,
                        ]}
                    />
                )
            }
        </>
    );
}

export default Cart;
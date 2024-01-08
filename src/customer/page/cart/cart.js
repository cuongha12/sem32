import { CloseOutlined, DeleteOutlined, MinusOutlined } from '@ant-design/icons';
import { Col, Divider, Input, Row } from 'antd';
import clsx from 'clsx';
import C_product from '../../../component/carousel_product/c_product';
// import IpNumber from '../../../component/inputNumber/ipNumber';
import style from './cart.module.scss'
function Cart() {
    function quantity(action, index) {
        const id = document.getElementById('ip_number' + index)
        if (action == '-') {
            id.value > 1 && (id.value -= 1)
        } else {
            let number = Number(id.value)
            number += 1
            id.value = number
        }
    }
    return (
        <>
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
                <Row>
                    <Col lg={16} span={24}>
                        <div className={clsx(style.list, 'pe-lg-3 pe-0')}>
                            <div className={style.item}>
                                <Row align='middle'>
                                    <Col sm={12} span={24}>
                                        <div className='d-flex align-items-center'>
                                            <div className={style.image}>
                                                <img src='https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-83-80x80.jpeg' alt=''></img>
                                            </div>
                                            <div className={clsx(style.content, 'ps-4')}>
                                                <p className={style.name}>The Air Scoop-Neck Tee</p>
                                                <span style={{ color: "#7a7a7a" }}>$189.00</span>
                                                <span style={{ fontSize: "20px" }}> x </span>
                                                <span>1</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={12} span={24}>
                                        <div className='d-flex align-items-center pt-sm-0 pt-2' style={{ justifyContent: "space-between" }}>
                                            <div className={style.input_number}>
                                                <span onClick={() => quantity('-', 1)}><MinusOutlined style={{ fontSize: "13px", verticalAlign: "middle" }} /></span>
                                                <input type='number' id={'ip_number' + 1} value={1} />
                                                <span onClick={() => quantity('+', 1)}>+</span>
                                            </div>
                                            <div>$189.00</div>
                                            <div><DeleteOutlined style={{ verticalAlign: "middle", cursor: 'pointer' }} /></div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className={style.item}>
                                <Row align='middle'>
                                    <Col sm={12} span={24}>
                                        <div className='d-flex align-items-center'>
                                            <div className={style.image}>
                                                <img src='https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-83-80x80.jpeg' alt=''></img>
                                            </div>
                                            <div className={clsx(style.content, 'ps-4')}>
                                                <p className={style.name}>The Air Scoop-Neck Tee</p>
                                                <span style={{ color: "#7a7a7a" }}>$189.00</span>
                                                <span style={{ fontSize: "20px" }}> x </span>
                                                <span>1</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={12} span={24}>
                                        <div className='d-flex align-items-center pt-sm-0 pt-2' style={{ justifyContent: "space-between" }}>
                                            <div className={style.input_number}>
                                                <span onClick={() => quantity('-', 1)}><MinusOutlined style={{ fontSize: "13px", verticalAlign: "middle" }} /></span>
                                                <input type='number' id={'ip_number' + 1} value={1} />
                                                <span onClick={() => quantity('+', 1)}>+</span>
                                            </div>
                                            <div>$189.00</div>
                                            <div><DeleteOutlined style={{ verticalAlign: "middle", cursor: 'pointer' }} /></div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className={style.coupon}>
                                <input type={'text'} placeholder="Coupon Code" />
                                <a name="" id="" className="btn btn-primary" href="#" role="button">Apply Coupon</a>
                            </div>
                        </div>
                    </Col>

                    <Col lg={8} span={24}>
                        <div className={clsx(style.total, 'mt-lg-0 mt-5')}>
                            <h5>Cart totals</h5>
                            <div className='d-flex justify-content-between'>
                                <span style={{ textTransform: "uppercase" }}>SUBTOTAL</span>
                                <b>$189.00</b>

                            </div>
                            <div style={{ backgroundColor: '#f8f9fa', padding: ' 8px', marginBottom: '8px' }}>
                                <div className='d-flex justify-content-between'>
                                    <span>Shipping</span><b></b>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Flat rate:</span><b>$2.50</b>
                                </div>
                                <div className=''>
                                    <span>Shiping to </span><b>NY</b>
                                </div>
                                <div className=''>
                                    <span>Change Address</span><b></b>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <span style={{ textTransform: "uppercase" }}>TOTAL</span>
                                <b>$189.00</b>
                            </div>
                            <a name="" id="" className={clsx(style.btn_checkout, 'btn')} href="#" role="button">Process To Checkout</a>
                        </div>
                    </Col>
                </Row>
                <div style={{ paddingTop: '80px' }}>
                    <h4 style={{ padding: '0 1rem' }}>You May Be Interested In…</h4>
                    <C_product number={5} />
                </div>
            </div>


        </>
    );
}

export default Cart;
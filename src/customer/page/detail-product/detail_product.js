import { LeftOutlined } from "@ant-design/icons";
import { AppstoreOutlined, CalendarOutlined, FacebookFilled, FieldTimeOutlined, MinusOutlined, QuestionCircleOutlined, RightOutlined, SmileOutlined } from "@ant-design/icons/lib/icons";
import { Breadcrumb, Button, Input, Carousel, Col, Collapse, Image, message, Progress, Rate, Row, Select, Space, Tooltip, Typography } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import C_product from "../../../component/carousel_product/c_product";
import RateInput from "../../../component/rate/rate";
import style from './detail_product.module.scss';
import './custome.scss'
import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
import { addCart } from "../../../redux/apiRequest";

function DetailProduct() {
    const { id } = useParams()
    const [count, setCount] = useState(1)
    const { Text, Link } = Typography;
    const { Panel } = Collapse;
    const [model, setModel] = useState(undefined)
    const { navigate, userCustomer, dispatch,token } = useContext(AppContext)
    const social = [
        {
            name: 'facebook-f',
            color: "#3b5998"
        },
        {
            name: 'twitter',
            color: "#1da1f2"
        },
        {
            name: 'pinterest',
            color: "#e60023"
        },
        {
            name: 'whatsapp',
            color: "#25d366"
        },
        {
            name: 'telegram',
            color: "#08c"
        },
        {
            name: 'viber',
            color: "#7360f2"
        },
        {
            name: 'vk',
            color: "#4c75a3"
        },
    ]
    // Zoom image

    function onZoom(e) {
        // const img_df = document.getElementById("img_df")
        // const img_zoom = document.getElementById("img_zoom")
        // const offset = img_df.offsetParent.offsetParent.offsetParent.offsetParent

        // let x = `${((e.pageX + 1 - offset.offsetLeft) / img_df.clientWidth) * 100}%`;
        // let y = `${((e.pageY + 1 - offset.offsetTop) / img_df.clientHeight) * 100}%`;
        // img_zoom.style.backgroundPosition = `${x} ${y}`
        // console.log(x, y);
        // document.getElementById('preview').click()
        const img_df = document.querySelectorAll("#img_df")
        const img_zoom = document.querySelectorAll("#img_zoom")
        for (let i = 0; i < img_df.length; i++) {
            const offset = img_df[i].offsetParent.offsetParent.offsetParent.offsetParent

            let x = `${((e.pageX + 1 - offset.offsetLeft) / img_df[i].clientWidth) * 100}%`;
            let y = `${((e.pageY + 1 - offset.offsetTop) / img_df[i].clientHeight) * 100}%`;
            img_zoom[i].style.backgroundPosition = `${x} ${y}`
        }

        // console.log(e);
        // console.log(`${((e.pageX + 1 - offset.offsetLeft) / img_df.clientWidth) * 100}%`, `${((e.pageY + 1 - offset.offsetTop) / img_df.clientHeight) * 100}%`,);
    }
    const updateCount = useCallback((type) => {
        if (type === '+') {
            setCount(count + 1)
        } else {
            if (count === 1) {
                return
            }
            setCount(count - 1)
        }
    }, [count])

    const addToCart = () => {
        if (!userCustomer) {
            navigate('/login')
        } else {
            const value = {
                productId: model?.productID,
                quantity: count
            }
            addCart(userCustomer, value, dispatch,message,token)
        }
    }
    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                try {
                    await axios.get('/api/Products/' + id).then((e) => {
                        setModel(e.data)
                    })
                } catch (error) {
                    message.error("Lỗi hệ thống")
                }
            }
            getProduct()

        } else {
            navigate('/')
        }

    }, [id])

    // End Zoom image
    return (
        <>
            <div className={style.head}>
                <div className={style.breadcrumb}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to='' style={{ textDecoration: 'none' }}>Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='' style={{ textDecoration: 'none' }}>Product</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='' style={{ textDecoration: 'none' }}>Name</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={style.product_nav}>
                    <div className={style.icon}>
                        <LeftOutlined />
                        <div className={style.product_show}>
                            <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-46.jpeg" alt="" width={40}></img>
                            <p>The Oversized Alpaca Crew</p>
                        </div>
                    </div>
                    <div className={style.icon}>
                        <AppstoreOutlined />
                    </div>
                    <div className={style.icon}>
                        <RightOutlined />
                        <div className={style.product_show}>
                            <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-46.jpeg" alt="" width={40}></img>
                            <p>The Oversized Alpaca Crew</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className={style.detail_product}>
                <div className={style.content_modal}>

                    <Row>
                        <Col xl={12} md={12} sm={12} xs={24}>
                            <div className={clsx(style.image)}>
                                <Carousel arrows={true} dots={true}>
                                    <div>
                                        <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                            <img className="card-img" src={`/api/ImageControllers/${model?.image}`} />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: `url(/api/ImageControllers/${model?.image})` }}></div>
                                            <Image
                                                width={100}
                                                preview={true}
                                                id='preview'
                                                style={{ opacity: 0, position: "absolute", zIndex: '-100', display: "none" }}
                                                src={`/api/ImageControllers/${model?.image}`}
                                            />

                                        </div>
                                    </div>

                                </Carousel>

                            </div>
                        </Col>
                        <Col xl={12} md={12} sm={12} xs={24}>
                            <div className={clsx(style.text)}>
                                <h3 className={style.name}>{model?.productName}</h3>
                                <div className={style.price}>{model?.price.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}</div>
                                <p className={style.desc}>Safer For The Environment: Our denim factory partner recycles 98% of their water using reverse osmosis filtration and keeps byproducts out of the environment by mixing them with concrete to create building materials.</p>
                                <div className='d-flex align-items-center pt-sm-0 pt-2'
                                    style={{ justifyContent: "space-between" }}>
                                    <b>Số lượng</b>
                                    <div className={style.input_number}>
                                        <span onClick={() => updateCount('-')}><MinusOutlined
                                            style={{ fontSize: "13px", verticalAlign: "middle" }} /></span>
                                        {/* <input type='number' id={'ip_number' + 1} value={1} /> */}
                                        <Input className={style.input}
                                            value={count}
                                            onChange={(e) => {
                                                setCount(Number(e.target.value))
                                            }}
                                        />

                                        <span onClick={() => updateCount('+')}>+</span>
                                    </div>

                                </div>

                                <Link onClick={addToCart} className={clsx(style.btn_shop)}><span>Add To Cart</span> </Link>

                                <Collapse defaultActiveKey={['1']}
                                    expandIconPosition="right"
                                    style={{ backgroundColor: "#fff", borderRadius: "0", borderBottom: "1px solid #e9e9e9" }}
                                    bordered={false}
                                    expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? '-90' : '90'} />}
                                >
                                    <Panel header={<p className={style.desc_title}>Description</p >} style={{ border: "1px solid #e9e9e9", borderBottom: "none" }} key="1">
                                        {model?.description}
                                    </Panel>

                                </Collapse>
                                <div className={style.summary}>
                                    <div className={style.item_summary}>
                                        <FieldTimeOutlined /> <p>Delivery & Return</p>
                                    </div>
                                    <div className={style.item_summary}>
                                        <QuestionCircleOutlined /> <p>Size Guide</p>
                                    </div>
                                    <div className={style.item_summary}>
                                        <CalendarOutlined /> <p>Estimated Delivery: Jan 24 Jan 28</p>
                                    </div>
                                    <div className={style.item_summary}>
                                        <SmileOutlined /> <p>45 people are viewing this right now</p>
                                    </div>
                                </div>
                                <div className={style.category}>
                                    <div className={style.item}>
                                        <b>Categories: </b>
                                        <span>Denim, </span>
                                        <span>Men, </span>
                                        <span>Shirts </span>
                                    </div>
                                    <div className={style.item}>
                                        <b>Tags: </b>
                                        <span>Bestseller, </span>
                                        <span>Trend </span>
                                    </div>
                                    <div className={style.item}>
                                        <b>Brands: </b>
                                        <span>Adidas, </span>
                                        <span>Loft, </span>
                                        <span>Nike </span>

                                    </div>
                                    <div className={clsx(style.item, 'mt-4')}>
                                        <b>Share: </b>
                                        {social.map((item, index) => {
                                            return (<Tooltip key={index} style={{ borderRadius: "0" }} title={item.name}>
                                                <div className={style.social} style={{ backgroundColor: item.color }}>
                                                    <div className={style.social_item}>
                                                        <i className={`fa-brands fa-${item.name}`}></i>
                                                    </div>
                                                </div>
                                            </Tooltip>)
                                        })
                                        }

                                    </div>
                                </div>

                            </div>
                        </Col>
                    </Row>


                </div>
                <div className={style.suggest_product}>
                    <h4>You May Also Like</h4>
                    <C_product number={5}></C_product>
                </div>
                <div className={style.suggest_product}>
                    <h4>Viewers Also Liked</h4>
                    <C_product number={5}></C_product>
                </div>
            </div>
            <div className={style.rating}>
                <h4>2 reviews for The Blue Chunky Beanie</h4>
                <div className={style.comment}>
                    <Row gutter={16} align="middle">
                        <Col sm={12} span={24}>
                            <div className={style.avg_rate}>
                                <h3 className={style.point}>5.0</h3>
                                <Rate disabled defaultValue={5} className={style.star} />
                                <p>Based on 2 reviews</p>
                            </div>
                        </Col>
                        <Col sm={12} span={24}>
                            <div className={style.list_rate}>
                                <ul>
                                    <li>
                                        <p className="w-25">5 star</p>
                                        <div className="w-75">
                                            <RateInput num={30} />
                                        </div>
                                        <p className="w-25 text-end">30%</p>

                                    </li>
                                    <li>
                                        <p className="w-25">5 star</p>
                                        <div className="w-75">
                                            <RateInput num={30} />
                                        </div>
                                        <p className="w-25 text-end">30%</p>

                                    </li>
                                    <li>
                                        <p className="w-25">5 star</p>
                                        <div className="w-75">
                                            <RateInput num={30} />
                                        </div>
                                        <p className="w-25 text-end">30%</p>

                                    </li>
                                    <li>
                                        <p className="w-25">5 star</p>
                                        <div className="w-75">
                                            <RateInput num={30} />
                                        </div>
                                        <p className="w-25 text-end">30%</p>

                                    </li>
                                    <li>
                                        <p className="w-25">5 star</p>
                                        <div className="w-75">
                                            <RateInput num={30} />
                                        </div>
                                        <p className="w-25 text-end">30%</p>

                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>


                </div>
                <div className={style.show_comment}>
                    <div className="d-flex justify-content-between" >
                        <Select
                            bordered={false}
                            defaultValue="lucy"
                            style={{
                                width: 120,
                            }}
                            // onChange={handleChange}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'Yiminghe',
                                    label: 'yiminghe',
                                },

                            ]}
                        />
                        <a name="" id="" class="btn btn-primary" className={style.add} href="#" role="button">Add a review</a>
                    </div>
                    <div className={style.item_comment}>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailProduct;
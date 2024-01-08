import { LeftOutlined } from "@ant-design/icons";
import { AppstoreOutlined, CalendarOutlined, FacebookFilled, FieldTimeOutlined, MinusOutlined, QuestionCircleOutlined, RightOutlined, SmileOutlined } from "@ant-design/icons/lib/icons";
import { Breadcrumb, Button, Carousel, Col, Collapse, Image, Progress, Rate, Row, Select, Space, Tooltip, Typography } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import C_product from "../../../component/carousel_product/c_product";
import RateInput from "../../../component/rate/rate";
import style from './detail_product.module.scss';
import './custome.scss'
import { useRef } from "react";
function DetailProduct() {
    const { Text, Link } = Typography;
    const { Panel } = Collapse;

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
            console.log(x, y);
        }

        // console.log(e);
        // console.log(`${((e.pageX + 1 - offset.offsetLeft) / img_df.clientWidth) * 100}%`, `${((e.pageY + 1 - offset.offsetTop) / img_df.clientHeight) * 100}%`,);
    }


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
                                            <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: "url(https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg)" }}></div>
                                            <Image
                                                width={100}
                                                preview={true}
                                                id='preview'
                                                style={{ opacity: 0, position: "absolute", zIndex: '-100', display: "none" }}
                                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                            <img className="card-img" src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-125.jpeg" />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: "url(https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-125.jpeg)" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                            <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: "url(https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg)" }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div onMouseMove={onZoom} id={'img_df'} className={style.image_main}>
                                            <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                            <div id="img_zoom" className={clsx(style.image_zoom)} style={{ backgroundImage: "url(https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg)" }}></div>
                                        </div>
                                    </div>

                                </Carousel>
                                <div className={style.list_dots}>
                                    <Row>
                                        <Col>
                                            <div className={style.item_dots}>
                                                <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className={style.item_dots}>
                                                <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-500x500.jpeg" />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className={style.item_dots}>
                                                <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-500x500.jpeg" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col xl={12} md={12} sm={12} xs={24}>
                            <div className={clsx(style.text)}>
                                <h3 className={style.name}>The Flower Chunky Beanie </h3>
                                <div className={style.price}><span><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /></span> $24</div>
                                <p className={style.desc}>Safer For The Environment: Our denim factory partner recycles 98% of their water using reverse osmosis filtration and keeps byproducts out of the environment by mixing them with concrete to create building materials.</p>
                                <Link to="/" className={clsx(style.btn_shop)}><span>Add To Cart</span> </Link>

                                <div className={clsx(style.select)}>
                                    <b>Color:</b>
                                    <div className={style.item}>Blue</div>
                                    <div className={style.item}>Brown</div>
                                </div>
                                <div className={clsx(style.select)}>
                                    <b>Sizes:</b>
                                    <div className={style.item}>XL</div>
                                    <div className={style.item}>SM</div>
                                </div>

                                <Collapse defaultActiveKey={['1']}
                                    expandIconPosition="right"
                                    style={{ backgroundColor: "#fff", borderRadius: "0", borderBottom: "1px solid #e9e9e9" }}
                                    bordered={false}
                                    expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? '-90' : '90'} />}
                                >
                                    <Panel header={<p className={style.desc_title}>Description</p >} style={{ border: "1px solid #e9e9e9", borderBottom: "none" }} key="1">
                                        A dog is a type of domesticated animal.
                                        Known for its loyalty and faithfulness,
                                        it can be found as a welcome guest in many households across the world.
                                    </Panel>
                                    <Panel header={<p className={style.desc_title}>Additional information</p >} style={{ border: "1px solid #e9e9e9", borderBottom: "none" }} key="2">
                                        A dog is a type of domesticated animal.
                                        Known for its loyalty and faithfulness,
                                        it can be found as a welcome guest in many households across the world.
                                    </Panel>
                                    <Panel header={<p className={style.desc_title}>Q & A</p >} style={{ border: "1px solid #e9e9e9", borderBottom: "none" }} key="3">
                                        A dog is a type of domesticated animal.
                                        Known for its loyalty and faithfulness,
                                        it can be found as a welcome guest in many households across the world.
                                    </Panel>
                                    <Panel header={<p className={style.desc_title}>Unlimited Tabs</p >} style={{ border: "1px solid #e9e9e9", borderBottom: "none" }} key="4">
                                        A dog is a type of domesticated animal.
                                        Known for its loyalty and faithfulness,
                                        it can be found as a welcome guest in many households across the world.
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
                                            console.log('1');
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
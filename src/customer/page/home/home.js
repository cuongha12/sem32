import Banner from "./banner/banner";
import style from './home.module.scss';
import clsx from "clsx";
import { Button, Carousel, Col, Divider, Modal, Row, Tabs, Typography } from "antd";
import C_product from "../../../component/carousel_product/c_product";
import Footer from "../../layout/footer/footer";
import { useContext, useEffect, useState } from "react";
import Btn_x from "../../../component/btn/btn_x";
import { MinusOutlined } from "@ant-design/icons";
import { AppContext } from "../../../Context/AppContext";
function Home() {
    const { loadProduct,product } = useContext(AppContext)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { Text, Link } = Typography;
    var settings_articles = {
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 2650,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    var settings_insta = {
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 2650,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    useEffect(()=>{
        loadProduct()
    },[])
    return (
        <>
            <Banner />
            <div style={{ maxWidth: "1580px", margin: "0 auto" }}>
                <Row className={clsx(style.trends)}>
                    <Col lg={6} md={12} className={clsx(style.item, style.text)}>
                        <div>
                            <span>2024 winter trends</span>
                            <h3>Check New Trends</h3>
                            <p>Cardigan helvetica sriracha, portland celiac truffaut woke artisan succulents cred art party slow-carb pinterest. Migas humblebrag chicharrones everyday carry four loko der panth overlay...</p>
                        </div>

                    </Col>
                    <Col lg={6} sm={12} xs={24} span={24}>
                        <div className={clsx(style.item, style.image)}>
                            <img className={'card-img'} src='https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/09/banner-name-5-e1631633509950-500x500.jpeg'></img>
                            <div className={clsx(style.content)}>
                                <span>Women</span>
                                <h4>New Women Shoes</h4>
                                <p>16 Products</p>
                            </div>
                        </div>

                    </Col>
                    <Col lg={6} sm={12} xs={24} span={24}>
                        <div className={clsx(style.item, style.image)}>
                            <img className={'card-img'} src='https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/09/banner-name-4-e1631633328983-500x500.jpeg'></img>
                            <div className={clsx(style.content)}>
                                <span>Women</span>
                                <h4>New Women Shoes</h4>
                                <p>16 Products</p>
                            </div>
                        </div>

                    </Col>
                    <Col lg={6} sm={12} xs={24} span={24}>
                        <div className={clsx(style.item, style.image)}>
                            <img className={'card-img'} src='https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/09/slide-name-4-500x500.jpg'></img>
                            <div className={clsx(style.content)}>
                                <span>Women</span>
                                <h4>New Women Shoes</h4>
                                <p>16 Products</p>
                            </div>
                        </div>

                    </Col>
                </Row>
                <Divider></Divider>

                <div className={style.collections}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>Winter Collections</h3>
                        <p>Cardigan helvetica sriracha, portland celiac truffaut</p>
                    </div>
                    <C_product product={product} number={product?.slice(1,5).length} ></C_product>
                </div>
                <Divider></Divider>

                <div className={style.collections} style={{ marginTop: "120px" }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>Featured Products</h3>
                        {/* <p>Cardigan helvetica sriracha, portland celiac truffaut</p> */}
                    </div>
                    <C_product number={product?.slice(6,10).length} product={product}></C_product>
                </div>
                <Divider></Divider>

              

            </div>
           
            
           
            <div className={style.modal_product}>
                {/*<Button type="primary" onClick={showModal}>*/}
                {/*    Open Modal*/}
                {/*</Button>*/}
                <Modal
                    width={window.innerWidth >= 920 ? 920 : '100%'}
                    // destroyOnClose={false}
                    closeIcon={<Btn_x />}
                    title="  "
                    footer={null}
                    onCancel={handleCancel}
                    open={isModalOpen}
                    maskStyle={{ backgroundColor: "#17171745", borderRadius: 0 }}
                // bodyStyle={{ borderRadius: 0 }}
                // style={{ borderRadius: 0 }}
                >

                    <div className={style.content_modal}>
                        <Row>
                            <Col xl={14} md={14} sm={14} xs={24}>
                                <div className={clsx(style.image)}>
                                    <Carousel dots={false}>
                                        <div>
                                            <img className="card-img" src="https://ninetheme.com/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-1024x1024.jpeg" />
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
                            <Col xl={10} md={10} sm={10} xs={24}>
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
                                    </div>
                                </div>
                            </Col>
                        </Row>


                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Home;
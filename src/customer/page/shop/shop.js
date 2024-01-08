import clsx from "clsx";
import style from "./shop.module.scss";
import { EyeOutlined, MinusOutlined, StarFilled, SyncOutlined, HeartOutlined, ShoppingOutlined, RightOutlined, ControlOutlined, FilterOutlined, SearchOutlined, FilterFilled } from "@ant-design/icons";
import { Checkbox, Col, Collapse, Drawer, Row, Select, Slider, Typography } from "antd";
import { useLayoutEffect, useState } from "react";
import Btn_x from "../../../component/btn/btn_x";

function Shop() {
    const { Panel } = Collapse;
    const { Text, Link } = Typography;
    const [openFilter, setOpenFilter] = useState(false);
    const showFilter = () => {
        const filter = document.getElementById('detail_filter')
        const show = document.getElementById('show')
        const hidden = document.getElementById('hidden')
        const content = document.getElementsByClassName(style.item_filter)
        let data = []
        Array.from(content).forEach((item) => {
            data.push(item.scrollHeight)
        })
        let maxHeight = Math.max(...data)

        // console.log(content[0].clientHeight);
        show.style.display = 'none'
        hidden.style.display = 'none'
        if (filter.clientHeight) {
            filter.style.height = 0
            hidden.style.display = 'inline-block'
        } else {
            // filter.style.height = filter.scrollHeight + 'px'
            filter.style.height = maxHeight + 'px'
            show.style.display = 'inline-block'
        }
    }
    const [price, setPrice] = useState([0, 100])
    const onCheck = (value) => {
        // // console.log('onChange: ', value);
        // setPrice(value)
    };
    const onChange = (value) => {
        // console.log('onChange: ', value);
        setPrice(value)
    };
    const onAfterChange = (value) => {
        console.log('onAfterChange: ', value);
    };
    return (
        <>

            <div style={{ backgroundColor: "#f8f9fa", height: '80px' }}>
                <div className={clsx(style.title)} style={{ padding: "0 1rem" }}>
                    <h2>Shop</h2>
                    <span className={style.redirect}>
                        Home
                        <span style={{ width: '5px', height: "5px", borderRadius: "50%", backgroundColor: "#e2e2e2", display: "inline-block", verticalAlign: "middle" }}></span>
                        Product
                    </span>
                </div>
            </div>
            <div className={style.products} >
                <div className={style.head}>
                    <div className={clsx('d-flex pb-3 mt-5 justify-content-between')}>
                        <div className={clsx('d-none d-sm-block')}>
                            Showing 1–15 of 22 results
                        </div>
                        <div className={clsx('d-flex justify-content-end col-12 col-sm-6')}>
                            <span className="d-lg-block d-none" onClick={showFilter} style={{ cursor: 'pointer' }}>
                                Filter <FilterOutlined id="hidden" style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    // transform: 'rotage(90deg)',
                                    paddingTop: '5px'

                                }} />

                                <FilterFilled id="show" style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    // transform: 'rotage(90deg)',
                                    color: "#e49e6c",
                                    paddingTop: '5px',
                                    display: 'none'
                                }} />
                            </span>
                            <span className="d-lg-none d-block" onClick={() => setOpenFilter(true)} style={{ cursor: 'pointer' }}>
                                Filter <FilterOutlined id="hidden" style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    // transform: 'rotage(90deg)',
                                    paddingTop: '5px'

                                }} />

                                <FilterFilled id="show" style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    // transform: 'rotage(90deg)',
                                    color: "#e49e6c",
                                    paddingTop: '5px',
                                    display: 'none'
                                }} />
                            </span>

                            <Select
                                defaultValue="Sort by latest"
                                style={{ width: 200 }}
                                // onChange={handleChange}
                                // loading={true}\
                                // size={'large'}
                                dropdownStyle={{
                                    borderRadius: "0",

                                }}
                                bordered={false}
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Sort by average rating',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Sort by latest',
                                    },
                                    {
                                        value: 'Yiminghe1',
                                        label: 'Sort by popularity',
                                    },
                                    {
                                        value: 'Yiminghe2',
                                        label: 'Sort by price: high to low',
                                    },
                                    {
                                        value: 'Yiminghe3',
                                        label: 'Sort by price: low to high',
                                    },
                                ]}
                            />
                            <SearchOutlined
                                style={{
                                    height: '100%',
                                    verticalAlign: 'middle',
                                    fontSize: '17px',
                                    transform: 'rotage(90deg)',
                                    paddingTop: '5px',
                                    cursor: "pointer",
                                    paddingLeft: "8px"
                                }} />
                        </div>
                    </div>
                </div>
                <div id="detail_filter" className={style.detail_filter} >
                    <div className={clsx(style.item_filter, style.price)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Filter By Price</h5>} key="1">
                                <div className="p-2">
                                    <Slider
                                        // style={{ width: "96%" }}
                                        range
                                        step={10}
                                        defaultValue={[1, 100]}
                                        onChange={onChange}
                                        onAfterChange={onAfterChange}
                                        trackStyle={{ backgroundColor: "#daa174" }}
                                    // handleStyle={{ backgroundColor: "red" ,  }}
                                    />
                                    <Row style={{ marginTop: "1rem" }} justify="space-between" align={'middle'} >
                                        <Col>
                                            <a name="" id="" className="btn btn-primary" href="#" role="button">Filter</a>
                                        </Col>
                                        <Col><span>Price: ${price[0]} - ${price[1]}</span> </Col>
                                    </Row>
                                </div>

                            </Panel>
                        </Collapse>
                    </div>
                    <div className={clsx(style.item_filter, style.color)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Filter By Color</h5>} key="1">
                                {/* <div className={clsx()}> */}
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#000" }}></span> Black
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#23d6ea" }}></span> Blue
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#a87323" }}></span> Brown
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#82c43c" }}></span> Green
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#fff", border: "1px solid #000" }}></span> White
                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        <span className={style.item_color} style={{ backgroundColor: "#eeee22" }}></span> Yellow
                                    </span>
                                    <span>7</span>
                                </div>
                                {/* </div> */}
                            </Panel>

                        </Collapse>
                    </div>
                    <div className={clsx(style.item_filter, style.category)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Product Categories</h5>} key="1">
                                <div className="pb-2">
                                    <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Men</Checkbox>
                                </div>
                                <div>
                                    <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Women</Checkbox>
                                </div>
                            </Panel>

                        </Collapse>
                    </div>
                    <div className={clsx(style.item_filter, style.status)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Product Status</h5>} key="1">
                                <div className="pb-2">
                                    <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>In stock</Checkbox>
                                </div>
                                <div>
                                    <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Out stock</Checkbox>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className={clsx(style.item_filter, style.size)}>
                        <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                            <Panel header={<h5>Filter By Sizes</h5>} key="1">
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        s                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        m                                 </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        l                                 </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        XL                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        Xs                                    </span>
                                    <span>7</span>
                                </div>
                                <div className={clsx(style.item_c)}>
                                    <span>
                                        xXL                                    </span>
                                    <span>7</span>
                                </div>
                            </Panel>

                        </Collapse>
                    </div>
                </div>
                <Row gutter={[16, 16]}>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" className={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" class={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" class={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" class={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" class={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" class={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" class={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" class={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={8} span={12}>
                        <div className={clsx(style.item)}>
                            <div className={clsx(style.image)}>
                                <img className={clsx(style.img1, "card-img")} src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-74-370x370.jpeg"></img>
                                <img src="https://f8g8b9p5.rocketcdn.me/themes/styler/fashion/wp-content/uploads/2021/12/product-name-34-370x370.jpeg" class={clsx(style.img2, "card-img")} alt="" decoding="async" loading="lazy" />
                                <div className={clsx(style.desktop_icon, style.group_icon)}>
                                    <div className={style.icon}><EyeOutlined /></div>
                                    <div className={style.icon}><SyncOutlined /></div>
                                    <div className={style.icon}><HeartOutlined /></div>
                                    <div className={style.icon}><ShoppingOutlined /></div>
                                </div>
                                <div className={clsx(style.tags)}>
                                    <span className={clsx(style.bg)}>Winter</span>
                                    <span>sale!</span>
                                    {/* <span>17%</span> */}
                                </div>

                            </div>
                            <div className={clsx(style.mobile_icon, style.group_icon)}>
                                <div className={style.icon}><EyeOutlined /></div>
                                <div className={style.icon}><SyncOutlined /></div>
                                <div className={style.icon}><HeartOutlined /></div>
                                <div className={style.icon}><ShoppingOutlined /></div>
                            </div>
                            <h4>The Flower Chunky Beanie</h4>
                            <div className="d-flex justify-content-between">
                                <p><Text delete>18$</Text> <MinusOutlined style={{ width: "10px", overflow: 'hidden' }} /> $22</p>
                                <div className={clsx(style.star)}>
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                    <StarFilled />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
            <Drawer
                placement={"left"}
                width={window.innerWidth > 460 ? 460 : '100%'}
                closable={false}
                onClose={() => {
                    setOpenFilter(false)
                    return openFilter
                }}
                open={openFilter}
                maskStyle={{ backgroundColor: "#d5d5d573" }}
                bodyStyle={{ overflowX: "hidden", overflowY: 'scroll', padding: `${window.innerWidth > 460 ? '24px' : '16px'}` }}
            >
                <div className={clsx(style.mobile_filter)}>
                    <div className="d-flex justify-content-end ">
                        <div className={style.btn_x}>
                            <p onClick={() => setOpenFilter(false)} >
                                <Btn_x></Btn_x>
                            </p>
                        </div>
                    </div>

                    <div id="detail_filter" className={style.detail_filter} >
                        <div className={clsx(style.item_filter, style.price)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Filter By Price</h5>} key="1">
                                    <div className="p-2">
                                        <Slider
                                            // style={{ width: "96%" }}
                                            range
                                            step={10}
                                            defaultValue={[1, 100]}
                                            onChange={onChange}
                                            onAfterChange={onAfterChange}
                                            trackStyle={{ backgroundColor: "#daa174" }}
                                        // handleStyle={{ backgroundColor: "red" ,  }}
                                        />
                                        <Row style={{ marginTop: "1rem" }} justify="space-between" align={'middle'} >
                                            <Col>
                                                <a name="" id="" className="btn btn-primary" href="#" role="button">Filter</a>
                                            </Col>
                                            <Col><span>Price: ${price[0]} - ${price[1]}</span> </Col>
                                        </Row>
                                    </div>

                                </Panel>
                            </Collapse>
                        </div>
                        <div className={clsx(style.item_filter, style.color)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Filter By Color</h5>} key="1">
                                    {/* <div className={clsx()}> */}
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#000" }}></span> Black
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#23d6ea" }}></span> Blue
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#a87323" }}></span> Brown
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#82c43c" }}></span> Green
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#fff", border: "1px solid #000" }}></span> White
                                        </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            <span className={style.item_color} style={{ backgroundColor: "#eeee22" }}></span> Yellow
                                        </span>
                                        <span>7</span>
                                    </div>
                                    {/* </div> */}
                                </Panel>

                            </Collapse>
                        </div>
                        <div className={clsx(style.item_filter, style.category)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Product Categories</h5>} key="1">
                                    <div className="pb-2">
                                        <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Men</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Women</Checkbox>
                                    </div>
                                </Panel>

                            </Collapse>
                        </div>
                        <div className={clsx(style.item_filter, style.status)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Product Status</h5>} key="1">
                                    <div className="pb-2">
                                        <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>In stock</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox style={{ borderRadius: "0" }} onChange={onCheck}>Out stock</Checkbox>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                        <div className={clsx(style.item_filter, style.size)}>
                            <Collapse style={{ padding: "0" }} defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={<h5>Filter By Sizes</h5>} key="1">
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            s                                    </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            m                                 </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            l                                 </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            XL                                    </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            Xs                                    </span>
                                        <span>7</span>
                                    </div>
                                    <div className={clsx(style.item_c)}>
                                        <span>
                                            xXL                                    </span>
                                        <span>7</span>
                                    </div>
                                </Panel>

                            </Collapse>
                        </div>
                    </div>
                </div>

            </Drawer>
        </>
    );
}

export default Shop;
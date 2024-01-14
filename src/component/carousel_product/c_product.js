import { EyeOutlined, MinusOutlined, StarFilled, SyncOutlined, HeartOutlined, ShoppingOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Typography } from "antd";
import style from './c_product.module.scss';
import clsx from "clsx";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

function C_product(props) {
    const { navigate } = useContext(AppContext)
    if (!props.number) {
        var number = 4
    } else {
        number = props.number
    }
    const { Text, Link } = Typography;
    var settings = {
        slidesToShow: number,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 2650,
                settings: {
                    slidesToShow: number,
                    slidesToScroll: 1,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: number < 5 ? number - 1 : number - 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: number < 5 ? number - 2 : number - 3,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div dot={true} className={clsx(style.products)}>
                <Carousel infinite={false} autoplay  {...settings}>
                    {
                        props?.product?.map((e) => (
                            <div key={e.productID}>

                                <div className={clsx(style.item)}>
                                    <div className={clsx(style.image)}>
                                        <div onClick={() => navigate(`/detail/${e.productID}`)}>
                                            <img className={clsx(style.img1, "card-img")} src={`/api/ImageControllers/${e.image}`}></img>
                                        </div>
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
                                    <h4>{e.productName}</h4>
                                    <div className="d-flex justify-content-between">
                                        <p> {e.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}</p>
                                        <div className={clsx(style.star)}>
                                            <StarFilled />
                                            <StarFilled />
                                            <StarFilled />
                                            <StarFilled />
                                            <StarFilled />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                    }

                </Carousel>
            </div>

        </>
    );
}

export default C_product;
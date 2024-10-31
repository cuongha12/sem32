import { Line } from '@ant-design/charts'
import { ArrowDownOutlined, ArrowUpOutlined, FileDoneOutlined } from '@ant-design/icons'
import { Card, Col, DatePicker, Form, message, Row, Space, Statistic } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup';
import { AppContext } from '../../../Context/AppContext'
const Chart = () => {
    const [year, setYear] = useState(dayjs())
    const [data, setData] = useState([])
    const minValue = useRef(0);
    const maxValue = useRef(0);
    const max = useRef(0);
    const min = useRef(0);
    const onChange = (date, dateString) => {
        setYear(date)
    };
    const { order, loadOrder } = useContext(AppContext)
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const array = Array.from({ length: 12 }, (_, index) => index + 1);
    const loadData = useCallback(async () => {
        try {
            await axios.get('/api/Orders/GetOrdersByYear/' + `${year.year().toString()}`).then((e) => {
                setData(e.data.monthlyRevenue)
                if (e.data.extremeMonths.length > 0) {
                    minValue.current = e.data.extremeMonths[1].price
                    min.current = e.data.extremeMonths[1].month
                    maxValue.current = e.data.extremeMonths[0].price
                    max.current = e.data.extremeMonths[0].month
                }
            })
        } catch (error) {
            message.error("Lỗi hệ thống")
        }
    }, [year])

    useEffect(() => {
        loadData()
        loadOrder()
    }, [year])

    // if (data && data.length > 0) {
    //     data?.forEach((d, i) => {
    //         console.log(d[i]);

    //     })
    // }





    const config = {
        data,
        xField: 'label',
        yField: 'price',
        height: 500,
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        style: {
            lineWidth: 2,
        },
        annotations: [
            {
                type: 'text',
                data: [max.current, maxValue.current],
                shape: 'badge',
                style: {
                    text: '',
                    dy: -1,
                    markerSize: 24,
                    markerFill: 'green',
                    markerFillOpacity: 0.55,
                },
                tooltip: false,
            },
            {
                type: 'text',
                data: [min.current, minValue.current],
                shape: 'badge',
                style: {
                    text: '',
                    dy: -1,
                    markerSize: 24,
                    markerFill: 'red',
                    markerFillOpacity: 0.55,
                },
                tooltip: false,
            },
        ],
        interaction: {
            tooltip: {
                render: (e, { title, items }) => {
                    const list = items.filter((item) => item.value);
                    return (
                        <div key={title}>
                            {list.map((item, index) => {
                                const { name, value, color } = item;

                                return (
                                    <div key={index} style={{ width: '200px' }}>
                                        <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <span
                                                    style={{
                                                        display: 'inline-block',
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        backgroundColor: color,
                                                        marginRight: 6,
                                                    }}
                                                ></span>
                                                <span>Tháng {title}</span>
                                            </div>
                                            <b>{value.toLocaleString()}</b>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                },
            },
        },
        legend: false,
    };


    const formatter = (value) => <CountUp end={value} separator="," />;


    return (
        <>
            <Card bordered title={'Thống kê doanh thu bán hàng'} extra={[
                <Space key={dayjs()}>
                    <Form>
                        <Form.Item style={{
                            marginBottom: 0

                        }}
                            label={'Doanh thu theo năm'}
                        >
                            <DatePicker value={year} onChange={onChange} picker="year" />
                        </Form.Item>
                    </Form>
                </Space>
            ]}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Tổng doanh thu"
                                value={data.reduce((a, b) => a + b.price, 0)}
                                precision={2}
                                valueStyle={{
                                    color: '#000',
                                }}
                                // prefix={<ArrowUpOutlined />}
                                suffix="VND"
                                formatter={formatter}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={`Doanh thu tháng thấp nhất: Tháng ${min.current}`}
                                value={minValue.current}
                                precision={2}
                                valueStyle={{
                                    color: '#cf1322',
                                }}
                                formatter={formatter}
                                prefix={<ArrowDownOutlined />}
                                suffix="VND"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title={`Doanh thu tháng thấp nhất: Tháng ${max.current}`}
                                value={maxValue.current}
                                precision={2}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="VND"
                                formatter={formatter}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Statistic
                                title="Tổng đơn hàng"
                                value={data.reduce((a, b) => a + b.price, 0) > 0 ? order.filter((e) => e.status === 3).length : 0}
                                precision={2}
                                valueStyle={{
                                    color: '#000',
                                }}
                                formatter={formatter}
                                prefix={<FileDoneOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Line
                    {...config}
                />
            </Card>
        </>

    )
}

export default Chart
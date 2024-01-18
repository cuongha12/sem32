import React, { useEffect } from 'react';
import { Card, Descriptions, Divider, Modal, Typography, Row, Col } from "antd";
import Meta from "antd/es/card/Meta";

const ModalOrder = ({ open, model, onClose }) => {
    const { Text } = Typography;
    const total = model?.orderItems?.reduce((a, b) => a + (b.quantity * b.product.price), 0) || 0;
    useEffect(() => {
        if (!model) {
            onClose()
        }
    }, [model])
    console.log(model);
    return (
        <Modal width={800} title="Thông tin hóa đơn" okButtonProps={{
            hidden: true
        }}
            cancelButtonProps={{
                hidden: true
            }} open={open} onOk={onClose} cancelText={false} onCancel={onClose}>
            <div style={{
                marginTop: 50,
                marginBottom: 50,
            }}>
                <Descriptions title="Địa chỉ nhận hàng" size={'default'}>
                    <Descriptions.Item label={<b>Tên người nhận hàng</b>}>
                        <Text strong>{model?.account?.userName}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Số điện thoại</b>}>
                        <Text strong>{model?.account?.phoneNumber}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Địa chỉ</b>}>
                        <Text strong>{model?.account?.address}</Text>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <Row gutter={[16, 32]}>
                {
                    model?.orderItems?.map((e) => (
                        <Col key={e.id} span={12}>
                            <Card

                                style={{
                                    width: 240,
                                }}
                                cover={<img alt="example" src={`/api/ImageControllers/${e.product.image}`} />}
                            >
                                <Meta title={e.product.productName} description={`${e.quantity} x ${e.product.price.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}`} />
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <div style={{
                marginTop: 50,
                marginBottom: 50,
            }}>
                <Descriptions title="Tổng hóa đơn" size={'default'}>
                    <Descriptions.Item label={<b>Thành tiền</b>}>
                        <Text strong>{(total > 100000 ? total -50000 : total).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}</Text>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </Modal>
    );
};

export default ModalOrder;
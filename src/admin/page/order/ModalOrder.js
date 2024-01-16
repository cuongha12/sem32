import React, { useEffect } from 'react';
import { Card, Descriptions, Divider, Modal, Typography } from "antd";
import Meta from "antd/es/card/Meta";

const ModalOrder = ({ open, model, onClose, orderItem }) => {
    const { Text } = Typography;
    const total = model?.orderItems?.reduce((a, b) => a + (b.quantity * b.product.price), 0) || 0;
    useEffect(() => {
        if (!orderItem && !model) {
            onClose()
        }
    }, [model])
    return (
        <Modal width={1000} title="Thông tin hóa đơn" okButtonProps={{
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
            {
                orderItem?.map((e) => (
                    <Card
                        key={e.id}
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
                ))
            }
            <div style={{
                marginTop: 50,
                marginBottom: 50,
            }}>
                <Descriptions title="Tổng hóa đơn" size={'default'}>
                    <Descriptions.Item label={<b>Tên người nhận hàng</b>}>
                        <Text strong>{total.toLocaleString('vi-VN', {
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
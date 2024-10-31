import React, { useCallback, useContext, useEffect } from 'react'
import { Button, Space, Drawer, Form, Input, Switch, message, Row, Col } from 'antd';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';
const CategoryForm = ({ open, onClose, mode, model }) => {
    const { loadCategory } = useContext(AppContext)
    const [form] = Form.useForm();
    const Close = useCallback(() => {
        onClose()
        form.resetFields();
    }, [form, onClose])

    const onFinish = useCallback(async (value) => {
        try {
            if (mode === 'add') {
                await axios.post("/api/Categories", { ...value, status: value.status ? value.status : false }).then(() => {
                    loadCategory()
                    message.success("Cập nhật dữ liệu thành công")
                    Close()
                })
            } else {
                await axios.put("/api/Categories/" + model.categoryID, { ...value, status: value.status ? value.status : false }).then(() => {
                    loadCategory()
                    message.success("Cập nhật dữ liệu thành công")
                    Close()
                })
            }
        } catch (error) {
            message.error('Cập nhật dữ liệu thất bại')
            if (model) {
                return
            }
            form.resetFields();
        }
    }, [Close, loadCategory, form, mode, model])
    useEffect(() => {
        if (model) {
            form.setFieldsValue(model)
        }
    }, [model, form])
    return (
        <Drawer title="Cập nhật dữ liệu danh mục" width={'50%'} placement="right" onClose={Close} open={open}>

            <Form name="category-form"
                form={form}
                autoComplete="off"
                layout="vertical"
                labelAlign="left"
                onFinish={onFinish}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12} >
                        <Form.Item
                            style={{ width: '100%' }}
                            label="Tên danh mục"
                            name="categoryName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tên danh mục không để trống',
                                },
                            ]}
                        >
                            <Input allowClear placeholder="Tên danh mục" />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item
                            style={{ width: '100%' }}
                            label="Mô tả"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Mô tả không để trống',
                                },
                            ]}
                        >
                            <Input allowClear placeholder="Mô tả" />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item valuePropName="checked" name="status" label={"Trạng thái"}>
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>


                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            form='category-form'
                        > Lưu lại</Button>
                        <Button type="default" onClick={() => {
                            onClose()
                            form.resetFields();
                        }} >Quay lại
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </Drawer>
    )
}

export default CategoryForm
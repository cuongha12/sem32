import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Space, Drawer, Form, Input, Switch, message, InputNumber, Select, Upload, Modal } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { AppContext } from '../../../Context/AppContext';
const ProductForm = ({ open, onClose, mode, model }) => {
    const { loadProduct, loadCategory, category } = useContext(AppContext)
    const [form] = Form.useForm();
    const Close = useCallback(() => {
        onClose()
        form.resetFields();
    }, [form, onClose])
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const [fileList, setFileList] = useState([
        {
            uid: '',
            name: '',
            status: '',
            url: '',
        }
    ]);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    };
    const onFinish = useCallback(async (value) => {
        try {
            const formData = new FormData();
            if (mode === 'add') {
                console.log(fileList[0]);
                formData.append('ProductName', value.productName)
                formData.append('CategoryID', value.categoryID)
                formData.append('Description', value.description)
                formData.append('Price', value.price)
                formData.append('Quantity', value.quantity)
                formData.append('Status', value.status ? value.status : false)
                formData.append('ImageFile', fileList[0].originFileObj)
                await axios.post("/api/Products", formData).then(() => {
                    loadProduct()
                    message.success("Cập nhật dữ liệu thành công")
                    Close()
                })
            } else {
                console.log(fileList);
                // formData.append('ProductName', value.productName)
                // formData.append('CategoryID', value.categoryID)
                // formData.append('Description', value.description)
                // formData.append('Price', value.price)
                // formData.append('Quantity', value.quantity)
                // formData.append('Status', value.status)
                // formData.append('ImageFile', fileList[0].originFileObj ? fileList[0].originFileObj : fileList[0])
                // await axios.put("/api/Products/" + model.productID, formData).then(() => {
                //     loadProduct()
                //     message.success("Cập nhật dữ liệu thành công")
                //     Close()
                // })
            }
        } catch (error) {
            message.error('Cập nhật dữ liệu thất bại')
            if (model) {
                return
            }
            form.resetFields();
        }
    }, [Close, loadProduct, form, mode, model, fileList])
    useEffect(() => {
        if (model) {
            console.log(model);
            form.setFieldsValue(model)
            setFileList(fileList.map((e) => {
                return {
                    uid: model.productID,
                    name: model.image,
                    status: 'done',
                    url: `/api/ImageControllers/${model.image}`,
                }
            }));
        }
        loadCategory()
    }, [model, form, loadCategory])

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <Drawer title="Cập nhật dữ liệu sản phẩm" width={'100%'} placement="right" onClose={Close} open={open}>
            <Form name="product-form"
                form={form}
                autoComplete="off"
                layout="vertical"
                labelAlign="left"
                onFinish={onFinish}
            >
                <Form.Item
                    style={{ width: '20%' }}
                    label="Tên sản phẩm"
                    name="productName"
                    rules={[
                        {
                            required: true,
                            message: 'Tên sản phẩm không để trống',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Tên sản phẩm" />
                </Form.Item>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Ảnh không để trống',
                    },
                ]} label="Ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={() => {
                            return false
                        }}

                    >
                        {fileList.length === 1 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </Form.Item>
                <Form.Item
                    style={{ width: '50%' }}
                    label="Giá sản phẩm"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Giá sản phẩm không để trống',
                        },
                    ]}
                >
                    <InputNumber allowClear placeholder="Giá sản phẩm" />
                </Form.Item>
                <Form.Item
                    style={{ width: '50%' }}
                    label="Số lượng sản phẩm"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Số lượng sản phẩm không để trống',
                        },
                    ]}
                >
                    <InputNumber allowClear placeholder="Số lượng sản phẩm" />
                </Form.Item>
                <Form.Item
                    style={{ width: '20%' }}
                    label="Danh mục sản phẩm"
                    name="categoryID"
                    rules={[
                        {
                            required: true,
                            message: 'Danh mục sản phẩm không để trống',
                        },
                    ]}
                >
                    <Select
                        allowClear
                        placeholder="Danh mục sản phẩm"
                        optionFilterProp="children"
                        options={category?.filter((e)=>e.status)}
                        fieldNames={{
                            label: 'categoryName',
                            value: 'categoryID'
                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{ width: '20%' }}
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
                <Form.Item valuePropName="checked" name="status" label={"Trạng thái"}>
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            form='product-form'
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

export default ProductForm

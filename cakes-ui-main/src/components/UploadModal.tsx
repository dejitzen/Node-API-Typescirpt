import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import { Upload, message, Modal, Form, Input, Button, InputNumber, ImageProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { CakesType, UploadPropsType } from '../types/types'
const { Dragger } = Upload;

export default function UploadModal({ visible, toggleModal, addCake }: UploadPropsType) {
    const [realUrl, setRealUrl] = useState(String)
    const layout = {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
    };
    const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
    };
    const upload = (image: File) => {
        const isJPG = image.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
            return false
        } else {
            storage.ref(`/images/${image.name}`).put(image)
                .on("state_changed", message.success('Successfully Uploaded'));
            setRealUrl(`https://firebasestorage.googleapis.com/v0/b/cakes-app-d61af.appspot.com/o/images%2${image.name}?alt=media&token=4ca975ce-870b-4fdf-8fd3-3950320c4f6f`)

            return false
        }
    }
    const onFinish = (values: CakesType) => {
        addCake(values)
        toggleModal()
    };

    const onFinishFailed = (errorInfo: Object) => {
        message.error('Make sure all fields are correct')
    };
    const firebaseConfig = {
        apiKey: "AIzaSyAQXt0bVzsEUCynwRnJAOyZwah1iZXTSjU",
        authDomain: "cakes-app-d61af.firebaseapp.com",
        projectId: "cakes-app-d61af",
        storageBucket: "cakes-app-d61af.appspot.com",
        messagingSenderId: "554610234343",
        appId: "1:554610234343:web:a69d1b023f7860027aa342",
        measurementId: "G-YQDH0DLF8W"
    };
    var firebaseApp
    if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
        firebaseApp = firebase.app();
    }
    var storage = firebase.storage();

    const props = {
        name: 'file',
        multiple: false,
        beforeUpload: upload,
    };
    const normFile = (e: any) => {
        return `https://firebasestorage.googleapis.com/v0/b/cakes-app-d61af.appspot.com/o/images%2F${e.file.name}?alt=media&token=4ca975ce-870b-4fdf-8fd3-3950320c4f6f`

    };
    return (
        <Modal title={'Add Cake'}
            centered
            width={'50%'}
            visible={visible}
            onCancel={toggleModal}
            footer={null}
            destroyOnClose>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input Cake\'s name! Less than 30 Chars', max: 30 }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Comment"
                    name="comment"
                    rules={[{ required: true, message: 'Please input a comment about the new Cake! Less than 200Chars', max: 200 }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Yum Factor (1-5)"
                    name="yumfactor"
                    rules={[{ required: true, message: 'Please input Yum Factor! Should be a number 1-5', type: 'number', min: 1, max: 5 }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item name={'imageurl'} getValueFromEvent={normFile} rules={[{ required: true, message: 'Please upload an image', type: 'string' }]}
                    {...tailLayout}  >
                    <Dragger {...props} >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>

                    </Dragger>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

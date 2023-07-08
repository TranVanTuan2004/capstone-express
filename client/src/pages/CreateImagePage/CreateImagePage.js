import React, { useState } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  Button, Cascader, DatePicker, Form, Input, InputNumber, message, Radio, Select, Switch, TreeSelect, Upload,
} from 'antd';

import "./CreateImagePage.css"
import { imageService } from '../../services/imageService';
export default function CreateImagePage() {
  const [imgSrc, setImgSrc] = useState({})
  const [file, setFile] = useState(null)
  const onFinish = async (values) => {
    try {
      const newValues = { ...values, hinhAnh: file }
      const formData = new FormData()
      for (let key in newValues) {
        if (key !== 'hinhAnh') {
          formData.append(key, newValues[key])
        } else {
          formData.append('File', newValues.hinhAnh, newValues.hinhAnh.name)
        }
      }
      const data = await imageService.createImage(formData)
      if(data.status === 200){
        message.success("Tạo ảnh thành công")
      }else {
        message.error("Có lỗi")
      }
    } catch (err) {
      console.log(err)
    }
  };
  const validateMessages = {
    required: 'Vui lòng nhập ${label}!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const handleChangeFile = (e) => {
    // lấy ra file từ e
    let file = e.target.files[0]
    setFile(file)
    // tạo đối tượng để đọc file
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      setImgSrc(e.target.result)
    }
  }


  return (
    <div className='mx-[20px]'>
      <Form onFinish={onFinish}
        validateMessages={validateMessages}
        className='p-[80px] bg-gray-100 grid grid-cols-2 rounded-xl mx-auto gap-[40px]'
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        style={{
          maxWidth: 900,
        }}
      >
        <div className='col-span-1'>
          <Form.Item
            className=' w-full h-full'>
            <label className='file-upload-label' htmlFor="file-upload">
              <div className='overlay'>
                <input type="file" onChange={handleChangeFile} id='file-upload' />
              </div>
            </label>
            <img src={imgSrc} className="w-full h-[300px] object-contain rounded-md mt-3 p-4 border-[1px] border-blue-950" alt="" />
          </Form.Item>
        </div>
        <div className='col-span-1'>
          <Form.Item className='w-full' label="Tiêu đề" name='ten_hinh' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name='mo_ta' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <div>
            <Button className='bg-[#4096ff]' htmlType='submit' type="primary" >Thêm ảnh</Button>
          </div>
        </div>
      </Form>
    </div>
  );

}

import React from 'react'
import { Button, Form, Input } from 'antd';
import "./SignUpPage.css"
import { userService } from '../../services/userService';
import { NavLink } from 'react-router-dom';
export default function SignUpPage() {
  const signInUser = async (userInfo) => {
    try {
      const user = await userService.userSignUp(userInfo)
      console.log(user)
    }catch(err) {
      console.log("err", err)
    }
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      <Form
        className='shadow-2xl rounded-lg p-20 w-[500px]'
        colon={false}
        name="basic"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
        }}
        onFinish={signInUser}
        autoComplete="off"
        layout='vertical'
        validateTrigger="onSubmit"
      >
      <h2 className='text-2xl text-center font-semibold mb-5 text-gray-500'>Wellcome to my picture</h2>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email',
            },
            {
              type: 'email',
              message: 'Email không đúng định dạng',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu',
            },
            {
              min: 4, 
              max: 20,
              message: 'Mật khẩu phải từ 4 đến 20 ký tự',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="hoTen"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tuổi"
          name="tuoi"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tuổi',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className='mb-0 w-full'
        >
          <Button className='w-full bg-[#1677ff] mt-4' type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
        <div className='mt-5'>
          <p className='flex items-center justify-end'>Bạn đã có tài khoản? <NavLink to="/signin" className='text-orange-400 font-bold hover:text-orange-500'> Đăng nhập</NavLink></p>
        </div>
      </Form>
    </div>
  )
}

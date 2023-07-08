import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Dropdown, Space, message } from 'antd';
import { useSelector } from "react-redux"
import { localUser } from '../../utils/localUser';

export default function Header() {
  const { userInfo } = useSelector(state => state.userSlice)
  const navigate = useNavigate()
  const [searchImage, setSearchImage] = useState("")

  const handleLogout = () => {
    localUser.remove()
    localStorage.removeItem("token")
    message.success("Đăng xuất thành công")
    window.location.href = "/"
  }

  // Tìm kiếm hình ảnh
  const handleSearchImage = (e) => {
    e.preventDefault()
    if (searchImage.trim() == "") {
      navigate("/")
    }else {
      navigate(`/image-search/${searchImage}`)
    }
  }

  // useEffect(() => {
  //   // if (!userInfo) {
  //   //   navigate("/signin")
  //   // }
  // }, [])
  return (
    <header className='flex items-center justify-between px-[50px] py-4'>
      <div>
        <NavLink to="/" className="mr-4">Trang chủ</NavLink>
        {
          userInfo ? <NavLink to="/create-image">Tạo</NavLink> : ""
        }
      </div>
      <div className='flex-grow mx-6'>
        <form onSubmit={handleSearchImage} className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input onChange={(e) => setSearchImage(e.target.value)} type="text" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-full focus:border-gray-300 block w-full pl-10 p-2" placeholder="Tìm kiếm" />
          </div>
        </form>
      </div>
      <div className='flex items-center'>
        <i className="las la-bell text-2xl"></i>
        <i className="las la-comment-dots text-2xl mx-4"></i>
        {
          userInfo ? <Dropdown
          menu={{
            items: [
              {
                label: <NavLink to="/user-info" className="font-semibold">Trang cá nhân</NavLink>,
                key: '0',
              },
              {
                label: <NavLink onClick={handleLogout} className="font-semibold">Đăng xuất</NavLink>,
                key: '1',
              },
            ]
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space className='cursor-pointer'>
              <div>
                <img className='w-12 h-12 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjt1h4_JR7oghia9MrO4OdomhUgs4vm45h6w&usqp=CAU" alt="" />
              </div>
            </Space>
          </a>
        </Dropdown> : 
        <div>
          <NavLink to="/signin" className="mr-4">Đăng nhập</NavLink>
          <NavLink to="/signup">Đăng ký</NavLink>
        </div>
        }
      </div>
    </header>
  )
}

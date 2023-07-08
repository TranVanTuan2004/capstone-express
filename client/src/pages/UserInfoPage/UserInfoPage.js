import { Dropdown, Space, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react'
import "./UserInfoPage.css"
import { userService } from '../../services/userService';
import { imageService } from '../../services/imageService';
import ImageItem from '../../components/ImageItem/ImageItem';
import { NavLink } from 'react-router-dom';
import { DOMAIN_IMAGE, FOLDER_IMAGE } from '../../utils/configs';

export default function UserInfoPage() {
  const [infoUser, setInfoUser] = useState({})
  const [imageListSaved, setImageListSaved] = useState([])
  const [imageCreated, setImageCreated] = useState([])
  const fetchInfoUser = async () => {
    try {
      const infoUser = await userService.getInfoUser()
      setInfoUser(infoUser.data.content)
    } catch (err) {
      message.error(err?.response.data.content)
    }
  }
  const fetchImageListSaved = async () => {
    try {
      const imageListSaved = await imageService.getImageListSaved()
      setImageListSaved(imageListSaved.data.content)
    } catch (err) {
      console.log(err)
    }
  }
  const fetchImageListCreated = async () => {
    try {
      const imageCreated = await imageService.getImageListCreated()
      setImageCreated(imageCreated.data.content)
    } catch (err) {
      console.log(err)
    }
  }
  const deleteImage = async (id) => {
    try { 
      const data = await imageService.deleteImage(id)
      if(data.status === 200) {
        message.success(data.data.content)
        fetchImageListCreated()
        fetchImageListSaved()
      }
    }catch(err) {
      console.log(err)
    } 
  }
  useEffect(() => {
    fetchInfoUser()
    fetchImageListSaved()
    fetchImageListCreated()
  }, [])

  return (
    <div className='px-[50px]'>
      <div className='text-center'>
        <img className='w-32 h-32 object-cover rounded-full mx-auto' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjt1h4_JR7oghia9MrO4OdomhUgs4vm45h6w&usqp=CAU" alt="" />
        <h2 className='font-semibold text-2xl mt-2 text-gray-700'>{infoUser.ho_ten}</h2>
        <h3 className='text-gray-400 '>@{infoUser.ho_ten}</h3>
        <h4 className='text-gray-600'>0 người đang theo dõi</h4>
        <div className='my-3'>
          <button className='py-2 px-4 rounded-3xl bg-gray-300'>Chia sẻ</button>
          <button className='py-2 px-4 rounded-3xl bg-gray-300 ml-4'>Chỉnh sửa hồ sơ</button>
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="1" centered items={[
          {
            key: '1',
            label: <div className='font-semibold'>Đã tạo</div>,
            children: <div className='grid grid-cols-6 gap-x-5 gap-y-10'>
              {
                imageCreated.map((img) => {
                  return <div key={img.hinh_id}>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            label: <div onClick={() => deleteImage(img.hinh_id)}>Xóa ảnh</div>,
                            key: '0',
                          },
                          {
                            label: <div>Chỉnh sửa ảnh</div>,
                            key: '1',
                          },
                        ]
                      }}
                      trigger={['click']}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className='flex justify-end max-w-[150px] ml-auto'>
                          <i className="las la-ellipsis-h text-2xl"></i>
                        </Space>
                      </a>
                    </Dropdown>
                    <ImageItem img={img} />
                  </div>
                })
              }
            </div>,
          },
          {
            key: '2',
            label: <div className='font-semibold'>Đã lưu</div>,
            children: <div className='grid grid-cols-6 gap-x-5 gap-y-10'>
              {
                imageListSaved.map((img) => {
                  return <NavLink to={`/image-detail/${img.hinh_id}`} key={img.hinh_id}>
                    <img className='rounded-lg object-cover h-auto' src={DOMAIN_IMAGE + FOLDER_IMAGE + img.hinh_anh.duong_dan} alt="Lỗi" />
                    <h3 className='font-medium text-lg'>{img.hinh_anh.ten_hinh}</h3>
                    <h4>{img.hinh_anh.mo_ta}</h4>
                    <div className='flex items-center mt-2'>
                      <img className='w-12 h-12 object-cover rounded-full' src={img.hinh_anh.nguoi_dung.anh_dai_dien} alt="" />
                      <h4 className='ml-3'>{img.hinh_anh.nguoi_dung.ho_ten}</h4>
                    </div>
                  </NavLink>
                })
              }
            </div>
          },
        ]} />
      </div>
    </div>
  )
}

import { Dropdown, Input, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { imageService } from '../../services/imageService'
import { useNavigate, useParams } from 'react-router-dom'
import moment from "moment"
import { useSelector } from 'react-redux'
import { DOMAIN_IMAGE, FOLDER_IMAGE } from '../../utils/configs'

export default function DetailPage() {
  const [infoImage, setInfoImage] = useState({})
  const [comment, setComment] = useState("")
  const [listComment, setListComment] = useState([])
  const [isSaveImage, setIsSaveImage] = useState()
  const {userInfo} = useSelector((state) => state.userSlice)
  const { id } = useParams()
  const navigate = useNavigate()


  // Chức năng bình luận
  const handleComment = async (e) => {
    try {
      if(!userInfo) {
        navigate("/signin") 
      }
      e.preventDefault()
      if (comment === "") return false
      let dataComment = {
        hinh_id: id,
        noi_dung: comment
      }
      await imageService.saveCommentByImage(dataComment)
      fetchCommentByImage()
      setComment("")
    } catch (err) {
      console.log(err)
    }
  }

  const fetchImageSaveById = async () => {
    try {
      const data = await imageService.getImageSaveById(id)
      setIsSaveImage(data.data.content)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSaveImage = async () => {
    try {
      if(!userInfo) {
        navigate("/signin") 
        return false
      }
      let info = {
        hinh_id: id
      }
      const data = await imageService.checkImageSave(info)
      message.success(data.data.message)
      fetchImageSaveById()
    } catch (err) {
      console.log(err)
    }
  }

  const fetchInfoImage = async () => {
    try {
      const infoImage = await imageService.getInfoImage(id)
      setInfoImage(infoImage.data.content)
    } catch (err) {
      console.log(err.response.data.content)
    }
  }
  const fetchCommentByImage = async () => {
    try {
      const listComment = await imageService.getCommentbyImage(id)
      setListComment(listComment.data.content)
    } catch (err) {
      console.log(err.response.data.content)
    }
  }

  useEffect(() => {
    fetchInfoImage()
    fetchCommentByImage()
    fetchImageSaveById()
  }, [])
  return (
    <div className='max-w-[1000px] min-h-[600px] mx-auto bg-white shadow-2xl mt-12 rounded-[40px]'>
      <div className='grid grid-cols-2'>
        <div>
          <img className='w-full object-cover rounded-l-[40px]' src={DOMAIN_IMAGE + FOLDER_IMAGE + infoImage?.duong_dan} alt="" />
        </div>
        <div className='p-8 flex flex-col'>

          <div className='flex items-center justify-between'>
            <div className='cursor-pointer'>
              <i className="las la-ellipsis-h text-2xl"></i>
              <i className="las la-upload text-3xl ml-3"></i>
            </div>
            <div>
              <button onClick={handleSaveImage} className='w-14 h-10 transition-all duration-300 rounded-[40px] bg-red-500 text-white font-medium'>
                {isSaveImage ? <div className='bg-black w-[80px] h-10 rounded-[40px] flex items-center justify-center'>Hủy lưu</div> : <div>Lưu</div>}
              </button>
            </div>
          </div>
          <div className='my-4'>
            <h4 className='font-semibold text-4xl mb-3 text-gray-600'>{infoImage?.ten_hinh}</h4>
            <p className='leading-6 text-gray-600 text-[15px]'>{infoImage?.mo_ta}</p>
          </div>
          <div className='flex items-center'>
            <img className='w-12 h-12 object-cover rounded-full' src={infoImage?.nguoi_dung?.anh_dai_dien} alt="Lỗi img" />
            <div className='ml-4'>
              <h4 className='text-gray-700 font-semibold text-xl'>{infoImage?.nguoi_dung?.ho_ten}</h4>
              <div className='font-light text-gray-900'>175,2k người theo dõi</div>
            </div>
          </div>
          <div className='flex items-center my-5'>
            <h5 className='mr-4 font-semibold text-xl'>{listComment.length} nhận xét</h5>
            <i className="las la-angle-down text-xl"></i>
          </div>
          <div className='h-[210px] overflow-scroll'>
            {
              listComment.map((comment) => {
                return <div className='mb-4' key={comment.binh_luan_id}>
                  <div className='flex mb-1'>
                    <img className='min-w-[48px] h-12 object-cover rounded-full mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjt1h4_JR7oghia9MrO4OdomhUgs4vm45h6w&usqp=CAU" alt="Lỗi img" />
                    <div className='bg-gray-200 rounded-2xl py-2 px-4'>
                      <h3 className='font-semibold text-sm'>{comment.nguoi_dung.ho_ten}</h3>
                      <p className='text-gray-800 text-[15px] leading-6'>{comment.noi_dung}</p>
                    </div>
                  </div>
                  <div className='text-gray-500 flex ml-[56px] text-xs font-semibold'>
                    <div className=' cursor-pointer'>Thích</div>
                    <div className='mx-4 cursor-pointer'>Phản hồi</div>
                    <div className=' cursor-pointer'>{moment(comment.ngay_binh_luan).fromNow()}</div>
                  </div>
                </div>
              })
            }
          </div>
          <form onSubmit={handleComment} className='mt-auto'>
            <div className='flex items-center my-6'>
              <img className='min-w-[48px] h-12 object-cover rounded-full mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjt1h4_JR7oghia9MrO4OdomhUgs4vm45h6w&usqp=CAU" alt="Lỗi img" />
              <Input onChange={(e) => setComment(e.target.value)} value={comment} className='rounded-3xl p-3' placeholder="Thêm nhận xét" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

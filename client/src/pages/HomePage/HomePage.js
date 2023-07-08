import React, { useEffect, useState } from 'react'
import { imageService } from '../../services/imageService'
import { NavLink } from 'react-router-dom'
import ImageItem from '../../components/ImageItem/ImageItem'

export default function HomePage() {
  const [imageList, setImageList] = useState([])
  const fetchImageList = async () => {
    const imageList = await imageService.getListImage()
    setImageList(imageList.data.content)
  }
  useEffect(() => {
    fetchImageList()
  }, [])
  return (
    <div className='px-[20px]'>
      <div className='grid grid-cols-6 gap-x-5 gap-y-8'>
        {
          imageList.map((img) => {
            return <ImageItem key={img.hinh_id} img={img}/>
          })
        }
      </div>
    </div>
  )
}

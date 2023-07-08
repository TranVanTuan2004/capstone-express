import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { imageService } from '../../services/imageService'
import { message } from 'antd'
import ImageItem from '../../components/ImageItem/ImageItem'

export default function SearchImagePage() {
    const { keyword } = useParams()
    const [imageList, setImageList] = useState([])
    const fetchSearchImage = async () => {
        try {
            const imageList = await imageService.searchImageByName(keyword)
            setImageList(imageList.data.content)
        } catch (err) {
            console.log(err.response.data.content)
            message.error(err.response.data.content)
        }
    }
    useEffect(() => {
        fetchSearchImage()
    }, [keyword])
    return (
        <div className='px-[20px]'>
            <div className='grid grid-cols-6 gap-x-5 gap-y-10'>
                {
                    imageList.map((img) => {
                        return <ImageItem key={img.hinh_id} img={img}/>
                    })
                }
            </div>
        </div>
    )
}

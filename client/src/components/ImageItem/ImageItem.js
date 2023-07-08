import React from 'react'
import { NavLink } from 'react-router-dom'
import { DOMAIN_IMAGE, FOLDER_IMAGE } from '../../utils/configs'

export default function ImageItem({img}) {
    return (
        <NavLink to={`/image-detail/${img.hinh_id}`} key={img.hinh_id}>
            <img className='rounded-lg object-cover h-auto' src={DOMAIN_IMAGE + FOLDER_IMAGE + img.duong_dan} alt="Lỗi" />
            <h3 className='font-medium text-lg'>{img.ten_hinh}</h3>
            <h3 className='font-medium text-lg'>{img.mo_ta.length > 30 ? img.mo_ta.slice(0, 30) + "..." : img.mo_ta}</h3>
            <div className='flex items-center mt-2'>
                <img className='w-12 h-12 object-cover rounded-full' src={img.nguoi_dung.anh_dai_dien} alt="" />
                <h4 className='ml-3'>{img.nguoi_dung.ho_ten}</h4>
            </div>
        </NavLink>
    )
}

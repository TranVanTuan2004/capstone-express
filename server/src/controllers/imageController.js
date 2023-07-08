import { PrismaClient } from '@prisma/client'
import { errorCode, successCode } from '../configs/response.js'
import { decodeToken } from '../configs/jwt.js'
const prisma = new PrismaClient()
const getImageList = async (req, res) => {
    try {
        const imageList = await prisma.hinh_anh.findMany({
            select: {
                hinh_id: true,
                ten_hinh: true,
                duong_dan: true,
                mo_ta: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        email: true,
                        tuoi: true,
                        anh_dai_dien: true
                    }
                }
            },
        })
        successCode(res, imageList, "Lấy danh sách hình ảnh thành công")
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

const searchImageByName = async (req, res) => {
    try {
        let { name } = req.params
        let imageList = await prisma.hinh_anh.findMany({
            select: {
                hinh_id: true,
                ten_hinh: true,
                duong_dan: true,
                mo_ta: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        email: true,
                        tuoi: true,
                        anh_dai_dien: true
                    }
                }
            },
            where: {
                ten_hinh: {
                    contains: name
                }
            }
        })
        successCode(res, imageList, "Tìm kiếm thành công")
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

const getInfoImage = async (req, res) => {
    try {
        let { id } = req.params
        let infoImage = await prisma.hinh_anh.findFirst({
            select: {
                hinh_id: true,
                ten_hinh: true,
                duong_dan: true,
                mo_ta: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        email: true,
                        tuoi: true,
                        anh_dai_dien: true
                    }
                }
            },
            where: {
                hinh_id: Number(id)
            },
        })
        successCode(res, infoImage, "Lấy thông tin thành công")
    } catch {
        errorCode(res, "Lỗi BE")
    }

}

const getInfoCommentByImage = async (req, res) => {
    try {
        let { id } = req.params
        let infoComment = await prisma.binh_luan.findMany({
            select: {
                binh_luan_id: true,
                ngay_binh_luan: true,
                noi_dung: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        anh_dai_dien: true
                    }
                }
            },
            where: {
                hinh_id: Number(id)
            },
        })
        successCode(res, infoComment, "Lấy thành công danh sách comment")
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

const getImageSaveById = async (req, res) => {
    try {
        const { id } = req.params
        const { token } = req.headers
        const infoUser = decodeToken(token)
        const data = await prisma.luu_anh.findFirst({
            where: {
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id),
                hinh_id: Number(id)
            }
        })
        successCode(res, data, "")
    } catch {
        errorCode(res, "Lỗi BE")
    }

}

const checkImageSave = async (req, res) => {
    try {
        const { hinh_id } = req.body
        const { token } = req.headers
        const infoUser = decodeToken(token)
        const image = await prisma.luu_anh.findFirst({
            where: {
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id),
                hinh_id: Number(hinh_id)
            }
        })
        if (image) {
            await prisma.luu_anh.deleteMany({
                where: {
                    nguoi_dung_id: Number(infoUser.data.nguoi_dung_id),
                    hinh_id: Number(hinh_id)
                }
            });
            successCode(res, null, "Xóa ảnh thành công")
        } else {
            const createImage = await prisma.luu_anh.create({
                data: {
                    nguoi_dung_id: Number(infoUser.data.nguoi_dung_id),
                    hinh_id: Number(hinh_id)
                }
            })
            successCode(res, createImage, "Lưu ảnh thành công")
        }
    } catch {
        errorCode(res, "Lỗi BE")
    }
}


const saveCommentByImage = async (req, res) => {
    try {
        const { hinh_id, noi_dung } = req.body
        const { token } = req.headers
        const infoUser = decodeToken(token)
        const commentInfo = await prisma.binh_luan.create({
            data: {
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id),
                hinh_id: Number(hinh_id),
                noi_dung: noi_dung
            }
        })
        successCode(res, commentInfo, "Bình luận thành công")
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

const getImageListSaved = async (req, res) => {
    const { token } = req.headers
    const infoUser = decodeToken(token)
    try {
        const imageListSaved = await prisma.luu_anh.findMany({
            select: {
                hinh_id: true,
                nguoi_dung_id: true,
                ngay_luu: true,
                hinh_anh: {
                    select: {
                        hinh_id: true,
                        ten_hinh: true,
                        duong_dan: true,
                        mo_ta: true,
                        nguoi_dung: {
                            select: {
                                nguoi_dung_id: true,
                                ho_ten: true,
                                email: true,
                                tuoi: true,
                                anh_dai_dien: true
                            }
                        }
                    }
                }
            },
            where: {
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id)
            },


        })
        successCode(res, imageListSaved, "Lấy danh sách ảnh đã lưu thành công")
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

const getImageListCreated = async (req, res) => {
    try {
        const { token } = req.headers
        const infoUser = decodeToken(token)
        const imageListCreated = await prisma.hinh_anh.findMany({
            select: {
                hinh_id: true,
                ten_hinh: true,
                duong_dan: true,
                mo_ta: true,
                nguoi_dung: {
                    select: {
                        nguoi_dung_id: true,
                        ho_ten: true,
                        email: true,
                        tuoi: true,
                        anh_dai_dien: true
                    }
                }
            },
            where: {
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id)
            }
        })
        successCode(res, imageListCreated, "Lấy danh sách tạo ảnh thành công")
    }catch {
        errorCode(res, "Lỗi BE")
    }
}

const deleteImage = async (req, res) => {
    try {
        const { token } = req.headers
        const infoUser = decodeToken(token)
        const {id} = req.params
        await prisma.luu_anh.deleteMany({
            where: {
                hinh_id: Number(id),
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id)
            }
        })
        await prisma.hinh_anh.deleteMany({
            where: {
                hinh_id: Number(id),
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id)

            },
        })
        successCode(res, "Xóa hình ảnh thành công", "Xóa hình ảnh thành công")
    }catch {
        errorCode(res, "Lỗi BE")
    }
}

const uploadImage = async (req, res) => {
    try {
        let duong_dan = req.file.filename
        let {ten_hinh, mo_ta} = req.body
        const { token } = req.headers
        const infoUser = decodeToken(token)
        await prisma.hinh_anh.create({
            data: {
                ten_hinh: ten_hinh,
                mo_ta: mo_ta,
                duong_dan: duong_dan,
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id)
            }
        })
        successCode(res, "Tạo ảnh thành công", "")        
    }catch {
        errorCode(res, "Lỗi BE")
    }

}



export {
    getImageList,
    searchImageByName,
    getInfoImage,
    getInfoCommentByImage,
    checkImageSave,
    saveCommentByImage,
    getImageSaveById,
    getImageListSaved,
    getImageListCreated,
    deleteImage,
    uploadImage
}
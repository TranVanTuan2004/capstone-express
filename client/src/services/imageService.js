import { https } from "./config"

export const imageService = {
    getListImage: () => {
        return https.get("/api/image/layDanhSachHinhAnh")
    },
    searchImageByName:(image) => {
        return https.get(`/api/image/timKiemHinhAnh/${image}`)
    },
    getInfoImage: (id) => {
        return https.get(`/api/image/layThongTinAnh/${id}`)
    },
    getCommentbyImage: (id) => {
        return https.get(`/api/image/layThongTinBinhLuanTheoAnh/${id}`)
    },
    getImageSaveById: (id) => {
        return https.get(`/api/image/layAnhLuuTheoId/${id}`)
    },
    saveCommentByImage: (comment) => {
        return https.post(`/api/image/luuBinhLuanTheoAnh`, comment)
    },
    checkImageSave: (info) => {
        return https.post(`/api/image/kiemTraLuuAnh`, info)
    },
    getImageListSaved: () => {
        return https.get(`/api/image/layDanhSachAnhDaLuu`)
    },
    getImageListCreated: () => {
        return https.get(`/api/image/layDanhSachTaoAnh`)
    },
    deleteImage: (id) => {
        return https.delete(`/api/image/xoaAnhDaTao/${id}`)
    },
    createImage: (infoImage) => {
        return https.post(`/api/image/uploadImage`, infoImage)
    },
}

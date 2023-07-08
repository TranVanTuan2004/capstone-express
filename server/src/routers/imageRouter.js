import express from "express"
import { checkImageSave, deleteImage, getImageList, getImageListCreated, getImageListSaved, getImageSaveById, getInfoCommentByImage, getInfoImage, saveCommentByImage, searchImageByName, uploadImage } from "../controllers/imageController.js"
import upload from "../configs/upload.js"
import { verifyJwt } from "../configs/jwt.js"
const imageRouter = express.Router()


imageRouter.get("/layDanhSachHinhAnh", getImageList)
imageRouter.get("/timKiemHinhAnh/:name", searchImageByName)
imageRouter.get("/layThongTinAnh/:id", getInfoImage)
imageRouter.get("/layThongTinBinhLuanTheoAnh/:id", getInfoCommentByImage)
imageRouter.get("/layAnhLuuTheoId/:id", getImageSaveById)
imageRouter.post("/kiemTraLuuAnh", checkImageSave, verifyJwt)
imageRouter.post("/luuBinhLuanTheoAnh", saveCommentByImage)
imageRouter.get("/layDanhSachAnhDaLuu", verifyJwt, getImageListSaved)
imageRouter.get("/layDanhSachTaoAnh",verifyJwt, getImageListCreated)
imageRouter.delete("/xoaAnhDaTao/:id",verifyJwt, deleteImage)
imageRouter.post("/uploadImage", verifyJwt, upload.single("File"), uploadImage)

export default imageRouter
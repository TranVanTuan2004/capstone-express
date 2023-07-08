import express from "express"
import { dangKy, dangNhap, getInfoUser, uploadProfile } from "../controllers/userController.js"
import upload from "../configs/upload.js"
import { verifyJwt } from "../configs/jwt.js"

const userRouter = express.Router()
userRouter.post("/dangNhap", dangNhap)
userRouter.post("/dangKy", dangKy)
userRouter.get("/layThongTinTaiKhoan",verifyJwt, getInfoUser)
userRouter.post("/capNhatThongTinCaNhan",verifyJwt, upload.single("File"), uploadProfile)


export default userRouter
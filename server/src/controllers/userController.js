import { PrismaClient } from '@prisma/client'
import { errorCode, faildCode, successCode } from '../configs/response.js'
import bcrypt from "bcrypt"
import { decodeToken, generateToken } from '../configs/jwt.js'
const prisma = new PrismaClient()
const dangNhap = async (req, res) => {
    try {
        let { email, matKhau } = req.body
        const checkUser = await prisma.nguoi_dung.findFirst({
            where: {
                email
            }
        })
        if (checkUser) {
            if (bcrypt.compareSync(matKhau, checkUser.mat_khau)) {
                let userInfo = {
                    nguoi_dung_id: checkUser.nguoi_dung_id,
                    email: checkUser.email,
                    ho_ten: checkUser.ho_ten,
                    tuoi: checkUser.tuoi,
                    anh_dai_dien: checkUser.anh_dai_dien,
                }
                let token = generateToken(userInfo)
                successCode(res, {...userInfo, token}, "Đăng nhập thành công")
            } else {
                faildCode(res, "", "Mật khẩu không chính xác")
                // res.send("Mật khẩu không chính xác")
            }
        } else {
            faildCode(res, "", "Email không chính xác")
            // res.send("email không chính xác")
        }
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

const dangKy = async (req, res) => {
    try {
        let { email, matKhau, hoTen, tuoi } = req.body
        const checkUser = await prisma.nguoi_dung.findFirst({
            where: {
                email
            }
        })
        if (checkUser) {
            faildCode(res, "", "Email đã tồn tại")
        } else {
            const userInfo = await prisma.nguoi_dung.create({
                data: {
                    email: email,
                    mat_khau: bcrypt.hashSync(matKhau, 10),
                    ho_ten: hoTen,
                    // lưu ý khi người ta truyền là truyền vào bằng chuỗi
                    tuoi: Number(tuoi)
                }
            })
            successCode(res, userInfo, "Đăng ký thành công")
        }
    } catch {
        errorCode(res, "Lỗi BE")
    }
}

const getInfoUser = async (req, res) => {
    try {
        const {token} = req.headers
        const infoUser = decodeToken(token)
        const getUser = await prisma.nguoi_dung.findFirst({
            select: {
                nguoi_dung_id: true,
                email: true,
                ho_ten: true,
                tuoi: true,
                anh_dai_dien: true,
            },
            where: {
                nguoi_dung_id: infoUser.data.nguoi_dung_id
            }
        })
 
        successCode(res, getUser, "Lấy thông tin tài khoản thành công")
    }catch {
        errorCode(res, "Lỗi BE")
    } 
}

const uploadProfile = async (req, res) => {
    try {
        let anh_dai_dien = req.file.filename
        let {ho_ten, tuoi} = req.body
        const { token } = req.headers
        const infoUser = decodeToken(token)
        await prisma.nguoi_dung.update({
            where: {
                nguoi_dung_id: Number(infoUser.data.nguoi_dung_id)
            },
            data: {
                anh_dai_dien,
                ho_ten,
                tuoi: Number(tuoi)
            }
        })
        successCode(res, "Update profile thành công", "")   
    }catch {
        errorCode(res, "Lỗi BE")
    }
}


export {
    dangNhap,
    dangKy,
    getInfoUser,
    uploadProfile
}